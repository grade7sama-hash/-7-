import { StudentProgress } from '../types/curriculum';

const STORAGE_KEY = 'yemen_grade7_english_progress_v1';

export const INITIAL_PROGRESS: StudentProgress = {
  studentName: 'طالب الصف السابع',
  streakDays: 3,
  totalPoints: 120,
  completedLessons: ['5.1'],
  lessonScores: {
    '5.1': 90,
  },
  quizHistory: [
    {
      lessonId: '5.1',
      lessonTitle: 'This is the way',
      unitId: 5,
      score: 90,
      date: new Date().toLocaleDateString('ar-YE', { month: 'short', day: 'numeric' }),
    },
  ],
  speakingScoreAverage: 85,
  speakingAttemptsCount: 4,
  gamesPlayedCount: 3,
  badges: [
    {
      id: 'first_step',
      nameAr: 'الخطوة الأولى',
      descriptionAr: 'أكملت أول درس بنجاح في منهج الصف السابع',
      icon: '🌟',
      unlockedAt: 'اليوم',
    },
    {
      id: 'listener',
      nameAr: 'مستمع بارع',
      descriptionAr: 'استمعت إلى نصوص المحادثة والأغاني الإنجليزية',
      icon: '🎧',
      unlockedAt: 'اليوم',
    },
    {
      id: 'past_master',
      nameAr: 'فارس الماضي البسيط',
      descriptionAr: 'أتقنت تصريف الأفعال الشاذة والمنتظمة في الوحدة 8',
      icon: '⚔️',
    },
    {
      id: 'quiz_hero',
      nameAr: 'بطل الاختبارات',
      descriptionAr: 'حققت 100% في 3 اختبارات تقييمية متتالية',
      icon: '🏆',
    },
    {
      id: 'speaker',
      nameAr: 'متحدث طليق',
      descriptionAr: 'سجلت صوتك ونطقت جملاً إنجليزية بدقة تفوق 85%',
      icon: '🎤',
    },
    {
      id: 'daily_hero',
      nameAr: 'بطل التحدي اليومي',
      descriptionAr: 'أجبت على سؤال تحدي اليوم وحافظت على سلسلة التفاعل',
      icon: '🔥',
    },
  ],
};

export function loadStudentProgress(): StudentProgress {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error loading progress from storage', e);
  }
  return INITIAL_PROGRESS;
}

export function saveStudentProgress(progress: StudentProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving progress to storage', e);
  }
}

export function recordQuizCompletion(
  current: StudentProgress,
  lessonId: string,
  lessonTitle: string,
  unitId: number,
  score: number
): StudentProgress {
  const updatedScores = {
    ...current.lessonScores,
    [lessonId]: Math.max(score, current.lessonScores[lessonId] || 0),
  };

  const completed = current.completedLessons.includes(lessonId)
    ? current.completedLessons
    : [...current.completedLessons, lessonId];

  const earnedPoints = Math.round(score * 1.5);
  const updatedHistory = [
    {
      lessonId,
      lessonTitle,
      unitId,
      score,
      date: new Date().toLocaleDateString('ar-YE', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    },
    ...current.quizHistory.slice(0, 19), // keep last 20
  ];

  // Check badges
  const updatedBadges = current.badges.map((b) => {
    if (b.id === 'quiz_hero' && !b.unlockedAt && score === 100) {
      return { ...b, unlockedAt: 'اليوم' };
    }
    return b;
  });

  const nextProgress: StudentProgress = {
    ...current,
    lessonScores: updatedScores,
    completedLessons: completed,
    totalPoints: current.totalPoints + earnedPoints,
    quizHistory: updatedHistory,
    badges: updatedBadges,
  };

  saveStudentProgress(nextProgress);
  return nextProgress;
}

export function recordSpeakingPractice(
  current: StudentProgress,
  score: number
): StudentProgress {
  const count = current.speakingAttemptsCount + 1;
  const newAvg = Math.round(
    (current.speakingScoreAverage * current.speakingAttemptsCount + score) / count
  );

  const updatedBadges = current.badges.map((b) => {
    if (b.id === 'speaker' && !b.unlockedAt && score >= 85) {
      return { ...b, unlockedAt: 'اليوم' };
    }
    return b;
  });

  const nextProgress: StudentProgress = {
    ...current,
    speakingAttemptsCount: count,
    speakingScoreAverage: newAvg,
    totalPoints: current.totalPoints + 15,
    badges: updatedBadges,
  };

  saveStudentProgress(nextProgress);
  return nextProgress;
}

export function recordGamePlayed(current: StudentProgress, earnedPoints: number = 20): StudentProgress {
  const nextProgress: StudentProgress = {
    ...current,
    gamesPlayedCount: current.gamesPlayedCount + 1,
    totalPoints: current.totalPoints + earnedPoints,
  };
  saveStudentProgress(nextProgress);
  return nextProgress;
}

export function recordDailyChallenge(
  current: StudentProgress,
  todayStr: string,
  bonusPoints: number = 30
): StudentProgress {
  const isConsecutive = current.lastDailyChallengeDate
    ? Math.abs(new Date(todayStr).getTime() - new Date(current.lastDailyChallengeDate).getTime()) <=
      86400000 * 2
    : true;

  const currentStreak = current.dailyChallengeStreak || 0;
  const newStreak = isConsecutive ? currentStreak + 1 : 1;

  const updatedBadges = current.badges.map((b) => {
    if (b.id === 'daily_hero' && !b.unlockedAt) {
      return { ...b, unlockedAt: 'اليوم' };
    }
    return b;
  });

  const nextProgress: StudentProgress = {
    ...current,
    lastDailyChallengeDate: todayStr,
    dailyChallengeStreak: newStreak,
    streakDays: Math.max(current.streakDays, newStreak),
    totalPoints: current.totalPoints + bonusPoints,
    badges: updatedBadges,
  };

  saveStudentProgress(nextProgress);
  return nextProgress;
}
