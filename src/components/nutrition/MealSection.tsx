/**
 * MealSection - Kollapsbar måltidssektion
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@context/ThemeContext';
import { FoodItem as FoodItemComponent } from './FoodItem';
import { SPACING, FONT_SIZES, BORDER_RADIUS } from '@constants/sizes';
import { FoodItem, MealType } from '../../types';

interface MealSectionProps {
  mealType: MealType;
  title: string;
  items: FoodItem[];
  onAddFood: () => void;
  onDeleteFood: (index: number) => void;
}

export const MealSection: React.FC<MealSectionProps> = ({
  mealType,
  title,
  items,
  onAddFood,
  onDeleteFood,
}) => {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(true);

  const totalCalories = items.reduce((sum, item) => sum + item.calories, 0);

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      {/* Header */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.calories, { color: theme.nutrition }]}>
            {totalCalories} kcal
          </Text>
        </View>
        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={theme.textSecondary}
        />
      </TouchableOpacity>

      {/* Content */}
      {isExpanded && (
        <View style={styles.content}>
          {items.length > 0 ? (
            items.map((item, index) => (
              <FoodItemComponent
                key={index}
                item={item}
                onDelete={() => onDeleteFood(index)}
              />
            ))
          ) : (
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              Inga matvaror loggade
            </Text>
          )}

          <TouchableOpacity
            style={[styles.addButton, { borderColor: theme.nutrition }]}
            onPress={onAddFood}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={20} color={theme.nutrition} />
            <Text style={[styles.addButtonText, { color: theme.nutrition }]}>
              Lägg till matvara
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    marginRight: SPACING.md,
  },
  calories: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
  emptyText: {
    fontSize: FONT_SIZES.sm,
    textAlign: 'center',
    paddingVertical: SPACING.md,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.sm,
    borderWidth: 2,
    borderRadius: BORDER_RADIUS.md,
    borderStyle: 'dashed',
    marginTop: SPACING.sm,
  },
  addButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
});
