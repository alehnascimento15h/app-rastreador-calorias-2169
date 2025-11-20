import { supabase } from './client';
import type { Database } from '@/lib/types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

type Meal = Database['public']['Tables']['meals']['Row'];
type MealInsert = Database['public']['Tables']['meals']['Insert'];

type DailyProgress = Database['public']['Tables']['daily_progress']['Row'];

// ==================== PROFILES ====================

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function createProfile(profile: ProfileInsert) {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profile)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile(userId: string, updates: ProfileUpdate) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ==================== MEALS ====================

export async function getMeals(userId: string, date?: Date) {
  let query = supabase
    .from('meals')
    .select('*')
    .eq('user_id', userId)
    .order('timestamp', { ascending: false });

  if (date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    query = query
      .gte('timestamp', startOfDay.toISOString())
      .lte('timestamp', endOfDay.toISOString());
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function getTodayMeals(userId: string) {
  const today = new Date();
  return getMeals(userId, today);
}

export async function createMeal(meal: MealInsert) {
  const { data, error } = await supabase
    .from('meals')
    .insert(meal)
    .select()
    .single();

  if (error) throw error;
  
  // Atualizar progresso diário
  if (data) {
    const mealDate = new Date(meal.timestamp);
    await updateDailyProgress(meal.user_id, mealDate);
  }

  return data;
}

// ==================== DAILY PROGRESS ====================

export async function getDailyProgress(userId: string, date: Date) {
  const dateStr = date.toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('daily_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('date', dateStr)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
  return data;
}

export async function updateDailyProgress(userId: string, date: Date) {
  const dateStr = date.toISOString().split('T')[0];

  // Buscar todas as refeições do dia
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const { data: meals, error: mealsError } = await supabase
    .from('meals')
    .select('total_calories')
    .eq('user_id', userId)
    .gte('timestamp', startOfDay.toISOString())
    .lte('timestamp', endOfDay.toISOString());

  if (mealsError) throw mealsError;

  // Calcular total de calorias
  const totalCalories = meals?.reduce(
    (acc, meal) => acc + (meal.total_calories || 0),
    0
  ) || 0;

  // Buscar meta de calorias do perfil
  const { data: profile } = await supabase
    .from('profiles')
    .select('daily_calorie_goal')
    .eq('id', userId)
    .single();

  const calorieGoal = profile?.daily_calorie_goal || 2000;

  // Verificar se já existe progresso para o dia
  const { data: existing } = await supabase
    .from('daily_progress')
    .select('id')
    .eq('user_id', userId)
    .eq('date', dateStr)
    .single();

  if (existing) {
    // Atualizar existente
    const { data, error } = await supabase
      .from('daily_progress')
      .update({
        calories_consumed: totalCalories,
        calories_goal: calorieGoal,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('date', dateStr)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    // Criar novo
    const { data, error } = await supabase
      .from('daily_progress')
      .insert({
        user_id: userId,
        date: dateStr,
        calories_consumed: totalCalories,
        calories_goal: calorieGoal,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export async function getWeekProgress(userId: string) {
  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const { data, error } = await supabase
    .from('daily_progress')
    .select('*')
    .eq('user_id', userId)
    .gte('date', weekAgo.toISOString().split('T')[0])
    .lte('date', today.toISOString().split('T')[0])
    .order('date', { ascending: true });

  if (error) throw error;
  return data;
}
