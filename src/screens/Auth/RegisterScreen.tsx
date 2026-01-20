/**
 * Register Screen - Nya användare kan skapa ett konto
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
  Alert,
} from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { validateEmail, validatePassword, validateName, validatePasswordMatch } from '@utils/validation';
import { SPACING, FONT_SIZES } from '@constants/sizes';

interface RegisterScreenProps {
  navigation: any;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { signUp } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    name: null as string | null,
    email: null as string | null,
    password: null as string | null,
    confirmPassword: null as string | null,
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validera alla fält
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validatePasswordMatch(password, confirmPassword);

    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    if (nameError || emailError || passwordError || confirmPasswordError) {
      return;
    }

    setLoading(true);

    try {
      await signUp(email.trim(), password, name.trim());
      // Efter lyckad registrering, gå till onboarding
      navigation.navigate('Onboarding');
    } catch (error: any) {
      Alert.alert('Registreringsfel', getErrorMessage(error.message));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (error: string): string => {
    if (error.includes('email-already-in-use')) {
      return 'E-postadressen används redan av ett annat konto.';
    }
    if (error.includes('invalid-email')) {
      return 'Ogiltig e-postadress.';
    }
    if (error.includes('weak-password')) {
      return 'Lösenordet är för svagt. Använd minst 6 tecken.';
    }
    if (error.includes('network-request-failed')) {
      return 'Nätverksfel. Kontrollera din internetanslutning.';
    }
    return 'Ett fel uppstod. Försök igen.';
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Skapa konto</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Börja din hälsoresa idag!
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Namn"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setErrors({ ...errors, name: null });
            }}
            placeholder="Ditt namn"
            autoCapitalize="words"
            error={errors.name}
          />

          <Input
            label="E-post"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrors({ ...errors, email: null });
            }}
            placeholder="din@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <Input
            label="Lösenord"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors({ ...errors, password: null });
            }}
            placeholder="Minst 6 tecken"
            secureTextEntry
            error={errors.password}
          />

          <Input
            label="Bekräfta lösenord"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setErrors({ ...errors, confirmPassword: null });
            }}
            placeholder="Skriv lösenordet igen"
            secureTextEntry
            error={errors.confirmPassword}
          />

          <Button
            title="Skapa konto"
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
          />

          <View style={styles.loginContainer}>
            <Text style={[styles.loginText, { color: theme.textSecondary }]}>
              Har redan ett konto?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.loginLink, { color: theme.primary }]}>
                Logga in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SPACING.lg,
    justifyContent: 'center',
  },
  header: {
    marginBottom: SPACING.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
  },
  form: {
    width: '100%',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.lg,
  },
  loginText: {
    fontSize: FONT_SIZES.md,
  },
  loginLink: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});
