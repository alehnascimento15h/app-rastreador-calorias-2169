'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { languages, getTranslation, Language } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface LanguageSelectorProps {
  onComplete: () => void;
}

export default function LanguageSelector({ onComplete }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  const [selected, setSelected] = useState<Language>(language);
  const t = (key: string) => getTranslation(selected, key as any);

  const handleSelect = (lang: Language) => {
    setSelected(lang);
  };

  const handleContinue = () => {
    setLanguage(selected);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#000000] flex flex-col items-center justify-center p-6">
      {/* Logo pequeno no topo */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00D9FF] to-[#00FF88] bg-clip-text text-transparent">
          BR CALL AI
        </h1>
      </div>

      {/* Título */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
        {t('selectLanguage')}
      </h2>

      {/* Grid de idiomas */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl w-full mb-8">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            className={`
              relative p-6 rounded-2xl border-2 transition-all duration-300
              ${selected === lang.code
                ? 'bg-gradient-to-br from-[#00D9FF]/20 to-[#00FF88]/20 border-[#00FF88] scale-105'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }
            `}
          >
            {selected === lang.code && (
              <div className="absolute top-2 right-2 bg-[#00FF88] rounded-full p-1">
                <Check className="w-4 h-4 text-black" />
              </div>
            )}
            <div className="text-4xl mb-2">{lang.flag}</div>
            <div className="text-white font-medium text-sm">{lang.name}</div>
          </button>
        ))}
      </div>

      {/* Botão continuar */}
      <Button
        onClick={handleContinue}
        size="lg"
        className="bg-gradient-to-r from-[#00D9FF] to-[#00FF88] hover:from-[#00FF88] hover:to-[#00D9FF] text-black font-bold text-lg px-12 py-6 rounded-full shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-110"
      >
        {t('continue')}
      </Button>
    </div>
  );
}
