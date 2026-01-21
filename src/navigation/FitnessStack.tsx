/**
 * Fitness Stack Navigator - Stack navigation för fitness-sektionen
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FitnessScreen } from '@screens/Fitness/FitnessScreen';
import { LogWorkoutScreen } from '@screens/Fitness/LogWorkoutScreen';
import { Workout } from '../types';

export type FitnessStackParamList = {
  FitnessMain: undefined;
  LogWorkout: {
    onAddWorkout: (workout: Omit<Workout, 'id' | 'userId' | 'date'>) => void;
  };
};

const Stack = createStackNavigator<FitnessStackParamList>();

export const FitnessStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="FitnessMain" component={FitnessScreen} />
      <Stack.Screen
        name="LogWorkout"
        component={LogWorkoutScreen}
        options={{
          headerShown: true,
          headerTitle: 'Logga träning',
        }}
      />
    </Stack.Navigator>
  );
};
