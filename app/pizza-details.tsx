import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function PizzaDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Estrazione e parsing dei parametri
  const pizzaId = params.id as string || '1';
  const pizzaName = params.name as string || 'Pizza Margherita';
  const pizzaPrice = params.price as string || '8.50';
  const pizzaDescription = params.description as string || 'Pomodoro, mozzarella, basilico';
  const pizzaFullDescription = params.fullDescription as string || 'Una deliziosa pizza con pomodoro, mozzarella fresca e basilico. Ingredienti selezionati e preparata nel forno a legna per una cottura perfetta.';
  const pizzaImage = params.image as string || '🍕';
  
  // Parsing degli array/oggetti JSON
  let ingredients: string[] = [];
  let nutrition: any = {};
  
  try {
    ingredients = params.ingredients ? JSON.parse(params.ingredients as string) : ['Pomodoro San Marzano', 'Mozzarella di bufala', 'Basilico fresco', 'Olio extravergine d\'oliva', 'Sale marino'];
    nutrition = params.nutrition ? JSON.parse(params.nutrition as string) : {
      calories: '250 kcal',
      carbs: '30g',
      protein: '12g',
      fat: '8g'
    };
  } catch (error) {
    console.error('Errore nel parsing dei parametri:', error);
    // Valori di fallback
    ingredients = ['Pomodoro San Marzano', 'Mozzarella di bufala', 'Basilico fresco', 'Olio extravergine d\'oliva', 'Sale marino'];
    nutrition = {
      calories: '250 kcal',
      carbs: '30g',
      protein: '12g',
      fat: '8g'
    };
  }

  const handleOrder = () => {
    Alert.alert(
      'Ordine aggiunto!',
      `${pizzaName} è stata aggiunta al tuo ordine`,
      [
        {
          text: 'Continua a ordinare',
          style: 'default'
        },
        {
          text: 'Vai agli ordini',
          style: 'default',
          onPress: () => router.push('/(tabs)/ordini')
        }
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header con immagine pizza */}
        <ThemedView style={styles.imageContainer}>
          <ThemedText style={styles.pizzaEmoji}>{pizzaImage}</ThemedText>
          <TouchableOpacity 
            style={[styles.backButton, { pointerEvents: 'auto' }]}
            onPress={() => router.back()}
          >
            <IconSymbol size={24} name="chevron.left" color="#000" />
          </TouchableOpacity>
        </ThemedView>

        {/* Dettagli pizza */}
        <ThemedView style={styles.detailsContainer}>
          <ThemedText type="title" style={styles.pizzaName}>
            {pizzaName}
          </ThemedText>
          
          <ThemedText type="subtitle" style={styles.price}>
            €{pizzaPrice}
          </ThemedText>

          <ThemedView style={styles.descriptionContainer}>
            <ThemedText type="subtitle">Descrizione</ThemedText>
            <ThemedText style={styles.description}>
              {pizzaFullDescription}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.ingredientsContainer}>
            <ThemedText type="subtitle">Ingredienti</ThemedText>
            <ThemedText style={styles.ingredients}>
              {ingredients.map((ingredient, index) => `• ${ingredient}${index < ingredients.length - 1 ? '\n' : ''}`).join('')}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.nutritionContainer}>
            <ThemedText type="subtitle">Valori nutrizionali (per 100g)</ThemedText>
            <ThemedText style={styles.nutrition}>
              Calorie: {nutrition.calories}{'\n'}
              Carboidrati: {nutrition.carbs}{'\n'}
              Proteine: {nutrition.protein}{'\n'}
              Grassi: {nutrition.fat}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ScrollView>

      {/* Bottone ordina */}
      <ThemedView style={styles.orderContainer}>
        <TouchableOpacity 
          style={[styles.orderButton, { pointerEvents: 'auto' }]} 
          onPress={handleOrder}
        >
          <IconSymbol size={20} name="plus" color="white" />
          <ThemedText style={styles.orderButtonText}>
            Aggiungi all'ordine - €{pizzaPrice}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 250,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  pizzaEmoji: {
    fontSize: 120,
    opacity: 0.9,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  detailsContainer: {
    padding: 20,
  },
  pizzaName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
  ingredientsContainer: {
    marginBottom: 20,
  },
  ingredients: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
  nutritionContainer: {
    marginBottom: 20,
  },
  nutrition: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
  orderContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: 'white',
  },
  orderButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  orderButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
