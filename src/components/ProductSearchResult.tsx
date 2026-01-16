import { useMemo } from 'react'
import { ProductCard, useProductSearch } from '@shopify/shop-minis-react'

interface ProductSearchResultProps {
    productName: string
    allocatedPrice: number
    category: string
}

// Helper function to extract price from Shopify product
export function getProductPrice(product: any): number | null {
    // Helper to safely parse price
    const parsePrice = (value: any): number | null => {
        if (value === null || value === undefined) return null
        
        let num: number
        if (typeof value === 'string') {
            // Remove currency symbols and parse
            const cleaned = value.replace(/[^0-9.]/g, '')
            num = parseFloat(cleaned)
        } else if (typeof value === 'number') {
            num = value
        } else if (typeof value === 'object' && value.amount) {
            // Handle price object with amount property
            num = typeof value.amount === 'string' 
                ? parseFloat(value.amount.replace(/[^0-9.]/g, ''))
                : Number(value.amount)
        } else {
            return null
        }
        
        if (!isNaN(num) && isFinite(num) && num > 0) {
            return num
        }
        return null
    }

    // Try different possible price properties in order of preference
    // 1. Direct price property
    if (product.price !== undefined) {
        const price = parsePrice(product.price)
        if (price !== null) return price
    }

    // 2. priceRange.minVariantPrice
    if (product.priceRange?.minVariantPrice) {
        const price = parsePrice(product.priceRange.minVariantPrice)
        if (price !== null) return price
    }

    // 3. priceRange.maxVariantPrice (fallback)
    if (product.priceRange?.maxVariantPrice) {
        const price = parsePrice(product.priceRange.maxVariantPrice)
        if (price !== null) return price
    }

    // 4. First variant price
    if (product.variants && Array.isArray(product.variants) && product.variants.length > 0) {
        const variant = product.variants[0]
        if (variant.price !== undefined) {
            const price = parsePrice(variant.price)
            if (price !== null) return price
        }
        // Try variant priceV2
        if (variant.priceV2) {
            const price = parsePrice(variant.priceV2)
            if (price !== null) return price
        }
    }

    // 5. Check for priceV2 at root level
    if (product.priceV2) {
        const price = parsePrice(product.priceV2)
        if (price !== null) return price
    }

    return null
}

// Helper function to extract image URL from Shopify product with multiple fallback paths
export function getProductImage(product: any): string | null {
    if (!product) return null

    // Try different possible image properties in order of preference
    // 1. featuredImage.url
    if (product.featuredImage?.url) {
        return product.featuredImage.url
    }

    // 2. featuredMedia.preview.image.url
    if (product.featuredMedia?.preview?.image?.url) {
        return product.featuredMedia.preview.image.url
    }

    // 3. featuredMedia.image.url
    if (product.featuredMedia?.image?.url) {
        return product.featuredMedia.image.url
    }

    // 4. images array - first image
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
        const firstImage = product.images[0]
        if (firstImage?.url) return firstImage.url
        if (typeof firstImage === 'string') return firstImage
    }

    // 5. media array - first media with image
    if (product.media && Array.isArray(product.media) && product.media.length > 0) {
        const firstMedia = product.media[0]
        if (firstMedia?.preview?.image?.url) return firstMedia.preview.image.url
        if (firstMedia?.image?.url) return firstMedia.image.url
    }

    // 6. Direct image property
    if (product.image?.url) {
        return product.image.url
    }
    if (typeof product.image === 'string') {
        return product.image
    }

    // 7. First variant image
    if (product.variants && Array.isArray(product.variants) && product.variants.length > 0) {
        const firstVariant = product.variants[0]
        if (firstVariant?.image?.url) return firstVariant.image.url
        if (firstVariant?.featuredImage?.url) return firstVariant.featuredImage.url
    }

    return null
}

