/**
 * MoodPicker - Välj humör med emojis
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { SPACING, FONT_SIZES } from '@constants/sizes';

interface MoodPickerProps {
  value: number; // 1-5
  onChange: (mood: number) => void;
}

const moods = [
  { value: 1, emoji: '😢', label: 'Mycket dåligt' },
  { value: 2, emoji: '🙁', label: 'Dåligt' },
  { value: 3, emoji: '😐', label: 'Okej' },
  { value: 4, emoji: '😊', label: 'Bra' },
  { value: 5, emoji: '😃', label: 'Utmärkt' },
];

export const MoodPicker: React.FC<MoodPickerProps> = ({ value, onChange }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.text }]}>Hur känner du dig idag?</Text>
      <View style={styles.moodsContainer}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.value}
            style={[
              styles.moodButton,
              {
                backgroundColor: value === mood.value ? theme.wellness + '20' : theme.surface,
                borderColor: value === mood.value ? theme.wellness : theme.border,
              },
            ]}
            onPress={() => onChange(mood.value)}
            activeOpacity={0.7}
          >
            <Text style={styles.emoji}>{mood.emoji}</Text>
            <Text
              style={[
                styles.moodLabel,
                { color: value === mood.value ? theme.wellness : theme.textSecondary },
              ]}
            >
              {mood.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  moodsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodButton: {
    width: '18%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: SPACING.sm,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: FONT_SIZES.xs,
    textAlign: 'center',
  },
});
