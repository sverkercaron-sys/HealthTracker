/**
 * Nutrition Stack Navigator - Stack navigation för nutrition-sektionen
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NutritionScreen } from '@screens/Nutrition/NutritionScreen';
import { AddMealScreen } from '@screens/Nutrition/AddMealScreen';
import { MealType, FoodItem } from '../types';

export type NutritionStackParamList = {
  NutritionMain: undefined;
  AddMeal: {
    mealType: MealType;
    onAddFood: (food: FoodItem) => void;
  };
};

const Stack = createStackNavigator<NutritionStackParamList>();

export const NutritionStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="NutritionMain" component={NutritionScreen} />
      <Stack.Screen
        name="AddMeal"
        component={AddMealScreen}
        options={{
          headerShown: true,
          headerTitle: 'Lägg till matvara',
        }}
      />
    </Stack.Navigator>
  );
};
