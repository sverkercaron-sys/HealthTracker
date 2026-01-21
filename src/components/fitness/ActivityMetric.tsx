/**
 * ActivityMetric - Visa ett aktivitetsmått
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@context/ThemeContext';
import { SPACING, FONT_SIZES, BORDER_RADIUS } from '@constants/sizes';

interface ActivityMetricProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
}

export const ActivityMetric: React.FC<ActivityMetricProps> = ({
  icon,
  label,
  value,
  unit,
  color,
}) => {
  const { theme } = useTheme();
  const metricColor = color || theme.fitness;

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={[styles.iconContainer, { backgroundColor: metricColor + '20' }]}>
        <Ionicons name={icon} size={24} color={metricColor} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>{label}</Text>
        <Text style={[styles.value, { color: theme.text }]}>
          {value}
          {unit && <Text style={[styles.unit, { color: theme.textSecondary }]}> {unit}</Text>}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: FONT_SIZES.xs,
    marginBottom: 2,
  },
  value: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
  unit: {
    fontSize: FONT_SIZES.sm,
    fontWeight: 'normal',
  },
});
