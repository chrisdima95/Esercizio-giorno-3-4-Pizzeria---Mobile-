import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Platform, ScrollView, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

export default function ProfiloScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const cardBg = isDark ? '#1E1E1E' : 'white';
  const divider = isDark ? '#2B2B2B' : '#F0F0F0';
  const logoutBg = isDark ? '#2A1C1C' : '#FFF5F5';
  const logoutBorder = isDark ? '#3A2323' : '#FFE5E5';

  const handleLogout = () => {
    if (Platform.OS === 'web') {
      const confirmed = typeof window !== 'undefined' ? window.confirm('Sei sicuro di voler uscire?') : true;
      if (confirmed) {
        logout();
      }
      return;
    }

    Alert.alert('Logout', 'Sei sicuro di voler uscire?', [
      { text: 'Annulla', style: 'cancel' },
      { text: 'Esci', style: 'destructive', onPress: logout }
    ]);
  };

  const menuItems = [
    {
      id: 'orders',
      title: 'I miei ordini',
      icon: 'bag',
      onPress: () => router.push('/(tabs)/ordini')
    },
    {
      id: 'favorites',
      title: 'Preferiti',
      icon: 'heart',
      onPress: () => Alert.alert('Info', 'Funzione in arrivo!')
    },
    {
      id: 'addresses',
      title: 'Indirizzi',
      icon: 'location',
      // 👉 Apre il nuovo modale
      onPress: () => router.push('/modal?screen=nuovo-indirizzo')
    },
    {
      id: 'settings',
      title: 'Impostazioni',
      icon: 'gear',
      onPress: () => Alert.alert('Info', 'Funzione in arrivo!')
    },
    {
      id: 'help',
      title: 'Aiuto',
      icon: 'questionmark.circle',
      onPress: () => Alert.alert('Info', 'Funzione in arrivo!')
    }
  ];

  const renderMenuItem = (item: typeof menuItems[0]) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.menuItem, { pointerEvents: 'auto', borderBottomColor: divider }]}
      onPress={item.onPress}
    >
      <ThemedView style={styles.menuItemContent}>
        <IconSymbol size={24} name={item.icon as any} color="#007AFF" style={styles.menuIcon} />
        <ThemedText style={styles.menuTitle}>{item.title}</ThemedText>
        <IconSymbol size={16} name="chevron.right" color="#8E8E93" />
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Profilo
        </ThemedText>
      </ThemedView>

      {/* User Info */}
      <ThemedView style={[styles.userInfo, { backgroundColor: cardBg }]}>
        <ThemedView style={styles.avatar}>
          <IconSymbol size={60} name="person.circle.fill" color="#007AFF" />
        </ThemedView>
        {Boolean(user?.name?.trim()) && (
          <ThemedText type="subtitle" style={styles.userName}>
            {user!.name}
          </ThemedText>
        )}
        <ThemedText style={styles.userEmail}>{user?.email || 'email@example.com'}</ThemedText>
      </ThemedView>

      {/* Menu Items */}
      <ThemedView style={[styles.menu, { backgroundColor: cardBg }]}>{menuItems.map(renderMenuItem)}</ThemedView>

      {/* Logout Button */}
      <ThemedView style={styles.logoutContainer}>
        <TouchableOpacity
          style={[
            styles.logoutButton,
            {
              pointerEvents: 'auto',
              backgroundColor: logoutBg,
              borderColor: logoutBorder
            }
          ]}
          onPress={handleLogout}
        >
          <IconSymbol size={20} name="power" color="#FF3B30" />
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  header: { padding: 20, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold' },
  userInfo: {
    alignItems: 'center',
    padding: 30,
    margin: 20,
    borderRadius: 16,
    elevation: 3
  },
  avatar: { marginBottom: 16 },
  userName: { fontSize: 20, fontWeight: '600', marginBottom: 4 },
  userEmail: { fontSize: 14, color: '#666' },
  menu: { margin: 20, borderRadius: 16, overflow: 'hidden', elevation: 3 },
  menuItem: { borderBottomWidth: 1 },
  menuItemContent: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  menuIcon: { marginRight: 16 },
  menuTitle: { flex: 1, fontSize: 16, fontWeight: '500' },
  logoutContainer: { padding: 20 },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    gap: 10
  },
  logoutText: { color: '#FF3B30', fontSize: 16, fontWeight: '600' }
});
