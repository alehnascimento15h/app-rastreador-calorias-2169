export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          email: string
          birthdate: string | null
          gender: string | null
          current_weight: number | null
          desired_weight: number | null
          workouts_per_week: string | null
          goal: string | null
          daily_calorie_goal: number | null
          obstacles: string[] | null
          achievements: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          birthdate?: string | null
          gender?: string | null
          current_weight?: number | null
          desired_weight?: number | null
          workouts_per_week?: string | null
          goal?: string | null
          daily_calorie_goal?: number | null
          obstacles?: string[] | null
          achievements?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          birthdate?: string | null
          gender?: string | null
          current_weight?: number | null
          desired_weight?: number | null
          workouts_per_week?: string | null
          goal?: string | null
          daily_calorie_goal?: number | null
          obstacles?: string[] | null
          achievements?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      meals: {
        Row: {
          id: string
          user_id: string
          meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
          food_name: string
          calories: number
          protein: number | null
          carbs: number | null
          fat: number | null
          image_url: string | null
          notes: string | null
          meal_date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
          food_name: string
          calories: number
          protein?: number | null
          carbs?: number | null
          fat?: number | null
          image_url?: string | null
          notes?: string | null
          meal_date?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          meal_type?: 'breakfast' | 'lunch' | 'dinner' | 'snack'
          food_name?: string
          calories?: number
          protein?: number | null
          carbs?: number | null
          fat?: number | null
          image_url?: string | null
          notes?: string | null
          meal_date?: string
          created_at?: string
        }
      }
      daily_progress: {
        Row: {
          id: string
          user_id: string
          date: string
          total_calories: number
          total_protein: number
          total_carbs: number
          total_fat: number
          weight: number | null
          water_intake: number
          workouts_completed: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date?: string
          total_calories?: number
          total_protein?: number
          total_carbs?: number
          total_fat?: number
          weight?: number | null
          water_intake?: number
          workouts_completed?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          total_calories?: number
          total_protein?: number
          total_carbs?: number
          total_fat?: number
          weight?: number | null
          water_intake?: number
          workouts_completed?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
