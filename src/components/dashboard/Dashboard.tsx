'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/i18n';
import { Home, Utensils, TrendingUp, User } from 'lucide-react';
import HomeTab from './tabs/HomeTab';
import MealsTab from './tabs/MealsTab';
import ProgressTab from './tabs/ProgressTab';
import ProfileTab from './tabs/ProfileTab';
import type { Database } from '@/lib/types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface DashboardProps {
  profile: Profile;
}

export default function Dashboard({ profile }: DashboardProps) {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key as any);
  
  const [activeTab, setActiveTab] = useState<'home' | 'meals' | 'progress' | 'profile'>('home');

  const tabs = [
    { id: 'home' as const, icon: Home, label: t('home') },
    { id: 'meals' as const, icon: Utensils, label: t('meals') },
    { id: 'progress' as const, icon: TrendingUp, label: t('progress') },
    { id: 'profile' as const, icon: User, label: t('profile') },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0a0a0a] to-[#000000]">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00D9FF] to-[#00FF88] bg-clip-text text-transparent">
            BR CALL AI
          </h1>
          <div className="text-white/60 text-sm">
            {profile.name}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 pb-24">
        {activeTab === 'home' && <HomeTab profile={profile} />}
        {activeTab === 'meals' && <MealsTab profile={profile} />}
        {activeTab === 'progress' && <ProgressTab profile={profile} />}
        {activeTab === 'profile' && <ProfileTab profile={profile} />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all duration-300
                    ${isActive 
                      ? 'text-[#00FF88]' 
                      : 'text-white/40 hover:text-white/60'
                    }
                  `}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform`} />
                  <span className="text-xs font-medium">{tab.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 w-12 h-1 bg-gradient-to-r from-[#00D9FF] to-[#00FF88] rounded-t-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
