/**
 * MacroBreakdown - Visa makronutrienter breakdown
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { ProgressBar } from '@components/ProgressBar';
import { SPACING, FONT_SIZES } from '@constants/sizes';

interface MacroBreakdownProps {
  protein: number;
  carbs: number;
  fat: number;
  proteinGoal?: number;
  carbsGoal?: number;
  fatGoal?: number;
}

export const MacroBreakdown: React.FC<MacroBreakdownProps> = ({
  protein,
  carbs,
  fat,
  proteinGoal = 150,
  carbsGoal = 200,
  fatGoal = 70,
}) => {
  const { theme } = useTheme();

  const macros = [
    {
      name: 'Protein',
      value: protein,
      goal: proteinGoal,
      color: '#FF6B6B',
      unit: 'g',
    },
    {
      name: 'Kolhydrater',
      value: carbs,
      goal: carbsGoal,
      color: '#4ECDC4',
      unit: 'g',
    },
    {
      name: 'Fett',
      value: fat,
      goal: fatGoal,
      color: '#FFE66D',
      unit: 'g',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>Makronutrienter</Text>
      {macros.map((macro) => (
        <View key={macro.name} style={styles.macroRow}>
          <View style={styles.labelRow}>
            <View style={[styles.dot, { backgroundColor: macro.color }]} />
            <Text style={[styles.label, { color: theme.text }]}>{macro.name}</Text>
          </View>
          <View style={styles.progressSection}>
            <ProgressBar
              progress={macro.value / macro.goal}
              color={macro.color}
              height={8}
            />
            <Text style={[styles.value, { color: theme.textSecondary }]}>
              {macro.value}{macro.unit} / {macro.goal}{macro.unit}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  macroRow: {
    marginBottom: SPACING.md,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.xs,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  progressSection: {
    flex: 1,
  },
  value: {
    fontSize: FONT_SIZES.xs,
    marginTop: 4,
  },
});
