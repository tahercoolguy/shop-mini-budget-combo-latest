import { useState, useEffect } from 'react'
import { MinisRouter, useNavigateWithTransition, useAsyncStorage } from '@shopify/shop-minis-react'
import { Routes, Route } from 'react-router'
import type { Category, ComboResult, SavedCombo } from './types'
import { Onboarding } from './components/Onboarding'
import { CategorySelect } from './components/CategorySelect'
import { BudgetInput } from './components/BudgetInput'
import { ResultScreen } from './components/ResultScreen'
import { ComboGeneratingScreen } from './components/ComboGeneratingScreen'
import { ComboDetailScreen } from './components/ComboDetailScreen'
import { SavedCombosScreen } from './components/SavedCombosScreen'
import { generateProductCombo } from './services/api'

const MAX_PRICE_RETRIES = 3

function hasInvalidPrices(combo: ComboResult): boolean {
  const totalInvalid = Number.isNaN(combo.totalPrice) || !Number.isFinite(combo.totalPrice)
  if (totalInvalid) return true
  const hasBadItemPrice = combo.items.some(
    (item) => Number.isNaN(item.price) || !Number.isFinite(item.price)
  )
  if (hasBadItemPrice) return true
  const altCombos = combo.alternativeCombos ?? []
  const hasBadAltPrice = altCombos.some((alt) => {
    const n = parseFloat(alt.totalPrice)
    return Number.isNaN(n) || !Number.isFinite(n)
  })
  return hasBadAltPrice
}

interface LastCombo {
  combo: ComboResult
  budget: number
  category: Category
}

