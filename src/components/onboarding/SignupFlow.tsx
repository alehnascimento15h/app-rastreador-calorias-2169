'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { getTranslation } from '@/lib/i18n';
import { UserProfile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

interface SignupFlowProps {
  onComplete: () => void;
}

export default function SignupFlow({ onComplete }: SignupFlowProps) {
  const { language } = useLanguage();
  const { setUser, completeOnboarding } = useUser();
  const t = (key: string) => getTranslation(language, key as any);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    obstacles: [],
    achievements: [],
  });

  const updateField = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field: 'obstacles' | 'achievements', value: string) => {
    setFormData(prev => {
      const current = prev[field] || [];
      const newArray = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [field]: newArray };
    });
  };

  const calculateCalorieGoal = () => {
    const weight = formData.currentWeight || 70;
    const goal = formData.goal;
    const workouts = formData.workoutsPerWeek;
    
    let baseCalories = weight * 30; // Aproximação simples
    
    if (goal === 'lose') baseCalories -= 500;
    if (goal === 'gain') baseCalories += 500;
    
    if (workouts === '6+') baseCalories += 200;
    else if (workouts === '3-5') baseCalories += 100;
    
    return Math.round(baseCalories);
  };

  const handleComplete = () => {
    const user: UserProfile = {
      id: Date.now().toString(),
      name: formData.name || '',
      email: formData.email || '',
      birthdate: formData.birthdate || '',
      gender: formData.gender,
      workoutsPerWeek: formData.workoutsPerWeek || '2',
      goal: formData.goal || 'maintain',
      currentWeight: formData.currentWeight || 70,
      desiredWeight: formData.desiredWeight || 70,
      obstacles: formData.obstacles || [],
      achievements: formData.achievements || [],
      dailyCalorieGoal: calculateCalorieGoal(),
      createdAt: new Date().toISOString(),
    };
    
    setUser(user);
    completeOnboarding();
    setStep(8); // Tela de depoimentos
  };

  const nextStep = () => {
    if (step === 7) {
      handleComplete();
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  // Tela de depoimentos (após completar cadastro)
  if (step === 8) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#000000] flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">
            {t('testimonials')}
          </h2>
          <p className="text-white/60 text-center mb-8">Veja o que nossos usuários alcançaram</p>
          
          <div className="space-y-4 mb-8">
            {[
              { text: t('testimonial1'), stars: 5, name: 'Maria S.' },
              { text: t('testimonial2'), stars: 5, name: 'João P.' },
              { text: t('testimonial3'), stars: 5, name: 'Ana L.' },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: testimonial.stars }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#00FF88] text-[#00FF88]" />
                  ))}
                </div>
                <p className="text-white mb-2">{testimonial.text}</p>
                <p className="text-white/40 text-sm">— {testimonial.name}</p>
              </div>
            ))}
          </div>

          <Button
            onClick={onComplete}
            size="lg"
            className="w-full bg-gradient-to-r from-[#00D9FF] to-[#00FF88] hover:from-[#00FF88] hover:to-[#00D9FF] text-black font-bold text-lg py-6 rounded-full"
          >
            Começar Agora
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#000000] flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-white/60 text-sm">Passo {step} de 7</span>
            <span className="text-white/60 text-sm">{Math.round((step / 7) * 100)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00D9FF] to-[#00FF88] transition-all duration-300"
              style={{ width: `${(step / 7) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Informações pessoais */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">{t('personalInfo')}</h2>
            
            <div>
              <Label htmlFor="name" className="text-white mb-2">{t('name')}</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => updateField('name', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-white mb-2">{t('email')}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => updateField('email', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-white mb-2">{t('password')}</Label>
              <Input
                id="password"
                type="password"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                placeholder="••••••••"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="birthdate" className="text-white mb-2">{t('birthdate')}</Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={formData.birthdate || ''}
                  onChange={(e) => updateField('birthdate', e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <Label className="text-white mb-2">{t('gender')} ({t('optional')})</Label>
                <select
                  value={formData.gender || ''}
                  onChange={(e) => updateField('gender', e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-white/10 border border-white/20 text-white"
                >
                  <option value="">Selecione</option>
                  <option value="male">{t('male')}</option>
                  <option value="female">{t('female')}</option>
                  <option value="other">{t('other')}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Treinos por semana */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">{t('workoutsPerWeek')}</h2>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                { value: '2', label: t('workouts2') },
                { value: '3-5', label: t('workouts3to5') },
                { value: '6+', label: t('workouts6plus') },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateField('workoutsPerWeek', option.value)}
                  className={`
                    p-6 rounded-2xl border-2 transition-all duration-300 text-left
                    ${formData.workoutsPerWeek === option.value
                      ? 'bg-gradient-to-br from-[#00D9FF]/20 to-[#00FF88]/20 border-[#00FF88]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }
                  `}
                >
                  <span className="text-white text-lg font-semibold">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Meta atual */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">{t('currentGoal')}</h2>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                { value: 'lose', label: t('loseWeight'), emoji: '📉' },
                { value: 'gain', label: t('gainWeight'), emoji: '📈' },
                { value: 'maintain', label: t('maintainWeight'), emoji: '⚖️' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateField('goal', option.value)}
                  className={`
                    p-6 rounded-2xl border-2 transition-all duration-300 text-left flex items-center gap-4
                    ${formData.goal === option.value
                      ? 'bg-gradient-to-br from-[#00D9FF]/20 to-[#00FF88]/20 border-[#00FF88]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }
                  `}
                >
                  <span className="text-4xl">{option.emoji}</span>
                  <span className="text-white text-lg font-semibold">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Peso atual e desejado */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Seus Pesos</h2>
            
            <div>
              <Label htmlFor="currentWeight" className="text-white mb-2">{t('currentWeight')}</Label>
              <Input
                id="currentWeight"
                type="number"
                value={formData.currentWeight || ''}
                onChange={(e) => updateField('currentWeight', parseFloat(e.target.value))}
                className="bg-white/10 border-white/20 text-white text-2xl text-center"
                placeholder="70"
              />
              <p className="text-white/40 text-sm mt-1 text-center">kg</p>
            </div>

            <div>
              <Label htmlFor="desiredWeight" className="text-white mb-2">{t('desiredWeight')}</Label>
              <Input
                id="desiredWeight"
                type="number"
                value={formData.desiredWeight || ''}
                onChange={(e) => updateField('desiredWeight', parseFloat(e.target.value))}
                className="bg-white/10 border-white/20 text-white text-2xl text-center"
                placeholder="65"
              />
              <p className="text-white/40 text-sm mt-1 text-center">kg</p>
            </div>

            {formData.currentWeight && formData.desiredWeight && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <p className="text-white/60 text-sm mb-1">Diferença</p>
                <p className="text-2xl font-bold text-[#00FF88]">
                  {Math.abs(formData.currentWeight - formData.desiredWeight).toFixed(1)} kg
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 5: Obstáculos */}
        {step === 5 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">{t('obstacles')}</h2>
            <p className="text-white/60 mb-4">Selecione todos que se aplicam</p>
            
            <div className="grid grid-cols-1 gap-3">
              {[
                { value: 'consistency', label: t('lackConsistency') },
                { value: 'eating', label: t('badEatingHabits') },
                { value: 'support', label: t('lackSupport') },
                { value: 'schedule', label: t('busySchedule') },
                { value: 'inspiration', label: t('lackMealInspiration') },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleArrayField('obstacles', option.value)}
                  className={`
                    p-4 rounded-xl border-2 transition-all duration-300 text-left
                    ${formData.obstacles?.includes(option.value)
                      ? 'bg-gradient-to-br from-[#00D9FF]/20 to-[#00FF88]/20 border-[#00FF88]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }
                  `}
                >
                  <span className="text-white">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Conquistas desejadas */}
        {step === 6 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">{t('achievements')}</h2>
            <p className="text-white/60 mb-4">Selecione todos que se aplicam</p>
            
            <div className="grid grid-cols-1 gap-3">
              {[
                { value: 'healthy', label: t('eatHealthier') },
                { value: 'energy', label: t('increaseEnergy') },
                { value: 'motivated', label: t('stayMotivated') },
                { value: 'better', label: t('feelBetter') },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleArrayField('achievements', option.value)}
                  className={`
                    p-4 rounded-xl border-2 transition-all duration-300 text-left
                    ${formData.achievements?.includes(option.value)
                      ? 'bg-gradient-to-br from-[#00D9FF]/20 to-[#00FF88]/20 border-[#00FF88]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }
                  `}
                >
                  <span className="text-white">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 7: Resumo */}
        {step === 7 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Tudo Pronto!</h2>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div>
                <p className="text-white/60 text-sm">Sua meta diária de calorias</p>
                <p className="text-4xl font-bold text-[#00FF88]">{calculateCalorieGoal()} kcal</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-white/60 text-sm">Peso Atual</p>
                  <p className="text-xl font-semibold text-white">{formData.currentWeight} kg</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Peso Desejado</p>
                  <p className="text-xl font-semibold text-white">{formData.desiredWeight} kg</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#00D9FF]/10 to-[#00FF88]/10 border border-[#00FF88]/30 rounded-2xl p-6">
              <p className="text-white text-center">
                Estamos prontos para ajudá-lo a alcançar seus objetivos! 🎯
              </p>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <Button
              onClick={prevStep}
              variant="outline"
              className="border-[#00FF88]/50 text-[#00FF88] hover:bg-[#00FF88]/10 hover:border-[#00FF88]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('back')}
            </Button>
          )}
          
          <Button
            onClick={nextStep}
            className="flex-1 bg-gradient-to-r from-[#00D9FF] to-[#00FF88] hover:from-[#00FF88] hover:to-[#00D9FF] text-black font-bold"
          >
            {step === 7 ? t('finish') : t('next')}
            {step < 7 && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
