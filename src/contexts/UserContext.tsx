'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '@/lib/types';
import { supabase } from '@/lib/supabase/client';
import { getProfile, createProfile } from '@/lib/supabase/database';
import { useRouter } from 'next/navigation';

interface UserContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isOnboarded: boolean;
  completeOnboarding: () => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserProfile | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar sessão do Supabase
    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        // Se houver erro de autenticação, limpar estado
        if (sessionError) {
          console.error('Session error:', sessionError);
          setUserState(null);
          setIsOnboarded(false);
          setLoading(false);
          return;
        }
        
        if (session?.user) {
          // Buscar perfil do usuário
          try {
            const profile = await getProfile(session.user.id);
            
            if (profile) {
              // Converter para formato UserProfile
              const userProfile: UserProfile = {
                id: profile.id,
                name: profile.name,
                email: profile.email,
                birthdate: profile.birthdate || undefined,
                gender: profile.gender || undefined,
                currentWeight: profile.current_weight || undefined,
                desiredWeight: profile.desired_weight || undefined,
                workoutsPerWeek: profile.workouts_per_week || undefined,
                goal: profile.goal || undefined,
                dailyCalorieGoal: profile.daily_calorie_goal || 2000,
                obstacles: profile.obstacles || [],
                achievements: profile.achievements || [],
              };
              
              setUserState(userProfile);
              setIsOnboarded(true);
            } else {
              // Criar perfil inicial se não existir
              const newProfile = await createProfile({
                id: session.user.id,
                name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Usuário',
                email: session.user.email || '',
                daily_calorie_goal: 2000,
              });

              const userProfile: UserProfile = {
                id: newProfile.id,
                name: newProfile.name,
                email: newProfile.email,
                dailyCalorieGoal: 2000,
                obstacles: [],
                achievements: [],
              };

              setUserState(userProfile);
              setIsOnboarded(false);
            }
          } catch (error: any) {
            console.error('Error loading profile:', error);
            
            // Se erro de autenticação, limpar estado
            if (error?.message?.includes('Auth') || error?.message?.includes('session') || error?.message?.includes('JWT')) {
              setUserState(null);
              setIsOnboarded(false);
            }
          }
        } else {
          // Sem sessão ativa
          setUserState(null);
          setIsOnboarded(false);
        }
      } catch (error: any) {
        console.error('Error checking session:', error);
        setUserState(null);
        setIsOnboarded(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        checkSession();
      } else if (event === 'SIGNED_OUT') {
        setUserState(null);
        setIsOnboarded(false);
        router.push('/');
      } else if (event === 'TOKEN_REFRESHED') {
        checkSession();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const setUser = (user: UserProfile | null) => {
    setUserState(user);
  };

  const completeOnboarding = () => {
    setIsOnboarded(true);
  };

  return (
    <UserContext.Provider value={{ user, setUser, isOnboarded, completeOnboarding, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
