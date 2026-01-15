import {Headphones, Shirt, Armchair, Sparkles, ArrowLeft} from 'lucide-react'
import {useNavigateWithTransition} from '@shopify/shop-minis-react'
import type {Category} from '../types'
import {NeonButton} from './NeonButton'

interface CategorySelectProps {
  onSelect: (category: Category) => void
  selectedCategory: Category | null
  onNext: () => void
}

const categories: {id: Category; icon: React.ReactNode; label: string}[] = [
  {id: 'Electronics', icon: <Headphones size={48} />, label: 'Electronics'},
  {id: 'Fashion', icon: <Shirt size={48} />, label: 'Fashion'},
  {id: 'Home Decor', icon: <Armchair size={48} />, label: 'Home Decor'},
  {id: 'Skincare', icon: <Sparkles size={48} />, label: 'Skincare'},
]

export function CategorySelect({
  onSelect,
  selectedCategory,
  onNext,
}: CategorySelectProps) {
  const navigate = useNavigateWithTransition()

  return (
    <div className="flex flex-col h-full p-6 pt-12 relative">
      {/* Background decoration */}
      <div className="absolute top-[20%] right-[-30%] w-[80%] h-[40%] bg-blue-900/20 blur-[100px] rounded-full pointer-events-none" />

      {/* Header with back button */}
      <div className="flex items-start gap-4 mb-8 mt-0 z-20">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center flex-shrink-0"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">
            What are we building today?
          </h2>
          <p className="text-gray-400">Choose a category to get started.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-auto z-10">
        {categories.map(cat => {
          const isSelected = selectedCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`
                relative aspect-[4/5] rounded-3xl p-4 flex flex-col items-center justify-center gap-4 transition-all duration-300 min-h-[160px]
                ${
                  isSelected
                    ? 'border-2 border-[#a3ff12] bg-[#15151e]/80 shadow-[0_0_15px_rgba(163,255,18,0.3)]'
                    : 'border border-white/10 bg-[#15151e]/40 hover:bg-[#15151e]/60'
                }
              `}
            >
              <div
                className={`
                transition-transform duration-300 ${isSelected ? 'scale-110 text-white drop-shadow-[0_0_10px_rgba(163,255,18,0.5)]' : 'text-gray-400'}
                ${isSelected ? 'text-white' : 'text-gray-500'}
              `}
              >
                {/* Simulated Icon Glow */}
                <div
                  className={`relative ${isSelected ? 'text-purple-300' : ''}`}
                >
                  {cat.icon}
                </div>
              </div>
              <span
                className={`font-medium ${isSelected ? 'text-white' : 'text-gray-400'}`}
              >
                {cat.label}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-6 z-10">
        <NeonButton
          onClick={onNext}
          disabled={!selectedCategory}
          icon="arrow"
          className={!selectedCategory ? 'opacity-50 grayscale' : ''}
        >
          Next Step
        </NeonButton>
      </div>
    </div>
  )
}
