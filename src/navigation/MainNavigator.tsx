/**
 * Main Navigator - Navigation för inloggade användare
 * Kommer utökas med tab navigation i STEG 3
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DashboardScreen } from '@screens/Dashboard/DashboardScreen';

export type MainStackParamList = {
  Dashboard: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

export const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
};
