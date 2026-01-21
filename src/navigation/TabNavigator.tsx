/**
 * Tab Navigator - Bottom tab navigation med 5 huvudsektioner
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@context/ThemeContext';
import { DashboardScreen } from '@screens/Dashboard/DashboardScreen';
import { NutritionStack } from './NutritionStack';
import { FitnessStack } from './FitnessStack';
import { WellnessStack } from './WellnessStack';
import { MoreScreen } from '@screens/Settings/MoreScreen';
import { ICON_SIZES } from '@constants/sizes';

export type TabParamList = {
  DashboardTab: undefined;
  NutritionTab: undefined;
  FitnessTab: undefined;
  WellnessTab: undefined;
  MoreTab: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="DashboardTab"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Hem',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={ICON_SIZES.md}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="NutritionTab"
        component={NutritionStack}
        options={{
          tabBarLabel: 'Nutrition',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'restaurant' : 'restaurant-outline'}
              size={ICON_SIZES.md}
              color={color}
            />
          ),
          tabBarActiveTintColor: theme.nutrition,
        }}
      />
      <Tab.Screen
        name="FitnessTab"
        component={FitnessStack}
        options={{
          tabBarLabel: 'Fitness',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'barbell' : 'barbell-outline'}
              size={ICON_SIZES.md}
              color={color}
            />
          ),
          tabBarActiveTintColor: theme.fitness,
        }}
      />
      <Tab.Screen
        name="WellnessTab"
        component={WellnessStack}
        options={{
          tabBarLabel: 'Wellness',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              size={ICON_SIZES.md}
              color={color}
            />
          ),
          tabBarActiveTintColor: theme.wellness,
        }}
      />
      <Tab.Screen
        name="MoreTab"
        component={MoreScreen}
        options={{
          tabBarLabel: 'Mer',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'menu' : 'menu-outline'}
              size={ICON_SIZES.md}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
