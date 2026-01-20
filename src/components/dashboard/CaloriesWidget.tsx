/**
 * CaloriesWidget - Visa kalorier intag vs förbränning
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@context/ThemeContext';
import { Widget } from '@components/Widget';
import { ProgressBar } from '@components/ProgressBar';
import { SPACING, FONT_SIZES } from '@constants/sizes';

interface CaloriesWidgetProps {
  intake: number;
  burned: number;
  goal: number;
  onPress?: () => void;
}

export const CaloriesWidget: React.FC<CaloriesWidgetProps> = ({
  intake,
  burned,
  goal,
  onPress,
}) => {
  const { theme } = useTheme();
  const net = intake - burned;
  const remaining = goal - intake;

  return (
    <Widget title="Kalorier" onPress={onPress} color={theme.nutrition}>
      <View style={styles.content}>
        {/* Intag */}
        <View style={styles.row}>
          <View style={styles.labelRow}>
            <Ionicons name="restaurant" size={20} color={theme.nutrition} />
            <Text style={[styles.label, { color: theme.text }]}>Intag</Text>
          </View>
          <Text style={[styles.value, { color: theme.nutrition }]}>{intake} kcal</Text>
        </View>
        <ProgressBar progress={intake / goal} color={theme.nutrition} height={6} />

        {/* Förbränning */}
        <View style={[styles.row, { marginTop: SPACING.md }]}>
          <View style={styles.labelRow}>
            <Ionicons name="flame" size={20} color={theme.warning} />
            <Text style={[styles.label, { color: theme.text }]}>Förbränt</Text>
          </View>
          <Text style={[styles.value, { color: theme.warning }]}>{burned} kcal</Text>
        </View>
        <ProgressBar progress={burned / 3000} color={theme.warning} height={6} />

        {/* Netto */}
        <View style={[styles.netContainer, { backgroundColor: theme.surface }]}>
          <Text style={[styles.netLabel, { color: theme.textSecondary }]}>Netto</Text>
          <Text style={[styles.netValue, { color: net > 0 ? theme.text : theme.success }]}>
            {net > 0 ? '+' : ''}{net} kcal
          </Text>
          {remaining > 0 && (
            <Text style={[styles.remainingText, { color: theme.textSecondary }]}>
              {remaining} kvar till mål
            </Text>
          )}
        </View>
      </View>
    </Widget>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: SPACING.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: FONT_SIZES.sm,
    marginLeft: SPACING.xs,
  },
  value: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  netContainer: {
    marginTop: SPACING.md,
    padding: SPACING.sm,
    borderRadius: 8,
    alignItems: 'center',
  },
  netLabel: {
    fontSize: FONT_SIZES.xs,
    marginBottom: 2,
  },
  netValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
  },
  remainingText: {
    fontSize: FONT_SIZES.xs,
    marginTop: 2,
  },
});
