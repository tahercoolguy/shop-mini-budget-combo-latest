const API_ENDPOINT = 'https://shorts.multiplewords.com/mwvideos/api/product_combo_generator'

export interface ApiProduct {
    product_name: string
    category: string
    allocated_price: string
    description: string
    features: string[]
    why_included: string
}

export interface AlternativeCombo {
    combo_name: string
    products: string[]
    total_price: string
}

export interface ApiComboResult {
    search_intent: string
    total_budget: string
    combo_name: string
    products: ApiProduct[]
    total_estimated_price: string
    budget_utilization: string
    combo_description: string
    use_cases: string[]
    alternative_combos: AlternativeCombo[]
    recommendations: string
}

export interface ApiResponse {
    status: number
    result: ApiComboResult
}

export const generateProductCombo = async (
    searchTerm: string,
    budget: number
): Promise<ApiResponse> => {
    const formData = new FormData()
    formData.append('search_term', searchTerm)
    formData.append('budget', budget.toString())

    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: formData,
    })

    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
    }

    const data: ApiResponse = await response.json()

    if (data.status !== 1) {
        throw new Error('API returned an error status')
    }

    return data
}
