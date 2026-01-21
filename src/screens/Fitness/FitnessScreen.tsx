/**
 * Fitness Screen - Träning och aktivitet tracking
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { ProgressRing } from '@components/ProgressRing';
import { Button } from '@components/Button';
import { WorkoutCard } from '@components/fitness/WorkoutCard';
import { ActivityMetric } from '@components/fitness/ActivityMetric';
import { SPACING, FONT_SIZES } from '@constants/sizes';
import { Workout } from '../../types';

export const FitnessScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const { theme } = useTheme();

  // Mock data - kommer ersättas med riktig data från Health API
  const [steps] = useState(7234);
  const [stepsGoal] = useState(10000);
  const [distance] = useState(5.2);
  const [activeMinutes] = useState(45);
  const [floors] = useState(8);

  const [workouts, setWorkouts] = useState<Array<Workout & { id: string }>>([
    {
      id: '1',
      userId: 'user1',
      date: new Date(),
      type: 'Löpning',
      duration: 45,
      intensity: 'medium',
      calories: 450,
      notes: '5 km, känsla bra',
    },
    {
      id: '2',
      userId: 'user1',
      date: new Date(),
      type: 'Styrketräning',
      duration: 60,
      intensity: 'high',
      calories: 300,
    },
  ]);

  const handleAddWorkout = () => {
    if (navigation) {
      navigation.navigate('LogWorkout', {
        onAddWorkout: (workout: Omit<Workout, 'id' | 'userId' | 'date'>) => {
          const newWorkout: Workout & { id: string } = {
            ...workout,
            id: Date.now().toString(),
            userId: 'user1',
            date: new Date(),
          };
          setWorkouts([newWorkout, ...workouts]);
        },
      });
    }
  };

  const handleDeleteWorkout = (id: string) => {
    setWorkouts(workouts.filter((w) => w.id !== id));
  };

  const getCurrentDate = () => {
    const days = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
    const now = new Date();
    return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;
  };

  const progress = steps / stepsGoal;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Fitness</Text>
        <Text style={[styles.date, { color: theme.textSecondary }]}>{getCurrentDate()}</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Steg-sektion */}
        <View style={[styles.stepsCard, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Dagens steg</Text>
          <View style={styles.stepsContent}>
            <ProgressRing
              progress={progress}
              size={140}
              strokeWidth={12}
              color={theme.fitness}
              centerText={steps.toLocaleString()}
              centerSubtext={`av ${stepsGoal.toLocaleString()}`}
            />
            <View style={styles.stepsInfo}>
              <Text style={[styles.stepsPercent, { color: theme.fitness }]}>
                {Math.round(progress * 100)}%
              </Text>
              <Text style={[styles.stepsLabel, { color: theme.textSecondary }]}>av dagligt mål</Text>
            </View>
          </View>
        </View>

        {/* Aktivitetsmått */}
        <View style={styles.metricsSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Aktivitet</Text>
          <ActivityMetric
            icon="walk-outline"
            label="Distans"
            value={distance.toFixed(1)}
            unit="km"
            color={theme.fitness}
          />
          <ActivityMetric
            icon="time-outline"
            label="Aktiva minuter"
            value={activeMinutes}
            unit="min"
            color={theme.secondary}
          />
          <ActivityMetric
            icon="trending-up-outline"
            label="Våningar"
            value={floors}
            unit="våningar"
            color={theme.success}
          />
        </View>

        {/* Träningspass */}
        <View style={styles.workoutsSection}>
          <View style={styles.workoutsHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Träningspass</Text>
            <Button
              title="Logga träning"
              onPress={handleAddWorkout}
              variant="primary"
              style={styles.logButton}
            />
          </View>

          {workouts.length > 0 ? (
            workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                onDelete={() => handleDeleteWorkout(workout.id)}
              />
            ))
          ) : (
            <View style={[styles.emptyState, { backgroundColor: theme.surface }]}>
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                Inga träningspass loggade idag
              </Text>
            </View>
          )}
        </View>

        {/* Spacing */}
        <View style={{ height: SPACING.xl }} />
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
    marginBottom: 4,
  },
  date: {
    fontSize: FONT_SIZES.sm,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.lg,
  },
  stepsCard: {
    padding: SPACING.lg,
    borderRadius: 16,
    marginBottom: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
  stepsContent: {
    alignItems: 'center',
  },
  stepsInfo: {
    marginTop: SPACING.md,
    alignItems: 'center',
  },
  stepsPercent: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
  },
  stepsLabel: {
    fontSize: FONT_SIZES.sm,
    marginTop: 4,
  },
  metricsSection: {
    marginBottom: SPACING.lg,
  },
  workoutsSection: {
    marginBottom: SPACING.lg,
  },
  workoutsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  logButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    minHeight: 40,
  },
  emptyState: {
    padding: SPACING.xl,
    borderRadius: 16,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FONT_SIZES.sm,
  },
});
