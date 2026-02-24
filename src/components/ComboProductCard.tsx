import { useMemo } from 'react'
import { ProductCard, useProductSearch } from '@shopify/shop-minis-react'
import { extractSearchTerms, getProductPrice, getProductImage, normalizeProductForCard } from './ProductSearchResult'

interface ComboProductCardProps {
    productName: string
    allocatedPrice: number
    category: string
    className?: string
    onClick?: () => void
}

export function ComboProductCard({ productName, allocatedPrice, category, className, onClick }: ComboProductCardProps) {
    const searchTerms = extractSearchTerms(productName, category)

    const { products, loading } = useProductSearch({
        query: searchTerms,
        first: 10,
        filters: {
            available: true,
        },
    })

    // Filter products by price range and get the first match
    // If no products match price range, fall back to first product with an image
    const matchedProduct = useMemo(() => {
        if (!products || products.length === 0) return null

        const minPrice = allocatedPrice * 0.6
        const maxPrice = allocatedPrice * 1.4

        // First, try to find products within price range
        const filtered = products.filter((product) => {
            const productPrice = getProductPrice(product as any)
            if (productPrice === null || typeof productPrice !== 'number') {
                return false
            }
            return productPrice >= minPrice && productPrice <= maxPrice
        })

        // If we have products in price range, return the first one
        if (filtered.length > 0) {
            return filtered[0]
        }

        // Fallback: return first product that has an image, even if price doesn't match
        for (const product of products) {
            const image = getProductImage(product as any)
            if (image) {
                return product
            }
        }

        // Last resort: return first product regardless
        return products[0] || null
    }, [products, allocatedPrice])

    const handleClick = () => {
        if (onClick) {
            onClick()
        }
    }

    if (loading) {
        return (
            <div className={`relative rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-2.5 flex items-center justify-center w-full h-full ${className || ''}`}>
                <div className="animate-spin w-5 h-5 border-2 border-[#a3ff12] border-t-transparent rounded-full" />
            </div>
        )
    }

    // Fallback when no product found - show API data (no product image; SDK Image/ProductCard used only for real products)
    if (!matchedProduct) {
        const displayPrice = allocatedPrice
        return (
            <div className={`relative rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-2.5 flex flex-col overflow-hidden group hover:border-[#a3ff12]/50 transition-all w-full h-full ${className || ''}`}>
                {category && (
                    <div className="absolute top-2 right-2 bg-[#a3ff12]/20 text-[#a3ff12] text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider z-10 backdrop-blur-sm">
                        {category.split(' - ')[0]}
                    </div>
                )}
                <div className="flex-1 w-full min-h-0 mb-1.5 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden">
                    <span className="text-gray-500 text-[10px] text-center px-2">No image</span>
                </div>
                <div className="flex flex-col gap-1 flex-shrink-0">
                    <h4 className="text-white text-[10px] font-bold leading-tight line-clamp-2">
                        {productName}
                    </h4>
                    <span className="text-[#a3ff12] text-xs font-bold">
                        ${displayPrice.toFixed(2)}
                    </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#a3ff12]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
        )
    }

    // Use SDK ProductCard and Image (via ProductCard) for product display per review feedback
    const product = normalizeProductForCard(matchedProduct)
    return (
        <div className={`relative w-full h-full min-h-0 ${className || ''}`}>
            {category && (
                <div className="absolute top-2 right-2 bg-[#a3ff12]/20 text-[#a3ff12] text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider z-10 backdrop-blur-sm">
                    {category.split(' - ')[0]}
                </div>
            )}
            <ProductCard
                product={product}
                variant="compact"
                touchable={!!onClick}
                onProductClick={onClick ? handleClick : undefined}
                reviewsDisabled
                favoriteButtonDisabled
            />
        </div>
    )
}
