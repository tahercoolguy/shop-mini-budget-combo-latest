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

export type Category =
  | 'All'
  | 'Women'
  | 'Men'
  | 'Beauty'
  | 'Food & drinks'
  | 'Baby & toddler'
  | 'Home'
  | 'Fitness & nutrition'
  | 'Accessories'
  | 'Pet supplies'
  | 'Toys & games'
  | 'Electronics'
  | 'Arts & crafts'
  | 'Luggage & bags'
  | 'Sporting goods'

export interface SavedCombo {
  id: string
  combo: ComboResult
  budget: number
  category: Category
  savedAt: string
}
