export interface Product {
  name: string
  price: number
  description: string
  features?: string[]
  category?: string
  whyIncluded?: string
}

export interface AlternativeCombo {
  comboName: string
  products: string[]
  totalPrice: string
}

export interface ComboResult {
  items: Product[]
  totalPrice: number
  savingsPercentage: number
  explanation: string
  comboName?: string
  searchIntent?: string
  budgetUtilization?: string
  useCases?: string[]
  recommendations?: string
  alternativeCombos?: AlternativeCombo[]
}

export type Category = 'Electronics' | 'Fashion' | 'Home Decor' | 'Skincare'

export interface SavedCombo {
  id: string
  combo: ComboResult
  budget: number
  category: Category
  savedAt: string
}
