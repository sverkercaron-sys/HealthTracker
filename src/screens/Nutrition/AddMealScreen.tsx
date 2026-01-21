/**
 * AddMealScreen - Lägg till matvara till måltid
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { validateNumber } from '@utils/validation';
import { SPACING, FONT_SIZES } from '@constants/sizes';
import { MealType, FoodItem } from '../../types';

interface AddMealScreenProps {
  navigation: any;
  route: {
    params: {
      mealType: MealType;
      onAddFood: (food: FoodItem) => void;
    };
  };
}

export const AddMealScreen: React.FC<AddMealScreenProps> = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { mealType, onAddFood } = route.params;

  const [name, setName] = useState('');
  const [portion, setPortion] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');

  const [errors, setErrors] = useState({
    name: null as string | null,
    portion: null as string | null,
    calories: null as string | null,
    protein: null as string | null,
    carbs: null as string | null,
    fat: null as string | null,
  });

  const getMealTitle = (type: MealType): string => {
    const titles = {
      breakfast: 'Frukost',
      lunch: 'Lunch',
      dinner: 'Middag',
      snack: 'Mellanmål',
    };
    return titles[type];
  };

  const handleSave = () => {
    // Validera
    const nameError = !name ? 'Namn krävs' : null;
    const portionError = !portion ? 'Portion krävs' : null;
    const caloriesError = validateNumber(calories, 0, 10000);
    const proteinError = validateNumber(protein, 0, 1000);
    const carbsError = validateNumber(carbs, 0, 1000);
    const fatError = validateNumber(fat, 0, 1000);

    setErrors({
      name: nameError,
      portion: portionError,
      calories: caloriesError,
      protein: proteinError,
      carbs: carbsError,
      fat: fatError,
    });

    if (nameError || portionError || caloriesError || proteinError || carbsError || fatError) {
      return;
    }

    const foodItem: FoodItem = {
      name,
      portion,
      calories: parseFloat(calories),
      protein: parseFloat(protein),
      carbs: parseFloat(carbs),
      fat: parseFloat(fat),
    };

    onAddFood(foodItem);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, { color: theme.text }]}>
          Lägg till till {getMealTitle(mealType)}
        </Text>

        <Input
          label="Matvara"
          value={name}
          onChangeText={(text) => {
            setName(text);
            setErrors({ ...errors, name: null });
          }}
          placeholder="T.ex. Havregrynsgröt"
          error={errors.name}
        />

        <Input
          label="Portion"
          value={portion}
          onChangeText={(text) => {
            setPortion(text);
            setErrors({ ...errors, portion: null });
          }}
          placeholder="T.ex. 1 skål (200g)"
          error={errors.portion}
        />

        <Input
          label="Kalorier (kcal)"
          value={calories}
          onChangeText={(text) => {
            setCalories(text);
            setErrors({ ...errors, calories: null });
          }}
          placeholder="T.ex. 350"
          keyboardType="numeric"
          error={errors.calories}
        />

        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Makronutrienter (valfritt)
        </Text>

        <Input
          label="Protein (g)"
          value={protein}
          onChangeText={(text) => {
            setProtein(text);
            setErrors({ ...errors, protein: null });
          }}
          placeholder="T.ex. 12"
          keyboardType="numeric"
          error={errors.protein}
        />

        <Input
          label="Kolhydrater (g)"
          value={carbs}
          onChangeText={(text) => {
            setCarbs(text);
            setErrors({ ...errors, carbs: null });
          }}
          placeholder="T.ex. 60"
          keyboardType="numeric"
          error={errors.carbs}
        />

        <Input
          label="Fett (g)"
          value={fat}
          onChangeText={(text) => {
            setFat(text);
            setErrors({ ...errors, fat: null });
          }}
          placeholder="T.ex. 5"
          keyboardType="numeric"
          error={errors.fat}
        />

        <View style={styles.buttons}>
          <Button
            title="Spara"
            onPress={handleSave}
            style={{ flex: 1, marginRight: SPACING.sm }}
          />
          <Button
            title="Avbryt"
            onPress={() => navigation.goBack()}
            variant="outline"
            style={{ flex: 1 }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: SPACING.xl,
  },
});
