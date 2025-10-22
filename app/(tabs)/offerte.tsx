import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useOrder } from '@/contexts/OrderContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, FlatList, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';

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
  const colors = Colors[colorScheme ?? 'light'];
  const cardBg = colors.card;
  const mutedText = colors.muted;
  const accent = colors.primary;

  const router = useRouter();
  const { addToOrder } = useOrder();
  const { isAuthenticated } = useAuth();

  const handleSelectOffer = (offer: Offer) => {
    if (!isAuthenticated) {
      Alert.alert(
        'Registrazione Richiesta',
        'Per riscattare l\'offerta bisogna essere registrati',
        [
          {
            text: 'Annulla',
            style: 'cancel',
          },
          {
            text: 'Registrati',
            onPress: () => router.replace('/login'),
          },
        ]
      );
      return;
    }

    addToOrder({ id: offer.id, name: offer.name, price: offer.price, quantity: 1 });
    router.push('/checkout');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedText type="title" style={styles.title}>🔥 Offerte Speciali</ThemedText>
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 12, paddingVertical: 8 }}
        style={{ width: '100%' }}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: cardBg, borderColor: colors.border }]}>
            <ThemedText type="subtitle" style={styles.cardTitle}>{item.emoji} {item.name}</ThemedText>
            <ThemedText style={[styles.description, { color: mutedText }]}>{item.description}</ThemedText>
            <ThemedText style={[styles.price, { color: accent }]}>€{item.price.toFixed(2)}</ThemedText>
            <TouchableOpacity style={[styles.cta, { backgroundColor: accent }]} onPress={() => handleSelectOffer(item)}>
              <ThemedText style={styles.ctaText}>Riscatta offerta</ThemedText>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 60, 
    alignItems: 'stretch',
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 16, 
    marginTop: 8,
  },
  card: { 
    width: '100%', 
    borderRadius: 16, 
    padding: 20, 
    gap: 8,
    elevation: 3,
    shadowColor: '#E53E3E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
  },
  cardTitle: { 
    fontSize: 20, 
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
  },
  price: { 
    marginTop: 4, 
    fontSize: 18, 
    fontWeight: '700',
  },
  cta: { 
    marginTop: 12, 
    paddingVertical: 14, 
    borderRadius: 12, 
    alignItems: 'center',
    elevation: 2,
  },
  ctaText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16,
  },
});


