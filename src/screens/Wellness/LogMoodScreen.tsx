/**
 * LogMoodScreen - Logga humör och stress
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { MoodPicker } from '@components/wellness/MoodPicker';
import { StressSlider } from '@components/wellness/StressSlider';
import { SPACING, FONT_SIZES } from '@constants/sizes';
import { Mood } from '../../types';

interface LogMoodScreenProps {
  navigation: any;
  route: {
    params: {
      onAddMood: (mood: Omit<Mood, 'id' | 'userId' | 'date'>) => void;
    };
  };
}

export const LogMoodScreen: React.FC<LogMoodScreenProps> = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { onAddMood } = route.params;

  const [mood, setMood] = useState(3);
  const [stress, setStress] = useState(5);
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    const moodData = {
      mood,
      stress,
      notes: notes || undefined,
    };

    onAddMood(moodData);
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
        <Text style={[styles.title, { color: theme.text }]}>Logga humör</Text>

        <MoodPicker value={mood} onChange={setMood} />

        <StressSlider value={stress} onChange={setStress} />

        <Input
          label="Anteckningar (valfritt)"
          value={notes}
          onChangeText={setNotes}
          placeholder="Vad påverkar ditt humör idag?"
          multiline
          numberOfLines={4}
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
  buttons: {
    flexDirection: 'row',
    marginTop: SPACING.xl,
  },
});
