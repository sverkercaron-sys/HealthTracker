/**
 * Dashboard Screen - Huvudöversikt (placeholder)
 * Kommer utvecklas i STEG 4
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { Button } from '@components/Button';
import { SPACING, FONT_SIZES } from '@constants/sizes';

export const DashboardScreen: React.FC = () => {
  const { theme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Välkommen, {user?.name}!
      </Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        Dashboard kommer här i STEG 4
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Logga ut" onPress={logout} variant="outline" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    marginBottom: SPACING.xl,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
});
