import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Aggiungiamo il campo status
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered'; // status possibile
}

interface OrderContextType {
  orders: OrderItem[];
  completedOrders: OrderItem[][]; // lista di ordini confermati (ogni elemento è uno "snapshot" del carrello)
  addToOrder: (item: Omit<OrderItem, 'status'>) => void; // non serve specificare lo status quando si aggiunge
  clearOrder: () => void;
  confirmOrder: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [completedOrders, setCompletedOrders] = useState<OrderItem[][]>([]);

  // Carica ordini e storico all'avvio
  useEffect(() => {
    const loadPersistedOrders = async () => {
      try {
        const [ordersJson, historyJson] = await Promise.all([
          AsyncStorage.getItem('orders'),
          AsyncStorage.getItem('ordersHistory'),
        ]);
        if (ordersJson) {
          const parsed: OrderItem[] = JSON.parse(ordersJson);
          // Validazione semplice di struttura
          if (Array.isArray(parsed)) {
            setOrders(parsed);
          }
        }
        if (historyJson) {
          const parsedHistory: OrderItem[][] = JSON.parse(historyJson);
          if (Array.isArray(parsedHistory)) {
            setCompletedOrders(parsedHistory);
          }
        }
      } catch (e) {
        console.error('Errore nel caricamento ordini da AsyncStorage', e);
      }
    };
    loadPersistedOrders();
  }, []);

  // Salva carrello su storage a ogni modifica
  useEffect(() => {
    const persistOrders = async () => {
      try {
        await AsyncStorage.setItem('orders', JSON.stringify(orders));
      } catch (e) {
        console.error('Errore nel salvataggio ordini su AsyncStorage', e);
      }
    };
    persistOrders();
  }, [orders]);

  // Salva storico su storage a ogni modifica
  useEffect(() => {
    const persistHistory = async () => {
      try {
        await AsyncStorage.setItem('ordersHistory', JSON.stringify(completedOrders));
      } catch (e) {
        console.error('Errore nel salvataggio storico ordini su AsyncStorage', e);
      }
    };
    persistHistory();
  }, [completedOrders]);

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

  const confirmOrder = async () => {
    if (!orders.length) return;
    // aggiunge lo snapshot corrente degli ordini nello storico
    setCompletedOrders((prev) => [...prev, orders.map((o) => ({ ...o }))]);
    // svuota il carrello
    setOrders([]);
  };

  return (
    <OrderContext.Provider value={{ orders, completedOrders, addToOrder, clearOrder, confirmOrder }}>
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
