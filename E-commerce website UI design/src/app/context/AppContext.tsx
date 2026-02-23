import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const RECENTLY_VIEWED_KEY = 'shop_recently_viewed';
const MAX_RECENTLY_VIEWED = 6;

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  stock: 'in-stock' | 'limited' | 'out-of-stock';
  stockCount: number;
  brand: string;
  variants?: {
    sizes?: string[];
    colors?: string[];
  };
  specifications?: { [key: string]: string };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: CartItem[];
  trackingNumber?: string;
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  user: { name: string; email: string } | null;
  setUser: (user: { name: string; email: string } | null) => void;
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Load recently viewed from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRecentlyViewed(parsed.slice(0, MAX_RECENTLY_VIEWED));
        }
      }
    } catch (_) {}
  }, []);

  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, MAX_RECENTLY_VIEWED);
      try {
        localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });
  };
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-2024-001',
      date: '2026-02-05',
      status: 'shipped',
      total: 1299.99,
      items: [],
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-2024-002',
      date: '2026-01-28',
      status: 'delivered',
      total: 599.99,
      items: [],
    }
  ]);
  const [user, setUser] = useState<{ name: string; email: string } | null>({
    name: 'John Doe',
    email: 'john.doe@example.com'
  });

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => 
        i.product.id === item.product.id && 
        i.selectedSize === item.selectedSize && 
        i.selectedColor === item.selectedColor
      );
      if (existing) {
        return prev.map(i => 
          i.product.id === item.product.id && 
          i.selectedSize === item.selectedSize && 
          i.selectedColor === item.selectedColor
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prev => 
      prev.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToWishlist = (product: Product) => {
    setWishlist(prev => {
      if (prev.find(p => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(p => p.id !== productId));
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      wishlist,
      addToWishlist,
      removeFromWishlist,
      orders,
      addOrder,
      user,
      setUser,
      recentlyViewed,
      addRecentlyViewed,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
