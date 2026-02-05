import type { Category } from '../types'

export interface BudgetChip {
  id: 'tight' | 'mid' | 'premium'
  label: string
  val: number
}

export interface CategoryBudgetConfig {
  budgetChips: BudgetChip[]
  inputPlaceholder: string
  suggestedPrompts: string[]
}

export const categoryBudgetConfig: Record<Category, CategoryBudgetConfig> = {
  All: {
    budgetChips: [
      { id: 'tight', label: 'Tight', val: 75 },
      { id: 'mid', label: 'Mid-Range', val: 150 },
      { id: 'premium', label: 'Premium', val: 300 },
    ],
    inputPlaceholder: 'e.g., A mix of products from different categories...',
    suggestedPrompts: [
      'gift bundle across categories',
      'variety pack for myself',
      'mixed category surprise box',
      'essentials from multiple categories',
    ],
  },
  Women: {
    budgetChips: [
      { id: 'tight', label: 'Tight', val: 75 },
      { id: 'mid', label: 'Mid-Range', val: 150 },
      { id: 'premium', label: 'Premium', val: 300 },
    ],
    inputPlaceholder: 'e.g., A casual dress and comfortable sandals...',
    suggestedPrompts: [
      'workwear essentials',
      'date night outfit',
      'weekend casual look',
      'gift bundle for her',
    ],
  },
  Men: {
    budgetChips: [
      { id: 'tight', label: 'Tight', val: 75 },
      { id: 'mid', label: 'Mid-Range', val: 150 },
      { id: 'premium', label: 'Premium', val: 300 },
    ],
    inputPlaceholder: 'e.g., A smart shirt and chinos for the office...',
    suggestedPrompts: [
      'back to school outfit',
      'date night look',
      'workwear essentials',
      'gift bundle for a sneakerhead',
    ],
  },
  Beauty: {
    budgetChips: [
      { id: 'tight', label: 'Tight', val: 40 },
      { id: 'mid', label: 'Mid-Range', val: 80 },
      { id: 'premium', label: 'Premium', val: 150 },
    ],
    inputPlaceholder: 'e.g., Lipstick, mascara, and a setting spray...',
    suggestedPrompts: [
      'daily makeup routine',
      'gift set for her',
      'skincare and makeup combo',
      'travel beauty kit',
    ],
  },
  'Food & drinks': {
    budgetChips: [
      { id: 'tight', label: 'Tight', val: 30 },
      { id: 'mid', label: 'Mid-Range', val: 60 },
      { id: 'premium', label: 'Premium', val: 120 },
    ],
    inputPlaceholder: 'e.g., Coffee beans, snacks, and a reusable bottle...',
    suggestedPrompts: [
      'morning coffee setup',
      'healthy snack bundle',
      'gift basket for foodies',
      'party drinks and nibbles',
    ],
  },
  'Baby & toddler': {
    budgetChips: [
      { id: 'tight', label: 'Tight', val: 50 },
      { id: 'mid', label: 'Mid-Range', val: 100 },
      { id: 'premium', label: 'Premium', val: 200 },
    ],
    inputPlaceholder: 'e.g., Onesies, wipes, and a soft toy...',
    suggestedPrompts: [
      'newborn essentials',
      'toddler playtime bundle',
      'gift for new parents',
      'nursery basics',
    ],
  },
  Home: {
    budgetChips: [
      { id: 'tight', label: 'Tight', val: 100 },
      { id: 'mid', label: 'Mid-Range', val: 200 },
      { id: 'premium', label: 'Premium', val: 400 },
    ],
    inputPlaceholder: 'e.g., Cozy living room accents and lighting...',
    suggestedPrompts: [
      'home office essentials',
      'cozy bedroom refresh',
      'kitchen and dining',
      'gift bundle for new homeowners',
    ],
  },
  'Fitness & nutrition': {
    budgetChips: [
      { id: 'tight', label: 'Tight', val: 50 },
      { id: 'mid', label: 'Mid-Range', val: 100 },
      { id: 'premium', label: 'Premium', val: 200 },
    ],
    inputPlaceholder: 'e.g., Resistance bands, protein powder, and a water bottle...',
    suggestedPrompts: [
      'home workout kit',
      'post-workout nutrition',
      'gym bag essentials',
      'gift for a fitness enthusiast',
    ],
  },
  Accessories: {
    budgetChips: [
      { id: 'tight', label: 'Tight', val: 40 },
      { id: 'mid', label: 'Mid-Range', val: 80 },
      { id: 'premium', label: 'Premium', val: 150 },
    ],
    inputPlaceholder: 'e.g., Sunglasses, a watch, and a belt...',
    suggestedPrompts: [
      'everyday carry essentials',
      'gift bundle for him',
      'summer accessories',
      'work and weekend combo',
    ],
  },
  'Pet supplies': {
    budgetChips: [
      { id: 'tight', label: 'Tight', val: 30 },
      { id: 'mid', label: 'Mid-Range', val: 60 },
      { id: 'premium', label: 'Premium', val: 120 },
    ],
    inputPlaceholder: 'e.g., Food, treats, and a new toy...',
    suggestedPrompts: [
      'new pet starter kit',
      'dog walking bundle',
      'cat comfort pack',
      'gift for a pet lover',
    ],
  },
  'Toys & games': {
    budgetChips: [
      { id: 'tight', label: 'Tight', val: 40 },
      { id: 'mid', label: 'Mid-Range', val: 80 },
      { id: 'premium', label: 'Premium', val: 150 },
    ],
    inputPlaceholder: 'e.g., Board game, puzzle, and a plush...',
    suggestedPrompts: [
      'family game night bundle',
      'kids birthday gift',
      'puzzle and craft combo',
      'gift for a gamer',
    ],
  },
  Electronics: {
    budgetChips: [
      { id: 'tight', label: 'Tight', val: 100 },
      { id: 'mid', label: 'Mid-Range', val: 250 },
      { id: 'premium', label: 'Premium', val: 500 },
    ],
    inputPlaceholder: 'e.g., A gaming keyboard and a mouse with high DPI...',
    suggestedPrompts: [
      'gaming setup',
      'work from home tech',
      'headphones and speaker',
      'gift bundle for a techie',
    ],
  },
  'Arts & crafts': {
    budgetChips: [
      { id: 'tight', label: 'Tight', val: 35 },
      { id: 'mid', label: 'Mid-Range', val: 70 },
      { id: 'premium', label: 'Premium', val: 140 },
    ],
    inputPlaceholder: 'e.g., Markers, sketchbook, and glue...',
    suggestedPrompts: [
      'beginner art kit',
      'kids craft bundle',
      'gift for an artist',
      'scrapbooking essentials',
    ],
  },
  'Luggage & bags': {
    budgetChips: [
      { id: 'tight', label: 'Tight', val: 60 },
      { id: 'mid', label: 'Mid-Range', val: 120 },
      { id: 'premium', label: 'Premium', val: 250 },
    ],
    inputPlaceholder: 'e.g., Carry-on bag and a toiletry pouch...',
    suggestedPrompts: [
      'weekend trip combo',
      'work and travel bundle',
      'gift for a frequent traveler',
      'daily carry essentials',
    ],
  },
  'Sporting goods': {
    budgetChips: [
      { id: 'tight', label: 'Tight', val: 50 },
      { id: 'mid', label: 'Mid-Range', val: 100 },
      { id: 'premium', label: 'Premium', val: 200 },
    ],
    inputPlaceholder: 'e.g., Tennis racket, balls, and a grip...',
    suggestedPrompts: [
      'running essentials',
      'outdoor adventure kit',
      'gift for a sports fan',
      'team sports bundle',
    ],
  },
}
