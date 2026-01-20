/**
 * Valideringsfunktioner för formulär
 */

export const validateEmail = (email: string): string | null => {
  if (!email) {
    return 'E-post krävs';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Ogiltig e-postadress';
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'Lösenord krävs';
  }
  if (password.length < 6) {
    return 'Lösenordet måste vara minst 6 tecken';
  }
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name) {
    return 'Namn krävs';
  }
  if (name.length < 2) {
    return 'Namnet måste vara minst 2 tecken';
  }
  return null;
};

export const validatePasswordMatch = (password: string, confirmPassword: string): string | null => {
  if (password !== confirmPassword) {
    return 'Lösenorden matchar inte';
  }
  return null;
};

export const validateNumber = (value: string, min?: number, max?: number): string | null => {
  if (!value) {
    return 'Värde krävs';
  }
  const num = parseFloat(value);
  if (isNaN(num)) {
    return 'Ogiltigt nummer';
  }
  if (min !== undefined && num < min) {
    return `Värdet måste vara minst ${min}`;
  }
  if (max !== undefined && num > max) {
    return `Värdet får max vara ${max}`;
  }
  return null;
};
