import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();

  // Redirect se già autenticato
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, authLoading]);

  // Mostra loading se l'auth è in caricamento
  if (authLoading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <ThemedText style={styles.loadingText}>
          Verifica autenticazione...
        </ThemedText>
      </ThemedView>
    );
  }

  // Non mostrare nulla se già autenticato (il redirect avverrà nell'useEffect)
  if (isAuthenticated) {
    return null;
  }

  const handleLogin = async () => {
    setHasSubmitted(true);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Reset errori
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    // Validazione email (richiesta + formato semplice)
    if (!trimmedEmail) {
      setEmailError('Inserisci la tua email');
      isValid = false;
    } else if (!/^\S+@\S+\.[\w-]+$/.test(trimmedEmail)) {
      setEmailError("Inserisci un'email valida (deve contenere @ e dominio)");
      isValid = false;
    }

    // Validazione password (richiesta)
    if (!trimmedPassword) {
      setPasswordError('Inserisci la password');
      isValid = false;
    }

    if (!isValid) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (!success) {
        Alert.alert('Errore', 'Credenziali non valide');
      }
    } catch (error) {
      Alert.alert('Errore', 'Si è verificato un errore durante il login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Benvenuto!
        </ThemedText>
        <ThemedText type="subtitle" style={styles.subtitle}>
          Accedi per continuare
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (hasSubmitted) {
              const t = text.trim();
              if (!t) {
                setEmailError('Inserisci la tua email');
              } else if (!/^\S+@\S+\.[\w-]+$/.test(t)) {
                setEmailError("Inserisci un'email valida (deve contenere @ e dominio)");
              } else {
                setEmailError('');
              }
            }
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {hasSubmitted && emailError ? (
          <ThemedText style={styles.errorText}>{emailError}</ThemedText>
        ) : null}
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (hasSubmitted) {
              if (!text.trim()) {
                setPasswordError('Inserisci la password');
              } else {
                setPasswordError('');
              }
            }
          }}
          secureTextEntry
        />
        {hasSubmitted && passwordError ? (
          <ThemedText style={styles.errorText}>{passwordError}</ThemedText>
        ) : null}

        <TouchableOpacity 
          style={[
            styles.loginButton, 
            isLoading && styles.loginButtonDisabled,
            { pointerEvents: isLoading ? 'none' : 'auto' }
          ]} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <ThemedText style={styles.loginButtonText}>
              Accedi
            </ThemedText>
          )}
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  errorText: {
    color: '#FF3B30',
    marginTop: -8,
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});
