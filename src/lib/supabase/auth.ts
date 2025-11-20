import { supabase } from './client';
import type { Database } from '@/lib/types/database';

export type Profile = Database['public']['Tables']['profiles']['Row'];

export async function signUp(email: string, password: string, userData: {
  name: string;
  birthdate?: string;
  gender?: string;
  currentWeight?: number;
  desiredWeight?: number;
  workoutsPerWeek?: string;
  goal?: string;
  obstacles?: string[];
  achievements?: string[];
}) {
  // Criar usuário no Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;
  if (!authData.user) throw new Error('Erro ao criar usuário');

  // Calcular meta de calorias baseado no objetivo
  let dailyCalorieGoal = 2000; // Padrão
  if (userData.goal === 'lose') {
    dailyCalorieGoal = 1600;
  } else if (userData.goal === 'gain') {
    dailyCalorieGoal = 2400;
  }

  // Criar perfil do usuário
  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: authData.user.id,
      name: userData.name,
      email,
      birthdate: userData.birthdate || null,
      gender: userData.gender || null,
      current_weight: userData.currentWeight || null,
      desired_weight: userData.desiredWeight || null,
      workouts_per_week: userData.workoutsPerWeek || null,
      goal: userData.goal || null,
      daily_calorie_goal: dailyCalorieGoal,
      obstacles: userData.obstacles || null,
      achievements: userData.achievements || null,
    });

  if (profileError) throw profileError;

  return authData;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data;
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });

  if (error) throw error;
}
