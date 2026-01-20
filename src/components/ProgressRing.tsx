/**
 * ProgressRing - Cirkulär progress indikator
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import { useTheme } from '@context/ThemeContext';
import { FONT_SIZES } from '@constants/sizes';

interface ProgressRingProps {
  progress: number; // 0-1
  size?: number;
  strokeWidth?: number;
  color?: string;
  centerText?: string;
  centerSubtext?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 10,
  color,
  centerText,
  centerSubtext,
}) => {
  const { theme } = useTheme();
  const ringColor = color || theme.primary;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progressValue = Math.min(Math.max(progress, 0), 1);
  const strokeDashoffset = circumference - progressValue * circumference;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.border}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={ringColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      {centerText && (
        <View style={styles.centerContent}>
          <Text style={[styles.centerText, { color: theme.text }]}>{centerText}</Text>
          {centerSubtext && (
            <Text style={[styles.centerSubtext, { color: theme.textSecondary }]}>
              {centerSubtext}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
  },
  centerSubtext: {
    fontSize: FONT_SIZES.xs,
    marginTop: 2,
  },
});
