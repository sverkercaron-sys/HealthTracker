/**
 * Nutrition Screen - Mat och kalorier tracking
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { ProgressBar } from '@components/ProgressBar';
import { MacroBreakdown } from '@components/nutrition/MacroBreakdown';
import { MealSection } from '@components/nutrition/MealSection';
import { SPACING, FONT_SIZES } from '@constants/sizes';
import { FoodItem, MealType } from '../../types';

export const NutritionScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const { theme } = useTheme();

  // Mock data - kommer ersättas med riktig data från databas
  const [caloriesGoal] = useState(2000);
  const [meals, setMeals] = useState<Record<MealType, FoodItem[]>>({
    breakfast: [
      {
        name: 'Havregrynsgröt',
        portion: '1 skål (200g)',
        calories: 350,
        protein: 12,
        carbs: 60,
        fat: 5,
      },
      {
        name: 'Banan',
        portion: '1 st',
        calories: 105,
        protein: 1,
        carbs: 27,
        fat: 0,
      },
    ],
    lunch: [
      {
        name: 'Kycklingpasta',
        portion: '300g',
        calories: 520,
        protein: 35,
        carbs: 65,
        fat: 12,
      },
    ],
    dinner: [],
    snack: [
      {
        name: 'Proteinbar',
        portion: '1 st (60g)',
        calories: 220,
        protein: 20,
        carbs: 15,
        fat: 8,
      },
    ],
  });

  const calculateTotals = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    Object.values(meals).forEach((mealItems) => {
      mealItems.forEach((item) => {
        totalCalories += item.calories;
        totalProtein += item.protein;
        totalCarbs += item.carbs;
        totalFat += item.fat;
      });
    });

    return { totalCalories, totalProtein, totalCarbs, totalFat };
  };

  const { totalCalories, totalProtein, totalCarbs, totalFat } = calculateTotals();
  const progress = totalCalories / caloriesGoal;
  const remaining = caloriesGoal - totalCalories;

  const handleAddFood = (mealType: MealType) => {
    if (navigation) {
      navigation.navigate('AddMeal', {
        mealType,
        onAddFood: (food: FoodItem) => {
          setMeals({
            ...meals,
            [mealType]: [...meals[mealType], food],
          });
        },
      });
    }
  };

  const handleDeleteFood = (mealType: MealType, index: number) => {
    const updatedMeals = [...meals[mealType]];
    updatedMeals.splice(index, 1);
    setMeals({
      ...meals,
      [mealType]: updatedMeals,
    });
  };

  const getCurrentDate = () => {
    const days = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
    const now = new Date();
    return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Nutrition</Text>
        <Text style={[styles.date, { color: theme.textSecondary }]}>{getCurrentDate()}</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Dagens sammanfattning */}
        <View style={[styles.summary, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.caloriesRow}>
            <Text style={[styles.caloriesLabel, { color: theme.textSecondary }]}>
              Kalorier
            </Text>
            <Text style={[styles.caloriesValue, { color: theme.nutrition }]}>
              {totalCalories} / {caloriesGoal} kcal
            </Text>
          </View>
          <ProgressBar progress={progress} color={theme.nutrition} height={10} />
          <Text style={[styles.remaining, { color: theme.textSecondary }]}>
            {remaining > 0 ? `${remaining} kvar` : `${Math.abs(remaining)} över mål`}
          </Text>

          <MacroBreakdown
            protein={totalProtein}
            carbs={totalCarbs}
            fat={totalFat}
          />
        </View>

        {/* Måltidssektioner */}
        <MealSection
          mealType="breakfast"
          title="Frukost"
          items={meals.breakfast}
          onAddFood={() => handleAddFood('breakfast')}
          onDeleteFood={(index) => handleDeleteFood('breakfast', index)}
        />

        <MealSection
          mealType="lunch"
          title="Lunch"
          items={meals.lunch}
          onAddFood={() => handleAddFood('lunch')}
          onDeleteFood={(index) => handleDeleteFood('lunch', index)}
        />

        <MealSection
          mealType="dinner"
          title="Middag"
          items={meals.dinner}
          onAddFood={() => handleAddFood('dinner')}
          onDeleteFood={(index) => handleDeleteFood('dinner', index)}
        />

        <MealSection
          mealType="snack"
          title="Mellanmål"
          items={meals.snack}
          onAddFood={() => handleAddFood('snack')}
          onDeleteFood={(index) => handleDeleteFood('snack', index)}
        />

        {/* Spacing */}
        <View style={{ height: SPACING.xl }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl + 20,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    fontSize: FONT_SIZES.sm,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.lg,
  },
  summary: {
    padding: SPACING.md,
    borderRadius: 16,
    marginBottom: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  caloriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  caloriesLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  caloriesValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
  },
  remaining: {
    fontSize: FONT_SIZES.xs,
    marginTop: SPACING.xs,
  },
});
