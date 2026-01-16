import { RotateCcw, ShoppingBag, Heart, BookmarkCheck, ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'
import {
  useAsyncStorage,
  useNavigateWithTransition,
} from '@shopify/shop-minis-react'
import type { ComboResult, Category, SavedCombo } from '../types'
import { ComboProductCard } from './ComboProductCard'
import { AlternativeComboCard } from './AlternativeComboCard'

interface ResultScreenProps {
  combo: ComboResult
  budget: number
  category: Category
  onSelectAltCombo?: (data: { combo: ComboResult; budget: number; category: Category }) => void
}

export function ResultScreen({
  combo,
  budget,
  category,
  onSelectAltCombo,
}: ResultScreenProps) {
  const navigate = useNavigateWithTransition()
  const [isSaved, setIsSaved] = useState(false)
  const [currentComboId, setCurrentComboId] = useState<string>('')
  const asyncStorage = useAsyncStorage()

  useEffect(() => {
    // Generate unique ID for current combo
    const comboId = `${category}-${budget}-${combo.totalPrice}`
    setCurrentComboId(comboId)

    // Check if combo is already saved (only once when combo changes)
    const checkIfSaved = async () => {
      try {
        const data = await asyncStorage.getItem({ key: 'saved-combos' })
        if (data) {
          const savedCombos: SavedCombo[] = JSON.parse(data)
          const exists = savedCombos.some(
            (sc: SavedCombo) =>
              sc.category === category &&
              sc.budget === budget &&
              sc.combo.totalPrice === combo.totalPrice
          )
          setIsSaved(exists)
        }
      } catch (error) {
        // Error checking saved status
      }
    }
    checkIfSaved()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, budget, combo.totalPrice])

  const handleSave = async () => {
    try {
      const data = await asyncStorage.getItem({ key: 'saved-combos' })
      const savedCombos: SavedCombo[] = data ? JSON.parse(data) : []

      if (isSaved) {
        // Remove from saved
        const updated = savedCombos.filter(
          (sc: SavedCombo) => !(
            sc.category === category &&
            sc.budget === budget &&
            sc.combo.totalPrice === combo.totalPrice
          )
        )
        await asyncStorage.setItem({ key: 'saved-combos', value: JSON.stringify(updated) })
        setIsSaved(false)
      } else {
        // Add to saved
        const newSavedCombo: SavedCombo = {
          id: currentComboId,
          combo,
          budget,
          category,
          savedAt: new Date().toISOString(),
        }
        await asyncStorage.setItem({
          key: 'saved-combos',
          value: JSON.stringify([...savedCombos, newSavedCombo]),
        })
        setIsSaved(true)
      }
    } catch (error) {
      alert('Failed to save combo. Please try again.')
    }
  }

  return (
    <div className="flex flex-col h-full relative overflow-y-auto overflow-x-hidden bg-[#050508]">
      {/* Background Gradients */}
      <div className="absolute top-[10%] right-[10%] w-[250px] h-[250px] bg-blue-900/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] left-[-10%] w-[200px] h-[200px] bg-purple-900/15 blur-[80px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="px-6 pt-12 pb-4 z-10">
        <div className="flex items-start gap-4">
          {/* Back Button - Left */}
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center flex-shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>

          {/* Heading - Center/Flex */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white leading-tight">
              Best Match for ${budget}
            </h2>
          </div>

          {/* Saved Icon - Right */}
          <button
            onClick={() => navigate('/saved')}
            className="p-3 rounded-full bg-[#15151e]/80 border border-white/10 hover:border-[#a3ff12] transition-all min-h-[48px] min-w-[48px] flex items-center justify-center group flex-shrink-0"
            aria-label="View saved combos"
          >
            <BookmarkCheck className="text-gray-400 group-hover:text-[#a3ff12] w-5 h-5 transition-colors" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 z-10">
        <div className="w-full max-w-[320px]">
          {/* "What is your limit?" Header */}


          {/* Main Product Card */}
          <div className="relative w-full aspect-square rounded-[2rem] border-[3px] border-[#a3ff12] bg-gradient-to-br from-[#1a1a2e]/90 to-[#0a0a15]/95 shadow-[0_0_40px_rgba(163,255,18,0.4)] overflow-hidden backdrop-blur-sm">
            {/* Saved Badge */}
            <div className="absolute top-5 right-5 bg-[#a3ff12] text-black text-xs font-bold px-4 py-1.5 rounded-full z-20 shadow-lg">
              Saved {combo.savingsPercentage}%
            </div>

            {/* Combo Name Badge */}
            {combo.comboName && (
              <div className="absolute top-5 left-5 bg-white/10 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full z-20 max-w-[60%] truncate">
                {combo.comboName}
              </div>
            )}

            {/* Product Visualization - Dynamic Grid with Shopify Products */}
            <div className="absolute inset-0 flex items-center justify-center p-4 pt-12">
              <div className="w-full h-full grid grid-cols-2 gap-2 overflow-hidden">
                {combo.items.slice(0, 4).map((item, idx) => {
                  const gridClass = combo.items.length === 1 
                    ? 'col-span-2 row-span-2' 
                    : combo.items.length === 2 
                    ? 'row-span-2' 
                    : combo.items.length === 3 && idx === 0 
                    ? 'col-span-2' 
                    : ''
                  return (
                    <ComboProductCard
                      key={idx}
                      productName={item.name}
                      allocatedPrice={item.price}
                      category={item.category || 'General'}
                      className={gridClass}
                      onClick={() => navigate('/combo-detail')}
                    />
                  )
                })}
              </div>
            </div>

            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_0_60px_rgba(163,255,18,0.15)] pointer-events-none" />
          </div>

          {/* Price Display */}
          <div className="mt-4 text-center">
            <div className="text-[#a3ff12] text-4xl font-bold mb-2">
              ${combo.totalPrice}
            </div>
          </div>

        </div>
      </div>

      {/* Alternative Combos Section */}
      {combo.alternativeCombos && combo.alternativeCombos.length > 0 && (
        <div className="px-6 pb-4 z-10">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#a3ff12]" />
            Alternative Combos
          </h3>
          <div className="space-y-4">
            {combo.alternativeCombos.map((altCombo, idx) => (
              <AlternativeComboCard
                key={idx}
                combo={altCombo}
                budget={budget}
                category={category}
                onSelectAltCombo={onSelectAltCombo}
              />
            ))}
          </div>
        </div>
      )}

      {/* Bottom Action Buttons */}
      <div className="px-6 pb-8 z-10 safe-area-bottom space-y-3">
        {/* Save Button */}
        <button
          onClick={handleSave}
          className={`w-full border-2 font-bold py-4 px-6 rounded-full flex items-center justify-center gap-2 transition-all min-h-[56px] ${isSaved
            ? 'border-[#a3ff12] bg-[#a3ff12] text-black shadow-[0_0_20px_rgba(163,255,18,0.3)]'
            : 'border-[#a3ff12] bg-transparent text-[#a3ff12] hover:bg-[#a3ff12]/10'
            }`}
        >
          <Heart
            size={18}
            className={isSaved ? 'fill-black' : ''}
          />
          {isSaved ? 'Saved' : 'Save Combo'}
        </button>

        {/* Start Over Button */}
        <button
          onClick={() => navigate('/category')}
          className="w-full border-2 border-gray-600 bg-transparent text-gray-300 font-bold py-4 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-gray-600/10 transition-all min-h-[56px]"
        >
          <RotateCcw size={18} />
          Start Over
        </button>
      </div>
    </div>
  )
}
