/**
 * LogSleepScreen - Logga sömn
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@context/ThemeContext';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { validateNumber } from '@utils/validation';
import { SPACING, FONT_SIZES } from '@constants/sizes';
import { Sleep } from '../../types';

interface LogSleepScreenProps {
  navigation: any;
  route: {
    params: {
      onAddSleep: (sleep: Omit<Sleep, 'id' | 'userId' | 'date'>) => void;
    };
  };
}

export const LogSleepScreen: React.FC<LogSleepScreenProps> = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { onAddSleep } = route.params;

  const [hours, setHours] = useState('');
  const [quality, setQuality] = useState(3);
  const [bedTime, setBedTime] = useState('22:00');
  const [wakeTime, setWakeTime] = useState('06:30');

  const [errors, setErrors] = useState({
    hours: null as string | null,
  });

  const handleSave = () => {
    const hoursError = validateNumber(hours, 0, 24);

    setErrors({ hours: hoursError });

    if (hoursError) {
      return;
    }

    const sleep = {
      hours: parseFloat(hours),
      quality,
      bedTime,
      wakeTime,
    };

    onAddSleep(sleep);
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
        <Text style={[styles.title, { color: theme.text }]}>Logga sömn</Text>

        <Input
          label="Antal timmar"
          value={hours}
          onChangeText={(text) => {
            setHours(text);
            setErrors({ ...errors, hours: null });
          }}
          placeholder="T.ex. 7.5"
          keyboardType="numeric"
          error={errors.hours}
        />

        <Input
          label="Lägg-tid"
          value={bedTime}
          onChangeText={setBedTime}
          placeholder="T.ex. 22:00"
        />

        <Input
          label="Uppvaknings-tid"
          value={wakeTime}
          onChangeText={setWakeTime}
          placeholder="T.ex. 06:30"
        />

        {/* Kvalitet */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Sömnkvalitet</Text>
        <View style={styles.qualityContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setQuality(star)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={star <= quality ? 'star' : 'star-outline'}
                size={48}
                color={star <= quality ? theme.warning : theme.border}
                style={{ marginRight: SPACING.sm }}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={[styles.qualityText, { color: theme.textSecondary }]}>
          {quality === 1 && 'Mycket dålig'}
          {quality === 2 && 'Dålig'}
          {quality === 3 && 'Okej'}
          {quality === 4 && 'Bra'}
          {quality === 5 && 'Utmärkt'}
        </Text>

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
    marginBottom: SPACING.md,
    marginTop: SPACING.md,
  },
  qualityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  qualityText: {
    fontSize: FONT_SIZES.md,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: SPACING.xl,
  },
});
