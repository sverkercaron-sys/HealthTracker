/**
 * Färgdefinitioner för ljust och mörkt tema
 */

export const lightTheme = {
  background: '#FFFFFF',
  surface: '#F5F5F5',
  primary: '#4CAF50', // Grön för Nutrition
  secondary: '#2196F3', // Blå för Fitness
  accent: '#9C27B0', // Lila för Wellness
  error: '#F44336',
  success: '#4CAF50',
  warning: '#FF9800',
  info: '#2196F3',
  text: '#212121',
  textSecondary: '#757575',
  border: '#E0E0E0',
  disabled: '#BDBDBD',

  // Specifika färger för olika sektioner
  nutrition: '#4CAF50',
  fitness: '#2196F3',
  wellness: '#9C27B0',
  metrics: '#FF9800',

  // Widget-bakgrunder
  cardBackground: '#FFFFFF',
  cardShadow: 'rgba(0, 0, 0, 0.1)',
};

export const darkTheme = {
  background: '#121212',
  surface: '#1E1E1E',
  primary: '#66BB6A', // Ljusare grön
  secondary: '#42A5F5', // Ljusare blå
  accent: '#AB47BC', // Ljusare lila
  error: '#EF5350',
  success: '#66BB6A',
  warning: '#FFA726',
  info: '#42A5F5',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  border: '#2C2C2C',
  disabled: '#616161',

  // Specifika färger för olika sektioner
  nutrition: '#66BB6A',
  fitness: '#42A5F5',
  wellness: '#AB47BC',
  metrics: '#FFA726',

  // Widget-bakgrunder
  cardBackground: '#1E1E1E',
  cardShadow: 'rgba(0, 0, 0, 0.3)',
};

export type Theme = typeof lightTheme;
