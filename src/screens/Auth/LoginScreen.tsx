/**
 * Login Screen - Användare kan logga in med email och lösenord
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
import { validateEmail, validatePassword } from '@utils/validation';
import { SPACING, FONT_SIZES } from '@constants/sizes';

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: null as string | null, password: null as string | null });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Validera formulär
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) {
      return;
    }

    setLoading(true);

    try {
      await signIn(email.trim(), password);
      // Navigation sker automatiskt via AuthContext
    } catch (error: any) {
      Alert.alert('Inloggningsfel', getErrorMessage(error.message));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (error: string): string => {
    if (error.includes('user-not-found')) {
      return 'Ingen användare hittades med denna e-post.';
    }
    if (error.includes('wrong-password')) {
      return 'Felaktigt lösenord.';
    }
    if (error.includes('invalid-email')) {
      return 'Ogiltig e-postadress.';
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
          <Text style={[styles.title, { color: theme.text }]}>Välkommen tillbaka!</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Logga in för att fortsätta
          </Text>
        </View>

        <View style={styles.form}>
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
            placeholder="Ditt lösenord"
            secureTextEntry
            error={errors.password}
          />

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => Alert.alert('Info', 'Glömt lösenord-funktionen kommer snart!')}
          >
            <Text style={[styles.forgotPasswordText, { color: theme.primary }]}>
              Glömt lösenord?
            </Text>
          </TouchableOpacity>

          <Button
            title="Logga in"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
          />

          <View style={styles.registerContainer}>
            <Text style={[styles.registerText, { color: theme.textSecondary }]}>
              Inget konto?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={[styles.registerLink, { color: theme.primary }]}>
                Registrera dig
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.lg,
  },
  forgotPasswordText: {
    fontSize: FONT_SIZES.sm,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.lg,
  },
  registerText: {
    fontSize: FONT_SIZES.md,
  },
  registerLink: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});
