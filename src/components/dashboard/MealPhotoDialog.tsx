'use client';

import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera, Upload, X, Loader2, Check, Zap, ImagePlus } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { createMeal } from '@/lib/supabase/database';

interface MealPhotoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  onMealAdded?: () => void;
}

export default function MealPhotoDialog({
  open,
  onOpenChange,
  mealType,
  onMealAdded,
}: MealPhotoDialogProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Análise automática INSTANTÂNEA quando a imagem é carregada
  useEffect(() => {
    if (selectedImage && !result && !analyzing) {
      analyzeMeal();
    }
  }, [selectedImage]);

  const analyzeMeal = async () => {
    if (!selectedImage) return;

    setAnalyzing(true);
    const startTime = Date.now();
    
    try {
      const response = await fetch('/api/analyze-meal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: selectedImage,
          mealType,
        }),
      });

      const data = await response.json();
      
      // Garantir tempo mínimo de 500ms para feedback visual
      const elapsed = Date.now() - startTime;
      if (elapsed < 500) {
        await new Promise(resolve => setTimeout(resolve, 500 - elapsed));
      }
      
      if (data.success) {
        setResult(data.data);
      } else {
        alert('Erro ao analisar a imagem. Tente novamente.');
      }
    } catch (error) {
      console.error('Error analyzing meal:', error);
      alert('Erro ao analisar a imagem. Tente novamente.');
    } finally {
      setAnalyzing(false);
    }
  };

  const saveMeal = async () => {
    if (!result || !user) return;

    setSaving(true);
    try {
      await createMeal({
        user_id: user.id,
        timestamp: new Date().toISOString(),
        image_url: selectedImage,
        total_calories: result.calories,
        total_protein: result.macros.protein,
        total_carbs: result.macros.carbs,
        total_fat: result.macros.fat,
      });

      // Fechar dialog e notificar
      onOpenChange(false);
      if (onMealAdded) onMealAdded();
      
      // Resetar estado
      setSelectedImage(null);
      setResult(null);
    } catch (error) {
      console.error('Error saving meal:', error);
      alert('Erro ao salvar refeição. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setSelectedImage(null);
    setResult(null);
    setAnalyzing(false);
    setSaving(false);
  };

  const handleAddPhotoClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-[#0a0a0a] to-[#000000] border-white/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#00D9FF] to-[#00FF88] bg-clip-text text-transparent flex items-center gap-2">
            <Zap className="w-6 h-6 text-[#00FF88]" />
            Análise Instantânea com IA
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!selectedImage ? (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Botão visual interativo para adicionar foto */}
              <div 
                onClick={handleAddPhotoClick}
                className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#00D9FF] to-[#00FF88] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-[#00FF88]/50"
              >
                <ImagePlus className="w-12 h-12 text-black" />
              </div>

              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-[#00FF88] font-semibold">
                  <Zap className="w-4 h-4" />
                  Análise Instantânea
                </div>
                <p className="text-white/60 text-sm">
                  Tire uma foto e a IA analisa automaticamente em segundos
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Preview da imagem */}
              <div className="relative rounded-2xl overflow-hidden border border-white/20">
                <img
                  src={selectedImage}
                  alt="Meal preview"
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={reset}
                  className="absolute top-2 right-2 p-2 bg-black/60 rounded-full hover:bg-black/80 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
                
                {/* Badge de análise instantânea */}
                {analyzing && (
                  <div className="absolute bottom-2 left-2 bg-gradient-to-r from-[#00D9FF] to-[#00FF88] text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 animate-pulse">
                    <Zap className="w-3 h-3" />
                    Análise Instantânea...
                  </div>
                )}
              </div>

              {analyzing && (
                <div className="text-center py-8">
                  <div className="relative inline-block">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-[#00FF88]" />
                    <Zap className="w-6 h-6 absolute top-3 left-3 text-[#00D9FF] animate-pulse" />
                  </div>
                  <p className="text-white font-semibold">Análise instantânea em andamento...</p>
                  <p className="text-white/60 text-sm">IA identificando alimentos e calculando calorias</p>
                </div>
              )}

              {result && (
                <div className="space-y-4">
                  {/* Badge de sucesso com tempo */}
                  <div className="bg-gradient-to-r from-[#00FF88]/20 to-[#00D9FF]/20 border border-[#00FF88]/50 rounded-xl p-3 text-center">
                    <p className="text-[#00FF88] font-semibold text-sm flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4" />
                      Análise completa! Resultado instantâneo
                    </p>
                  </div>

                  {/* Calorias totais */}
                  <div className="bg-gradient-to-r from-[#00D9FF]/20 to-[#00FF88]/20 border border-[#00FF88]/30 rounded-2xl p-6 text-center">
                    <p className="text-white/60 text-sm mb-2">Calorias Totais</p>
                    <p className="text-5xl font-bold text-[#00FF88]">{result.calories}</p>
                    <p className="text-white/40 text-sm">kcal</p>
                  </div>

                  {/* Macros */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                      <p className="text-white/60 text-xs mb-1">Carboidratos</p>
                      <p className="text-2xl font-bold text-white">{result.macros.carbs}g</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                      <p className="text-white/60 text-xs mb-1">Proteína</p>
                      <p className="text-2xl font-bold text-white">{result.macros.protein}g</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                      <p className="text-white/60 text-xs mb-1">Gordura</p>
                      <p className="text-2xl font-bold text-white">{result.macros.fat}g</p>
                    </div>
                  </div>

                  {/* Ingredientes */}
                  {result.ingredients && result.ingredients.length > 0 && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-white/60 text-sm mb-2">🍽️ Alimentos Identificados pela IA:</p>
                      <div className="flex flex-wrap gap-2">
                        {result.ingredients.map((ingredient: string, index: number) => (
                          <span
                            key={index}
                            className="bg-[#00FF88]/20 text-[#00FF88] px-3 py-1 rounded-full text-sm"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sugestão saudável */}
                  {result.healthierSuggestion && (
                    <div className="bg-gradient-to-r from-[#00D9FF]/10 to-[#00FF88]/10 border border-[#00FF88]/30 rounded-xl p-4">
                      <p className="text-white/60 text-sm mb-2">💡 Sugestão Mais Saudável:</p>
                      <p className="text-white/90 text-sm">{result.healthierSuggestion}</p>
                    </div>
                  )}

                  {/* Botões de ação */}
                  <div className="flex gap-3">
                    <Button
                      onClick={reset}
                      variant="outline"
                      className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={saveMeal}
                      disabled={saving}
                      className="flex-1 bg-gradient-to-r from-[#00D9FF] to-[#00FF88] hover:from-[#00FF88] hover:to-[#00D9FF] text-black font-bold"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Salvar Refeição
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
