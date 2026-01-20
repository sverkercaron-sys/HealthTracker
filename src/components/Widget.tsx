/**
 * Widget - Generisk widget-container för dashboard
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { SPACING, FONT_SIZES, BORDER_RADIUS } from '@constants/sizes';

interface WidgetProps {
  title: string;
  children: React.ReactNode;
  onPress?: () => void;
  color?: string;
}

export const Widget: React.FC<WidgetProps> = ({ title, children, onPress, color }) => {
  const { theme } = useTheme();
  const backgroundColor = theme.cardBackground;

  const content = (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: color || theme.text }]}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
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
  title: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  content: {
    marginTop: SPACING.xs,
  },
});
