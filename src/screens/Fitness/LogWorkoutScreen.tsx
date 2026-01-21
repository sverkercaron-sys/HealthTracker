/**
 * LogWorkoutScreen - Logga nytt träningspass
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { validateNumber } from '@utils/validation';
import { SPACING, FONT_SIZES, BORDER_RADIUS } from '@constants/sizes';
import { WorkoutType, IntensityLevel, Workout } from '../../types';

interface LogWorkoutScreenProps {
  navigation: any;
  route: {
    params: {
      onAddWorkout: (workout: Omit<Workout, 'id' | 'userId' | 'date'>) => void;
    };
  };
}

const workoutTypes: { value: WorkoutType; label: string }[] = [
  { value: 'running', label: 'Löpning' },
  { value: 'strength', label: 'Styrketräning' },
  { value: 'cycling', label: 'Cykling' },
  { value: 'swimming', label: 'Simning' },
  { value: 'yoga', label: 'Yoga' },
  { value: 'walking', label: 'Promenad' },
  { value: 'other', label: 'Annat' },
];

export const LogWorkoutScreen: React.FC<LogWorkoutScreenProps> = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { onAddWorkout } = route.params;

  const [selectedType, setSelectedType] = useState<WorkoutType>('running');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [intensity, setIntensity] = useState<IntensityLevel>('medium');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState({
    duration: null as string | null,
    calories: null as string | null,
  });

  const handleSave = () => {
    // Validera
    const durationError = validateNumber(duration, 1, 600);
    const caloriesError = validateNumber(calories, 1, 5000);

    setErrors({
      duration: durationError,
      calories: caloriesError,
    });

    if (durationError || caloriesError) {
      return;
    }

    const workout = {
      type: workoutTypes.find((t) => t.value === selectedType)?.label || 'Träning',
      duration: parseFloat(duration),
      intensity,
      calories: parseFloat(calories),
      notes: notes || undefined,
    };

    onAddWorkout(workout);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, { color: theme.text }]}>Logga träningspass</Text>

        {/* Välj träningstyp */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Träningstyp</Text>
        <View style={styles.typeGrid}>
          {workoutTypes.map((type) => (
            <TouchableOpacity
              key={type.value}
              style={[
                styles.typeButton,
                {
                  backgroundColor: selectedType === type.value ? theme.fitness : theme.surface,
                  borderColor: selectedType === type.value ? theme.fitness : theme.border,
                },
              ]}
              onPress={() => setSelectedType(type.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  {
                    color: selectedType === type.value ? '#FFFFFF' : theme.text,
                  },
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Duration */}
        <Input
          label="Längd (minuter)"
          value={duration}
          onChangeText={(text) => {
            setDuration(text);
            setErrors({ ...errors, duration: null });
          }}
          placeholder="T.ex. 45"
          keyboardType="numeric"
          error={errors.duration}
        />

        {/* Calories */}
        <Input
          label="Kalorier förbrända"
          value={calories}
          onChangeText={(text) => {
            setCalories(text);
            setErrors({ ...errors, calories: null });
          }}
          placeholder="T.ex. 350"
          keyboardType="numeric"
          error={errors.calories}
        />

        {/* Intensity */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Intensitet</Text>
        <View style={styles.intensityButtons}>
          {(['low', 'medium', 'high'] as IntensityLevel[]).map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.intensityButton,
                {
                  backgroundColor: intensity === level ? theme.fitness : theme.surface,
                  borderColor: intensity === level ? theme.fitness : theme.border,
                },
              ]}
              onPress={() => setIntensity(level)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.intensityButtonText,
                  {
                    color: intensity === level ? '#FFFFFF' : theme.text,
                  },
                ]}
              >
                {level === 'low' ? 'Låg' : level === 'medium' ? 'Medel' : 'Hög'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Notes */}
        <Input
          label="Anteckningar (valfritt)"
          value={notes}
          onChangeText={setNotes}
          placeholder="T.ex. 5 km, känsla bra"
          multiline
          numberOfLines={3}
        />

        {/* Buttons */}
        <View style={styles.buttons}>
          <Button
            title="Spara"
            onPress={handleSave}
            style={{ flex: 1, marginRight: SPACING.sm }}
          />
          <Button
            title="Avbryt"
            onPress={() => navigation.goBack()}
            variant="outline"
            style={{ flex: 1 }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.md,
  },
  typeButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  typeButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  intensityButtons: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  intensityButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  intensityButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: SPACING.xl,
  },
});
