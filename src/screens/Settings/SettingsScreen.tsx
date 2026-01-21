/**
 * Settings Screen - Hantera användarinställningar och mål
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@context/ThemeContext';
import { useSettings } from '@context/SettingsContext';
import { useAuth } from '@context/AuthContext';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { SPACING, FONT_SIZES, BORDER_RADIUS } from '@constants/sizes';
import { validateNumber } from '@utils/validation';

interface SettingsScreenProps {
  navigation?: any;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { theme, isDark, toggleTheme } = useTheme();
  const { settings, updateSettings } = useSettings();
  const { user, updateUserProfile } = useAuth();

  // Mål-inställningar
  const [stepGoal, setStepGoal] = useState(settings.dailyStepGoal.toString());
  const [calorieGoal, setCalorieGoal] = useState(settings.dailyCalorieGoal.toString());
  const [waterGoal, setWaterGoal] = useState(settings.dailyWaterGoal.toString());

  // Profil-inställningar
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  // Notifikationer
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    settings.notificationsEnabled
  );

  const [errors, setErrors] = useState({
    stepGoal: null as string | null,
    calorieGoal: null as string | null,
    waterGoal: null as string | null,
  });

  const handleSaveGoals = () => {
    // Validera inputs
    const stepError = validateNumber(stepGoal, 1000, 50000);
    const calorieError = validateNumber(calorieGoal, 1000, 5000);
    const waterError = validateNumber(waterGoal, 1, 20);

    setErrors({
      stepGoal: stepError,
      calorieGoal: calorieError,
      waterGoal: waterError,
    });

    if (stepError || calorieError || waterError) {
      return;
    }

    // Spara inställningar
    updateSettings({
      dailyStepGoal: parseInt(stepGoal),
      dailyCalorieGoal: parseInt(calorieGoal),
      dailyWaterGoal: parseInt(waterGoal),
      notificationsEnabled,
    });

    Alert.alert('Sparat!', 'Dina mål har uppdaterats');
  };

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      Alert.alert('Fel', 'Namn får inte vara tomt');
      return;
    }

    await updateUserProfile({ name, email });
    Alert.alert('Sparat!', 'Din profil har uppdaterats');
  };

  const handleToggleNotifications = (value: boolean) => {
    setNotificationsEnabled(value);
    updateSettings({ notificationsEnabled: value });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        {navigation && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
        )}
        <Text style={[styles.title, { color: theme.text }]}>Inställningar</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Dagliga Mål */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Dagliga Mål</Text>
          <View style={[styles.card, { backgroundColor: theme.surface }]}>
            <Input
              label="Stegmål per dag"
              value={stepGoal}
              onChangeText={(text) => {
                setStepGoal(text);
                setErrors({ ...errors, stepGoal: null });
              }}
              placeholder="t.ex. 10000"
              keyboardType="number-pad"
              error={errors.stepGoal}
              icon="footsteps-outline"
            />

            <Input
              label="Kalorimål per dag (kcal)"
              value={calorieGoal}
              onChangeText={(text) => {
                setCalorieGoal(text);
                setErrors({ ...errors, calorieGoal: null });
              }}
              placeholder="t.ex. 2000"
              keyboardType="number-pad"
              error={errors.calorieGoal}
              icon="flame-outline"
            />

            <Input
              label="Vattenmål per dag (glas)"
              value={waterGoal}
              onChangeText={(text) => {
                setWaterGoal(text);
                setErrors({ ...errors, waterGoal: null });
              }}
              placeholder="t.ex. 8"
              keyboardType="number-pad"
              error={errors.waterGoal}
              icon="water-outline"
            />

            <Button title="Spara Mål" onPress={handleSaveGoals} />
          </View>
        </View>

        {/* Profil */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Profil</Text>
          <View style={[styles.card, { backgroundColor: theme.surface }]}>
            <Input
              label="Namn"
              value={name}
              onChangeText={setName}
              placeholder="Ditt namn"
              icon="person-outline"
            />

            <Input
              label="E-post"
              value={email}
              onChangeText={setEmail}
              placeholder="din@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail-outline"
            />

            <Button title="Spara Profil" onPress={handleSaveProfile} variant="secondary" />
          </View>
        </View>

        {/* Tema */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Utseende</Text>
          <View style={[styles.card, { backgroundColor: theme.surface }]}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons
                  name={isDark ? 'moon' : 'sunny'}
                  size={24}
                  color={theme.primary}
                  style={styles.settingIcon}
                />
                <View>
                  <Text style={[styles.settingTitle, { color: theme.text }]}>
                    {isDark ? 'Mörkt' : 'Ljust'} tema
                  </Text>
                  <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>
                    Anpassa utseende efter din preferens
                  </Text>
                </View>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: '#767577', true: theme.primary }}
                thumbColor={isDark ? '#f4f3f4' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        {/* Notifikationer */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Notifikationer</Text>
          <View style={[styles.card, { backgroundColor: theme.surface }]}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color={theme.primary}
                  style={styles.settingIcon}
                />
                <View>
                  <Text style={[styles.settingTitle, { color: theme.text }]}>
                    Push-notifikationer
                  </Text>
                  <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>
                    Få påminnelser om dina mål
                  </Text>
                </View>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={handleToggleNotifications}
                trackColor={{ false: '#767577', true: theme.primary }}
                thumbColor={notificationsEnabled ? '#f4f3f4' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        {/* Info */}
        <View style={styles.infoSection}>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            Ändringarna sparas automatiskt
          </Text>
          <Text style={[styles.versionText, { color: theme.textSecondary }]}>
            HealthTracker v1.0.0
          </Text>
        </View>

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
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    paddingTop: SPACING.xl + 20,
  },
  backButton: {
    marginRight: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  card: {
    marginHorizontal: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: SPACING.md,
  },
  settingTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: FONT_SIZES.xs,
  },
  infoSection: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  infoText: {
    fontSize: FONT_SIZES.sm,
    marginBottom: SPACING.xs,
  },
  versionText: {
    fontSize: FONT_SIZES.xs,
  },
});
