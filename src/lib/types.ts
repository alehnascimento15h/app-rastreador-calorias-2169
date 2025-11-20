// Tipos para o BR CALL AI

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  birthdate: string;
  gender?: 'male' | 'female' | 'other';
  
  // Fitness info
  workoutsPerWeek: '2' | '3-5' | '6+';
  goal: 'lose' | 'gain' | 'maintain';
  currentWeight: number;
  desiredWeight: number;
  obstacles: string[];
  achievements: string[];
  
  // Calculated
  dailyCalorieGoal: number;
  createdAt: string;
}

export interface Meal {
  id: string;
  userId: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  imageUrl?: string;
  calories: number;
  macros: {
    carbs: number;
    protein: number;
    fat: number;
  };
  ingredients?: string[];
  healthierSuggestion?: string;
  timestamp: string;
}

export interface DailyProgress {
  date: string;
  caloriesConsumed: number;
  caloriesGoal: number;
  meals: Meal[];
  weight?: number;
  workoutCompleted: boolean;
}

export interface WeeklyStats {
  weekStart: string;
  weekEnd: string;
  averageCalories: number;
  workoutsCompleted: number;
  weightChange: number;
}
