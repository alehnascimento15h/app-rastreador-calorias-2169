'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '@/lib/types';

interface UserContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isOnboarded: boolean;
  completeOnboarding: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserProfile | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('br-call-ai-user');
    const savedOnboarding = localStorage.getItem('br-call-ai-onboarded');
    
    if (savedUser) {
      setUserState(JSON.parse(savedUser));
    }
    if (savedOnboarding === 'true') {
      setIsOnboarded(true);
    }
  }, []);

  const setUser = (user: UserProfile | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem('br-call-ai-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('br-call-ai-user');
    }
  };

  const completeOnboarding = () => {
    setIsOnboarded(true);
    localStorage.setItem('br-call-ai-onboarded', 'true');
  };

  return (
    <UserContext.Provider value={{ user, setUser, isOnboarded, completeOnboarding }}>
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
