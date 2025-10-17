import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

interface Pizza {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  ingredients: string[];
  fullDescription: string;
  nutrition: {
    calories: string;
    carbs: string;
    protein: string;
    fat: string;
  };
}

const pizzas: Pizza[] = [
  {
    id: '1',
    name: 'Pizza Margherita',
    price: '8.50',
    description: 'Pomodoro, mozzarella, basilico',
    image: '🍕',
    ingredients: ['Pomodoro San Marzano', 'Mozzarella di bufala', 'Basilico fresco', 'Olio extravergine d\'oliva', 'Sale marino'],
    fullDescription: 'Una deliziosa pizza con pomodoro, mozzarella fresca e basilico. Ingredienti selezionati e preparata nel forno a legna per una cottura perfetta.',
    nutrition: {
      calories: '250 kcal',
      carbs: '30g',
      protein: '12g',
      fat: '8g'
    }
  },
  {
    id: '2',
    name: 'Pizza Quattro Stagioni',
    price: '12.00',
    description: 'Prosciutto, funghi, carciofi, olive',
    image: '🍕',
    ingredients: ['Pomodoro', 'Mozzarella', 'Prosciutto cotto', 'Funghi porcini', 'Carciofi', 'Olive nere', 'Olio EVO'],
    fullDescription: 'La classica quattro stagioni con i migliori ingredienti stagionali. Una combinazione perfetta di sapori che rappresenta tutte le stagioni.',
    nutrition: {
      calories: '280 kcal',
      carbs: '32g',
      protein: '15g',
      fat: '10g'
    }
  },
  {
    id: '3',
    name: 'Pizza Diavola',
    price: '10.50',
    description: 'Pomodoro, mozzarella, salame piccante',
    image: '🍕',
    ingredients: ['Pomodoro', 'Mozzarella', 'Salame piccante', 'Peperoncino', 'Olio piccante', 'Basilico'],
    fullDescription: 'Per i palati più audaci! Una pizza dal sapore intenso con salame piccante e peperoncino. Ideale per chi ama i sapori forti.',
    nutrition: {
      calories: '270 kcal',
      carbs: '29g',
      protein: '14g',
      fat: '11g'
    }
  },
  {
    id: '4',
    name: 'Pizza Capricciosa',
    price: '11.00',
    description: 'Prosciutto, funghi, carciofi, olive nere',
    image: '🍕',
    ingredients: ['Pomodoro', 'Mozzarella', 'Prosciutto cotto', 'Funghi champignon', 'Carciofi sott\'olio', 'Olive nere', 'Capperi'],
    fullDescription: 'Una pizza ricca e gustosa con una varietà di ingredienti pregiati. Ogni morso è una sorpresa di sapori mediterranei.',
    nutrition: {
      calories: '290 kcal',
      carbs: '31g',
      protein: '16g',
      fat: '12g'
    }
  }
];

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const cardBg = colorScheme === 'dark' ? '#1E1E1E' : 'white';
  const mutedText = colorScheme === 'dark' ? '#9BA1A6' : '#666';
  const accentBg = colorScheme === 'dark' ? '#2B2B2B' : '#FFF5F5';

  const handlePizzaPress = (pizza: Pizza) => {
    router.push({
      pathname: '/pizza-details',
      params: {
        id: pizza.id,
        name: pizza.name,
        price: pizza.price,
        description: pizza.description,
        fullDescription: pizza.fullDescription,
        ingredients: JSON.stringify(pizza.ingredients),
        nutrition: JSON.stringify(pizza.nutrition),
        image: pizza.image
      }
    });
  };

  const renderPizzaItem = ({ item }: { item: Pizza }) => (
    <TouchableOpacity 
      style={[styles.pizzaCard, { backgroundColor: cardBg, pointerEvents: 'auto' }]}
      onPress={() => handlePizzaPress(item)}
    >
      <ThemedView style={[styles.pizzaImage, { backgroundColor: accentBg }]}>
        <ThemedText style={styles.pizzaEmoji}>{item.image}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.pizzaInfo}>
        <ThemedText type="subtitle" style={styles.pizzaName}>
          {item.name}
        </ThemedText>
        <ThemedText style={[styles.pizzaDescription, { color: mutedText }]}>
          {item.description}
        </ThemedText>
        <ThemedText style={styles.pizzaPrice}>
          €{item.price}
        </ThemedText>
      </ThemedView>
      <IconSymbol 
        size={20} 
        name="chevron.right" 
        color="#8E8E93"
        style={styles.chevron}
      />
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Le nostre Pizze
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Scegli la tua pizza preferita
        </ThemedText>
      </ThemedView>

      <FlatList
        data={pizzas}
        renderItem={renderPizzaItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.pizzasList}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  pizzasList: {
    padding: 20,
  },
  pizzaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  pizzaImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  pizzaEmoji: {
    fontSize: 30,
  },
  pizzaInfo: {
    flex: 1,
  },
  pizzaName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  pizzaDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  pizzaPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  chevron: {
    marginLeft: 10,
  },
});
