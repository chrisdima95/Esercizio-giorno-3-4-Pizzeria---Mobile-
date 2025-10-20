import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ModificaProfiloScreen() {
  const [nome, setNome] = useState('');
  const [modificato, setModificato] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!modificato) return;

      // Blocca l’evento di uscita
      e.preventDefault();

      Alert.alert(
        'Modifiche non salvate',
        'Sei sicuro di voler uscire? Le modifiche andranno perse.',
        [
          { text: 'Annulla', style: 'cancel', onPress: () => {} },
          {
            text: 'Esci senza salvare',
            style: 'destructive',
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });

    return unsubscribe;
  }, [navigation, modificato]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Inserisci nome"
        value={nome}
        onChangeText={(text) => {
          setNome(text);
          setModificato(true);
        }}
      />
      <Button
        title="Salva"
        onPress={() => {
          Alert.alert('Salvato!', 'Le modifiche sono state salvate.');
          setModificato(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
});
