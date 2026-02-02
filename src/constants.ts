import { Category, Subcategory } from './types';

export const CATEGORIES: Category[] = [
  { id: 'furniture', name: 'Furniture', icon: 'furniture', color: 'bg-yellow-100', hasSubcategories: true },
  { id: 'clothing', name: 'Clothing', icon: 'shirt', color: 'bg-blue-100', hasSubcategories: true },
  { id: 'kitchen', name: 'Kitchen', icon: 'chef-hat', color: 'bg-orange-100', hasSubcategories: true },
  { id: 'electronics', name: 'Electronics', icon: 'smartphone', color: 'bg-purple-100', hasSubcategories: true },
  { id: 'study', name: 'Study', icon: 'book', color: 'bg-indigo-100', hasSubcategories: true },
  { id: 'hobbies', name: 'Hobbies', icon: 'palette', color: 'bg-rose-100', hasSubcategories: true },
  { id: 'outdoor', name: 'Outdoor', icon: 'tent', color: 'bg-emerald-100', hasSubcategories: true },
  { id: 'decor', name: 'Decor', icon: 'flower', color: 'bg-pink-100', hasSubcategories: true },
];

export const SUBCATEGORIES: Subcategory[] = [
  // Furniture subcategories - By Room/Location
  { id: 'living-room', name: 'Living Room', categoryId: 'furniture' },
  { id: 'bedroom', name: 'Bedroom', categoryId: 'furniture' },
  { id: 'dining-room', name: 'Dining Room', categoryId: 'furniture' },
  { id: 'home-office', name: 'Home Office', categoryId: 'furniture' },
  { id: 'kitchen-furniture', name: 'Kitchen', categoryId: 'furniture' },
  { id: 'outdoor-garden', name: 'Outdoor/Garden', categoryId: 'furniture' },
  { id: 'kids-room', name: "Children's/Kids' Room", categoryId: 'furniture' },
  
  // Furniture subcategories - By Product Type
  { id: 'seating', name: 'Seating', categoryId: 'furniture' },
  { id: 'sleeping', name: 'Sleeping', categoryId: 'furniture' },
  { id: 'storage', name: 'Storage', categoryId: 'furniture' },
  { id: 'tables-desks', name: 'Tables & Desks', categoryId: 'furniture' },
  
  // Furniture subcategories - By Material
  { id: 'wood', name: 'Wood', categoryId: 'furniture' },
  { id: 'metal', name: 'Metal', categoryId: 'furniture' },
  { id: 'plastic', name: 'Plastic', categoryId: 'furniture' },
  { id: 'glass', name: 'Glass', categoryId: 'furniture' },
  { id: 'fabric', name: 'Fabric', categoryId: 'furniture' },
  { id: 'leather', name: 'Leather', categoryId: 'furniture' },
  { id: 'rattan-wicker', name: 'Rattan/Wicker', categoryId: 'furniture' },
  
  // Furniture subcategories - By Style/Design
  { id: 'modern', name: 'Modern', categoryId: 'furniture' },
  { id: 'contemporary', name: 'Contemporary', categoryId: 'furniture' },
  { id: 'traditional', name: 'Traditional', categoryId: 'furniture' },
  { id: 'rustic-farmhouse', name: 'Rustic/Farmhouse', categoryId: 'furniture' },
  { id: 'industrial', name: 'Industrial', categoryId: 'furniture' },
  { id: 'mid-century-modern', name: 'Mid-century Modern', categoryId: 'furniture' },
  { id: 'antique', name: 'Antique', categoryId: 'furniture' },
  { id: 'scandinavian', name: 'Scandinavian', categoryId: 'furniture' },
  { id: 'minimalist', name: 'Minimalist', categoryId: 'furniture' },
  
  // Furniture subcategories - By Feature/Functionality
  { id: 'multifunctional', name: 'Multifunctional', categoryId: 'furniture' },
  { id: 'space-saving', name: 'Space-saving/Foldable', categoryId: 'furniture' },
  { id: 'ergonomic', name: 'Ergonomic', categoryId: 'furniture' },
  { id: 'sustainable', name: 'Sustainable/Eco-friendly', categoryId: 'furniture' },
  { id: 'with-storage', name: 'With Storage', categoryId: 'furniture' },
  { id: 'smart-furniture', name: 'Smart Furniture', categoryId: 'furniture' },
  
  // Clothing subcategories - Primary Categories
  { id: 'mens-wear', name: "Men's Wear", categoryId: 'clothing' },
  { id: 'womens-wear', name: "Women's Wear", categoryId: 'clothing' },
  { id: 'kids-wear', name: "Kids' Wear", categoryId: 'clothing' },
  { id: 'unisex', name: 'Unisex/Gender-Neutral', categoryId: 'clothing' },
  
  // Product Type (Garment)
  { id: 'tops', name: 'Tops', categoryId: 'clothing' },
  { id: 'bottoms', name: 'Bottoms', categoryId: 'clothing' },
  { id: 'outerwear', name: 'Outerwear', categoryId: 'clothing' },
  { id: 'dresses', name: 'Dresses', categoryId: 'clothing' },
  { id: 'underwear-socks', name: 'Underwear & Socks', categoryId: 'clothing' },
  { id: 'swimwear', name: 'Swimwear', categoryId: 'clothing' },
  { id: 'activewear', name: 'Activewear/Sportswear', categoryId: 'clothing' },
  { id: 'pajamas-sleepwear', name: 'Pajamas & Sleepwear', categoryId: 'clothing' },
  { id: 'suits-tuxedos', name: 'Suits & Tuxedos', categoryId: 'clothing' },
  { id: 'accessories', name: 'Accessories', categoryId: 'clothing' },
  
  // Style/Occasion
  { id: 'casual-wear', name: 'Casual Wear', categoryId: 'clothing' },
  { id: 'formal-wear', name: 'Formal Wear', categoryId: 'clothing' },
  { id: 'business-workwear', name: 'Business/Workwear', categoryId: 'clothing' },
  { id: 'partywear', name: 'Partywear', categoryId: 'clothing' },
  { id: 'ethnic-traditional', name: 'Ethnic/Traditional Clothing', categoryId: 'clothing' },
  { id: 'streetwear', name: 'Streetwear', categoryId: 'clothing' },
  { id: 'vintage-retro', name: 'Vintage/Retro', categoryId: 'clothing' },
  { id: 'maternity-wear', name: 'Maternity Wear', categoryId: 'clothing' },
  { id: 'bridal-wear', name: 'Bridal Wear', categoryId: 'clothing' },
  { id: 'costumes', name: 'Costumes', categoryId: 'clothing' },
  
  // Kitchen subcategories - Appliances
  { id: 'major-appliances', name: 'Major Appliances', categoryId: 'kitchen' },
  { id: 'small-appliances', name: 'Small Appliances', categoryId: 'kitchen' },
  { id: 'appliance-accessories', name: 'Appliance Accessories & Parts', categoryId: 'kitchen' },
  
  // Kitchen subcategories - Cookware & Bakeware
  { id: 'pots-pans', name: 'Pots & Pans', categoryId: 'kitchen' },
  { id: 'baking-dishes', name: 'Baking Dishes & Sheets', categoryId: 'kitchen' },
  { id: 'cookware-sets', name: 'Cookware Sets', categoryId: 'kitchen' },
  { id: 'bakeware-accessories', name: 'Bakeware Accessories', categoryId: 'kitchen' },
  
  // Kitchen subcategories - Kitchen Tools & Utensils
  { id: 'knives-cutlery', name: 'Knives & Cutlery', categoryId: 'kitchen' },
  { id: 'spoons-forks-ladles', name: 'Spoons, Forks, & Ladles', categoryId: 'kitchen' },
  { id: 'prep-tools', name: 'Prep Tools', categoryId: 'kitchen' },
  { id: 'barware', name: 'Barware', categoryId: 'kitchen' },
  
  // Kitchen subcategories - Dinnerware & Serveware
  { id: 'plates-bowls', name: 'Plates & Bowls', categoryId: 'kitchen' },
  { id: 'serving-bowls', name: 'Serving Bowls & Casseroles', categoryId: 'kitchen' },
  { id: 'drinkware', name: 'Drinkware', categoryId: 'kitchen' },
  
  // Kitchen subcategories - Food Storage & Containers
  { id: 'storage-containers', name: 'Storage Containers & Jars', categoryId: 'kitchen' },
  { id: 'lunchboxes', name: 'Lunchboxes & Food Carriers', categoryId: 'kitchen' },
  { id: 'bags-wraps', name: 'Bags & Wraps', categoryId: 'kitchen' },
  
  // Kitchen subcategories - Kitchen Decor & Organization
  { id: 'storage-racks', name: 'Storage Racks & Shelves', categoryId: 'kitchen' },
  { id: 'cabinet-organizers', name: 'Cabinet & Drawer Organizers', categoryId: 'kitchen' },
  { id: 'kitchen-linens', name: 'Kitchen Linens', categoryId: 'kitchen' },
  { id: 'home-decor-items', name: 'Home Decor Items', categoryId: 'kitchen' },
  
  // Kitchen subcategories - Kitchen Remodeling & Design
  { id: 'remodeling-services', name: 'Remodeling Services', categoryId: 'kitchen' },
  { id: 'remodeling-materials', name: 'Remodeling Materials', categoryId: 'kitchen' },
  { id: 'design-styles', name: 'Design Styles', categoryId: 'kitchen' },
  
  // Electronics subcategories - Consumer Electronics
  { id: 'mobile-devices', name: 'Mobile Devices', categoryId: 'electronics' },
  { id: 'mobile-accessories', name: 'Mobile Accessories', categoryId: 'electronics' },
  { id: 'computers-peripherals', name: 'Computers & Peripherals', categoryId: 'electronics' },
  { id: 'tv-home-theater', name: 'TV & Home Theater', categoryId: 'electronics' },
  { id: 'audio-equipment', name: 'Audio Equipment', categoryId: 'electronics' },
  { id: 'gaming', name: 'Gaming', categoryId: 'electronics' },
  { id: 'cameras-photography', name: 'Cameras & Photography', categoryId: 'electronics' },
  { id: 'smart-home-security', name: 'Smart Home & Security', categoryId: 'electronics' },
  { id: 'home-appliances', name: 'Home Appliances', categoryId: 'electronics' },
  { id: 'car-vehicle-electronics', name: 'Car & Vehicle Electronics', categoryId: 'electronics' },
  
  // Electronic Components & Parts
  { id: 'circuit-protection', name: 'Circuit Protection', categoryId: 'electronics' },
  { id: 'connectors', name: 'Connectors', categoryId: 'electronics' },
  { id: 'semiconductors', name: 'Semiconductors', categoryId: 'electronics' },
  { id: 'passive-components', name: 'Passive Components', categoryId: 'electronics' },
  { id: 'kits-tools', name: 'Kits & Tools', categoryId: 'electronics' },
  { id: 'wire-cable', name: 'Wire & Cable', categoryId: 'electronics' },
  
  // Study subcategories - Research & Information Resources
  { id: 'buying-guides', name: 'Buying Guides', categoryId: 'study' },
  { id: 'how-to-tutorials', name: 'How-to/Tutorials', categoryId: 'study' },
  { id: 'comparison-tools', name: 'Comparison Tools/Guides', categoryId: 'study' },
  { id: 'customer-reviews', name: 'Customer Reviews & Ratings', categoryId: 'study' },
  { id: 'problem-solutions', name: 'Symptom/Problem-based Solutions', categoryId: 'study' },
  { id: 'use-case-categories', name: 'Use Case or Occasion-based Categories', categoryId: 'study' },
  { id: 'faqs-help', name: 'FAQs/Help Centers', categoryId: 'study' },
  { id: 'technical-specs', name: 'Technical Specifications/Data Sheets', categoryId: 'study' },
  { id: 'compatibility-info', name: 'Compatibility Information', categoryId: 'study' },
  { id: 'expert-advice', name: 'Expert Advice/Consultations', categoryId: 'study' },
  
  // Hobbies subcategories - Creative & Arts
  { id: 'arts-crafts', name: 'Arts & Crafts', categoryId: 'hobbies' },
  { id: 'photography-videography', name: 'Photography & Videography', categoryId: 'hobbies' },
  { id: 'musical-instruments', name: 'Musical Instruments', categoryId: 'hobbies' },
  { id: 'woodworking', name: 'Woodworking', categoryId: 'hobbies' },
  
  // Hobbies subcategories - Technology & Entertainment
  { id: 'gaming-hobbies', name: 'Gaming', categoryId: 'hobbies' },
  { id: 'electronics-gadgets', name: 'Electronics & Gadgets', categoryId: 'hobbies' },
  { id: 'reading-writing', name: 'Reading & Writing', categoryId: 'hobbies' },
  
  // Hobbies subcategories - Active & Outdoor Hobbies
  { id: 'fitness-exercise', name: 'Fitness & Exercise', categoryId: 'hobbies' },
  { id: 'hiking-camping-hobbies', name: 'Hiking & Camping', categoryId: 'hobbies' },
  { id: 'cycling-hobbies', name: 'Cycling', categoryId: 'hobbies' },
  { id: 'water-sports-hobbies', name: 'Water Sports', categoryId: 'hobbies' },
  
  // Hobbies subcategories - Home & Lifestyle Hobbies
  { id: 'cooking-baking', name: 'Cooking & Baking', categoryId: 'hobbies' },
  { id: 'gardening-landscaping', name: 'Gardening & Landscaping', categoryId: 'hobbies' },
  { id: 'pet-care', name: 'Pet Care', categoryId: 'hobbies' },
  
  // Hobbies subcategories - Collecting Hobbies
  { id: 'collecting', name: 'Collecting', categoryId: 'hobbies' },
  
  // Outdoor subcategories - Outdoor Activities/Sports
  { id: 'camping-backpacking', name: 'Camping & Backpacking', categoryId: 'outdoor' },
  { id: 'hiking-trekking', name: 'Hiking & Trekking', categoryId: 'outdoor' },
  { id: 'climbing-mountaineering', name: 'Climbing & Mountaineering', categoryId: 'outdoor' },
  { id: 'water-sports', name: 'Water Sports', categoryId: 'outdoor' },
  { id: 'cycling-outdoor', name: 'Cycling', categoryId: 'outdoor' },
  { id: 'snow-sports', name: 'Snow Sports', categoryId: 'outdoor' },
  { id: 'fishing-hunting', name: 'Fishing & Hunting', categoryId: 'outdoor' },
  { id: 'outdoor-fitness', name: 'Outdoor Fitness', categoryId: 'outdoor' },
  
  // Outdoor subcategories - Apparel & Footwear
  { id: 'outerwear-outdoor', name: 'Outerwear', categoryId: 'outdoor' },
  { id: 'clothing-layers', name: 'Clothing Layers', categoryId: 'outdoor' },
  { id: 'pants-trousers', name: 'Pants & Trousers', categoryId: 'outdoor' },
  { id: 'footwear-outdoor', name: 'Footwear', categoryId: 'outdoor' },
  { id: 'accessories-outdoor', name: 'Accessories', categoryId: 'outdoor' },
  
  // Outdoor subcategories - Equipment & Gear
  { id: 'shelter-sleeping', name: 'Shelter & Sleeping', categoryId: 'outdoor' },
  { id: 'packs-bags', name: 'Packs & Bags', categoryId: 'outdoor' },
  { id: 'navigation-electronics', name: 'Navigation & Electronics', categoryId: 'outdoor' },
  { id: 'camp-kitchen', name: 'Camp Kitchen & Hydration', categoryId: 'outdoor' },
  { id: 'tools-safety', name: 'Tools & Safety', categoryId: 'outdoor' },
  { id: 'outdoor-furniture', name: 'Outdoor Furniture', categoryId: 'outdoor' },
  
  // Outdoor subcategories - Home & Garden Outdoor
  { id: 'outdoor-furniture-home', name: 'Outdoor Furniture', categoryId: 'outdoor' },
  { id: 'plants-gardening', name: 'Plants & Gardening Supplies', categoryId: 'outdoor' },
  { id: 'home-accessories-outdoor', name: 'Home Accessories', categoryId: 'outdoor' },
  
  // Decor subcategories - Decor Styles
  { id: 'modern-decor', name: 'Modern', categoryId: 'decor' },
  { id: 'contemporary-decor', name: 'Contemporary', categoryId: 'decor' },
  { id: 'minimalist-decor', name: 'Minimalist', categoryId: 'decor' },
  { id: 'scandinavian-decor', name: 'Scandinavian', categoryId: 'decor' },
  { id: 'bohemian', name: 'Bohemian (Boho)', categoryId: 'decor' },
  { id: 'farmhouse-decor', name: 'Farmhouse / Modern Farmhouse', categoryId: 'decor' },
  { id: 'mid-century-modern-decor', name: 'Mid-Century Modern', categoryId: 'decor' },
  { id: 'industrial-decor', name: 'Industrial', categoryId: 'decor' },
  { id: 'art-deco', name: 'Art Deco', categoryId: 'decor' },
  { id: 'transitional', name: 'Transitional', categoryId: 'decor' },
  { id: 'coastal', name: 'Coastal', categoryId: 'decor' },
  
  // Decor subcategories - Product Types
  { id: 'wall-decor', name: 'Wall Decor', categoryId: 'decor' },
  { id: 'lighting-decor', name: 'Lighting', categoryId: 'decor' },
  { id: 'furniture-decor', name: 'Furniture', categoryId: 'decor' },
  { id: 'home-textiles', name: 'Home Textiles', categoryId: 'decor' },
  { id: 'decorative-accessories', name: 'Decorative Accessories', categoryId: 'decor' },
  { id: 'plants-flowers', name: 'Plants & Flowers', categoryId: 'decor' },
  
  // Decor subcategories - Room-Specific
  { id: 'living-room-decor', name: 'Living Room', categoryId: 'decor' },
  { id: 'bedroom-decor', name: 'Bedroom', categoryId: 'decor' },
  { id: 'kitchen-dining-decor', name: 'Kitchen & Dining', categoryId: 'decor' },
  { id: 'bathroom-decor', name: 'Bathroom', categoryId: 'decor' },
  { id: 'outdoor-decor', name: 'Outdoor', categoryId: 'decor' },
  { id: 'office-study-decor', name: 'Office / Study', categoryId: 'decor' },
  { id: 'kids-room-decor', name: "Kids' Room", categoryId: 'decor' },
];

export const COLORS = {
  primary: '#8E94F2',
  secondary: '#BBDEF0',
  accent: '#D1FFD7',
  text: '#1F2937',
  gradient: 'from-[#D1FFD7] to-[#BBDEF0]',
  btnGradient: 'from-[#8E94F2] to-[#A29BFE]',
};

