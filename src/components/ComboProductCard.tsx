import { useMemo } from 'react'
import { ProductCard, useProductSearch } from '@shopify/shop-minis-react'
import { extractSearchTerms, getProductPrice, getProductImage, normalizeProductForCard, isRelevantProductMatch } from './ProductSearchResult'

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
            const inRange = productPrice >= minPrice && productPrice <= maxPrice
            if (!inRange) return false
            return isRelevantProductMatch(product, productName, category, category)
        })

        // If we have products in price range, return the first one
        if (filtered.length > 0) {
            return filtered[0]
        }

        // Fallback: keep relevance strict, only relax price.
        for (const product of products) {
            if (!isRelevantProductMatch(product, productName, category, category)) {
                continue
            }
            const image = getProductImage(product as any)
            if (image) {
                return product
            }
        }

        // Last resort: first relevant product only (avoid unrelated accessories).
        return products.find((product) =>
            isRelevantProductMatch(product, productName, category, category)
        ) || null
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

    // Fallback when no product found in Shop — do not show this product (per requirement: only display products available in Shop)
    if (!matchedProduct) {
        return null
    }

    // Use SDK ProductCard and Image (via ProductCard) for product display per review feedback
    const product = normalizeProductForCard(matchedProduct)
    return (
        <div className={`relative w-full h-full min-h-0 ${className || ''}`}>
            {category && (
                <div className="absolute top-2 left-2 max-w-[calc(100%-1rem)] bg-black/80 text-white text-[11px] font-bold px-2 py-1 rounded-full uppercase tracking-wide z-10 border border-white/20 shadow-md leading-tight whitespace-normal break-words">
                    {category.split(' - ')[0].replace(/\//g, ' / ')}
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
