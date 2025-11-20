'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, getProfile } from '@/lib/supabase/auth';
import { supabase } from '@/lib/supabase/client';
import Dashboard from '@/components/dashboard/Dashboard';
import type { Database } from '@/lib/types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const user = await getCurrentUser();
        
        if (!user) {
          router.push('/login');
          return;
        }

        const userProfile = await getProfile(user.id);
        
        if (!userProfile) {
          router.push('/login');
          return;
        }

        setProfile(userProfile);
      } catch (error) {
        console.error('Error loading user:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }

    loadUser();

    // Listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/login');
      } else if (event === 'SIGNED_IN' && session) {
        loadUser();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00D9FF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return <Dashboard profile={profile} />;
}
