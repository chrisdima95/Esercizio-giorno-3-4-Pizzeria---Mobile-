import React, { createContext, ReactNode, useContext, useState } from 'react';

// ✅ Aggiungiamo il campo status
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered'; // status possibile
}

interface OrderContextType {
  orders: OrderItem[];
  addToOrder: (item: Omit<OrderItem, 'status'>) => void; // non serve specificare lo status quando si aggiunge
  clearOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<OrderItem[]>([]);

  const addToOrder = (item: Omit<OrderItem, 'status'>) => {
    setOrders((prev) => {
      const existing = prev.find((o) => o.id === item.id);
      if (existing) {
        // Se esiste già, aumenta solo la quantità
        return prev.map((o) =>
          o.id === item.id
            ? { ...o, quantity: o.quantity + item.quantity }
            : o
        );
      }
      // Aggiunge il nuovo ordine con status 'pending'
      return [...prev, { ...item, status: 'pending' }];
    });
  };

  const clearOrder = () => setOrders([]);

  return (
    <OrderContext.Provider value={{ orders, addToOrder, clearOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
