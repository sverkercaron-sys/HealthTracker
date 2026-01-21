/**
 * StressSlider - Slider för stressnivå
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { SPACING, FONT_SIZES } from '@constants/sizes';

interface StressSliderProps {
  value: number; // 1-10
  onChange: (stress: number) => void;
}

export const StressSlider: React.FC<StressSliderProps> = ({ value, onChange }) => {
  const { theme } = useTheme();

  const getStressColor = (level: number) => {
    if (level <= 3) return '#4CAF50'; // Låg - grön
    if (level <= 6) return '#FF9800'; // Medel - orange
    return '#F44336'; // Hög - röd
  };

  const getStressLabel = (level: number) => {
    if (level <= 3) return 'Låg stress';
    if (level <= 6) return 'Måttlig stress';
    return 'Hög stress';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.label, { color: theme.text }]}>Stressnivå</Text>
        <View style={styles.valueContainer}>
          <Text style={[styles.value, { color: getStressColor(value) }]}>{value}/10</Text>
          <Text style={[styles.valueLabel, { color: theme.textSecondary }]}>
            {getStressLabel(value)}
          </Text>
        </View>
      </View>

      <View style={styles.slider}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
          <View
            key={level}
            style={[
              styles.sliderButton,
              {
                backgroundColor: value >= level ? getStressColor(value) : theme.border,
              },
            ]}
            onTouchEnd={() => onChange(level)}
          />
        ))}
      </View>

      <View style={styles.labels}>
        <Text style={[styles.minLabel, { color: theme.textSecondary }]}>Ingen stress</Text>
        <Text style={[styles.maxLabel, { color: theme.textSecondary }]}>Mycket hög</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  valueContainer: {
    alignItems: 'flex-end',
  },
  value: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
  },
  valueLabel: {
    fontSize: FONT_SIZES.xs,
  },
  slider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  sliderButton: {
    width: '8%',
    aspectRatio: 1,
    borderRadius: 4,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  minLabel: {
    fontSize: FONT_SIZES.xs,
  },
  maxLabel: {
    fontSize: FONT_SIZES.xs,
  },
});
