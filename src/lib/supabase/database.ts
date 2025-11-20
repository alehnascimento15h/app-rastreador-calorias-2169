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
    const dateStr = date.toISOString().split('T')[0];
    query = query.eq('meal_date', dateStr);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function getTodayMeals(userId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from('meals')
    .select('*')
    .eq('user_id', userId)
    .gte('timestamp', today.toISOString())
    .order('timestamp', { ascending: false });

  if (error) throw error;
  return data;
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
    await updateDailyProgress(meal.user_id, new Date(meal.meal_date || new Date()));
  }

  return data;
}

export async function getMealsByType(userId: string, mealType: string, date?: Date) {
  let query = supabase
    .from('meals')
    .select('*')
    .eq('user_id', userId)
    .eq('meal_type', mealType)
    .order('timestamp', { ascending: false });

  if (date) {
    const dateStr = date.toISOString().split('T')[0];
    query = query.eq('meal_date', dateStr);
  }

  const { data, error } = await query;

  if (error) throw error;
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
  const { data: meals, error: mealsError } = await supabase
    .from('meals')
    .select('calories, protein, carbs, fat')
    .eq('user_id', userId)
    .eq('meal_date', dateStr);

  if (mealsError) throw mealsError;

  // Calcular totais
  const totals = meals?.reduce(
    (acc, meal) => ({
      total_calories: acc.total_calories + (meal.calories || 0),
      total_protein: acc.total_protein + (meal.protein || 0),
      total_carbs: acc.total_carbs + (meal.carbs || 0),
      total_fat: acc.total_fat + (meal.fat || 0),
    }),
    { total_calories: 0, total_protein: 0, total_carbs: 0, total_fat: 0 }
  ) || { total_calories: 0, total_protein: 0, total_carbs: 0, total_fat: 0 };

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
        ...totals,
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
        ...totals,
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
