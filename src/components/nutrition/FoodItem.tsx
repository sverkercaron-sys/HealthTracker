/**
 * FoodItem - Visa en matvarupost
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@context/ThemeContext';
import { SPACING, FONT_SIZES, BORDER_RADIUS } from '@constants/sizes';
import { FoodItem as FoodItemType } from '../../types';

interface FoodItemProps {
  item: FoodItemType;
  onDelete?: () => void;
}

export const FoodItem: React.FC<FoodItemProps> = ({ item, onDelete }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={styles.content}>
        <View style={styles.info}>
          <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
          <Text style={[styles.portion, { color: theme.textSecondary }]}>
            {item.portion}
          </Text>
        </View>
        <View style={styles.right}>
          <Text style={[styles.calories, { color: theme.nutrition }]}>
            {item.calories} kcal
          </Text>
          {onDelete && (
            <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={20} color={theme.error} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.macros}>
        <Text style={[styles.macroText, { color: theme.textSecondary }]}>
          P: {item.protein}g • K: {item.carbs}g • F: {item.fat}g
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    marginBottom: 2,
  },
  portion: {
    fontSize: FONT_SIZES.xs,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calories: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    marginRight: SPACING.sm,
  },
  deleteButton: {
    padding: SPACING.xs,
  },
  macros: {
    marginTop: SPACING.xs,
  },
  macroText: {
    fontSize: FONT_SIZES.xs,
  },
});
