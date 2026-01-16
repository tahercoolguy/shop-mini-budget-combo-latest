import {
  RotateCcw,
  ShoppingBag,
  Heart,
  BookmarkCheck,
  ArrowLeft,
} from 'lucide-react'
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
  onSelectAltCombo?: (data: {
    combo: ComboResult
    budget: number
    category: Category
  }) => void
}

export function ResultScreen({
  combo,
  budget,
  category,
  onSelectAltCombo,
}: ResultScreenProps) {
  const navigate = useNavigateWithTransition()
  const [isSaved, setIsSaved] = useState(false)
  const [currentComboId, setCurrentComboId] = useState('')
  const asyncStorage = useAsyncStorage()

  // ✅ SAFE normalization (fixes TS18048)
  const alternativeCombos = combo.alternativeCombos ?? []

  useEffect(() => {
    const comboId = `${category}-${budget}-${combo.totalPrice}`
    setCurrentComboId(comboId)

    const checkIfSaved = async () => {
      try {
        const data = await asyncStorage.getItem({
          key: 'saved-combos',
        })
        if (!data) return

        const savedCombos: SavedCombo[] = JSON.parse(data)
        setIsSaved(
          savedCombos.some(
            (sc) =>
              sc.category === category &&
              sc.budget === budget &&
              sc.combo.totalPrice === combo.totalPrice
          )
        )
      } catch {
        /* ignore */
      }
    }

    checkIfSaved()
  }, [category, budget, combo.totalPrice, asyncStorage])

  const handleSave = async () => {
    try {
      const data = await asyncStorage.getItem({
        key: 'saved-combos',
      })
      const savedCombos: SavedCombo[] = data
        ? JSON.parse(data)
        : []

      if (isSaved) {
        const updated = savedCombos.filter(
          (sc) =>
            !(
              sc.category === category &&
              sc.budget === budget &&
              sc.combo.totalPrice === combo.totalPrice
            )
        )
        await asyncStorage.setItem({
          key: 'saved-combos',
          value: JSON.stringify(updated),
        })
        setIsSaved(false)
      } else {
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
    } catch {
      alert('Failed to save combo. Please try again.')
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#050508] overflow-y-auto">
      {/* Header */}
      <div className="px-6 pt-12 pb-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={24} className="text-gray-400" />
          </button>

          <h2 className="text-2xl font-bold text-white flex-1">
            Best Match for ${budget}
          </h2>

          <button onClick={() => navigate('/saved')}>
            <BookmarkCheck size={20} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Main Combo */}
      <div className="px-6">
        <div className="relative aspect-square rounded-[2rem] border-4 border-[#a3ff12]">
          <div className="absolute inset-0 grid grid-cols-2 gap-2 p-4 pt-12">
            {combo.items.slice(0, 4).map((item, idx) => (
              <ComboProductCard
                key={idx}
                productName={item.name}
                allocatedPrice={item.price}
                category={item.category || 'General'}
                onClick={() => navigate('/combo-detail')}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-4 text-[#a3ff12] text-4xl font-bold">
          ${combo.totalPrice}
        </div>
      </div>

      {/* Alternative Combos */}
      {alternativeCombos.length > 0 && (
        <div className="px-6 mt-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#a3ff12]" />
            Alternative Combos
          </h3>

          {alternativeCombos.map((altCombo, idx) => (
            <AlternativeComboCard
              key={idx}
              combo={altCombo}
              budget={budget}
              category={category}
              onSelectAltCombo={onSelectAltCombo}
            />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="px-6 py-6 space-y-3">
        <button
          onClick={handleSave}
          className="w-full border-2 border-[#a3ff12] py-4 rounded-full text-[#a3ff12] font-bold"
        >
          <Heart size={18} /> {isSaved ? 'Saved' : 'Save Combo'}
        </button>

        <button
          onClick={() => navigate('/category')}
          className="w-full border-2 border-gray-600 py-4 rounded-full text-gray-300 font-bold"
        >
          <RotateCcw size={18} /> Start Over
        </button>
      </div>
    </div>
  )
}
