import { useState } from 'react'
import { ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react'
import {
  useProductSearch,
  useNavigateWithTransition,
} from '@shopify/shop-minis-react'
import type { AlternativeCombo, ComboResult, Category } from '../types'
import { extractSearchTerms, getProductImage } from './ProductSearchResult'

interface AlternativeComboCardProps {
  combo: AlternativeCombo
  budget: number
  category: Category
  onSelectAltCombo?: (data: {
    combo: ComboResult
    budget: number
    category: Category
  }) => void
}

// Convert AlternativeCombo → ComboResult
function convertToComboResult(altCombo: AlternativeCombo): ComboResult {
  return {
    items: altCombo.products.map((productString) => {
      const { name, price } = parseProduct(productString)
      return {
        name,
        price: price ? parseFloat(price.replace('$', '')) : 0,
        description: '',
        category: '',
      }
    }),
    totalPrice: parseFloat(altCombo.totalPrice),
    savingsPercentage: 0,
    explanation: '',
    comboName: altCombo.comboName,
  }
}

// Extract product name and price from "Product Name ($150)"
function parseProduct(
  productString: string
): { name: string; price?: string } {
  const priceMatch = productString.match(/\((\$[\d.]+)\)/)
  if (priceMatch) {
    return {
      name: productString.replace(/\s*\(\$[\d.]+\)\s*$/, '').trim(),
      price: priceMatch[1],
    }
  }
  return { name: productString.trim() }
}

export function AlternativeComboCard({
  combo,
  budget,
  category,
  onSelectAltCombo,
}: AlternativeComboCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const navigate = useNavigateWithTransition()

  const handleViewCombo = () => {
    const comboResult = convertToComboResult(combo)
    onSelectAltCombo?.({ combo: comboResult, budget, category })
    navigate('/combo-detail')
  }

  return (
    <div className="w-full bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:border-[#a3ff12]/50 transition-all">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left"
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <h4 className="text-white text-sm font-bold flex-1 leading-tight">
            {combo.comboName}
          </h4>
          <div className="text-[#a3ff12] text-lg font-bold flex-shrink-0">
            ${parseFloat(combo.totalPrice).toFixed(2)}
          </div>
        </div>

        {/* Product Images */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {combo.products.slice(0, 3).map((productString, idx) => {
            const { name } = parseProduct(productString)
            return (
              <ProductImageThumbnail
                key={idx}
                productName={name}
              />
            )
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <span className="text-white text-xs font-medium">
            {combo.products.length} items
          </span>
          {isExpanded ? (
            <ChevronUp size={16} className="text-[#a3ff12]" />
          ) : (
            <ChevronDown size={16} className="text-[#a3ff12]" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-white/10 pt-4 space-y-3">
          {combo.products.map((productString, idx) => {
            const { name, price } = parseProduct(productString)
            return (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-white/5">
                  <ProductImageThumbnail
                    productName={name}
                    size="small"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-gray-300 text-xs flex-1">
                      {name}
                    </span>
                    {price && (
                      <span className="text-[#a3ff12] text-xs font-bold">
                        {price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          <button
            onClick={(e) => {
              e.stopPropagation()
              handleViewCombo()
            }}
            className="w-full mt-4 bg-[#a3ff12]/10 border border-[#a3ff12]/50 rounded-lg py-3 px-4 flex items-center justify-center gap-2 text-[#a3ff12] font-medium hover:bg-[#a3ff12]/20 transition-all"
          >
            <span>View Combo</span>
            <ShoppingBag size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

// Product Image Component
function ProductImageThumbnail({
  productName,
  size = 'normal',
}: {
  productName: string
  size?: 'normal' | 'small'
}) {
  const searchTerms = extractSearchTerms(productName, '')
  const { products } = useProductSearch({
    query: searchTerms,
    first: 1,
    filters: { available: true },
  })

  const product = products?.[0]
  const imageUrl = product ? getProductImage(product as any) : null
  const sizeClass =
    size === 'small' ? 'w-12 h-12' : 'w-full aspect-square'

  if (!imageUrl) {
    return (
      <div
        className={`${sizeClass} bg-white/5 rounded-lg flex items-center justify-center`}
      >
        <span className="text-gray-500 text-[8px] text-center px-1">
          No image
        </span>
      </div>
    )
  }

  return (
    <img
      src={imageUrl}
      alt={productName}
      className={`${sizeClass} object-cover rounded-lg`}
    />
  )
}
