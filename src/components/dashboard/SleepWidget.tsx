/**
 * SleepWidget - Visa sömntimmar och kvalitet
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@context/ThemeContext';
import { Widget } from '@components/Widget';
import { ProgressBar } from '@components/ProgressBar';
import { SPACING, FONT_SIZES } from '@constants/sizes';

interface SleepWidgetProps {
  hours: number;
  quality: number; // 1-5
  goal?: number;
  onPress?: () => void;
}

export const SleepWidget: React.FC<SleepWidgetProps> = ({
  hours,
  quality,
  goal = 8,
  onPress,
}) => {
  const { theme } = useTheme();
  const progress = hours / goal;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= quality ? 'star' : 'star-outline'}
          size={16}
          color={i <= quality ? theme.warning : theme.border}
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  return (
    <Widget title="Sömn" onPress={onPress} color={theme.wellness}>
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <Ionicons name="moon" size={40} color={theme.wellness} />
          </View>
          <View style={styles.info}>
            <Text style={[styles.hoursText, { color: theme.text }]}>
              {hours.toFixed(1)} timmar
            </Text>
            <View style={styles.qualityRow}>
              <Text style={[styles.qualityLabel, { color: theme.textSecondary }]}>Kvalitet: </Text>
              {renderStars()}
            </View>
          </View>
        </View>

        <View style={styles.progressSection}>
          <ProgressBar progress={progress} color={theme.wellness} height={6} />
          <Text style={[styles.goalText, { color: theme.textSecondary }]}>
            Mål: {goal} timmar
          </Text>
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
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  iconContainer: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  hoursText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  qualityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qualityLabel: {
    fontSize: FONT_SIZES.xs,
  },
  progressSection: {
    marginTop: SPACING.xs,
  },
  goalText: {
    fontSize: FONT_SIZES.xs,
    marginTop: SPACING.xs,
  },
});
