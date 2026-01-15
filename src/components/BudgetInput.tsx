import {useState} from 'react'
import {DollarSign, ArrowLeft} from 'lucide-react'
import {useNavigateWithTransition} from '@shopify/shop-minis-react'
import {NeonButton} from './NeonButton'

interface BudgetInputProps {
  budget: number
  setBudget: (val: number) => void
  needs: string
  setNeeds: (val: string) => void
  onGenerate: () => void
  isLoading: boolean
}

export function BudgetInput({
  budget,
  setBudget,
  needs,
  setNeeds,
  onGenerate,
  isLoading,
}: BudgetInputProps) {
  const navigate = useNavigateWithTransition()
  const [activeChip, setActiveChip] = useState<
    'tight' | 'mid' | 'premium' | null
  >(null)

  const handleChipClick = (type: 'tight' | 'mid' | 'premium', val: number) => {
    setActiveChip(type)
    setBudget(val)
  }

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value.replace(/[^0-9]/g, ''))
    if (!isNaN(val)) {
      setBudget(val)
      setActiveChip(null) // Reset chip if manual input
    } else if (e.target.value === '') {
      setBudget(0)
      setActiveChip(null)
    }
  }

  return (
    <div className="flex flex-col h-full px-5 pt-10 pb-6 relative bg-[#0a0a0f]">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f] pointer-events-none" />

      {/* Header with back button */}
      <div className="flex items-center gap-3 mb-8 z-20">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center flex-shrink-0 rounded-full bg-white/5 border border-white/10"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-white mb-1">
            What are you looking for?
          </h2>
          <p className="text-sm text-gray-500">Set your limit & tell us your needs.</p>
        </div>
      </div>

      <div className="space-y-6 flex-1 z-10">
        {/* Budget Input Area */}
        <div className="rounded-2xl p-5 bg-[#141419] border-2 border-[#2a2a35] relative">
          <div className="flex items-center justify-center mb-5">
            <DollarSign size={32} className="text-[#a3ff12] mr-2" />
            <input
              type="number"
              value={budget || ''}
              onChange={handleBudgetChange}
              placeholder="0"
              className="bg-transparent text-5xl font-bold text-white w-40 text-center outline-none placeholder-gray-600 min-h-[64px]"
            />
          </div>

          <div className="flex gap-3">
            {[
              {id: 'tight', label: 'Tight', val: 100},
              {id: 'mid', label: 'Mid-Range', val: 250},
              {id: 'premium', label: 'Premium', val: 500},
            ].map(chip => (
              <button
                key={chip.id}
                onClick={() =>
                  handleChipClick(
                    chip.id as 'tight' | 'mid' | 'premium',
                    chip.val
                  )
                }
                className={`
                  px-4 py-2.5 rounded-full text-sm font-medium border-2 transition-all flex-1 min-h-[48px]
                  ${
                    activeChip === chip.id
                      ? 'bg-[#a3ff12] text-black border-[#a3ff12] font-semibold'
                      : 'bg-[#1a1a22] border-[#3a3a45] text-gray-300 hover:border-[#4a4a55]'
                  }
                `}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Needs Textarea */}
        <div className="rounded-2xl bg-[#141419] border-2 border-[#2a2a35] focus-within:border-[#a3ff12]/60 transition-colors overflow-hidden">
          <textarea
            value={needs}
            onChange={e => setNeeds(e.target.value)}
            placeholder="e.g., A gaming keyboard and a mouse with high DPI..."
            className="w-full h-24 bg-transparent px-4 py-4 text-white placeholder-gray-500 resize-none outline-none text-sm leading-relaxed"
          />
        </div>

        {/* Example prompts below textarea */}
        <div className="space-y-3">
          <p className="text-xs text-gray-500 font-medium">Try one of these prompts:</p>
          <div className="flex flex-wrap gap-2">
            {[
              'clothes for man',
              'back to school tech setup',
              'home office essentials',
              'gift bundle for a sneakerhead',
            ].map(example => (
              <button
                key={example}
                type="button"
                onClick={() => setNeeds(example)}
                className="px-3 py-2 rounded-full text-xs border-2 border-[#2a2a35] bg-[#141419] text-gray-400 hover:border-[#a3ff12]/50 hover:text-white transition-colors min-h-[36px]"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 z-10">
        <NeonButton
          onClick={onGenerate}
          icon="sparkles"
          disabled={isLoading || budget <= 0}
          className={isLoading ? 'animate-pulse' : ''}
        >
          {isLoading ? 'Generating Combo...' : 'Create Combo'}
        </NeonButton>
      </div>
    </div>
  )
}
