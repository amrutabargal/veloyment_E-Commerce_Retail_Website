import { Product } from '../context/AppContext';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    category: 'Electronics',
    rating: 4.5,
    reviews: 1203,
    description: 'Experience premium sound quality with active noise cancellation and 30-hour battery life.',
    stock: 'in-stock',
    stockCount: 45,
    brand: 'AudioTech',
    variants: {
      colors: ['Black', 'Silver', 'Rose Gold']
    },
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g',
      'Charging': 'USB-C Fast Charging'
    }
  },
  {
    id: '2',
    name: 'Smart Watch Series 7',
    price: 449.99,
    originalPrice: 599.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    category: 'Electronics',
    rating: 4.8,
    reviews: 2456,
    description: 'Stay connected with health tracking, GPS, and cellular connectivity.',
    stock: 'in-stock',
    stockCount: 32,
    brand: 'TechPro',
    variants: {
      sizes: ['40mm', '44mm'],
      colors: ['Space Gray', 'Silver', 'Gold']
    },
    specifications: {
      'Display': 'OLED Retina',
      'Battery': 'Up to 18 hours',
      'Water Resistance': '50m',
      'Sensors': 'Heart Rate, GPS, Accelerometer'
    }
  },
  {
    id: '3',
    name: 'Designer Leather Handbag',
    price: 189.99,
    originalPrice: 299.99,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
    category: 'Fashion',
    rating: 4.6,
    reviews: 856,
    description: 'Premium genuine leather handbag with elegant design and multiple compartments.',
    stock: 'limited',
    stockCount: 8,
    brand: 'LuxeMode',
    variants: {
      colors: ['Black', 'Brown', 'Burgundy']
    },
    specifications: {
      'Material': '100% Genuine Leather',
      'Dimensions': '35 x 28 x 12 cm',
      'Strap': 'Adjustable',
      'Closure': 'Magnetic Snap'
    }
  },
  {
    id: '4',
    name: 'Casual Cotton T-Shirt',
    price: 29.99,
    originalPrice: 49.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    category: 'Fashion',
    rating: 4.3,
    reviews: 543,
    description: 'Comfortable 100% organic cotton t-shirt with modern fit.',
    stock: 'in-stock',
    stockCount: 156,
    brand: 'UrbanWear',
    variants: {
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Black', 'Navy', 'Gray']
    },
    specifications: {
      'Material': '100% Organic Cotton',
      'Fit': 'Regular',
      'Care': 'Machine Washable',
      'Origin': 'Made in USA'
    }
  },
  {
    id: '5',
    name: 'Modern Coffee Maker',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80',
    category: 'Home',
    rating: 4.7,
    reviews: 1834,
    description: 'Programmable coffee maker with thermal carafe and brew strength control.',
    stock: 'in-stock',
    stockCount: 67,
    brand: 'BrewMaster',
    specifications: {
      'Capacity': '12 cups',
      'Features': 'Programmable, Auto-shutoff',
      'Material': 'Stainless Steel',
      'Warranty': '2 years'
    }
  },
  {
    id: '6',
    name: 'Luxury Scented Candle Set',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1602874801006-e24f8e476bf0?w=800&q=80',
    category: 'Home',
    rating: 4.9,
    reviews: 678,
    description: 'Set of 3 premium soy wax candles with essential oils.',
    stock: 'in-stock',
    stockCount: 94,
    brand: 'AromaLux',
    specifications: {
      'Material': 'Soy Wax',
      'Burn Time': '40 hours each',
      'Scents': 'Lavender, Vanilla, Sandalwood',
      'Size': '8 oz each'
    }
  },
  {
    id: '7',
    name: 'Organic Face Serum',
    price: 79.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
    category: 'Beauty',
    rating: 4.8,
    reviews: 2103,
    description: 'Anti-aging serum with vitamin C and hyaluronic acid.',
    stock: 'in-stock',
    stockCount: 124,
    brand: 'GlowNaturals',
    specifications: {
      'Size': '30ml',
      'Key Ingredients': 'Vitamin C, Hyaluronic Acid',
      'Skin Type': 'All skin types',
      'Cruelty-Free': 'Yes'
    }
  },
  {
    id: '8',
    name: 'Professional Makeup Brush Set',
    price: 69.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80',
    category: 'Beauty',
    rating: 4.6,
    reviews: 891,
    description: '12-piece professional makeup brush set with premium synthetic bristles.',
    stock: 'in-stock',
    stockCount: 53,
    brand: 'BeautyPro',
    specifications: {
      'Pieces': '12 brushes',
      'Material': 'Synthetic bristles',
      'Handle': 'Bamboo',
      'Includes': 'Travel case'
    }
  },
  {
    id: '9',
    name: 'Organic Green Tea (100 bags)',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80',
    category: 'Grocery',
    rating: 4.7,
    reviews: 1456,
    description: 'Premium organic green tea with antioxidants.',
    stock: 'in-stock',
    stockCount: 234,
    brand: 'TeaHarmony',
    specifications: {
      'Quantity': '100 tea bags',
      'Origin': 'Japan',
      'Organic': 'USDA Certified',
      'Caffeine': 'Medium'
    }
  },
  {
    id: '10',
    name: '4K Ultra HD Smart TV 55"',
    price: 799.99,
    originalPrice: 1199.99,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80',
    category: 'Electronics',
    rating: 4.7,
    reviews: 3421,
    description: '55-inch 4K UHD Smart TV with HDR and built-in streaming apps.',
    stock: 'limited',
    stockCount: 12,
    brand: 'VisionTech',
    specifications: {
      'Screen Size': '55 inches',
      'Resolution': '4K UHD (3840 x 2160)',
      'HDR': 'Yes',
      'Smart Features': 'Netflix, Prime, Disney+'
    }
  },
  {
    id: '11',
    name: 'Wireless Gaming Mouse',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
    category: 'Electronics',
    rating: 4.5,
    reviews: 967,
    description: 'High-precision wireless gaming mouse with RGB lighting.',
    stock: 'in-stock',
    stockCount: 78,
    brand: 'GameGear',
    specifications: {
      'DPI': 'Up to 16000',
      'Buttons': '8 programmable',
      'Battery': '70 hours',
      'Connection': 'Wireless 2.4GHz'
    }
  },
  {
    id: '12',
    name: 'Yoga Mat Premium',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80',
    category: 'Fashion',
    rating: 4.8,
    reviews: 723,
    description: 'Non-slip eco-friendly yoga mat with carrying strap.',
    stock: 'in-stock',
    stockCount: 145,
    brand: 'ZenFit',
    variants: {
      colors: ['Purple', 'Blue', 'Pink', 'Black']
    },
    specifications: {
      'Thickness': '6mm',
      'Material': 'TPE (Eco-friendly)',
      'Size': '183 x 61 cm',
      'Non-slip': 'Yes'
    }
  }
];
