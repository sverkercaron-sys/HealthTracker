/**
 * WaterWidget - Visa vattenintag med quick add
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@context/ThemeContext';
import { Widget } from '@components/Widget';
import { ProgressBar } from '@components/ProgressBar';
import { SPACING, FONT_SIZES, BORDER_RADIUS } from '@constants/sizes';

interface WaterWidgetProps {
  glasses: number;
  goal: number;
  onPress?: () => void;
  onAddGlass?: () => void;
}

export const WaterWidget: React.FC<WaterWidgetProps> = ({
  glasses,
  goal,
  onPress,
  onAddGlass,
}) => {
  const { theme } = useTheme();
  const progress = glasses / goal;

  return (
    <Widget title="Vatten" onPress={onPress} color={theme.info}>
      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.glassContainer}>
            <Ionicons name="water" size={48} color={theme.info} />
            <View
              style={[
                styles.waterLevel,
                {
                  height: `${Math.min(progress * 100, 100)}%`,
                  backgroundColor: theme.info + '30',
                },
              ]}
            />
          </View>
          <View style={styles.info}>
            <Text style={[styles.glassesText, { color: theme.text }]}>
              {glasses} / {goal} glas
            </Text>
            <ProgressBar progress={progress} color={theme.info} height={8} />
            <Text style={[styles.percentText, { color: theme.textSecondary }]}>
              {Math.round(progress * 100)}% av dagligt mål
            </Text>
          </View>
        </View>

        {/* Quick add button */}
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.info }]}
          onPress={onAddGlass}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Lägg till 1 glas</Text>
        </TouchableOpacity>
      </View>
    </Widget>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: SPACING.xs,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  glassContainer: {
    width: 60,
    height: 60,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  waterLevel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  info: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  glassesText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  percentText: {
    fontSize: FONT_SIZES.xs,
    marginTop: SPACING.xs,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
});