// Extract specific search terms focusing on main product keyword and key modifiers
export function extractSearchTerms(productName: string, category: string): string {
    // Main product keywords (the core product type)
    const mainKeywords = ['watch', 'strap', 'case', 'tool', 'cloth', 'roll', 'bag', 'box', 'stand', 'holder']
    
    // Generic words to skip (materials, generic adjectives, etc.)
    const skipWords = [
        'premium', 'luxury', 'high', 'quality', 'full', 'grain', 'genuine',
        'slim', 'fit', 'stretch', 'performance', 'modern', 'classic', 'vintage',
        'organic', 'natural', 'soft', 'lightweight', 'heavyweight', 'durable',
        'the', 'a', 'an', 'and', 'or', 'for', 'with', 'pack', '3-pack', '2-pack',
        'cotton', 'modal', 'wool', 'linen', 'silk', 'polyester', 'blend',
        '100%', 'button-down', 'button', 'down', 'up', 'neck', 'v-neck', 'crew',
        // Generic materials that are too broad
        'stainless', 'steel', 'nylon', 'leather', 'top', 'single', 'grain',
        'ballistic', 'dive', 'nato', 'microfiber', 'spring', 'bar'
    ]

    // Clean the product name
    const cleanName = productName
        .replace(/[()]/g, '') // Remove parentheses
        .replace(/[0-9]/g, '') // Remove numbers
        .replace(/-/g, ' ') // Replace hyphens with spaces

    // Get all words
    const allWords = cleanName
        .split(' ')
        .map(w => w.trim().toLowerCase())
        .filter(w => w.length > 2) // Skip short words

    // Find the main keyword position (usually the last meaningful word)
    let mainKeywordIndex = -1
    for (let i = allWords.length - 1; i >= 0; i--) {
        if (mainKeywords.includes(allWords[i])) {
            mainKeywordIndex = i
            break
        }
    }

    // If no main keyword found, use the last word
    if (mainKeywordIndex === -1) {
        mainKeywordIndex = allWords.length - 1
    }

    // Get the main keyword
    const mainKeyword = allWords[mainKeywordIndex]

    // Check for compound keywords (e.g., "watch strap" - if "watch" is before "strap")
    let searchTerms: string[] = [mainKeyword]
    
    // Look for compound terms like "watch strap" or "travel case"
    if (mainKeywordIndex > 0) {
        const prevWord = allWords[mainKeywordIndex - 1]
        // If previous word is also a main keyword or a meaningful modifier, include it
        if (mainKeywords.includes(prevWord) || !skipWords.includes(prevWord)) {
            searchTerms.unshift(prevWord)
        }
    }

    // Add 1 meaningful modifier before the main keyword(s) if available
    // Look backwards from before the main keyword
    for (let i = mainKeywordIndex - searchTerms.length - 1; i >= 0 && searchTerms.length < 3; i--) {
        const word = allWords[i]
        if (!skipWords.includes(word) && word.length > 2) {
            // Prepend meaningful modifiers
            searchTerms.unshift(word)
            break // Only take one modifier before the main keyword
        }
    }

    const searchTerm = searchTerms.join(' ')
    
    return searchTerm || category.split(' - ').pop()?.toLowerCase() || 'product'
}

export function ProductSearchResult({ productName, allocatedPrice, category }: ProductSearchResultProps) {
    // Extract simple search terms
    const searchTerms = extractSearchTerms(productName, category)

    const { products, loading } = useProductSearch({
        query: searchTerms,
        first: 10, // Get more products to filter by price
        filters: {
            available: true,
        },
    })

    // Filter products by price range (±40% of allocated price from API)
    const filteredProducts = useMemo(() => {
        if (!products || products.length === 0) return []

        // Use the exact allocated price from API for this specific product
        const minPrice = allocatedPrice * 0.6 // 60% of allocated price (40% below)
        const maxPrice = allocatedPrice * 1.4 // 140% of allocated price (40% above)

        const filtered = products.filter((product) => {
            const productPrice = getProductPrice(product as any)
            if (productPrice === null || typeof productPrice !== 'number') {
                return false
            }
            const inRange = productPrice >= minPrice && productPrice <= maxPrice
            return inRange
        })

        return filtered.slice(0, 2) // Return top 2 matches
    }, [products, allocatedPrice, productName])

    if (loading) {
        return (
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3">
                    <div className="animate-spin w-5 h-5 border-2 border-[#a3ff12] border-t-transparent rounded-full" />
                    <span className="text-gray-400 text-sm">Searching: {searchTerms}...</span>
                </div>
            </div>
        )
    }

    if (!products || products.length === 0) {
        return (
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">{category}</p>
                <p className="text-sm text-gray-300 font-medium">{productName}</p>
                <p className="text-xs text-gray-500 mt-1">No matching products found in Shop</p>
                <p className="text-[#a3ff12] text-sm font-bold mt-2">${allocatedPrice.toFixed(2)}</p>
            </div>
        )
    }

    if (filteredProducts.length === 0) {
        return (
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">{category}</p>
                <p className="text-sm text-gray-300 font-medium">{productName}</p>
                <p className="text-xs text-gray-500 mt-1">No products found in price range (${(allocatedPrice * 0.6).toFixed(2)} - ${(allocatedPrice * 1.4).toFixed(2)})</p>
                <p className="text-[#a3ff12] text-sm font-bold mt-2">Budget from API: ${allocatedPrice.toFixed(2)}</p>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            <div className="px-1">
                <p className="text-xs text-[#a3ff12] uppercase tracking-wider font-bold mb-1">{category}</p>
                <p className="text-xs text-gray-400">Recommended: {productName}</p>
                <p className="text-xs text-gray-500 mt-1">Budget from API: <span className="text-[#a3ff12] font-bold">${allocatedPrice.toFixed(2)}</span></p>
                <p className="text-xs text-gray-500">Price range: ${(allocatedPrice * 0.6).toFixed(2)} - ${(allocatedPrice * 1.4).toFixed(2)}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        variant="compact"
                        touchable={true}
                    />
                ))}
            </div>
        </div>
    )
}