function AppContent() {
  const navigate = useNavigateWithTransition()
  const asyncStorage = useAsyncStorage()
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [budget, setBudget] = useState(0)
  const [needs, setNeeds] = useState('')
  const [generatedCombo, setGeneratedCombo] = useState<ComboResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastCombo, setLastCombo] = useState<LastCombo | null>(null)
  const [isLoadingLastCombo, setIsLoadingLastCombo] = useState(true)
  const [altComboData, setAltComboData] = useState<{ combo: ComboResult; budget: number; category: Category } | null>(null)

  // Load last combo on app initialization
  useEffect(() => {
    const loadLastCombo = async () => {
      try {
        const data = await asyncStorage.getItem({ key: 'last-combo' })
        if (data) {
          const lastComboData: LastCombo = JSON.parse(data)
          setLastCombo(lastComboData)
        }
      } catch (error) {
        // Error loading last combo
      } finally {
        setIsLoadingLastCombo(false)
      }
    }
    loadLastCombo()
  }, [])

  const handleStart = () => {
    // If there's a last combo and loading is complete, navigate to result screen with it
    if (!isLoadingLastCombo && lastCombo) {
      setGeneratedCombo(lastCombo.combo)
      setBudget(lastCombo.budget)
      setSelectedCategory(lastCombo.category)
      navigate('/result')
    } else {
      // Otherwise, navigate to category selection
      navigate('/category')
    }
  }

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category)
  }

  const handleNextToBudget = () => {
    if (selectedCategory) {
      navigate('/budget')
    }
  }

  const handleGenerate = async () => {
    if (!selectedCategory || budget <= 0) return

    setIsLoading(true)
    setError(null)
    navigate('/generating')

    try {
      // Build search term from category and needs
      const searchTerm = needs.trim()
        ? needs
        : selectedCategory === 'All'
          ? 'I want a mix of products from all categories - a variety bundle'
          : `I want ${selectedCategory.toLowerCase()} products`

      let combo: ComboResult | null = null
      let lastError: Error | null = null

      for (let attempt = 0; attempt < MAX_PRICE_RETRIES; attempt++) {
        const apiResponse = await generateProductCombo(searchTerm, budget)
        const result = apiResponse.result

        // Transform API response to match ComboResult type
        combo = {
          items: result.products.map((product) => ({
            name: product.product_name,
            price: parseFloat(product.allocated_price),
            description: product.description,
            features: product.features,
            category: product.category,
            whyIncluded: product.why_included,
          })),
          totalPrice: parseFloat(result.total_estimated_price),
          savingsPercentage: 100 - parseInt(result.budget_utilization.replace('%', ''), 10) || 0,
          explanation: result.combo_description,
          comboName: result.combo_name,
          searchIntent: result.search_intent,
          budgetUtilization: result.budget_utilization,
          useCases: result.use_cases,
          recommendations: result.recommendations,
          alternativeCombos: result.alternative_combos?.map((alt) => ({
            comboName: alt.combo_name,
            products: alt.products,
            totalPrice: alt.total_price,
          })),
        }

        if (!hasInvalidPrices(combo)) break
        lastError = new Error('API returned invalid prices (NaN). Retrying…')
      }

      if (!combo || hasInvalidPrices(combo)) {
        throw lastError ?? new Error('API returned invalid prices after retries. Please try again.')
      }

      setGeneratedCombo(combo)
      
      // Store the last generated combo
      const lastComboData: LastCombo = {
        combo,
        budget,
        category: selectedCategory,
      }
      try {
        await asyncStorage.setItem({ key: 'last-combo', value: JSON.stringify(lastComboData) })
        setLastCombo(lastComboData)
      } catch (error) {
        // Error saving last combo
      }
      
      setIsLoading(false)
      navigate('/result', { replace: true })
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to generate combo. Please try again.'
      setIsLoading(false)
      setError(errorMessage)
      navigate('/budget', { replace: true })
    }
  }

  const handleSelectSavedCombo = async (savedCombo: SavedCombo) => {
    setGeneratedCombo(savedCombo.combo)
    setBudget(savedCombo.budget)
    setSelectedCategory(savedCombo.category)
    
    // Update last combo when selecting a saved combo
    const lastComboData: LastCombo = {
      combo: savedCombo.combo,
      budget: savedCombo.budget,
      category: savedCombo.category,
    }
    try {
      await asyncStorage.setItem({ key: 'last-combo', value: JSON.stringify(lastComboData) })
      setLastCombo(lastComboData)
    } catch (error) {
      // Error saving last combo
    }
    
    navigate('/result')
  }

  // Mobile-first container styling for Shop Mini
  return (
    <div className="min-h-screen w-full bg-[#050508]">
      <div className="w-full h-screen bg-[#050508] relative overflow-hidden">
        {error && (
          <div className="absolute top-4 left-4 right-4 bg-red-500/90 text-white p-3 rounded-xl z-50 text-center text-sm backdrop-blur-sm animate-fade-in-down">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-2 font-bold underline min-h-[48px]"
            >
              Dismiss
            </button>
          </div>
        )}

        <Routes>
          <Route path="/" element={<Onboarding onStart={handleStart} />} />

          <Route
            path="/category"
            element={
              <CategorySelect
                selectedCategory={selectedCategory}
                onSelect={handleCategorySelect}
                onNext={handleNextToBudget}
              />
            }
          />

          <Route
            path="/generating"
            element={<ComboGeneratingScreen />}
          />

          <Route
            path="/budget"
            element={
              <BudgetInput
                selectedCategory={selectedCategory}
                budget={budget}
                setBudget={setBudget}
                needs={needs}
                setNeeds={setNeeds}
                onGenerate={handleGenerate}
                isLoading={isLoading}
              />
            }
          />

          <Route
            path="/result"
            element={
              generatedCombo && selectedCategory ? (
                <ResultScreen
                  combo={generatedCombo}
                  budget={budget}
                  category={selectedCategory}
                  onSelectAltCombo={(data) => setAltComboData(data as { combo: ComboResult; budget: number; category: Category })}
                  onOpenBestMatchDetail={() => setAltComboData(null)}
                />
              ) : (
                <Onboarding onStart={handleStart} />
              )
            }
          />

          <Route
            path="/combo-detail"
            element={
              altComboData ? (
                      <ComboDetailScreen
                  combo={altComboData.combo}
                  budget={altComboData.budget}
                  category={altComboData.category}
                      />
              ) : generatedCombo && selectedCategory ? (
                  <ComboDetailScreen
                    combo={generatedCombo}
                    budget={budget}
                    category={selectedCategory}
                  />
                ) : (
                  <Onboarding onStart={handleStart} />
                )
            }
          />

          <Route
            path="/saved"
            element={
              <SavedCombosScreen onSelectCombo={handleSelectSavedCombo} />
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export function App() {
  return (
    <MinisRouter viewTransitions>
      <AppContent />
    </MinisRouter>
  )
}
