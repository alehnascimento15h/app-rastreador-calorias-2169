'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onContinue: () => void;
}

export default function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key as any);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#000000] flex flex-col items-center justify-center p-6">
      {/* Logo animado */}
      <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00D9FF] to-[#00FF88] blur-3xl opacity-30 animate-pulse"></div>
          <h1 className="relative text-6xl md:text-8xl font-bold bg-gradient-to-r from-[#00D9FF] via-[#00FF88] to-[#00D9FF] bg-clip-text text-transparent">
            BR CALL AI
          </h1>
        </div>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Sparkles className="w-5 h-5 text-[#00FF88]" />
          <p className="text-xl md:text-2xl text-white/80 font-light">
            Rastreador de Calorias
          </p>
          <Sparkles className="w-5 h-5 text-[#00D9FF]" />
        </div>
      </div>

      {/* Características principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl w-full animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
          <div className="text-4xl mb-3">📸</div>
          <h3 className="text-white font-semibold mb-2">IA Inteligente</h3>
          <p className="text-white/60 text-sm">Tire foto e descubra as calorias</p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
          <div className="text-4xl mb-3">🎯</div>
          <h3 className="text-white font-semibold mb-2">Metas Personalizadas</h3>
          <p className="text-white/60 text-sm">Alcance seus objetivos</p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
          <div className="text-4xl mb-3">📊</div>
          <h3 className="text-white font-semibold mb-2">Progresso Visual</h3>
          <p className="text-white/60 text-sm">Acompanhe sua evolução</p>
        </div>
      </div>

      {/* Botão de continuar */}
      <Button
        onClick={onContinue}
        size="lg"
        className="bg-gradient-to-r from-[#00D9FF] to-[#00FF88] hover:from-[#00FF88] hover:to-[#00D9FF] text-black font-bold text-lg px-12 py-6 rounded-full shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-110 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500"
      >
        {t('getStarted')}
      </Button>

      {/* Indicador de idiomas disponíveis */}
      <p className="mt-8 text-white/40 text-sm animate-in fade-in duration-1000 delay-700">
        🌍 Disponível em 12 idiomas
      </p>
    </div>
  );
}
