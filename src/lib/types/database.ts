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
          timestamp: string
          image_url: string | null
          total_calories: number
          total_protein: number | null
          total_carbs: number | null
          total_fat: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          timestamp: string
          image_url?: string | null
          total_calories: number
          total_protein?: number | null
          total_carbs?: number | null
          total_fat?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          timestamp?: string
          image_url?: string | null
          total_calories?: number
          total_protein?: number | null
          total_carbs?: number | null
          total_fat?: number | null
          created_at?: string
        }
      }
      daily_progress: {
        Row: {
          id: string
          user_id: string
          date: string
          calories_consumed: number
          calories_goal: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          calories_consumed?: number
          calories_goal: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          calories_consumed?: number
          calories_goal?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
