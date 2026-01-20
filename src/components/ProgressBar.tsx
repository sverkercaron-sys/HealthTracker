/**
 * ProgressBar - Horisontell progress bar
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { BORDER_RADIUS } from '@constants/sizes';

interface ProgressBarProps {
  progress: number; // 0-1
  height?: number;
  color?: string;
  backgroundColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  color,
  backgroundColor,
}) => {
  const { theme } = useTheme();
  const barColor = color || theme.primary;
  const bgColor = backgroundColor || theme.border;
  const progressValue = Math.min(Math.max(progress, 0), 1) * 100;

  return (
    <View style={[styles.container, { height, backgroundColor: bgColor }]}>
      <View
        style={[
          styles.progress,
          {
            width: `${progressValue}%`,
            backgroundColor: barColor,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: BORDER_RADIUS.sm,
  },
});
