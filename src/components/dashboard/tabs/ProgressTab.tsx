'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { getTranslation } from '@/lib/i18n';
import { TrendingUp, TrendingDown, Target, Flame, Dumbbell } from 'lucide-react';

export default function ProgressTab() {
  const { language } = useLanguage();
  const { user } = useUser();
  const t = (key: string) => getTranslation(language, key as any);

  // Dados simulados para demonstração
  const weekData = [
    { day: 'Seg', calories: 1850, goal: user?.dailyCalorieGoal || 2000 },
    { day: 'Ter', calories: 2100, goal: user?.dailyCalorieGoal || 2000 },
    { day: 'Qua', calories: 1920, goal: user?.dailyCalorieGoal || 2000 },
    { day: 'Qui', calories: 2050, goal: user?.dailyCalorieGoal || 2000 },
    { day: 'Sex', calories: 1780, goal: user?.dailyCalorieGoal || 2000 },
    { day: 'Sáb', calories: 2200, goal: user?.dailyCalorieGoal || 2000 },
    { day: 'Dom', calories: 1950, goal: user?.dailyCalorieGoal || 2000 },
  ];

  const weightHistory = [
    { date: '01/01', weight: user?.currentWeight || 70 },
    { date: '08/01', weight: (user?.currentWeight || 70) - 0.5 },
    { date: '15/01', weight: (user?.currentWeight || 70) - 1.2 },
    { date: '22/01', weight: (user?.currentWeight || 70) - 1.8 },
    { date: '29/01', weight: (user?.currentWeight || 70) - 2.3 },
  ];

  const currentWeight = weightHistory[weightHistory.length - 1].weight;
  const weightChange = currentWeight - (user?.currentWeight || 70);
  const goalWeight = user?.desiredWeight || 65;
  const remainingWeight = currentWeight - goalWeight;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">{t('progress')}</h2>
        <p className="text-white/60">Acompanhe sua evolução</p>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Peso atual */}
        <div className="bg-gradient-to-br from-[#00D9FF]/20 to-[#00FF88]/20 border border-[#00FF88]/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#00FF88]/20 rounded-lg">
              <Target className="w-5 h-5 text-[#00FF88]" />
            </div>
            <p className="text-white/80 text-sm">Peso Atual</p>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{currentWeight.toFixed(1)}</p>
          <p className="text-white/60 text-sm">kg</p>
        </div>

        {/* Mudança de peso */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/10 rounded-lg">
              {weightChange < 0 ? (
                <TrendingDown className="w-5 h-5 text-[#00FF88]" />
              ) : (
                <TrendingUp className="w-5 h-5 text-[#FFD700]" />
              )}
            </div>
            <p className="text-white/80 text-sm">Mudança</p>
          </div>
          <p className={`text-4xl font-bold mb-1 ${weightChange < 0 ? 'text-[#00FF88]' : 'text-[#FFD700]'}`}>
            {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)}
          </p>
          <p className="text-white/60 text-sm">kg este mês</p>
        </div>

        {/* Falta para meta */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Flame className="w-5 h-5 text-[#00D9FF]" />
            </div>
            <p className="text-white/80 text-sm">Falta para Meta</p>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{Math.abs(remainingWeight).toFixed(1)}</p>
          <p className="text-white/60 text-sm">kg</p>
        </div>
      </div>

      {/* Gráfico de calorias semanais */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-white font-semibold text-lg mb-6">Calorias Semanais</h3>
        <div className="flex items-end justify-between gap-2 h-48">
          {weekData.map((day, idx) => {
            const percentage = (day.calories / day.goal) * 100;
            const height = Math.min(percentage, 100);
            const isOverGoal = percentage > 100;
            
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative w-full bg-white/10 rounded-t-lg overflow-hidden" style={{ height: '100%' }}>
                  <div
                    className={`absolute bottom-0 w-full transition-all duration-500 rounded-t-lg ${
                      isOverGoal 
                        ? 'bg-gradient-to-t from-red-500 to-orange-500' 
                        : 'bg-gradient-to-t from-[#00D9FF] to-[#00FF88]'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white text-xs font-semibold">{day.calories}</p>
                  </div>
                </div>
                <p className="text-white/60 text-xs">{day.day}</p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#00FF88]" />
            <p className="text-white/60 text-sm">Dentro da meta</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500" />
            <p className="text-white/60 text-sm">Acima da meta</p>
          </div>
        </div>
      </div>

      {/* Gráfico de evolução de peso */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-white font-semibold text-lg mb-6">Evolução de Peso</h3>
        <div className="relative h-48">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="border-t border-white/5" />
            ))}
          </div>
          
          {/* Line chart */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="weightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00D9FF" />
                <stop offset="100%" stopColor="#00FF88" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="url(#weightGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={weightHistory.map((point, idx) => {
                const x = (idx / (weightHistory.length - 1)) * 100;
                const minWeight = Math.min(...weightHistory.map(p => p.weight));
                const maxWeight = Math.max(...weightHistory.map(p => p.weight));
                const y = 100 - ((point.weight - minWeight) / (maxWeight - minWeight)) * 80;
                return `${x}%,${y}%`;
              }).join(' ')}
            />
            {/* Points */}
            {weightHistory.map((point, idx) => {
              const x = (idx / (weightHistory.length - 1)) * 100;
              const minWeight = Math.min(...weightHistory.map(p => p.weight));
              const maxWeight = Math.max(...weightHistory.map(p => p.weight));
              const y = 100 - ((point.weight - minWeight) / (maxWeight - minWeight)) * 80;
              return (
                <circle
                  key={idx}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="4"
                  fill="#00FF88"
                  stroke="#000"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </div>
        
        {/* Dates */}
        <div className="flex justify-between mt-4 pt-4 border-t border-white/10">
          {weightHistory.map((point, idx) => (
            <div key={idx} className="text-center">
              <p className="text-white/60 text-xs">{point.date}</p>
              <p className="text-white text-sm font-semibold">{point.weight.toFixed(1)}kg</p>
            </div>
          ))}
        </div>
      </div>

      {/* Metas semanais */}
      <div className="bg-gradient-to-r from-[#00D9FF]/10 to-[#00FF88]/10 border border-[#00FF88]/30 rounded-2xl p-6">
        <h3 className="text-white font-semibold text-lg mb-4">Metas da Semana</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Dumbbell className="w-5 h-5 text-[#00FF88]" />
              <span className="text-white">Treinos completados</span>
            </div>
            <span className="text-white font-bold">4 / {user?.workoutsPerWeek === '6+' ? '6' : user?.workoutsPerWeek === '3-5' ? '4' : '2'}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Flame className="w-5 h-5 text-[#00D9FF]" />
              <span className="text-white">Dias dentro da meta</span>
            </div>
            <span className="text-white font-bold">5 / 7</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-[#FFD700]" />
              <span className="text-white">Sequência atual</span>
            </div>
            <span className="text-white font-bold">12 dias 🔥</span>
          </div>
        </div>
      </div>
    </div>
  );
}
