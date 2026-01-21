/**
 * Wellness Screen - Sömn, humör och välmående tracking
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { Button } from '@components/Button';
import { SPACING, FONT_SIZES, BORDER_RADIUS } from '@constants/sizes';
import { Sleep, Mood } from '../../types';

export const WellnessScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const { theme } = useTheme();

  // Mock data - kommer ersättas med riktig data
  const [sleepData, setSleepData] = useState<Array<Sleep & { id: string }>>([
    {
      id: '1',
      userId: 'user1',
      date: new Date(),
      hours: 7.5,
      quality: 4,
      bedTime: '23:00',
      wakeTime: '06:30',
    },
  ]);

  const [moodData, setMoodData] = useState<Array<Mood & { id: string }>>([
    {
      id: '1',
      userId: 'user1',
      date: new Date(),
      mood: 4,
      stress: 3,
      notes: 'Känner mig pigg och utvilad',
    },
  ]);

  const handleAddSleep = () => {
    if (navigation) {
      navigation.navigate('LogSleep', {
        onAddSleep: (sleep: Omit<Sleep, 'id' | 'userId' | 'date'>) => {
          const newSleep: Sleep & { id: string } = {
            ...sleep,
            id: Date.now().toString(),
            userId: 'user1',
            date: new Date(),
          };
          setSleepData([newSleep, ...sleepData]);
        },
      });
    }
  };

  const handleAddMood = () => {
    if (navigation) {
      navigation.navigate('LogMood', {
        onAddMood: (mood: Omit<Mood, 'id' | 'userId' | 'date'>) => {
          const newMood: Mood & { id: string } = {
            ...mood,
            id: Date.now().toString(),
            userId: 'user1',
            date: new Date(),
          };
          setMoodData([newMood, ...moodData]);
        },
      });
    }
  };

  const getCurrentDate = () => {
    const days = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
    const now = new Date();
    return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;
  };

  const getMoodEmoji = (mood: number) => {
    const moods = ['😢', '🙁', '😐', '😊', '😃'];
    return moods[mood - 1] || '😐';
  };

  const getQualityStars = (quality: number) => {
    return '⭐'.repeat(quality);
  };

  const latestSleep = sleepData[0];
  const latestMood = moodData[0];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Wellness</Text>
        <Text style={[styles.date, { color: theme.textSecondary }]}>{getCurrentDate()}</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Sömn-sektion */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Sömn</Text>
            <Button
              title="Logga sömn"
              onPress={handleAddSleep}
              variant="primary"
              style={styles.logButton}
            />
          </View>

          {latestSleep ? (
            <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
              <View style={styles.sleepHeader}>
                <Text style={[styles.sleepHours, { color: theme.wellness }]}>
                  {latestSleep.hours}h
                </Text>
                <Text style={[styles.sleepQuality, { color: theme.text }]}>
                  {getQualityStars(latestSleep.quality)}
                </Text>
              </View>
              <View style={styles.sleepTimes}>
                <View style={styles.timeItem}>
                  <Text style={[styles.timeLabel, { color: theme.textSecondary }]}>Sänggående</Text>
                  <Text style={[styles.timeValue, { color: theme.text }]}>{latestSleep.bedTime}</Text>
                </View>
                <View style={styles.timeItem}>
                  <Text style={[styles.timeLabel, { color: theme.textSecondary }]}>Uppvakning</Text>
                  <Text style={[styles.timeValue, { color: theme.text }]}>{latestSleep.wakeTime}</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={[styles.emptyState, { backgroundColor: theme.surface }]}>
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                Ingen sömn loggad idag
              </Text>
            </View>
          )}
        </View>

        {/* Humör-sektion */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Humör & Stress</Text>
            <Button
              title="Logga humör"
              onPress={handleAddMood}
              variant="primary"
              style={styles.logButton}
            />
          </View>

          {latestMood ? (
            <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
              <View style={styles.moodHeader}>
                <View style={styles.moodItem}>
                  <Text style={[styles.moodLabel, { color: theme.textSecondary }]}>Humör</Text>
                  <Text style={styles.moodEmoji}>{getMoodEmoji(latestMood.mood)}</Text>
                </View>
                <View style={styles.moodItem}>
                  <Text style={[styles.moodLabel, { color: theme.textSecondary }]}>Stressnivå</Text>
                  <Text style={[styles.stressValue, { color: theme.wellness }]}>
                    {latestMood.stress}/10
                  </Text>
                </View>
              </View>
              {latestMood.notes && (
                <View style={styles.notesContainer}>
                  <Text style={[styles.notesLabel, { color: theme.textSecondary }]}>
                    Anteckningar:
                  </Text>
                  <Text style={[styles.notesText, { color: theme.text }]}>{latestMood.notes}</Text>
                </View>
              )}
            </View>
          ) : (
            <View style={[styles.emptyState, { backgroundColor: theme.surface }]}>
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                Inget humör loggat idag
              </Text>
            </View>
          )}
        </View>

        {/* Symptom-sektion (placeholder) */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Symptom</Text>
          <View style={[styles.emptyState, { backgroundColor: theme.surface }]}>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              Inga symptom loggade
            </Text>
          </View>
        </View>

        {/* Mediciner-sektion (placeholder) */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Mediciner</Text>
          <View style={[styles.emptyState, { backgroundColor: theme.surface }]}>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              Inga mediciner tillagda
            </Text>
          </View>
        </View>

        {/* Spacing */}
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
    padding: SPACING.lg,
    paddingTop: SPACING.xl + 20,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    fontSize: FONT_SIZES.sm,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
  logButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    minHeight: 40,
  },
  card: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sleepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sleepHours: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
  },
  sleepQuality: {
    fontSize: FONT_SIZES.lg,
  },
  sleepTimes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  timeItem: {
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: FONT_SIZES.xs,
    marginBottom: 4,
  },
  timeValue: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
  },
  moodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  moodItem: {
    alignItems: 'center',
  },
  moodLabel: {
    fontSize: FONT_SIZES.xs,
    marginBottom: SPACING.sm,
  },
  moodEmoji: {
    fontSize: 48,
  },
  stressValue: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
  },
  notesContainer: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  notesLabel: {
    fontSize: FONT_SIZES.xs,
    marginBottom: 4,
  },
  notesText: {
    fontSize: FONT_SIZES.sm,
    lineHeight: 20,
  },
  emptyState: {
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FONT_SIZES.sm,
  },
});
