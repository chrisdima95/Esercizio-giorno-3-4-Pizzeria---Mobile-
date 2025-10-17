import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, FlatList, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

interface Order {
  id: string;
  pizzaName: string;
  price: string;
  quantity: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
}

const mockOrders: Order[] = [
  {
    id: '1',
    pizzaName: 'Pizza Margherita',
    price: '8.50',
    quantity: 1,
    status: 'preparing'
  },
  {
    id: '2',
    pizzaName: 'Pizza Quattro Stagioni',
    price: '12.00',
    quantity: 2,
    status: 'pending'
  },
  {
    id: '3',
    pizzaName: 'Pizza Diavola',
    price: '10.50',
    quantity: 1,
    status: 'ready'
  }
];

export default function OrdiniScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const cardBg = colorScheme === 'dark' ? '#1E1E1E' : 'white';
  const mutedText = colorScheme === 'dark' ? '#9BA1A6' : '#666';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#FF9500';
      case 'preparing': return '#007AFF';
      case 'ready': return '#34C759';
      case 'delivered': return '#8E8E93';
      default: return '#8E8E93';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'In attesa';
      case 'preparing': return 'In preparazione';
      case 'ready': return 'Pronto';
      case 'delivered': return 'Consegnato';
      default: return 'Sconosciuto';
    }
  };

  const handleOrderPress = (order: Order) => {
    Alert.alert(
      'Dettagli ordine',
      `${order.pizzaName}\nQuantità: ${order.quantity}\nPrezzo: €${order.price}\nStato: ${getStatusText(order.status)}`,
      [
        { text: 'OK', style: 'default' }
      ]
    );
  };

  const renderOrderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity 
      style={[styles.orderItem, { backgroundColor: cardBg, pointerEvents: 'auto' }]}
      onPress={() => handleOrderPress(item)}
    >
      <ThemedView style={styles.orderHeader}>
        <ThemedText type="subtitle" style={styles.pizzaName}>
          {item.pizzaName}
        </ThemedText>
        <ThemedView style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <ThemedText style={styles.statusText}>
            {getStatusText(item.status)}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      
      <ThemedView style={styles.orderDetails}>
        <ThemedText style={[styles.quantity, { color: mutedText }]}>
          Quantità: {item.quantity}
        </ThemedText>
        <ThemedText style={styles.price}>
          €{item.price}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          I tuoi ordini
        </ThemedText>
        <TouchableOpacity 
          style={[styles.newOrderButton, { pointerEvents: 'auto' }]}
          onPress={() => router.push('/(tabs)')}
        >
          <IconSymbol size={20} name="plus" color="#007AFF" />
          <ThemedText style={styles.newOrderText}>
            Nuovo ordine
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {mockOrders.length === 0 ? (
        <ThemedView style={styles.emptyContainer}>
          <IconSymbol size={80} name="bag" color="#8E8E93" />
          <ThemedText type="subtitle" style={styles.emptyTitle}>
            Nessun ordine
          </ThemedText>
          <ThemedText style={styles.emptyText}>
            Non hai ancora effettuato ordini. Inizia a ordinare le tue pizze preferite!
          </ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={mockOrders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.ordersList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  newOrderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 8,
  },
  newOrderText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  ordersList: {
    padding: 20,
  },
  orderItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pizzaName: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
});
