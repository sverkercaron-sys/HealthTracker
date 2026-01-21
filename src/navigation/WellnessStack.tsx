/**
 * WellnessStack - Stack navigator för Wellness-sektionen
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@context/ThemeContext';
import { WellnessScreen } from '@screens/Wellness/WellnessScreen';
import { LogSleepScreen } from '@screens/Wellness/LogSleepScreen';
import { LogMoodScreen } from '@screens/Wellness/LogMoodScreen';

export type WellnessStackParamList = {
  WellnessMain: undefined;
  LogSleep: {
    onAddSleep: (sleep: any) => void;
  };
  LogMood: {
    onAddMood: (mood: any) => void;
  };
};

const Stack = createStackNavigator<WellnessStackParamList>();

export const WellnessStack: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.surface,
          borderBottomColor: theme.border,
          borderBottomWidth: 1,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="WellnessMain"
        component={WellnessScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LogSleep"
        component={LogSleepScreen}
        options={{
          title: 'Logga sömn',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="LogMood"
        component={LogMoodScreen}
        options={{
          title: 'Logga humör',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};
