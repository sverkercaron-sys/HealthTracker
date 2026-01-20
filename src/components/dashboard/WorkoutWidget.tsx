/**
 * WorkoutWidget - Visa dagens träningspass
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@context/ThemeContext';
import { Widget } from '@components/Widget';
import { Button } from '@components/Button';
import { SPACING, FONT_SIZES } from '@constants/sizes';

interface Workout {
  type: string;
  duration: number; // minuter
  calories: number;
}

interface WorkoutWidgetProps {
  workout?: Workout;
  onPress?: () => void;
  onLogWorkout?: () => void;
}

export const WorkoutWidget: React.FC<WorkoutWidgetProps> = ({
  workout,
  onPress,
  onLogWorkout,
}) => {
  const { theme } = useTheme();

  return (
    <Widget title="Träning idag" onPress={onPress} color={theme.fitness}>
      {workout ? (
        <View style={styles.content}>
          <View style={styles.workoutInfo}>
            <Ionicons name="barbell" size={32} color={theme.fitness} />
            <View style={styles.details}>
              <Text style={[styles.workoutType, { color: theme.text }]}>{workout.type}</Text>
              <View style={styles.row}>
                <View style={styles.stat}>
                  <Ionicons name="time-outline" size={16} color={theme.textSecondary} />
                  <Text style={[styles.statText, { color: theme.textSecondary }]}>
                    {workout.duration} min
                  </Text>
                </View>
                <View style={styles.stat}>
                  <Ionicons name="flame-outline" size={16} color={theme.textSecondary} />
                  <Text style={[styles.statText, { color: theme.textSecondary }]}>
                    {workout.calories} kcal
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            Inget träningspass idag
          </Text>
          <Button
            title="Logga träning"
            onPress={onLogWorkout || (() => console.log('Log workout'))}
            variant="primary"
            style={styles.button}
          />
        </View>
      )}
    </Widget>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: SPACING.xs,
  },
  workoutInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  workoutType: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  row: {
    flexDirection: 'row',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  statText: {
    fontSize: FONT_SIZES.xs,
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  emptyText: {
    fontSize: FONT_SIZES.sm,
    marginBottom: SPACING.md,
  },
  button: {
    paddingVertical: SPACING.sm,
    minHeight: 40,
  },
});
