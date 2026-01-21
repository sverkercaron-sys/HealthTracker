/**
 * WorkoutCard - Visa ett träningspass
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@context/ThemeContext';
import { SPACING, FONT_SIZES, BORDER_RADIUS } from '@constants/sizes';
import { Workout } from '../../types';

interface WorkoutCardProps {
  workout: Workout;
  onDelete?: () => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onDelete }) => {
  const { theme } = useTheme();

  const getWorkoutIcon = (type: string) => {
    const icons: { [key: string]: keyof typeof Ionicons.glyphMap } = {
      running: 'walk',
      strength: 'barbell',
      cycling: 'bicycle',
      swimming: 'water',
      yoga: 'body',
      walking: 'walk-outline',
      other: 'fitness',
    };
    return icons[type] || 'fitness';
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'high':
        return '#F44336';
      case 'medium':
        return '#FF9800';
      case 'low':
        return '#4CAF50';
      default:
        return theme.textSecondary;
    }
  };

  const getIntensityText = (intensity: string) => {
    switch (intensity) {
      case 'high':
        return 'Hög';
      case 'medium':
        return 'Medel';
      case 'low':
        return 'Låg';
      default:
        return '';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: theme.fitness + '20' }]}>
          <Ionicons name={getWorkoutIcon(workout.type)} size={32} color={theme.fitness} />
        </View>

        <View style={styles.info}>
          <Text style={[styles.type, { color: theme.text }]}>{workout.type}</Text>
          <View style={styles.stats}>
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
            <View style={styles.stat}>
              <View
                style={[styles.intensityDot, { backgroundColor: getIntensityColor(workout.intensity) }]}
              />
              <Text style={[styles.statText, { color: theme.textSecondary }]}>
                {getIntensityText(workout.intensity)}
              </Text>
            </View>
          </View>
        </View>

        {onDelete && (
          <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
            <Ionicons name="trash-outline" size={20} color={theme.error} />
          </TouchableOpacity>
        )}
      </View>

      {workout.notes && (
        <Text style={[styles.notes, { color: theme.textSecondary }]}>{workout.notes}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  info: {
    flex: 1,
  },
  type: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.md,
    marginTop: 2,
  },
  statText: {
    fontSize: FONT_SIZES.xs,
    marginLeft: 4,
  },
  intensityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  deleteButton: {
    padding: SPACING.xs,
  },
  notes: {
    fontSize: FONT_SIZES.sm,
    marginTop: SPACING.sm,
    fontStyle: 'italic',
  },
});
