import { useState, useEffect } from 'react'
import { MinisRouter, useNavigateWithTransition, useAsyncStorage } from '@shopify/shop-minis-react'
import { Routes, Route } from 'react-router'
import type { Category, ComboResult, SavedCombo } from './types'
import { Onboarding } from './components/Onboarding'
import { CategorySelect } from './components/CategorySelect'
import { BudgetInput } from './components/BudgetInput'
import { ResultScreen } from './components/ResultScreen'
import { ComboDetailScreen } from './components/ComboDetailScreen'
import { SavedCombosScreen } from './components/SavedCombosScreen'
import { generateProductCombo } from './services/api'

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

    try {
      // Build search term from category and needs
      const searchTerm = needs.trim()
        ? needs
        : `I want ${selectedCategory.toLowerCase()} products`

      const apiResponse = await generateProductCombo(searchTerm, budget)
      const result = apiResponse.result

      // Transform API response to match ComboResult type
      const combo: ComboResult = {
        items: result.products.map((product) => ({
          name: product.product_name,
          price: parseFloat(product.allocated_price),
          description: product.description,
          features: product.features,
          category: product.category,
          whyIncluded: product.why_included,
        })),
        totalPrice: parseFloat(result.total_estimated_price),
        savingsPercentage: 100 - parseInt(result.budget_utilization.replace('%', '')),
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
      navigate('/result')
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to generate combo. Please try again.'
      setIsLoading(false)
      setError(errorMessage)
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
            path="/budget"
            element={
              <BudgetInput
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
