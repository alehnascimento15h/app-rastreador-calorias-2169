// Sistema de internacionalização para BR CALL AI
export type Language = 'pt' | 'en' | 'es' | 'fr' | 'de' | 'it' | 'ja' | 'ko' | 'zh' | 'ar' | 'ru' | 'hi';

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
];

export const translations = {
  pt: {
    welcome: 'Bem-vindo ao',
    selectLanguage: 'Selecione seu idioma',
    continue: 'Continuar',
    getStarted: 'Começar',
    next: 'Próximo',
    back: 'Voltar',
    skip: 'Pular',
    finish: 'Finalizar',
    
    // Cadastro
    signup: 'Criar Conta',
    personalInfo: 'Informações Pessoais',
    name: 'Nome',
    email: 'Email',
    password: 'Senha',
    birthdate: 'Data de Nascimento',
    gender: 'Sexo',
    male: 'Masculino',
    female: 'Feminino',
    other: 'Outro',
    optional: 'Opcional',
    
    // Condicionamento físico
    fitnessInfo: 'Informações de Condicionamento',
    workoutsPerWeek: 'Quantos treinos faz por semana?',
    workouts2: '2 vezes',
    workouts3to5: '3 a 5 vezes',
    workouts6plus: '6+',
    
    currentGoal: 'Qual sua meta atual?',
    loseWeight: 'Perder peso',
    gainWeight: 'Ganhar peso',
    maintainWeight: 'Manter peso',
    
    currentWeight: 'Qual é seu peso atual?',
    desiredWeight: 'Qual é o seu peso desejado?',
    weightKg: 'Peso (kg)',
    
    obstacles: 'O que está impedindo você de atingir seu objetivo?',
    lackConsistency: 'Falta de consistência',
    badEatingHabits: 'Hábitos alimentares ruins',
    lackSupport: 'Falta de apoio',
    busySchedule: 'Agenda lotada',
    lackMealInspiration: 'Falta de inspiração para refeições',
    
    achievements: 'O que você gostaria de alcançar?',
    eatHealthier: 'Comer e viver de forma mais saudável',
    increaseEnergy: 'Aumentar energia e melhorar humor',
    stayMotivated: 'Manter-se motivado e consistente',
    feelBetter: 'Sentir-se melhor com o corpo',
    
    // Depoimentos
    testimonials: 'O que nossos usuários dizem',
    testimonial1: 'Perdi 8kg em 2 meses com o AI BR recomendo!',
    testimonial2: 'Aplicativo simples e completo, me ajudou muito!',
    testimonial3: 'BR CALL AI de calorias é surpreendente, amei!',
    
    // Menu
    home: 'Início',
    meals: 'Refeições',
    progress: 'Progresso',
    profile: 'Perfil',
    
    // Home
    calorieGoal: 'Meta de Calorias',
    todayProgress: 'Progresso de Hoje',
    takeMealPhoto: 'Tirar Foto da Refeição',
    
    // Refeições
    breakfast: 'Café da Manhã',
    lunch: 'Almoço',
    dinner: 'Jantar',
    snack: 'Lanche',
    
    // Progresso
    weight: 'Peso',
    weeklyGraphs: 'Gráficos Semanais',
    visualHistory: 'Histórico Visual',
    
    // Perfil
    personalData: 'Dados Pessoais',
    language: 'Idioma',
    plan: 'Plano',
    notifications: 'Notificações',
    logout: 'Sair',
  },
  en: {
    welcome: 'Welcome to',
    selectLanguage: 'Select your language',
    continue: 'Continue',
    getStarted: 'Get Started',
    next: 'Next',
    back: 'Back',
    skip: 'Skip',
    finish: 'Finish',
    
    signup: 'Sign Up',
    personalInfo: 'Personal Information',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    birthdate: 'Birth Date',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    optional: 'Optional',
    
    fitnessInfo: 'Fitness Information',
    workoutsPerWeek: 'How many workouts per week?',
    workouts2: '2 times',
    workouts3to5: '3 to 5 times',
    workouts6plus: '6+',
    
    currentGoal: 'What is your current goal?',
    loseWeight: 'Lose weight',
    gainWeight: 'Gain weight',
    maintainWeight: 'Maintain weight',
    
    currentWeight: 'What is your current weight?',
    desiredWeight: 'What is your desired weight?',
    weightKg: 'Weight (kg)',
    
    obstacles: 'What is preventing you from reaching your goal?',
    lackConsistency: 'Lack of consistency',
    badEatingHabits: 'Bad eating habits',
    lackSupport: 'Lack of support',
    busySchedule: 'Busy schedule',
    lackMealInspiration: 'Lack of meal inspiration',
    
    achievements: 'What would you like to achieve?',
    eatHealthier: 'Eat and live healthier',
    increaseEnergy: 'Increase energy and improve mood',
    stayMotivated: 'Stay motivated and consistent',
    feelBetter: 'Feel better about your body',
    
    testimonials: 'What our users say',
    testimonial1: 'Lost 8kg in 2 months with AI BR, highly recommend!',
    testimonial2: 'Simple and complete app, helped me a lot!',
    testimonial3: 'BR CALL AI calorie tracker is amazing, loved it!',
    
    home: 'Home',
    meals: 'Meals',
    progress: 'Progress',
    profile: 'Profile',
    
    calorieGoal: 'Calorie Goal',
    todayProgress: 'Today\'s Progress',
    takeMealPhoto: 'Take Meal Photo',
    
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    snack: 'Snack',
    
    weight: 'Weight',
    weeklyGraphs: 'Weekly Graphs',
    visualHistory: 'Visual History',
    
    personalData: 'Personal Data',
    language: 'Language',
    plan: 'Plan',
    notifications: 'Notifications',
    logout: 'Logout',
  },
  es: {
    welcome: 'Bienvenido a',
    selectLanguage: 'Selecciona tu idioma',
    continue: 'Continuar',
    getStarted: 'Comenzar',
    next: 'Siguiente',
    back: 'Atrás',
    skip: 'Saltar',
    finish: 'Finalizar',
    
    signup: 'Crear Cuenta',
    personalInfo: 'Información Personal',
    name: 'Nombre',
    email: 'Correo',
    password: 'Contraseña',
    birthdate: 'Fecha de Nacimiento',
    gender: 'Género',
    male: 'Masculino',
    female: 'Femenino',
    other: 'Otro',
    optional: 'Opcional',
    
    fitnessInfo: 'Información de Fitness',
    workoutsPerWeek: '¿Cuántos entrenamientos por semana?',
    workouts2: '2 veces',
    workouts3to5: '3 a 5 veces',
    workouts6plus: '6+',
    
    currentGoal: '¿Cuál es tu meta actual?',
    loseWeight: 'Perder peso',
    gainWeight: 'Ganar peso',
    maintainWeight: 'Mantener peso',
    
    currentWeight: '¿Cuál es tu peso actual?',
    desiredWeight: '¿Cuál es tu peso deseado?',
    weightKg: 'Peso (kg)',
    
    obstacles: '¿Qué te impide alcanzar tu objetivo?',
    lackConsistency: 'Falta de consistencia',
    badEatingHabits: 'Malos hábitos alimenticios',
    lackSupport: 'Falta de apoyo',
    busySchedule: 'Agenda ocupada',
    lackMealInspiration: 'Falta de inspiración para comidas',
    
    achievements: '¿Qué te gustaría lograr?',
    eatHealthier: 'Comer y vivir más saludable',
    increaseEnergy: 'Aumentar energía y mejorar humor',
    stayMotivated: 'Mantenerse motivado y consistente',
    feelBetter: 'Sentirse mejor con el cuerpo',
    
    testimonials: 'Lo que dicen nuestros usuarios',
    testimonial1: '¡Perdí 8kg en 2 meses con AI BR, lo recomiendo!',
    testimonial2: '¡Aplicación simple y completa, me ayudó mucho!',
    testimonial3: '¡BR CALL AI de calorías es sorprendente, me encantó!',
    
    home: 'Inicio',
    meals: 'Comidas',
    progress: 'Progreso',
    profile: 'Perfil',
    
    calorieGoal: 'Meta de Calorías',
    todayProgress: 'Progreso de Hoy',
    takeMealPhoto: 'Tomar Foto de Comida',
    
    breakfast: 'Desayuno',
    lunch: 'Almuerzo',
    dinner: 'Cena',
    snack: 'Merienda',
    
    weight: 'Peso',
    weeklyGraphs: 'Gráficos Semanales',
    visualHistory: 'Historial Visual',
    
    personalData: 'Datos Personales',
    language: 'Idioma',
    plan: 'Plan',
    notifications: 'Notificaciones',
    logout: 'Cerrar Sesión',
  },
  // Adicionar traduções básicas para outros idiomas
  fr: { welcome: 'Bienvenue à', selectLanguage: 'Sélectionnez votre langue', continue: 'Continuer', getStarted: 'Commencer', next: 'Suivant', back: 'Retour', skip: 'Passer', finish: 'Terminer', signup: 'S\'inscrire', personalInfo: 'Informations Personnelles', name: 'Nom', email: 'Email', password: 'Mot de passe', birthdate: 'Date de naissance', gender: 'Genre', male: 'Masculin', female: 'Féminin', other: 'Autre', optional: 'Optionnel', fitnessInfo: 'Informations Fitness', workoutsPerWeek: 'Combien d\'entraînements par semaine?', workouts2: '2 fois', workouts3to5: '3 à 5 fois', workouts6plus: '6+', currentGoal: 'Quel est votre objectif actuel?', loseWeight: 'Perdre du poids', gainWeight: 'Prendre du poids', maintainWeight: 'Maintenir le poids', currentWeight: 'Quel est votre poids actuel?', desiredWeight: 'Quel est votre poids désiré?', weightKg: 'Poids (kg)', obstacles: 'Qu\'est-ce qui vous empêche d\'atteindre votre objectif?', lackConsistency: 'Manque de cohérence', badEatingHabits: 'Mauvaises habitudes alimentaires', lackSupport: 'Manque de soutien', busySchedule: 'Emploi du temps chargé', lackMealInspiration: 'Manque d\'inspiration pour les repas', achievements: 'Que souhaitez-vous accomplir?', eatHealthier: 'Manger et vivre plus sainement', increaseEnergy: 'Augmenter l\'énergie et améliorer l\'humeur', stayMotivated: 'Rester motivé et cohérent', feelBetter: 'Se sentir mieux dans son corps', testimonials: 'Ce que disent nos utilisateurs', testimonial1: 'J\'ai perdu 8kg en 2 mois avec AI BR, je recommande!', testimonial2: 'Application simple et complète, m\'a beaucoup aidé!', testimonial3: 'BR CALL AI de calories est incroyable, j\'ai adoré!', home: 'Accueil', meals: 'Repas', progress: 'Progrès', profile: 'Profil', calorieGoal: 'Objectif Calorique', todayProgress: 'Progrès d\'Aujourd\'hui', takeMealPhoto: 'Prendre Photo du Repas', breakfast: 'Petit-déjeuner', lunch: 'Déjeuner', dinner: 'Dîner', snack: 'Collation', weight: 'Poids', weeklyGraphs: 'Graphiques Hebdomadaires', visualHistory: 'Historique Visuel', personalData: 'Données Personnelles', language: 'Langue', plan: 'Plan', notifications: 'Notifications', logout: 'Déconnexion' },
  de: { welcome: 'Willkommen bei', selectLanguage: 'Wählen Sie Ihre Sprache', continue: 'Weiter', getStarted: 'Loslegen', next: 'Weiter', back: 'Zurück', skip: 'Überspringen', finish: 'Fertig', signup: 'Registrieren', personalInfo: 'Persönliche Informationen', name: 'Name', email: 'E-Mail', password: 'Passwort', birthdate: 'Geburtsdatum', gender: 'Geschlecht', male: 'Männlich', female: 'Weiblich', other: 'Andere', optional: 'Optional', fitnessInfo: 'Fitness-Informationen', workoutsPerWeek: 'Wie viele Trainings pro Woche?', workouts2: '2 Mal', workouts3to5: '3 bis 5 Mal', workouts6plus: '6+', currentGoal: 'Was ist Ihr aktuelles Ziel?', loseWeight: 'Gewicht verlieren', gainWeight: 'Gewicht zunehmen', maintainWeight: 'Gewicht halten', currentWeight: 'Was ist Ihr aktuelles Gewicht?', desiredWeight: 'Was ist Ihr gewünschtes Gewicht?', weightKg: 'Gewicht (kg)', obstacles: 'Was hindert Sie daran, Ihr Ziel zu erreichen?', lackConsistency: 'Mangel an Beständigkeit', badEatingHabits: 'Schlechte Essgewohnheiten', lackSupport: 'Mangel an Unterstützung', busySchedule: 'Voller Terminkalender', lackMealInspiration: 'Mangel an Mahlzeiten-Inspiration', achievements: 'Was möchten Sie erreichen?', eatHealthier: 'Gesünder essen und leben', increaseEnergy: 'Energie erhöhen und Stimmung verbessern', stayMotivated: 'Motiviert und beständig bleiben', feelBetter: 'Sich besser im Körper fühlen', testimonials: 'Was unsere Benutzer sagen', testimonial1: 'Habe 8kg in 2 Monaten mit AI BR verloren, empfehle ich!', testimonial2: 'Einfache und vollständige App, hat mir sehr geholfen!', testimonial3: 'BR CALL AI Kalorienzähler ist erstaunlich, liebte es!', home: 'Startseite', meals: 'Mahlzeiten', progress: 'Fortschritt', profile: 'Profil', calorieGoal: 'Kalorienziel', todayProgress: 'Heutiger Fortschritt', takeMealPhoto: 'Mahlzeit Foto machen', breakfast: 'Frühstück', lunch: 'Mittagessen', dinner: 'Abendessen', snack: 'Snack', weight: 'Gewicht', weeklyGraphs: 'Wöchentliche Grafiken', visualHistory: 'Visuelle Historie', personalData: 'Persönliche Daten', language: 'Sprache', plan: 'Plan', notifications: 'Benachrichtigungen', logout: 'Abmelden' },
  it: { welcome: 'Benvenuto a', selectLanguage: 'Seleziona la tua lingua', continue: 'Continua', getStarted: 'Inizia', next: 'Avanti', back: 'Indietro', skip: 'Salta', finish: 'Finisci', signup: 'Registrati', personalInfo: 'Informazioni Personali', name: 'Nome', email: 'Email', password: 'Password', birthdate: 'Data di Nascita', gender: 'Genere', male: 'Maschile', female: 'Femminile', other: 'Altro', optional: 'Opzionale', fitnessInfo: 'Informazioni Fitness', workoutsPerWeek: 'Quanti allenamenti a settimana?', workouts2: '2 volte', workouts3to5: '3 a 5 volte', workouts6plus: '6+', currentGoal: 'Qual è il tuo obiettivo attuale?', loseWeight: 'Perdere peso', gainWeight: 'Aumentare peso', maintainWeight: 'Mantenere peso', currentWeight: 'Qual è il tuo peso attuale?', desiredWeight: 'Qual è il tuo peso desiderato?', weightKg: 'Peso (kg)', obstacles: 'Cosa ti impedisce di raggiungere il tuo obiettivo?', lackConsistency: 'Mancanza di coerenza', badEatingHabits: 'Cattive abitudini alimentari', lackSupport: 'Mancanza di supporto', busySchedule: 'Agenda piena', lackMealInspiration: 'Mancanza di ispirazione per i pasti', achievements: 'Cosa vorresti raggiungere?', eatHealthier: 'Mangiare e vivere più sano', increaseEnergy: 'Aumentare energia e migliorare umore', stayMotivated: 'Rimanere motivato e coerente', feelBetter: 'Sentirsi meglio con il corpo', testimonials: 'Cosa dicono i nostri utenti', testimonial1: 'Ho perso 8kg in 2 mesi con AI BR, lo consiglio!', testimonial2: 'App semplice e completa, mi ha aiutato molto!', testimonial3: 'BR CALL AI di calorie è sorprendente, l\'ho adorato!', home: 'Home', meals: 'Pasti', progress: 'Progresso', profile: 'Profilo', calorieGoal: 'Obiettivo Calorico', todayProgress: 'Progresso di Oggi', takeMealPhoto: 'Scatta Foto del Pasto', breakfast: 'Colazione', lunch: 'Pranzo', dinner: 'Cena', snack: 'Spuntino', weight: 'Peso', weeklyGraphs: 'Grafici Settimanali', visualHistory: 'Storia Visiva', personalData: 'Dati Personali', language: 'Lingua', plan: 'Piano', notifications: 'Notifiche', logout: 'Esci' },
  ja: { welcome: 'ようこそ', selectLanguage: '言語を選択', continue: '続ける', getStarted: '始める', next: '次へ', back: '戻る', skip: 'スキップ', finish: '完了', signup: '登録', personalInfo: '個人情報', name: '名前', email: 'メール', password: 'パスワード', birthdate: '生年月日', gender: '性別', male: '男性', female: '女性', other: 'その他', optional: 'オプション', fitnessInfo: 'フィットネス情報', workoutsPerWeek: '週に何回トレーニング？', workouts2: '2回', workouts3to5: '3〜5回', workouts6plus: '6回以上', currentGoal: '現在の目標は？', loseWeight: '体重を減らす', gainWeight: '体重を増やす', maintainWeight: '体重を維持', currentWeight: '現在の体重は？', desiredWeight: '目標体重は？', weightKg: '体重（kg）', obstacles: '目標達成を妨げているものは？', lackConsistency: '一貫性の欠如', badEatingHabits: '悪い食習慣', lackSupport: 'サポート不足', busySchedule: '忙しいスケジュール', lackMealInspiration: '食事のインスピレーション不足', achievements: '何を達成したい？', eatHealthier: 'より健康的に食べて生きる', increaseEnergy: 'エネルギーを増やし気分を改善', stayMotivated: 'モチベーションと一貫性を保つ', feelBetter: '体についてより良く感じる', testimonials: 'ユーザーの声', testimonial1: 'AI BRで2ヶ月で8kg減量、おすすめ！', testimonial2: 'シンプルで完全なアプリ、とても助かりました！', testimonial3: 'BR CALL AIカロリートラッカーは素晴らしい、大好き！', home: 'ホーム', meals: '食事', progress: '進捗', profile: 'プロフィール', calorieGoal: 'カロリー目標', todayProgress: '今日の進捗', takeMealPhoto: '食事の写真を撮る', breakfast: '朝食', lunch: '昼食', dinner: '夕食', snack: 'スナック', weight: '体重', weeklyGraphs: '週間グラフ', visualHistory: 'ビジュアル履歴', personalData: '個人データ', language: '言語', plan: 'プラン', notifications: '通知', logout: 'ログアウト' },
  ko: { welcome: '환영합니다', selectLanguage: '언어 선택', continue: '계속', getStarted: '시작하기', next: '다음', back: '뒤로', skip: '건너뛰기', finish: '완료', signup: '가입', personalInfo: '개인 정보', name: '이름', email: '이메일', password: '비밀번호', birthdate: '생년월일', gender: '성별', male: '남성', female: '여성', other: '기타', optional: '선택사항', fitnessInfo: '피트니스 정보', workoutsPerWeek: '주당 운동 횟수는?', workouts2: '2회', workouts3to5: '3~5회', workouts6plus: '6회 이상', currentGoal: '현재 목표는?', loseWeight: '체중 감량', gainWeight: '체중 증가', maintainWeight: '체중 유지', currentWeight: '현재 체중은?', desiredWeight: '목표 체중은?', weightKg: '체중 (kg)', obstacles: '목표 달성을 방해하는 것은?', lackConsistency: '일관성 부족', badEatingHabits: '나쁜 식습관', lackSupport: '지원 부족', busySchedule: '바쁜 일정', lackMealInspiration: '식사 영감 부족', achievements: '무엇을 달성하고 싶나요?', eatHealthier: '더 건강하게 먹고 살기', increaseEnergy: '에너지 증가 및 기분 개선', stayMotivated: '동기 부여 및 일관성 유지', feelBetter: '몸에 대해 더 나은 느낌', testimonials: '사용자 후기', testimonial1: 'AI BR로 2개월에 8kg 감량, 추천합니다!', testimonial2: '간단하고 완전한 앱, 많은 도움이 되었습니다!', testimonial3: 'BR CALL AI 칼로리 추적기는 놀랍습니다, 사랑합니다!', home: '홈', meals: '식사', progress: '진행', profile: '프로필', calorieGoal: '칼로리 목표', todayProgress: '오늘의 진행', takeMealPhoto: '식사 사진 찍기', breakfast: '아침', lunch: '점심', dinner: '저녁', snack: '간식', weight: '체중', weeklyGraphs: '주간 그래프', visualHistory: '시각적 기록', personalData: '개인 데이터', language: '언어', plan: '플랜', notifications: '알림', logout: '로그아웃' },
  zh: { welcome: '欢迎来到', selectLanguage: '选择您的语言', continue: '继续', getStarted: '开始', next: '下一步', back: '返回', skip: '跳过', finish: '完成', signup: '注册', personalInfo: '个人信息', name: '姓名', email: '邮箱', password: '密码', birthdate: '出生日期', gender: '性别', male: '男', female: '女', other: '其他', optional: '可选', fitnessInfo: '健身信息', workoutsPerWeek: '每周锻炼几次？', workouts2: '2次', workouts3to5: '3到5次', workouts6plus: '6次以上', currentGoal: '您当前的目标是什么？', loseWeight: '减重', gainWeight: '增重', maintainWeight: '保持体重', currentWeight: '您当前的体重是多少？', desiredWeight: '您期望的体重是多少？', weightKg: '体重（公斤）', obstacles: '什么阻碍了您实现目标？', lackConsistency: '缺乏一致性', badEatingHabits: '不良饮食习惯', lackSupport: '缺乏支持', busySchedule: '日程繁忙', lackMealInspiration: '缺乏膳食灵感', achievements: '您想实现什么？', eatHealthier: '更健康地饮食和生活', increaseEnergy: '增加能量和改善情绪', stayMotivated: '保持动力和一致性', feelBetter: '对身体感觉更好', testimonials: '用户评价', testimonial1: '使用AI BR在2个月内减重8公斤，推荐！', testimonial2: '简单完整的应用，帮助很大！', testimonial3: 'BR CALL AI卡路里追踪器太棒了，喜欢！', home: '首页', meals: '餐食', progress: '进度', profile: '个人资料', calorieGoal: '卡路里目标', todayProgress: '今日进度', takeMealPhoto: '拍摄餐食照片', breakfast: '早餐', lunch: '午餐', dinner: '晚餐', snack: '小吃', weight: '体重', weeklyGraphs: '每周图表', visualHistory: '视觉历史', personalData: '个人数据', language: '语言', plan: '计划', notifications: '通知', logout: '登出' },
  ar: { welcome: 'مرحبا بك في', selectLanguage: 'اختر لغتك', continue: 'متابعة', getStarted: 'ابدأ', next: 'التالي', back: 'رجوع', skip: 'تخطي', finish: 'إنهاء', signup: 'التسجيل', personalInfo: 'المعلومات الشخصية', name: 'الاسم', email: 'البريد الإلكتروني', password: 'كلمة المرور', birthdate: 'تاريخ الميلاد', gender: 'الجنس', male: 'ذكر', female: 'أنثى', other: 'آخر', optional: 'اختياري', fitnessInfo: 'معلومات اللياقة', workoutsPerWeek: 'كم عدد التمارين في الأسبوع؟', workouts2: 'مرتين', workouts3to5: '3 إلى 5 مرات', workouts6plus: '6+', currentGoal: 'ما هو هدفك الحالي؟', loseWeight: 'فقدان الوزن', gainWeight: 'زيادة الوزن', maintainWeight: 'الحفاظ على الوزن', currentWeight: 'ما هو وزنك الحالي؟', desiredWeight: 'ما هو وزنك المرغوب؟', weightKg: 'الوزن (كجم)', obstacles: 'ما الذي يمنعك من تحقيق هدفك؟', lackConsistency: 'نقص الاتساق', badEatingHabits: 'عادات الأكل السيئة', lackSupport: 'نقص الدعم', busySchedule: 'جدول مزدحم', lackMealInspiration: 'نقص الإلهام للوجبات', achievements: 'ماذا تريد أن تحقق؟', eatHealthier: 'تناول الطعام والعيش بشكل أكثر صحة', increaseEnergy: 'زيادة الطاقة وتحسين المزاج', stayMotivated: 'البقاء متحفزًا ومتسقًا', feelBetter: 'الشعور بتحسن تجاه الجسم', testimonials: 'ما يقوله مستخدمونا', testimonial1: 'فقدت 8 كجم في شهرين مع AI BR، أوصي به!', testimonial2: 'تطبيق بسيط وكامل، ساعدني كثيرًا!', testimonial3: 'متتبع السعرات الحرارية BR CALL AI مذهل، أحببته!', home: 'الرئيسية', meals: 'الوجبات', progress: 'التقدم', profile: 'الملف الشخصي', calorieGoal: 'هدف السعرات الحرارية', todayProgress: 'تقدم اليوم', takeMealPhoto: 'التقط صورة الوجبة', breakfast: 'الإفطار', lunch: 'الغداء', dinner: 'العشاء', snack: 'وجبة خفيفة', weight: 'الوزن', weeklyGraphs: 'الرسوم البيانية الأسبوعية', visualHistory: 'التاريخ المرئي', personalData: 'البيانات الشخصية', language: 'اللغة', plan: 'الخطة', notifications: 'الإشعارات', logout: 'تسجيل الخروج' },
  ru: { welcome: 'Добро пожаловать в', selectLanguage: 'Выберите язык', continue: 'Продолжить', getStarted: 'Начать', next: 'Далее', back: 'Назад', skip: 'Пропустить', finish: 'Завершить', signup: 'Регистрация', personalInfo: 'Личная информация', name: 'Имя', email: 'Email', password: 'Пароль', birthdate: 'Дата рождения', gender: 'Пол', male: 'Мужской', female: 'Женский', other: 'Другое', optional: 'Необязательно', fitnessInfo: 'Информация о фитнесе', workoutsPerWeek: 'Сколько тренировок в неделю?', workouts2: '2 раза', workouts3to5: '3-5 раз', workouts6plus: '6+', currentGoal: 'Какова ваша текущая цель?', loseWeight: 'Похудеть', gainWeight: 'Набрать вес', maintainWeight: 'Поддерживать вес', currentWeight: 'Каков ваш текущий вес?', desiredWeight: 'Каков ваш желаемый вес?', weightKg: 'Вес (кг)', obstacles: 'Что мешает вам достичь цели?', lackConsistency: 'Отсутствие последовательности', badEatingHabits: 'Плохие привычки питания', lackSupport: 'Отсутствие поддержки', busySchedule: 'Загруженный график', lackMealInspiration: 'Отсутствие вдохновения для еды', achievements: 'Чего вы хотите достичь?', eatHealthier: 'Питаться и жить здоровее', increaseEnergy: 'Увеличить энергию и улучшить настроение', stayMotivated: 'Оставаться мотивированным и последовательным', feelBetter: 'Чувствовать себя лучше в теле', testimonials: 'Что говорят наши пользователи', testimonial1: 'Похудел на 8 кг за 2 месяца с AI BR, рекомендую!', testimonial2: 'Простое и полное приложение, очень помогло!', testimonial3: 'Счетчик калорий BR CALL AI потрясающий, понравился!', home: 'Главная', meals: 'Еда', progress: 'Прогресс', profile: 'Профиль', calorieGoal: 'Цель по калориям', todayProgress: 'Прогресс сегодня', takeMealPhoto: 'Сфотографировать еду', breakfast: 'Завтрак', lunch: 'Обед', dinner: 'Ужин', snack: 'Перекус', weight: 'Вес', weeklyGraphs: 'Недельные графики', visualHistory: 'Визуальная история', personalData: 'Личные данные', language: 'Язык', plan: 'План', notifications: 'Уведомления', logout: 'Выйти' },
  hi: { welcome: 'में आपका स्वागत है', selectLanguage: 'अपनी भाषा चुनें', continue: 'जारी रखें', getStarted: 'शुरू करें', next: 'अगला', back: 'पीछे', skip: 'छोड़ें', finish: 'समाप्त', signup: 'साइन अप', personalInfo: 'व्यक्तिगत जानकारी', name: 'नाम', email: 'ईमेल', password: 'पासवर्ड', birthdate: 'जन्म तिथि', gender: 'लिंग', male: 'पुरुष', female: 'महिला', other: 'अन्य', optional: 'वैकल्पिक', fitnessInfo: 'फिटनेस जानकारी', workoutsPerWeek: 'सप्ताह में कितनी बार व्यायाम?', workouts2: '2 बार', workouts3to5: '3 से 5 बार', workouts6plus: '6+', currentGoal: 'आपका वर्तमान लक्ष्य क्या है?', loseWeight: 'वजन कम करना', gainWeight: 'वजन बढ़ाना', maintainWeight: 'वजन बनाए रखना', currentWeight: 'आपका वर्तमान वजन क्या है?', desiredWeight: 'आपका वांछित वजन क्या है?', weightKg: 'वजन (किलो)', obstacles: 'आपको अपने लक्ष्य तक पहुंचने से क्या रोक रहा है?', lackConsistency: 'निरंतरता की कमी', badEatingHabits: 'खराब खाने की आदतें', lackSupport: 'समर्थन की कमी', busySchedule: 'व्यस्त कार्यक्रम', lackMealInspiration: 'भोजन प्रेरणा की कमी', achievements: 'आप क्या हासिल करना चाहेंगे?', eatHealthier: 'स्वस्थ खाना और जीना', increaseEnergy: 'ऊर्जा बढ़ाना और मूड सुधारना', stayMotivated: 'प्रेरित और सुसंगत रहना', feelBetter: 'शरीर के बारे में बेहतर महसूस करना', testimonials: 'हमारे उपयोगकर्ता क्या कहते हैं', testimonial1: 'AI BR के साथ 2 महीने में 8 किलो कम किया, सिफारिश करता हूं!', testimonial2: 'सरल और पूर्ण ऐप, बहुत मदद की!', testimonial3: 'BR CALL AI कैलोरी ट्रैकर अद्भुत है, पसंद आया!', home: 'होम', meals: 'भोजन', progress: 'प्रगति', profile: 'प्रोफ़ाइल', calorieGoal: 'कैलोरी लक्ष्य', todayProgress: 'आज की प्रगति', takeMealPhoto: 'भोजन की फोटो लें', breakfast: 'नाश्ता', lunch: 'दोपहर का भोजन', dinner: 'रात का खाना', snack: 'नाश्ता', weight: 'वजन', weeklyGraphs: 'साप्ताहिक ग्राफ', visualHistory: 'दृश्य इतिहास', personalData: 'व्यक्तिगत डेटा', language: 'भाषा', plan: 'योजना', notifications: 'सूचनाएं', logout: 'लॉग आउट' },
};

export function getTranslation(lang: Language, key: keyof typeof translations.pt): string {
  return translations[lang]?.[key] || translations.pt[key] || key;
}
