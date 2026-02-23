import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RealTimeContextType {
  liveViewers: number;
  recentActivity: string[];
}

const RealTimeContext = createContext<RealTimeContextType | undefined>(undefined);

export function RealTimeProvider({ children }: { children: ReactNode }) {
  const [liveViewers, setLiveViewers] = useState(24);
  const [recentActivity, setRecentActivity] = useState<string[]>([
    'Someone from Mumbai just ordered Wireless Headphones',
    'Ravi from Pune added Smart Watch to cart',
    'Priya from Bangalore is viewing Fashion deals',
    'A new customer signed up - welcome!',
    'Flash sale: 3 more items sold in last 5 min',
  ]);

  // Simulate real-time live viewers count (fluctuates naturally)
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(8, Math.min(42, prev + change));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Rotate recent activity messages
  useEffect(() => {
    const activities = [
      'Someone from Mumbai just ordered Wireless Headphones',
      'Ravi from Pune added Smart Watch to cart',
      'Priya from Bangalore is viewing Fashion deals',
      'A new customer signed up - welcome!',
      'Flash sale: 3 more items sold in last 5 min',
      'Customer reviewed Organic Face Serum - 5 stars!',
      'Order delivered successfully to Chennai',
      'New arrival: Best Sellers collection updated',
    ];
    const interval = setInterval(() => {
      setRecentActivity(prev => {
        const shuffled = [...activities].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 5);
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <RealTimeContext.Provider value={{ liveViewers, recentActivity }}>
      {children}
    </RealTimeContext.Provider>
  );
}

export function useRealTime() {
  const context = useContext(RealTimeContext);
  if (!context) {
    throw new Error('useRealTime must be used within RealTimeProvider');
  }
  return context;
}
