/**
 * Nutrition Screen - Mat och kalorier tracking (placeholder)
 * Kommer utvecklas i STEG 5
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@context/ThemeContext';
import { SPACING, FONT_SIZES, ICON_SIZES } from '@constants/sizes';

export const NutritionScreen: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Nutrition</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={[styles.iconContainer, { backgroundColor: theme.nutrition + '20' }]}>
          <Ionicons name="restaurant-outline" size={ICON_SIZES.xl} color={theme.nutrition} />
        </View>
        <Text style={[styles.subtitle, { color: theme.text }]}>Mat & Kalorier</Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          Här kommer du kunna:
        </Text>
        <View style={styles.featureList}>
          <Text style={[styles.feature, { color: theme.textSecondary }]}>• Logga måltider och mellanmål</Text>
          <Text style={[styles.feature, { color: theme.textSecondary }]}>• Spåra kalorier och makros</Text>
          <Text style={[styles.feature, { color: theme.textSecondary }]}>• Följa dagligt vattenintag</Text>
          <Text style={[styles.feature, { color: theme.textSecondary }]}>• Se näringsstatistik</Text>
        </View>
        <Text style={[styles.comingSoon, { color: theme.primary }]}>
          Kommer i STEG 5
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
    padding: SPACING.lg,
    paddingTop: SPACING.xl + 20,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
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
  subtitle: {
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
