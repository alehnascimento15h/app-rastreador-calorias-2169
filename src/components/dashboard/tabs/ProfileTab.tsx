'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { getTranslation, languages, Language } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User as UserIcon, Mail, Calendar, Scale, Target, Dumbbell, Globe, Bell, Crown, LogOut, Edit2, Check, X } from 'lucide-react';

export default function ProfileTab() {
  const { language, setLanguage } = useLanguage();
  const { user, setUser } = useUser();
  const t = (key: string) => getTranslation(language, key as any);

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSave = () => {
    if (editedUser) {
      setUser(editedUser);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">{t('profile')}</h2>
        <p className="text-white/60">Gerencie suas informações</p>
      </div>

      {/* Avatar e nome */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-center">
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#00D9FF] to-[#00FF88] rounded-full flex items-center justify-center">
          <UserIcon className="w-12 h-12 text-black" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-1">{user?.name}</h3>
        <p className="text-white/60">{user?.email}</p>
        
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="mt-4 bg-gradient-to-r from-[#00D9FF] to-[#00FF88] border-[#00FF88]/30 text-black font-bold hover:from-[#00FF88] hover:to-[#00D9FF] hover:shadow-lg hover:shadow-[#00FF88]/30 transition-all"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Editar Perfil
          </Button>
        )}
      </div>

      {/* Informações pessoais */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-white font-semibold text-lg mb-4">{t('personalData')}</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <UserIcon className="w-5 h-5 text-[#00D9FF]" />
            </div>
            <div className="flex-1">
              <p className="text-white/60 text-sm">{t('name')}</p>
              {isEditing ? (
                <Input
                  value={editedUser?.name || ''}
                  onChange={(e) => setEditedUser(prev => prev ? { ...prev, name: e.target.value } : null)}
                  className="bg-white/10 border-white/20 text-white mt-1"
                />
              ) : (
                <p className="text-white font-medium">{user?.name}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <Mail className="w-5 h-5 text-[#00D9FF]" />
            </div>
            <div className="flex-1">
              <p className="text-white/60 text-sm">{t('email')}</p>
              <p className="text-white font-medium">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <Calendar className="w-5 h-5 text-[#00D9FF]" />
            </div>
            <div className="flex-1">
              <p className="text-white/60 text-sm">{t('birthdate')}</p>
              {isEditing ? (
                <Input
                  type="date"
                  value={editedUser?.birthdate || ''}
                  onChange={(e) => setEditedUser(prev => prev ? { ...prev, birthdate: e.target.value } : null)}
                  className="bg-white/10 border-white/20 text-white mt-1"
                />
              ) : (
                <p className="text-white font-medium">
                  {user?.birthdate ? new Date(user.birthdate).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US') : '-'}
                </p>
              )}
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-3 mt-6">
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-[#00D9FF] to-[#00FF88] hover:from-[#00FF88] hover:to-[#00D9FF] text-black font-bold"
            >
              <Check className="w-4 h-4 mr-2" />
              Salvar
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1 bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30 hover:border-red-500"
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
          </div>
        )}
      </div>

      {/* Informações de fitness */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-white font-semibold text-lg mb-4">Informações de Fitness</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <Scale className="w-5 h-5 text-[#00FF88]" />
            </div>
            <div className="flex-1">
              <p className="text-white/60 text-sm">Peso Atual</p>
              {isEditing ? (
                <Input
                  type="number"
                  value={editedUser?.currentWeight || ''}
                  onChange={(e) => setEditedUser(prev => prev ? { ...prev, currentWeight: parseFloat(e.target.value) } : null)}
                  className="bg-white/10 border-white/20 text-white mt-1"
                />
              ) : (
                <p className="text-white font-medium">{user?.currentWeight} kg</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <Target className="w-5 h-5 text-[#00FF88]" />
            </div>
            <div className="flex-1">
              <p className="text-white/60 text-sm">Peso Desejado</p>
              {isEditing ? (
                <Input
                  type="number"
                  value={editedUser?.desiredWeight || ''}
                  onChange={(e) => setEditedUser(prev => prev ? { ...prev, desiredWeight: parseFloat(e.target.value) } : null)}
                  className="bg-white/10 border-white/20 text-white mt-1"
                />
              ) : (
                <p className="text-white font-medium">{user?.desiredWeight} kg</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <Dumbbell className="w-5 h-5 text-[#00FF88]" />
            </div>
            <div className="flex-1">
              <p className="text-white/60 text-sm">Treinos por Semana</p>
              <p className="text-white font-medium capitalize">{user?.workoutsPerWeek}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <Target className="w-5 h-5 text-[#00FF88]" />
            </div>
            <div className="flex-1">
              <p className="text-white/60 text-sm">Meta de Calorias Diárias</p>
              <p className="text-white font-medium">{user?.dailyCalorieGoal} kcal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Configurações */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-white font-semibold text-lg mb-4">Configurações</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Globe className="w-5 h-5 text-[#00D9FF]" />
              </div>
              <div>
                <p className="text-white font-medium">{t('language')}</p>
                <p className="text-white/60 text-sm">
                  {languages.find(l => l.code === language)?.name}
                </p>
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Bell className="w-5 h-5 text-[#00D9FF]" />
              </div>
              <div>
                <p className="text-white font-medium">{t('notifications')}</p>
                <p className="text-white/60 text-sm">Lembretes e motivação</p>
              </div>
            </div>
            <button className="bg-[#00FF88] rounded-full w-12 h-6 relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full transition-all" />
            </button>
          </div>
        </div>
      </div>

      {/* Botão de sair */}
      <Button
        onClick={handleLogout}
        variant="outline"
        className="w-full border-red-500/50 text-red-500 hover:bg-red-500/10"
      >
        <LogOut className="w-4 h-4 mr-2" />
        {t('logout')}
      </Button>

      {/* Informações do app */}
      <div className="text-center text-white/40 text-sm py-4">
        <p>BR CALL AI v1.0.0</p>
        <p className="mt-1">Feito com ❤️ para sua saúde</p>
      </div>
    </div>
  );
}
