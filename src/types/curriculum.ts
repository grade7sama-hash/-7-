export interface VocabularyItem {
  word: string;
  arabic: string;
  category?: string;
  exampleSentence?: string;
  exampleArabic?: string;
}

export interface GrammarRule {
  title: string;
  titleAr: string;
  explanationAr: string;
  formula?: string;
  examples: {
    english: string;
    arabic: string;
    highlight?: string;
  }[];
  tipsAr?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface DialogueLine {
  speaker: string;
  speakerAr?: string;
  text: string;
  arabic: string;
  audioPrompt?: string;
}

export interface ActivityExercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'sentence-order' | 'matching' | 'true-false';
  question: string;
  questionAr: string;
  options?: string[];
  correctAnswer: string | string[];
  explanationAr?: string;
  pairs?: { en: string; ar: string }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionAr: string;
  options: string[];
  correctIndex: number;
  explanationAr: string;
}

export interface LessonGameConfig {
  type: 'clock' | 'past-match' | 'preposition-drop' | 'clothes-detective' | 'sentence-builder' | 'routine-sequence';
  titleAr: string;
  instructionAr: string;
  data: any;
}

export interface Lesson {
  id: string; // e.g. "5.1"
  unitId: number; // 5, 6, 7, 8
  title: string;
  titleAr: string;
  pageNumber: number; // page in textbook
  pdfPage: number; // page in attached PDF (1-indexed)
  descriptionAr: string;
  vocabulary: VocabularyItem[];
  dialogue?: DialogueLine[];
  songLyrics?: string[];
  grammar: GrammarRule;
  activities: ActivityExercise[];
  game: LessonGameConfig;
  quiz: QuizQuestion[];
}

export interface Unit {
  id: number;
  numberAr: string;
  title: string;
  titleAr: string;
  themeColor: string; // Tailwind color class
  accentBg: string;
  iconName: string;
  summaryAr: string;
  keyGrammarAr: string;
  pages: string;
  lessons: Lesson[];
}

export interface StudentProgress {
  studentName: string;
  streakDays: number;
  totalPoints: number;
  completedLessons: string[]; // lesson ids
  lessonScores: Record<string, number>; // lessonId -> quiz percentage
  quizHistory: {
    lessonId: string;
    lessonTitle: string;
    unitId: number;
    score: number; // percentage
    date: string;
  }[];
  speakingScoreAverage: number;
  speakingAttemptsCount: number;
  gamesPlayedCount: number;
  lastDailyChallengeDate?: string;
  dailyChallengeStreak?: number;
  badges: {
    id: string;
    nameAr: string;
    descriptionAr: string;
    icon: string;
    unlockedAt?: string;
  }[];
}
