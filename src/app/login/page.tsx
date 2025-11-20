'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '@/lib/supabase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User, Calendar, Scale, Target, Dumbbell, AlertCircle } from 'lucide-react';

type Step = 'auth' | 'personal' | 'fitness' | 'goals';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState<Step>('auth');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Dados de autenticação
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Dados pessoais
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  
  // Dados de fitness
  const [currentWeight, setCurrentWeight] = useState('');
  const [desiredWeight, setDesiredWeight] = useState('');
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState('');
  
  // Metas
  const [goal, setGoal] = useState('');
  const [obstacles, setObstacles] = useState<string[]>([]);
  const [achievements, setAchievements] = useState<string[]>([]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError('');

    try {
      await signUp(email, password, {
        name,
        birthdate,
        gender,
        currentWeight: currentWeight ? parseFloat(currentWeight) : undefined,
        desiredWeight: desiredWeight ? parseFloat(desiredWeight) : undefined,
        workoutsPerWeek,
        goal,
        obstacles,
        achievements,
      });
      
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta');
      setStep('auth');
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 'auth') {
      if (!email || !password || !name) {
        setError('Preencha todos os campos');
        return;
      }
      setError('');
      setStep('personal');
    } else if (step === 'personal') {
      setStep('fitness');
    } else if (step === 'fitness') {
      setStep('goals');
    }
  };

  const toggleObstacle = (obstacle: string) => {
    setObstacles(prev => 
      prev.includes(obstacle) 
        ? prev.filter(o => o !== obstacle)
        : [...prev, obstacle]
    );
  };

  const toggleAchievement = (achievement: string) => {
    setAchievements(prev => 
      prev.includes(achievement) 
        ? prev.filter(a => a !== achievement)
        : [...prev, achievement]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00D9FF] to-[#00FF88] bg-clip-text text-transparent mb-2">
            BR CALL AI
          </h1>
          <p className="text-white/60">Rastreador de Calorias Inteligente</p>
        </div>

        {/* Card principal */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Etapa 1: Autenticação */}
          {step === 'auth' && (
            <form onSubmit={isLogin ? handleLogin : handleNextStep} className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {isLogin ? 'Entrar' : 'Criar Conta'}
                </h2>
                <p className="text-white/60 text-sm">
                  {isLogin ? 'Bem-vindo de volta!' : 'Comece sua jornada saudável'}
                </p>
              </div>

              {!isLogin && (
                <div>
                  <Label htmlFor="name" className="text-white mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-[#00D9FF]" />
                    Nome
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    required
                  />
                </div>
              )}

              <div>
                <Label htmlFor="email" className="text-white mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#00D9FF]" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-white mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#00D9FF]" />
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#00D9FF] to-[#00FF88] hover:from-[#00FF88] hover:to-[#00D9FF] text-black font-bold h-12"
              >
                {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Continuar'}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entre'}
                </button>
              </div>
            </form>
          )}

          {/* Etapa 2: Informações Pessoais */}
          {step === 'personal' && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Sobre Você</h2>
                <p className="text-white/60 text-sm">Conte-nos um pouco mais</p>
              </div>

              <div>
                <Label htmlFor="birthdate" className="text-white mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#00D9FF]" />
                  Data de Nascimento
                </Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <Label className="text-white mb-2">Sexo (opcional)</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`p-3 rounded-lg border transition-all ${
                      gender === 'male'
                        ? 'bg-[#00D9FF]/20 border-[#00D9FF] text-white'
                        : 'bg-white/5 border-white/20 text-white/60'
                    }`}
                  >
                    Masculino
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`p-3 rounded-lg border transition-all ${
                      gender === 'female'
                        ? 'bg-[#00D9FF]/20 border-[#00D9FF] text-white'
                        : 'bg-white/5 border-white/20 text-white/60'
                    }`}
                  >
                    Feminino
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() => setStep('auth')}
                  variant="outline"
                  className="flex-1 border-[#00FF88]/30 text-[#00FF88] hover:bg-[#00FF88]/10"
                >
                  Voltar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#00D9FF] to-[#00FF88] hover:from-[#00FF88] hover:to-[#00D9FF] text-black font-bold"
                >
                  Continuar
                </Button>
              </div>
            </form>
          )}

          {/* Etapa 3: Fitness */}
          {step === 'fitness' && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Suas Metas</h2>
                <p className="text-white/60 text-sm">Vamos personalizar sua experiência</p>
              </div>

              <div>
                <Label htmlFor="currentWeight" className="text-white mb-2 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#00FF88]" />
                  Peso Atual (kg)
                </Label>
                <Input
                  id="currentWeight"
                  type="number"
                  step="0.1"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                  placeholder="70.0"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                />
              </div>

              <div>
                <Label htmlFor="desiredWeight" className="text-white mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#00FF88]" />
                  Peso Desejado (kg)
                </Label>
                <Input
                  id="desiredWeight"
                  type="number"
                  step="0.1"
                  value={desiredWeight}
                  onChange={(e) => setDesiredWeight(e.target.value)}
                  placeholder="65.0"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                />
              </div>

              <div>
                <Label className="text-white mb-2 flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-[#00FF88]" />
                  Treinos por Semana
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {['2x', '3-5x', '6+'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setWorkoutsPerWeek(option)}
                      className={`p-3 rounded-lg border transition-all ${
                        workoutsPerWeek === option
                          ? 'bg-[#00FF88]/20 border-[#00FF88] text-white'
                          : 'bg-white/5 border-white/20 text-white/60'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-white mb-2">Qual sua meta?</Label>
                <div className="space-y-2">
                  {[
                    { value: 'lose', label: 'Perder peso' },
                    { value: 'gain', label: 'Ganhar peso' },
                    { value: 'maintain', label: 'Manter peso' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setGoal(option.value)}
                      className={`w-full p-3 rounded-lg border transition-all text-left ${
                        goal === option.value
                          ? 'bg-[#00D9FF]/20 border-[#00D9FF] text-white'
                          : 'bg-white/5 border-white/20 text-white/60'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() => setStep('personal')}
                  variant="outline"
                  className="flex-1 border-[#00FF88]/30 text-[#00FF88] hover:bg-[#00FF88]/10"
                >
                  Voltar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#00D9FF] to-[#00FF88] hover:from-[#00FF88] hover:to-[#00D9FF] text-black font-bold"
                >
                  Continuar
                </Button>
              </div>
            </form>
          )}

          {/* Etapa 4: Objetivos */}
          {step === 'goals' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Últimos Detalhes</h2>
                <p className="text-white/60 text-sm">O que te impede de alcançar seus objetivos?</p>
              </div>

              <div>
                <Label className="text-white mb-3">Obstáculos</Label>
                <div className="space-y-2">
                  {[
                    'Falta de consistência',
                    'Hábitos alimentares ruins',
                    'Falta de apoio',
                    'Agenda lotada',
                    'Falta de inspiração para refeições',
                  ].map((obstacle) => (
                    <button
                      key={obstacle}
                      type="button"
                      onClick={() => toggleObstacle(obstacle)}
                      className={`w-full p-3 rounded-lg border transition-all text-left text-sm ${
                        obstacles.includes(obstacle)
                          ? 'bg-red-500/20 border-red-500/50 text-white'
                          : 'bg-white/5 border-white/20 text-white/60'
                      }`}
                    >
                      {obstacle}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-white mb-3">O que você quer alcançar?</Label>
                <div className="space-y-2">
                  {[
                    'Comer e viver de forma mais saudável',
                    'Aumentar energia e melhorar humor',
                    'Manter-se motivado e consistente',
                    'Sentir-se melhor com o corpo',
                  ].map((achievement) => (
                    <button
                      key={achievement}
                      type="button"
                      onClick={() => toggleAchievement(achievement)}
                      className={`w-full p-3 rounded-lg border transition-all text-left text-sm ${
                        achievements.includes(achievement)
                          ? 'bg-[#00FF88]/20 border-[#00FF88] text-white'
                          : 'bg-white/5 border-white/20 text-white/60'
                      }`}
                    >
                      {achievement}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  onClick={() => setStep('fitness')}
                  variant="outline"
                  disabled={loading}
                  className="flex-1 border-[#00FF88]/30 text-[#00FF88] hover:bg-[#00FF88]/10"
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleSignUp}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-[#00D9FF] to-[#00FF88] hover:from-[#00FF88] hover:to-[#00D9FF] text-black font-bold"
                >
                  {loading ? 'Criando conta...' : 'Começar!'}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Depoimentos (apenas na última etapa) */}
        {step === 'goals' && (
          <div className="mt-8 space-y-3">
            <p className="text-white/60 text-center text-sm mb-4">O que nossos usuários dizem:</p>
            {[
              'Perdi 8kg em 2 meses com o AI BR recomendo!',
              'Aplicativo simples e completo, me ajudou muito!',
              'BR CALL AI de calorias é surpreendente, amei!',
            ].map((testimonial, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3 text-white/80 text-sm">
                ⭐⭐⭐⭐⭐ "{testimonial}"
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
