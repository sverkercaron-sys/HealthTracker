/**
 * HealthTracker App
 * En omfattande hälsoapplikation med nutrition, fitness och wellness tracking
 */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { AuthProvider, useAuth } from './src/context/AuthContext';

function AppContent() {
  const { theme, isDark } = useTheme();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        HealthTracker
      </Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        {user ? `Välkommen, ${user.name}!` : 'Projektet är klart för utveckling!'}
      </Text>
      <Text style={[styles.info, { color: theme.textSecondary }]}>
        {isDark ? '🌙 Mörkt läge' : '☀️ Ljust läge'}
      </Text>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    marginTop: 16,
  },
});
