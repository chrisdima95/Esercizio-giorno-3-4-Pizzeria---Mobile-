import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useOrder } from '@/contexts/OrderContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function PizzaDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addToOrder } = useOrder();

  const pizzaId = params.id as string || '1';
  const pizzaName = params.name as string || 'Pizza Margherita';
  const pizzaPrice = parseFloat(params.price as string) || 8.5;
  const pizzaFullDescription = params.fullDescription as string || 'Deliziosa pizza con pomodoro, mozzarella e basilico.';
  const pizzaImage = params.image as string || '🍕';

  const handleOrder = () => {
    addToOrder({ id: pizzaId, name: pizzaName, price: pizzaPrice, quantity: 1 });

    Alert.alert(
      'Ordine aggiunto!',
      `${pizzaName} è stata aggiunta al tuo ordine.`,
      [
        { text: 'Continua a ordinare', style: 'default' },
        { text: 'Vai agli ordini', style: 'default', onPress: () => router.push('/(tabs)/ordini') }
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.imageContainer}>
          <ThemedText style={styles.pizzaEmoji}>{pizzaImage}</ThemedText>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol size={24} name="chevron.left" color="#000" />
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.detailsContainer}>
          <ThemedText type="title" style={styles.pizzaName}>{pizzaName}</ThemedText>
          <ThemedText type="subtitle" style={styles.price}>€{pizzaPrice.toFixed(2)}</ThemedText>
          <ThemedText style={styles.description}>{pizzaFullDescription}</ThemedText>
        </ThemedView>
      </ScrollView>

      <ThemedView style={styles.orderContainer}>
        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <IconSymbol size={20} name="plus" color="white" />
          <ThemedText style={styles.orderButtonText}>
            Aggiungi all'ordine - €{pizzaPrice.toFixed(2)}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  imageContainer: { height: 250, backgroundColor: '#FFF5F5', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  pizzaEmoji: { fontSize: 120, opacity: 0.9 },
  backButton: { position: 'absolute', top: 50, left: 20, backgroundColor: 'white', borderRadius: 20, padding: 10, elevation: 3 },
  detailsContainer: { padding: 20 },
  pizzaName: { fontSize: 28, fontWeight: 'bold', marginBottom: 5 },
  price: { fontSize: 24, color: '#007AFF', fontWeight: 'bold', marginBottom: 20 },
  description: { fontSize: 16, lineHeight: 24 },
  orderContainer: { padding: 20, borderTopWidth: 1, borderTopColor: '#E0E0E0', backgroundColor: 'white' },
  orderButton: { backgroundColor: '#007AFF', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  orderButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
