/**
 * Dashboard Screen - Huvudöversikt (placeholder)
 * Kommer utvecklas i STEG 4
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { SPACING, FONT_SIZES, ICON_SIZES } from '@constants/sizes';

export const DashboardScreen: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: theme.textSecondary }]}>Hej,</Text>
          <Text style={[styles.name, { color: theme.text }]}>{user?.name}!</Text>
        </View>
        <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={[styles.iconContainer, { backgroundColor: theme.primary + '20' }]}>
          <Ionicons name="home-outline" size={ICON_SIZES.xl} color={theme.primary} />
        </View>
        <Text style={[styles.title, { color: theme.text }]}>Översikt</Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          Här kommer ditt dashboard med:
        </Text>
        <View style={styles.featureList}>
          <Text style={[styles.feature, { color: theme.textSecondary }]}>• Dagens steg och aktivitet</Text>
          <Text style={[styles.feature, { color: theme.textSecondary }]}>• Kalorier intag vs förbränning</Text>
          <Text style={[styles.feature, { color: theme.textSecondary }]}>• Träningspass idag</Text>
          <Text style={[styles.feature, { color: theme.textSecondary }]}>• Vattenintag</Text>
          <Text style={[styles.feature, { color: theme.textSecondary }]}>• Sömn och återhämtning</Text>
        </View>
        <Text style={[styles.comingSoon, { color: theme.primary }]}>
          Kommer i STEG 4
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    paddingTop: SPACING.xl + 20,
  },
  greeting: {
    fontSize: FONT_SIZES.md,
  },
  name: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    padding: SPACING.lg,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: FONT_SIZES.md,
    marginBottom: SPACING.lg,
  },
  featureList: {
    alignSelf: 'stretch',
    marginBottom: SPACING.xl,
  },
  feature: {
    fontSize: FONT_SIZES.md,
    marginBottom: SPACING.sm,
    lineHeight: 24,
  },
  comingSoon: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
  },
});
