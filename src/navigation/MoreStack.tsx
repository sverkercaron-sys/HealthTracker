/**
 * MoreStack - Stack navigator för Mer-sektionen
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@context/ThemeContext';
import { MoreScreen } from '@screens/Settings/MoreScreen';
import { SettingsScreen } from '@screens/Settings/SettingsScreen';

export type MoreStackParamList = {
  MoreMain: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<MoreStackParamList>();

export const MoreStack: React.FC = () => {
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
        name="MoreMain"
        component={MoreScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
