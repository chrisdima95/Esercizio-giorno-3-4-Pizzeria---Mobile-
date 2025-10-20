import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useOrder } from '@/contexts/OrderContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

type Offer = {
  id: string;
  name: string;
  price: number;
  description: string;
  emoji: string;
};

const offers: Offer[] = [
  { id: 'o1', name: 'Margherita Promo', price: 4.99, description: 'Classica a prezzo speciale', emoji: '🍕' },
  { id: 'o2', name: 'Diavola Promo', price: 6.49, description: 'Piccante in sconto', emoji: '🌶️' },
  { id: 'o3', name: 'Quattro Formaggi Promo', price: 6.99, description: 'Formaggi selezionati', emoji: '🧀' },
  { id: 'o4', name: 'Capricciosa Promo', price: 7.49, description: 'Ricca e conveniente', emoji: '🥓' },
];

export default function OfferteScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const cardBg = isDark ? '#1E1E1E' : 'white';
  const subtle = isDark ? '#9BA1A6' : '#666';
  const accent = '#FF3B30';

  const router = useRouter();
  const { addToOrder } = useOrder();

  const handleSelectOffer = (offer: Offer) => {
    addToOrder({ id: offer.id, name: offer.name, price: offer.price, quantity: 1 });
    router.push('/(tabs)/checkout');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Offerte</ThemedText>
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 12, paddingVertical: 8 }}
        style={{ width: '100%' }}
        renderItem={({ item }) => (
          <ThemedView style={[styles.card, { backgroundColor: cardBg }]}>
            <ThemedText type="subtitle" style={styles.cardTitle}>{item.emoji} {item.name}</ThemedText>
            <ThemedText style={{ color: subtle }}>{item.description}</ThemedText>
            <ThemedText style={styles.price}>€{item.price.toFixed(2)}</ThemedText>
            <TouchableOpacity style={[styles.cta, { backgroundColor: accent }]} onPress={() => handleSelectOffer(item)}>
              <ThemedText style={styles.ctaText}>Aggiungi offerta al carrello</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: 'stretch' },
  title: { fontSize: 22, fontWeight: 'bold', marginVertical: 8 },
  card: { width: '100%', borderRadius: 12, padding: 16, gap: 8 },
  cardTitle: { fontSize: 18, fontWeight: '600' },
  price: { marginTop: 4, fontSize: 16, fontWeight: '600' },
  cta: { marginTop: 10, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  ctaText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});


