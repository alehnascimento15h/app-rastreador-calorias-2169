'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Camera, Coffee, Salad, Utensils, Cookie } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
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
  healthier_suggestion?: string | null;
  timestamp: string;
}

export default function MealsTab() {
  const { language } = useLanguage();
  const { user } = useUser();
  const t = (key: string) => getTranslation(language, key as any);

  const [meals, setMeals] = useState<Meal[]>([]);
  const [showMealDialog, setShowMealDialog] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack' | undefined>();

  const loadMeals = async () => {
    if (!user) return;

    try {
      const data = await getTodayMeals(user.id);
      setMeals(data || []);
    } catch (error) {
      console.error('Error loading meals:', error);
    }
  };

  useEffect(() => {
    loadMeals();
  }, [user]);

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'breakfast': return <Coffee className="w-6 h-6" />;
      case 'lunch': return <Utensils className="w-6 h-6" />;
      case 'dinner': return <Salad className="w-6 h-6" />;
      case 'snack': return <Cookie className="w-6 h-6" />;
      default: return <Utensils className="w-6 h-6" />;
    }
  };

  const getMealsByType = (type: string) => {
    return meals.filter(meal => meal.meal_type === type);
  };

  const getTotalCaloriesByType = (type: string) => {
    return getMealsByType(type).reduce((sum, meal) => sum + meal.calories, 0);
  };

  const handleAddMeal = (type: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    setSelectedMealType(type);
    setShowMealDialog(true);
  };

  const mealTypes = [
    { id: 'breakfast' as const, label: t('breakfast'), icon: Coffee, color: 'from-orange-400 to-yellow-400' },
    { id: 'lunch' as const, label: t('lunch'), icon: Utensils, color: 'from-green-400 to-emerald-400' },
    { id: 'dinner' as const, label: t('dinner'), icon: Salad, color: 'from-blue-400 to-cyan-400' },
    { id: 'snack' as const, label: t('snack'), icon: Cookie, color: 'from-purple-400 to-pink-400' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">{t('meals')}</h2>
        <p className="text-white/60">Registre suas refeições do dia</p>
      </div>

      {/* Cards de refeições */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mealTypes.map((mealType) => {
          const Icon = mealType.icon;
          const mealCount = getMealsByType(mealType.id).length;
          const totalCalories = getTotalCaloriesByType(mealType.id);

          return (
            <div
              key={mealType.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${mealType.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{mealType.label}</h3>
                    <p className="text-white/40 text-sm">
                      {mealCount} {mealCount === 1 ? 'refeição' : 'refeições'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#00FF88]">{totalCalories}</p>
                  <p className="text-white/40 text-xs">kcal</p>
                </div>
              </div>

              <Button
                onClick={() => handleAddMeal(mealType.id)}
                className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                <Camera className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>
          );
        })}
      </div>

      {/* Histórico de refeições */}
      {meals.length > 0 && (
        <div className="space-y-4 mt-8">
          <h3 className="text-xl font-bold text-white">Histórico de Hoje</h3>
          {meals.map((meal) => (
            <div key={meal.id} className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#00D9FF]/20 to-[#00FF88]/20">
                  {getMealIcon(meal.meal_type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold capitalize">
                      {meal.meal_type === 'breakfast' ? 'Café da Manhã' : 
                       meal.meal_type === 'lunch' ? 'Almoço' :
                       meal.meal_type === 'dinner' ? 'Jantar' : 'Lanche'}
                    </h4>
                    <p className="text-white/60 text-sm">
                      {new Date(meal.timestamp).toLocaleTimeString(language === 'pt' ? 'pt-BR' : 'en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <div className="bg-[#00FF88]/20 px-3 py-1 rounded-lg">
                      <p className="text-[#00FF88] font-bold">{meal.calories} kcal</p>
                    </div>
                  </div>

                  {meal.carbs !== undefined && meal.protein !== undefined && meal.fat !== undefined && (
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white/5 rounded-lg p-2 text-center">
                        <p className="text-white/60 text-xs">Carbs</p>
                        <p className="text-white font-semibold">{meal.carbs}g</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 text-center">
                        <p className="text-white/60 text-xs">Proteína</p>
                        <p className="text-white font-semibold">{meal.protein}g</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 text-center">
                        <p className="text-white/60 text-xs">Gordura</p>
                        <p className="text-white font-semibold">{meal.fat}g</p>
                      </div>
                    </div>
                  )}

                  {meal.ingredients && meal.ingredients.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <p className="text-white/60 text-xs mb-1">Ingredientes detectados:</p>
                      <p className="text-white/80 text-sm">{meal.ingredients.join(', ')}</p>
                    </div>
                  )}

                  {meal.healthier_suggestion && (
                    <div className="mt-3 bg-gradient-to-r from-[#00D9FF]/10 to-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg p-3">
                      <p className="text-white/60 text-xs mb-1">💡 Sugestão mais saudável:</p>
                      <p className="text-white/90 text-sm">{meal.healthier_suggestion}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {meals.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-white font-semibold text-xl mb-2">Nenhuma refeição registrada</h3>
          <p className="text-white/60 mb-6">Comece tirando uma foto da sua refeição!</p>
          <Button
            onClick={() => setShowMealDialog(true)}
            className="bg-gradient-to-r from-[#00D9FF] to-[#00FF88] hover:from-[#00FF88] hover:to-[#00D9FF] text-black font-bold"
          >
            <Camera className="w-5 h-5 mr-2" />
            Tirar Primeira Foto
          </Button>
        </div>
      )}

      {/* Dialog de foto */}
      <MealPhotoDialog
        open={showMealDialog}
        onOpenChange={setShowMealDialog}
        mealType={selectedMealType}
        onMealAdded={loadMeals}
      />
    </div>
  );
}
