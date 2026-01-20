/**
 * TypeScript typdefinitioner för applikationen
 */

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type WorkoutType = 'running' | 'strength' | 'cycling' | 'swimming' | 'yoga' | 'walking' | 'other';

export type IntensityLevel = 'low' | 'medium' | 'high';

export type GoalType = 'weight' | 'steps' | 'workout' | 'calories' | 'sleep' | 'water' | 'custom';

export type GoalStatus = 'active' | 'completed' | 'failed';

export type BloodSugarContext = 'fasting' | 'before_meal' | 'after_meal';

export interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  height?: number;
  weight?: number;
  gender?: 'male' | 'female' | 'other';
  photoURL?: string;
  createdAt: Date;
}

export interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portion: string;
}

export interface Meal {
  id: string;
  userId: string;
  date: Date;
  mealType: MealType;
  foodItems: FoodItem[];
}

export interface Water {
  id: string;
  userId: string;
  date: Date;
  glasses: number;
}

export interface Workout {
  id: string;
  userId: string;
  date: Date;
  type: WorkoutType;
  duration: number; // minuter
  intensity: IntensityLevel;
  calories: number;
  notes?: string;
}

export interface Sleep {
  id: string;
  userId: string;
  date: Date;
  hours: number;
  quality: number; // 1-5
  bedTime: string;
  wakeTime: string;
}

export interface Mood {
  id: string;
  userId: string;
  date: Date;
  mood: number; // 1-5
  stress: number; // 1-10
  notes?: string;
}

export interface Symptom {
  id: string;
  userId: string;
  date: Date;
  symptom: string;
  severity: number; // 1-10
  notes?: string;
}

export interface Medication {
  id: string;
  userId: string;
  name: string;
  dosage: string;
  frequency: string;
  reminderTimes: string[];
}

export interface MedicationLog {
  id: string;
  userId: string;
  medicationId: string;
  date: Date;
  taken: boolean;
}

export interface Weight {
  id: string;
  userId: string;
  date: Date;
  weight: number; // kg
}

export interface BloodPressure {
  id: string;
  userId: string;
  date: Date;
  systolic: number;
  diastolic: number;
  notes?: string;
}

export interface BloodSugar {
  id: string;
  userId: string;
  date: Date;
  value: number; // mmol/L
  context: BloodSugarContext;
  notes?: string;
}

export interface BodyComposition {
  id: string;
  userId: string;
  date: Date;
  muscleMass: number;
  fatPercentage: number;
}

export interface Goal {
  id: string;
  userId: string;
  type: GoalType;
  title: string;
  targetValue: number;
  currentValue: number;
  startDate: Date;
  deadline: Date;
  status: GoalStatus;
  streak: number;
}

export interface Achievement {
  id: string;
  userId: string;
  badgeId: string;
  unlockedAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  type: 'achievement' | 'goal' | 'workout' | 'general';
  content: string;
  timestamp: Date;
  likes: string[];
  comments: Comment[];
}

export interface Comment {
  userId: string;
  userName: string;
  text: string;
  timestamp: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'steps' | 'workouts' | 'weight';
  startDate: Date;
  endDate: Date;
  participants: Participant[];
}

export interface Participant {
  userId: string;
  progress: number;
}
