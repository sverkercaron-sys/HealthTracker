/**
 * Splash Screen - Visa app-logotyp och kontrollera autentisering
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@context/ThemeContext';
import { FONT_SIZES, ICON_SIZES } from '@constants/sizes';

interface SplashScreenProps {
  navigation: any;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();

  useEffect(() => {
    // Ge tid för AuthContext att ladda användare
    // Navigation sker automatiskt via App.tsx baserat på auth state
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
          <Ionicons name="fitness" size={ICON_SIZES.xl * 2} color="#FFFFFF" />
        </View>
        <Text style={styles.title}>HealthTracker</Text>
        <Text style={styles.subtitle}>Din personliga hälsoassistent</Text>
      </View>

      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Laddar...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: 'rgba(255,255,255,0.9)',
  },
  footer: {
    marginBottom: 48,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: FONT_SIZES.sm,
    color: '#FFFFFF',
  },
});
