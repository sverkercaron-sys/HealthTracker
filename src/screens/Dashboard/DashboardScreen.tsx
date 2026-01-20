/**
 * Dashboard Screen - Huvudöversikt med widgets
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { StepsWidget } from '@components/dashboard/StepsWidget';
import { CaloriesWidget } from '@components/dashboard/CaloriesWidget';
import { WorkoutWidget } from '@components/dashboard/WorkoutWidget';
import { WaterWidget } from '@components/dashboard/WaterWidget';
import { SleepWidget } from '@components/dashboard/SleepWidget';
import { QuickActionFAB } from '@components/dashboard/QuickActionFAB';
import { SPACING, FONT_SIZES } from '@constants/sizes';

export const DashboardScreen: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();

  // Mock data - kommer ersättas med riktig data från databas/API
  const [steps] = useState(7234);
  const [stepsGoal] = useState(10000);
  const [caloriesIntake] = useState(1650);
  const [caloriesBurned] = useState(2100);
  const [caloriesGoal] = useState(2000);
  const [waterGlasses, setWaterGlasses] = useState(5);
  const [waterGoal] = useState(8);
  const [sleepHours] = useState(7.5);
  const [sleepQuality] = useState(4);
  const [workout] = useState({
    type: 'Löpning',
    duration: 45,
    calories: 450,
  });

  const handleAddWater = () => {
    setWaterGlasses(waterGlasses + 1);
    Alert.alert('Bra jobbat!', 'Ett glas vatten tillagt.');
  };

  const quickActions = [
    {
      icon: 'restaurant-outline' as const,
      label: 'Logga måltid',
      color: theme.nutrition,
      onPress: () => Alert.alert('Info', 'Nutrition tracking kommer i STEG 5!'),
    },
    {
      icon: 'barbell-outline' as const,
      label: 'Logga träning',
      color: theme.fitness,
      onPress: () => Alert.alert('Info', 'Fitness tracking kommer i STEG 6!'),
    },
    {
      icon: 'water-outline' as const,
      label: 'Logga vatten',
      color: theme.info,
      onPress: handleAddWater,
    },
    {
      icon: 'scale-outline' as const,
      label: 'Lägg till mätning',
      color: theme.metrics,
      onPress: () => Alert.alert('Info', 'Health metrics kommer i STEG 8!'),
    },
  ];

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
        <View>
          <Text style={[styles.greeting, { color: theme.textSecondary }]}>Hej,</Text>
          <Text style={[styles.name, { color: theme.text }]}>{user?.name}!</Text>
          <Text style={[styles.date, { color: theme.textSecondary }]}>{getCurrentDate()}</Text>
        </View>
        <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
      </View>

      {/* Widgets */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <StepsWidget
          steps={steps}
          goal={stepsGoal}
          onPress={() => Alert.alert('Info', 'Går till Fitness-screen')}
        />

        <CaloriesWidget
          intake={caloriesIntake}
          burned={caloriesBurned}
          goal={caloriesGoal}
          onPress={() => Alert.alert('Info', 'Går till Nutrition-screen')}
        />

        <WorkoutWidget
          workout={workout}
          onPress={() => Alert.alert('Info', 'Går till Fitness-screen')}
          onLogWorkout={() => Alert.alert('Info', 'Logga träning kommer i STEG 6!')}
        />

        <WaterWidget
          glasses={waterGlasses}
          goal={waterGoal}
          onPress={() => Alert.alert('Info', 'Går till Nutrition-screen')}
          onAddGlass={handleAddWater}
        />

        <SleepWidget
          hours={sleepHours}
          quality={sleepQuality}
          onPress={() => Alert.alert('Info', 'Går till Wellness-screen')}
        />

        {/* Spacing for FAB */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <QuickActionFAB actions={quickActions} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    paddingTop: SPACING.xl + 20,
  },
  greeting: {
    fontSize: FONT_SIZES.sm,
  },
  name: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  date: {
    fontSize: FONT_SIZES.xs,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.lg,
  },
});
