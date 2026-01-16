import {ArrowLeft, Heart, Trash2} from 'lucide-react'
import {useState, useEffect} from 'react'
import {useAsyncStorage, useNavigateWithTransition} from '@shopify/shop-minis-react'
import type {SavedCombo} from '../types'

interface SavedCombosScreenProps {
  onSelectCombo: (combo: SavedCombo) => void
}

export function SavedCombosScreen({
  onSelectCombo,
}: SavedCombosScreenProps) {
  const navigate = useNavigateWithTransition()
  const [savedCombos, setSavedCombos] = useState<SavedCombo[]>([])
  const asyncStorage = useAsyncStorage()

  useEffect(() => {
    const loadSavedCombos = async () => {
      try {
        const data = await asyncStorage.getItem({key: 'saved-combos'})
        if (data) {
          const combos: SavedCombo[] = JSON.parse(data)
          setSavedCombos(combos)
        }
      } catch (error) {
        // Error loading saved combos
      }
    }
    loadSavedCombos()
    // Only load once when component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = async (id: string) => {
    const updated = savedCombos.filter(combo => combo.id !== id)
    setSavedCombos(updated)
    try {
      await asyncStorage.setItem({key: 'saved-combos', value: JSON.stringify(updated)})
    } catch (error) {
      // Error deleting combo
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
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center flex-shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>

          {/* Heading */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="text-[#a3ff12] w-6 h-6 fill-[#a3ff12]" />
              <h2 className="text-2xl font-bold text-white leading-tight">
                Saved Combos
              </h2>
            </div>
            <p className="text-gray-400 text-sm">
              {savedCombos.length} {savedCombos.length === 1 ? 'combo' : 'combos'} saved
            </p>
          </div>
        </div>
      </div>

      {/* Saved Combos List */}
      <div className="flex-1 px-6 pb-8 z-10 space-y-4">
        {savedCombos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-20">
            <Heart className="text-gray-600 w-16 h-16 mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">
              No saved combos yet
            </h3>
            <p className="text-gray-500 text-sm max-w-[280px]">
              Save your favorite combos from the results screen to access them
              later
            </p>
          </div>
        ) : (
          savedCombos.map(savedCombo => (
            <div
              key={savedCombo.id}
              className="bg-[#15151e]/60 border border-white/10 rounded-2xl p-4 backdrop-blur-sm hover:border-[#a3ff12]/50 transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-[#a3ff12] bg-[#a3ff12]/10 px-2 py-1 rounded-full">
                      {savedCombo.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(savedCombo.savedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    ${savedCombo.combo.totalPrice}
                  </p>
                  <p className="text-xs text-gray-400">
                    Budget: ${savedCombo.budget} • Saved{' '}
                    {savedCombo.combo.savingsPercentage}%
                  </p>
                </div>
                <button
                  onClick={e => {
                    e.stopPropagation()
                    handleDelete(savedCombo.id)
                  }}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                {savedCombo.combo.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-gray-300">{item.name}</span>
                    <span className="text-[#a3ff12] font-mono font-bold">
                      ${item.price}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onSelectCombo(savedCombo)}
                className="w-full bg-[#a3ff12]/10 border border-[#a3ff12] text-[#a3ff12] font-bold py-3 px-4 rounded-full hover:bg-[#a3ff12]/20 transition-all min-h-[48px]"
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
