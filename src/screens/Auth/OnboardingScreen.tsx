/**
 * Onboarding Screen - Välkomstslides och samla grundläggande användarinfo
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { validateNumber } from '@utils/validation';
import { SPACING, FONT_SIZES, ICON_SIZES } from '@constants/sizes';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface OnboardingScreenProps {
  navigation: any;
}

interface Slide {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  color: string;
}

const slides: Slide[] = [
  {
    id: '1',
    icon: 'fitness-outline',
    title: 'Välkommen till HealthTracker',
    description: 'Din kompletta hälsoassistent för nutrition, fitness och wellness',
    color: '#4CAF50',
  },
  {
    id: '2',
    icon: 'restaurant-outline',
    title: 'Spåra din nutrition',
    description: 'Logga måltider, kalorier och få insikter om dina matvanor',
    color: '#2196F3',
  },
  {
    id: '3',
    icon: 'barbell-outline',
    title: 'Följ din fitness',
    description: 'Synka med Apple Health eller Google Fit för att följa steg och träning',
    color: '#9C27B0',
  },
  {
    id: '4',
    icon: 'moon-outline',
    title: 'Övervaka ditt välmående',
    description: 'Håll koll på sömn, humör och hälsomått',
    color: '#FF9800',
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateUserProfile } = useAuth();
  const flatListRef = useRef<FlatList>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showUserInfo, setShowUserInfo] = useState(false);

  // Användarinformation
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other' | ''>('');

  const [errors, setErrors] = useState({
    age: null as string | null,
    height: null as string | null,
    weight: null as string | null,
  });
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowUserInfo(true);
    }
  };

  const handleSkip = () => {
    setShowUserInfo(true);
  };

  const handleComplete = async () => {
    // Validera fält (valfria, men om ifyllda ska de vara korrekta)
    const ageError = age ? validateNumber(age, 1, 150) : null;
    const heightError = height ? validateNumber(height, 50, 300) : null;
    const weightError = weight ? validateNumber(weight, 20, 500) : null;

    setErrors({ age: ageError, height: heightError, weight: weightError });

    if (ageError || heightError || weightError) {
      return;
    }

    setLoading(true);

    try {
      // Uppdatera användarprofil med grundinfo
      await updateUserProfile({
        age: age ? parseInt(age) : undefined,
        height: height ? parseFloat(height) : undefined,
        weight: weight ? parseFloat(weight) : undefined,
        gender: gender || undefined,
      });

      // Navigation till huvudappen sker automatiskt via AuthContext
    } catch (error: any) {
      Alert.alert('Fel', 'Kunde inte spara information. Försök igen.');
    } finally {
      setLoading(false);
    }
  };

  const renderSlide = ({ item }: { item: Slide }) => (
    <View style={styles.slide}>
      <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
        <Ionicons name={item.icon} size={ICON_SIZES.xl * 2} color={item.color} />
      </View>
      <Text style={[styles.slideTitle, { color: theme.text }]}>{item.title}</Text>
      <Text style={[styles.slideDescription, { color: theme.textSecondary }]}>
        {item.description}
      </Text>
    </View>
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor: index === currentIndex ? theme.primary : theme.border,
              width: index === currentIndex ? 24 : 8,
            },
          ]}
        />
      ))}
    </View>
  );

  if (showUserInfo) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.userInfoContainer}>
          <Text style={[styles.userInfoTitle, { color: theme.text }]}>
            Berätta lite om dig själv
          </Text>
          <Text style={[styles.userInfoSubtitle, { color: theme.textSecondary }]}>
            Detta hjälper oss ge dig bättre rekommendationer (valfritt)
          </Text>

          <Input
            label="Ålder"
            value={age}
            onChangeText={(text) => {
              setAge(text);
              setErrors({ ...errors, age: null });
            }}
            placeholder="T.ex. 30"
            keyboardType="numeric"
            error={errors.age}
          />

          <Input
            label="Längd (cm)"
            value={height}
            onChangeText={(text) => {
              setHeight(text);
              setErrors({ ...errors, height: null });
            }}
            placeholder="T.ex. 175"
            keyboardType="numeric"
            error={errors.height}
          />

          <Input
            label="Vikt (kg)"
            value={weight}
            onChangeText={(text) => {
              setWeight(text);
              setErrors({ ...errors, weight: null });
            }}
            placeholder="T.ex. 70"
            keyboardType="numeric"
            error={errors.weight}
          />

          <View style={styles.genderContainer}>
            <Text style={[styles.genderLabel, { color: theme.text }]}>Kön</Text>
            <View style={styles.genderButtons}>
              {[
                { value: 'male', label: 'Man' },
                { value: 'female', label: 'Kvinna' },
                { value: 'other', label: 'Annat' },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.genderButton,
                    {
                      backgroundColor:
                        gender === option.value ? theme.primary : theme.surface,
                      borderColor: gender === option.value ? theme.primary : theme.border,
                    },
                  ]}
                  onPress={() => setGender(option.value as any)}
                >
                  <Text
                    style={[
                      styles.genderButtonText,
                      {
                        color: gender === option.value ? '#FFFFFF' : theme.text,
                      },
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Button
            title="Kom igång!"
            onPress={handleComplete}
            loading={loading}
            disabled={loading}
          />

          <Button
            title="Hoppa över"
            onPress={handleComplete}
            variant="text"
          />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={[styles.skipText, { color: theme.primary }]}>Hoppa över</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
          setCurrentIndex(index);
        }}
      />

      {renderDots()}

      <View style={styles.buttonContainer}>
        <Button
          title={currentIndex === slides.length - 1 ? 'Fortsätt' : 'Nästa'}
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  slideTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  slideDescription: {
    fontSize: FONT_SIZES.md,
    textAlign: 'center',
    lineHeight: 24,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: SPACING.lg,
    zIndex: 1,
  },
  skipText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  userInfoContainer: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  userInfoSubtitle: {
    fontSize: FONT_SIZES.sm,
    marginBottom: SPACING.xl,
    textAlign: 'center',
  },
  genderContainer: {
    marginBottom: SPACING.md,
  },
  genderLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  genderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  genderButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
});
