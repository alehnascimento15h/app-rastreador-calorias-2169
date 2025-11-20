'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { getTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Camera, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import MealPhotoDialog from '../MealPhotoDialog';
import { getTodayMeals } from '@/lib/supabase/database';

interface Meal {
  id: string;
  meal_type: string;
  calories: number;
  carbs?: number | null;
  protein?: number | null;
  fat?: number | null;
  ingredients?: string[] | null;
  timestamp: string;
}

export default function HomeTab() {
  const { language } = useLanguage();
  const { user } = useUser();
  const t = (key: string) => getTranslation(language, key as any);

  const [todayMeals, setTodayMeals] = useState<Meal[]>([]);
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [showMealDialog, setShowMealDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadMeals = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const meals = await getTodayMeals(user.id);
      setTodayMeals(meals || []);
      const total = (meals || []).reduce((sum: number, meal: Meal) => sum + meal.calories, 0);
      setCaloriesConsumed(total);
    } catch (error) {
      console.error('Error loading meals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeals();
  }, [user]);

  const calorieGoal = user?.dailyCalorieGoal || 2000;
  const remaining = calorieGoal - caloriesConsumed;
  const percentage = Math.min((caloriesConsumed / calorieGoal) * 100, 100);

  const getStatusColor = () => {
    if (percentage < 70) return 'from-[#00FF88] to-[#00D9FF]';
    if (percentage < 90) return 'from-[#FFD700] to-[#FFA500]';
    return 'from-[#FF6B6B] to-[#FF4757]';
  };

  const getStatusIcon = () => {
    if (remaining > 0) return <TrendingUp className="w-5 h-5" />;
    if (remaining === 0) return <Minus className="w-5 h-5" />;
    return <TrendingDown className="w-5 h-5" />;
  };

  const getMealTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      breakfast: 'Café da Manhã',
      lunch: 'Almoço',
      dinner: 'Jantar',
      snack: 'Lanche',
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-6">
      {/* Saudação */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Olá, {user?.name?.split(' ')[0]}! 👋
        </h2>
        <p className="text-white/60">
          {new Date().toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long' 
          })}
        </p>
      </div>

      {/* Card principal de calorias */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <p className="text-white/60 text-sm mb-2">{t('calorieGoal')}</p>
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-white">{caloriesConsumed}</p>
              <p className="text-white/40 text-xs">consumidas</p>
            </div>
            <div className="text-white/40 text-2xl">/</div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#00FF88]">{calorieGoal}</p>
              <p className="text-white/40 text-xs">meta</p>
            </div>
          </div>
        </div>

        {/* Barra de progresso circular */}
        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="url(#gradient)"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${percentage * 5.53} 553`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D9FF" />
                <stop offset="100%" stopColor="#00FF88" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-5xl font-bold text-white">{Math.round(percentage)}%</p>
            <p className="text-white/60 text-sm">do dia</p>
          </div>
        </div>

        {/* Status */}
        <div className={`
          bg-gradient-to-r ${getStatusColor()} 
          rounded-2xl p-4 flex items-center justify-between
        `}>
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <p className="text-black font-semibold">
                {remaining > 0 ? `${remaining} kcal restantes` : remaining === 0 ? 'Meta atingida!' : `${Math.abs(remaining)} kcal acima da meta`}
              </p>
              <p className="text-black/70 text-sm">
                {remaining > 0 ? 'Continue assim!' : remaining === 0 ? 'Perfeito!' : 'Cuidado com o excesso'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Botão de adicionar refeição */}
      <Button
        onClick={() => setShowMealDialog(true)}
        className="w-full bg-gradient-to-r from-[#00D9FF] to-[#00FF88] hover:from-[#00FF88] hover:to-[#00D9FF] text-black font-bold text-lg py-8 rounded-2xl shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105"
      >
        <Camera className="w-6 h-6 mr-3" />
        {t('takeMealPhoto')}
      </Button>

      {/* Refeições de hoje */}
      {todayMeals.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Refeições de Hoje</h3>
          {todayMeals.map((meal) => (
            <div key={meal.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold capitalize">{getMealTypeLabel(meal.meal_type)}</p>
                  <p className="text-white/60 text-sm">
                    {new Date(meal.timestamp).toLocaleTimeString(language === 'pt' ? 'pt-BR' : 'en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#00FF88]">{meal.calories}</p>
                  <p className="text-white/40 text-xs">kcal</p>
                </div>
              </div>
              {meal.carbs !== undefined && meal.protein !== undefined && meal.fat !== undefined && (
                <div className="flex gap-4 mt-3 pt-3 border-t border-white/10">
                  <div className="flex-1 text-center">
                    <p className="text-white/60 text-xs">Carbs</p>
                    <p className="text-white font-semibold">{meal.carbs}g</p>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-white/60 text-xs">Proteína</p>
                    <p className="text-white font-semibold">{meal.protein}g</p>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-white/60 text-xs">Gordura</p>
                    <p className="text-white font-semibold">{meal.fat}g</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Dicas rápidas */}
      <div className="bg-gradient-to-r from-[#00D9FF]/10 to-[#00FF88]/10 border border-[#00FF88]/30 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-2">💡 Dica do Dia</h3>
        <p className="text-white/80 text-sm">
          Beba pelo menos 2 litros de água hoje para manter seu metabolismo ativo e ajudar na queima de calorias!
        </p>
      </div>

      {/* Dialog de foto */}
      <MealPhotoDialog
        open={showMealDialog}
        onOpenChange={setShowMealDialog}
        onMealAdded={loadMeals}
      />
    </div>
  );
}
