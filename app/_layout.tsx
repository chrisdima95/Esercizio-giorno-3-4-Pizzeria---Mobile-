import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider } from '@/contexts/AuthContext';
import { OrderProvider } from '@/contexts/OrderContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <OrderProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            {/* Schermate principali */}
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />

            {/* Tab navigator */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* Dettagli pizza */}
            <Stack.Screen name="pizza-details" options={{ headerShown: false }} />

            {/* Ordini */}
            <Stack.Screen name="ordini" options={{ headerShown: false }} />

            {/* Checkout come modal */}
            <Stack.Screen 
              name="checkout" 
              options={{ 
                presentation: 'modal', 
                headerShown: false,
                gestureEnabled: true,
                animationTypeForReplace: 'push'
              }} 
            />

            {/* Modal generico */}
            <Stack.Screen
              name="modal"
              options={{ presentation: 'modal', title: 'Modal' }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </OrderProvider>
    </AuthProvider>
  );
}
