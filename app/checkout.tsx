import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useOrder } from '@/contexts/OrderContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, FlatList, Platform, StyleSheet, TouchableOpacity } from 'react-native';

export default function CheckoutScreen() {
  const router = useRouter();
  const { orders, clearOrder } = useOrder();

  const handleConfirmOrder = () => {
    if (!orders || orders.length === 0) {
      Alert.alert('Carrello vuoto', 'Non ci sono pizze da ordinare.');
      return;
    }

    if (Platform.OS === 'web') {
      // Su web l'Alert nativo non è sempre affidabile; usiamo window.alert sincrono
      window.alert('Ordine confermato');
      clearOrder();
      router.replace('/(tabs)');
      return;
    }

    Alert.alert('Ordine confermato', undefined, [
      {
        text: 'OK',
        onPress: () => {
          clearOrder();
          router.dismissAll();
          router.replace('/(tabs)');
        },
      },
    ], { cancelable: false });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Checkout</ThemedText>

      {orders.length === 0 ? (
        <ThemedText>Il tuo carrello è vuoto.</ThemedText>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ThemedView style={styles.orderItem}>
              <ThemedText>
                {item.name} x{item.quantity} - €{item.price.toFixed(2)}
              </ThemedText>
            </ThemedView>
          )}
          style={{ width: '100%', marginVertical: 20 }}
        />
      )}

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmOrder}
      >
        <ThemedText style={styles.confirmButtonText}>Conferma ordine</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  orderItem: { padding: 12, borderBottomWidth: 1, borderColor: '#ccc', width: '100%' },
  confirmButton: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  confirmButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});


