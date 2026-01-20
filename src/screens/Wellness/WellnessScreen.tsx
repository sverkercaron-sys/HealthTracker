/**
 * Wellness Screen - Sömn, humör och välmående tracking (placeholder)
 * Kommer utvecklas i STEG 7
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@context/ThemeContext';
import { SPACING, FONT_SIZES, ICON_SIZES } from '@constants/sizes';

export const WellnessScreen: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Wellness</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={[styles.iconContainer, { backgroundColor: theme.wellness + '20' }]}>
          <Ionicons name="heart-outline" size={ICON_SIZES.xl} color={theme.wellness} />
        </View>
        <Text style={[styles.subtitle, { color: theme.text }]}>Välmående</Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          Här kommer du kunna:
        </Text>
        <View style={styles.featureList}>
          <Text style={[styles.feature, { color: theme.textSecondary }]}>• Spåra sömn och kvalitet</Text>
          <Text style={[styles.feature, { color: theme.textSecondary }]}>• Logga humör och stress</Text>
          <Text style={[styles.feature, { color: theme.textSecondary }]}>• Följa symptom</Text>
          <Text style={[styles.feature, { color: theme.textSecondary }]}>• Hantera mediciner</Text>
        </View>
        <Text style={[styles.comingSoon, { color: theme.accent }]}>
          Kommer i STEG 7
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
