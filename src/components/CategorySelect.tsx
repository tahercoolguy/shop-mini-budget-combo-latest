import {
  Headphones,
  Shirt,
  Sparkles,
  UtensilsCrossed,
  Baby,
  Home,
  Dumbbell,
  Glasses,
  Bone,
  Gamepad2,
  Palette,
  Briefcase,
  Trophy,
  ArrowLeft,
  Layers,
} from 'lucide-react'
import {useNavigateWithTransition} from '@shopify/shop-minis-react'
import type {Category} from '../types'
import {NeonButton} from './NeonButton'

interface CategorySelectProps {
  onSelect: (category: Category) => void
  selectedCategory: Category | null
  onNext: () => void
}

const categories: {id: Category; icon: React.ReactNode; label: string}[] = [
  {id: 'Women', icon: <Shirt size={40} />, label: 'Women'},
  {id: 'Men', icon: <Shirt size={40} />, label: 'Men'},
  {id: 'Beauty', icon: <Sparkles size={40} />, label: 'Beauty'},
  {id: 'Food & drinks', icon: <UtensilsCrossed size={40} />, label: 'Food & drinks'},
  {id: 'Baby & toddler', icon: <Baby size={40} />, label: 'Baby & toddler'},
  {id: 'Home', icon: <Home size={40} />, label: 'Home'},
  {id: 'Fitness & nutrition', icon: <Dumbbell size={40} />, label: 'Fitness & nutrition'},
  {id: 'Accessories', icon: <Glasses size={40} />, label: 'Accessories'},
  {id: 'Pet supplies', icon: <Bone size={40} />, label: 'Pet supplies'},
  {id: 'Toys & games', icon: <Gamepad2 size={40} />, label: 'Toys & games'},
  {id: 'Electronics', icon: <Headphones size={40} />, label: 'Electronics'},
  {id: 'Arts & crafts', icon: <Palette size={40} />, label: 'Arts & crafts'},
  {id: 'Luggage & bags', icon: <Briefcase size={40} />, label: 'Luggage & bags'},
  {id: 'Sporting goods', icon: <Trophy size={40} />, label: 'Sporting goods'},
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

      {/* Include All button */}
      <button
        type="button"
        onClick={() => onSelect('All')}
        className={`
          w-full rounded-2xl py-3.5 px-4 flex items-center justify-center gap-3 transition-all duration-300 min-h-[52px] mb-4 z-10
          ${
            selectedCategory === 'All'
              ? 'border-2 border-[#a3ff12] bg-[#a3ff12]/15 shadow-[0_0_15px_rgba(163,255,18,0.25)]'
              : 'border border-white/10 bg-[#15151e]/50 hover:bg-[#15151e]/70 hover:border-white/20'
          }
        `}
        aria-pressed={selectedCategory === 'All'}
      >
        <Layers
          size={24}
          className={`flex-shrink-0 ${selectedCategory === 'All' ? 'text-[#a3ff12]' : 'text-gray-400'}`}
        />
        <div className="flex flex-col items-start text-left min-w-0">
          <span          
            className={`font-semibold ${selectedCategory === 'All' ? 'text-[#a3ff12]' : 'text-gray-300'}`}
          >
            Include All
          </span>
          <span className="text-xs text-gray-500">
            Generate products from every category
          </span>
        </div>
      </button>

      <div className="flex-1 min-h-0 overflow-y-auto grid grid-cols-2 gap-4 content-start z-10 pb-2">
        {categories.map(cat => {
          const isSelected = selectedCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`
                relative rounded-3xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 min-h-[132px]
                ${
                  isSelected
                    ? 'border-2 border-[#a3ff12] bg-[#15151e]/80 shadow-[0_0_15px_rgba(163,255,18,0.3)]'
                    : 'border border-white/10 bg-[#15151e]/40 hover:bg-[#15151e]/60'
                }
              `}
            >
              <div
                className={`
                flex-shrink-0 transition-transform duration-300 ${isSelected ? 'scale-110 text-white drop-shadow-[0_0_10px_rgba(163,255,18,0.5)]' : 'text-gray-400'}
                ${isSelected ? 'text-white' : 'text-gray-500'}
              `}
              >
                <div
                  className={`relative ${isSelected ? 'text-purple-300' : ''}`}
                >
                  {cat.icon}
                </div>
              </div>
              <span
                className={`font-medium text-sm text-center leading-tight break-words line-clamp-2 px-0.5 ${isSelected ? 'text-white' : 'text-gray-400'}`}
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
