import { useState, useEffect, useMemo } from 'react'
import { ArrowLeft, Heart, ShoppingCart, Check } from 'lucide-react'
import {
  useAsyncStorage,
  useNavigateWithTransition,
  useShopNavigation,
  useProductSearch,
} from '@shopify/shop-minis-react'
import type { ComboResult, Category, SavedCombo } from '../types'
import { extractSearchTerms, getProductPrice, getProductImage } from './ProductSearchResult'

interface ComboDetailScreenProps {
  combo: ComboResult
  budget: number
  category: Category
}

export function ComboDetailScreen({ combo, budget, category }: ComboDetailScreenProps) {
  const navigate = useNavigateWithTransition()
  const { navigateToProduct } = useShopNavigation()
  const [selectedProductIndex, setSelectedProductIndex] = useState<number | null>(null)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [isSaved, setIsSaved] = useState(false)
  const asyncStorage = useAsyncStorage()

  useEffect(() => {
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
        console.error('Error checking saved status:', error)
      }
    }
    checkIfSaved()
  }, [category, budget, combo.totalPrice, asyncStorage])

  const handleSave = async () => {
    try {
      const data = await asyncStorage.getItem({ key: 'saved-combos' })
      const savedCombos: SavedCombo[] = data ? JSON.parse(data) : []
      const comboId = `${category}-${budget}-${combo.totalPrice}`

      if (isSaved) {
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
        const newSavedCombo: SavedCombo = {
          id: comboId,
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
      console.error('Error saving combo:', error)
      alert('Failed to save combo. Please try again.')
    }
  }

  const handleBuy = async () => {
    if (selectedProductIndex === null) {
      alert('Please select a product first')
      return
    }

    const selectedItem = combo.items[selectedProductIndex]
    
    // If we have a productId, use it directly
    if (selectedProductId) {
      console.log('[ComboDetailScreen] Navigating to product with ID:', selectedProductId)
      try {
        navigateToProduct({ productId: selectedProductId })
        return
      } catch (error) {
        console.error('[ComboDetailScreen] Error navigating to product:', error)
        alert('Failed to open product. Please try again.')
        return
      }
    }

    // If no productId, the product wasn't found in Shop
    console.log('[ComboDetailScreen] No productId found for product:', selectedItem.name)
    alert(`Product "${selectedItem.name}" was not found in Shop. This product may not be available in the Shop app.`)
  }

  const handleProductSelect = (index: number, productId: string | null) => {
    console.log(`[ComboDetailScreen] Product selected:`, {
      index,
      productId,
      productName: combo.items[index]?.name
    })
    setSelectedProductIndex(index)
    setSelectedProductId(productId)
  }

  return (
    <div className="flex flex-col h-full relative overflow-y-auto overflow-x-hidden bg-[#050508]">
      {/* Background Gradients */}
      <div className="absolute top-[10%] right-[10%] w-[250px] h-[250px] bg-blue-900/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] left-[-10%] w-[200px] h-[200px] bg-purple-900/15 blur-[80px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="px-6 pt-12 pb-4 z-10">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white leading-tight">
              {combo.comboName || 'Combo Details'}
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              ${combo.totalPrice.toFixed(2)} • {combo.items.length} items
            </p>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="flex-1 px-6 pb-4 z-10">
        <div className="grid grid-cols-2 gap-3">
          {combo.items.map((item, idx) => (
            <ComboProductItem
              key={idx}
              item={item}
              isSelected={selectedProductIndex === idx}
              onSelect={(productId) => handleProductSelect(idx, productId)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="px-6 pb-8 z-10 safe-area-bottom border-t border-white/10 pt-4">
        <div className="flex items-center gap-3">
          {/* Save Button */}
          <button
            onClick={handleSave}
            className={`flex-1 border-2 font-bold py-4 px-6 rounded-full flex items-center justify-center gap-2 transition-all min-h-[56px] ${
              isSaved
                ? 'border-[#a3ff12] bg-[#a3ff12] text-black shadow-[0_0_20px_rgba(163,255,18,0.3)]'
                : 'border-[#a3ff12] bg-transparent text-[#a3ff12] hover:bg-[#a3ff12]/10'
            }`}
          >
            <Heart size={18} className={isSaved ? 'fill-black' : ''} />
            {isSaved ? 'Saved' : 'Save Combo'}
          </button>

          {/* Buy Button - Cart Icon Only */}
          <button
            onClick={handleBuy}
            disabled={selectedProductIndex === null}
            className={`flex items-center justify-center w-14 h-14 rounded-full transition-all shadow-lg flex-shrink-0 ${
              selectedProductIndex === null
                ? 'bg-white/20 text-gray-400 cursor-not-allowed'
                : 'bg-white text-black hover:bg-gray-100'
            }`}
            aria-label={selectedProductIndex !== null ? `Buy ${combo.items[selectedProductIndex].name}` : 'Select a product to buy'}
          >
            <ShoppingCart size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}

interface ComboProductItemProps {
  item: { name: string; price: number; category?: string }
  isSelected: boolean
  onSelect: (productId: string | null) => void
}

function ComboProductItem({ item, isSelected, onSelect }: ComboProductItemProps) {
  const searchTerms = extractSearchTerms(item.name, item.category || '')
  const { products, loading } = useProductSearch({
    query: searchTerms,
    first: 5,
    filters: { available: true },
  })

  // Filter by price range
  const matchedProduct = useMemo(() => {
    if (!products || products.length === 0) return null
    const minPrice = item.price * 0.6
    const maxPrice = item.price * 1.4

    const filtered = products.filter((product) => {
      const productPrice = getProductPrice(product as any)
      if (productPrice === null || typeof productPrice !== 'number') {
        return false
      }
      return productPrice >= minPrice && productPrice <= maxPrice
    })

    return filtered.length > 0 ? filtered[0] : products[0]
  }, [products, item.price])

  // Show loading state while searching
  if (loading) {
    return (
      <div className="relative w-full bg-white/5 rounded-xl border-2 border-white/10 p-3 aspect-square flex items-center justify-center">
        <div className="animate-spin w-5 h-5 border-2 border-[#a3ff12] border-t-transparent rounded-full" />
      </div>
    )
  }

  const productImage = matchedProduct ? getProductImage(matchedProduct as any) : null
  const productId = matchedProduct?.id || null
  const actualProductPrice = matchedProduct ? getProductPrice(matchedProduct as any) : null
  const displayPrice = actualProductPrice || item.price
  const productTitle = (matchedProduct as any)?.title || item.name

  // Don't render if no product found in Shop (after loading completes)
  if (!matchedProduct || !productId) {
    return null
  }

  return (
    <button
      onClick={() => {
        console.log(`[ComboProductItem] Clicked "${item.name}"`, {
          productId,
          hasMatchedProduct: !!matchedProduct,
          matchedProductId: matchedProduct?.id
        })
        onSelect(productId)
      }}
      className={`relative w-full bg-white/5 rounded-xl border-2 p-3 transition-all text-left aspect-square flex flex-col overflow-hidden ${
        isSelected
          ? 'border-[#a3ff12] bg-[#a3ff12]/10'
          : 'border-white/10 hover:border-[#a3ff12]/50'
      }`}
    >
      {/* Selection Indicator - Top Right */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#a3ff12] flex items-center justify-center z-10 shadow-lg">
          <Check size={14} className="text-black font-bold" strokeWidth={3} />
        </div>
      )}

      {/* Category Badge - Top Left */}
      {item.category && (
        <div className="absolute top-2 left-2 bg-[#a3ff12]/20 text-[#a3ff12] text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider z-10 backdrop-blur-sm">
          {item.category.split(' - ')[0]}
        </div>
      )}

      {/* Product Image - Takes most of the space */}
      <div className="flex-1 w-full min-h-0 mb-2">
        {productImage ? (
          <div className="w-full h-full rounded-lg overflow-hidden bg-white/5">
            <img
              src={productImage}
              alt={productTitle}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-full rounded-lg bg-white/5 flex items-center justify-center">
            <span className="text-gray-500 text-[10px] text-center px-2">No image</span>
          </div>
        )}
      </div>

      {/* Product Info - Fixed at bottom */}
      <div className="flex flex-col gap-1">
        <h4 className="text-white text-[10px] font-bold leading-tight line-clamp-2">
          {productTitle}
        </h4>
        <div className="text-[#a3ff12] text-sm font-bold">
          ${displayPrice.toFixed(2)}
        </div>
      </div>
    </button>
  )
}
