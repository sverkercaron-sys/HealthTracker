/**
 * StepsWidget - Visa dagens steg med progress ring
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@context/ThemeContext';
import { Widget } from '@components/Widget';
import { ProgressRing } from '@components/ProgressRing';
import { SPACING, FONT_SIZES } from '@constants/sizes';

interface StepsWidgetProps {
  steps: number;
  goal: number;
  onPress?: () => void;
}

export const StepsWidget: React.FC<StepsWidgetProps> = ({ steps, goal, onPress }) => {
  const { theme } = useTheme();
  const progress = steps / goal;

  return (
    <Widget title="Steg" onPress={onPress} color={theme.fitness}>
      <View style={styles.content}>
        <ProgressRing
          progress={progress}
          size={100}
          strokeWidth={8}
          color={theme.fitness}
          centerText={steps.toLocaleString()}
          centerSubtext="steg"
        />
        <View style={styles.info}>
          <View style={styles.row}>
            <Ionicons name="flag-outline" size={20} color={theme.textSecondary} />
            <Text style={[styles.goalText, { color: theme.textSecondary }]}>
              Mål: {goal.toLocaleString()}
            </Text>
          </View>
          <Text style={[styles.percentText, { color: theme.fitness }]}>
            {Math.round(progress * 100)}% klart
          </Text>
        </View>
      </View>
    </Widget>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  goalText: {
    fontSize: FONT_SIZES.sm,
    marginLeft: SPACING.xs,
  },
  percentText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
});
