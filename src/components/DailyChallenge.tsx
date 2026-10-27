import React, { useState, useEffect } from 'react';
import { Unit, StudentProgress } from '../types/curriculum';
import {
  Flame,
  Volume2,
  CheckCircle2,
  XCircle,
  Sparkles,
  Award,
  Calendar,
  Clock,
  RotateCcw,
  X,
  ChevronLeft,
} from 'lucide-react';
import { speakText } from '../utils/speech';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface DailyQuestion {
  id: string;
  unitId: number;
  unitTitleAr: string;
  question: string;
  questionAr: string;
  options: string[];
  correctIndex: number;
  explanationAr: string;
  categoryAr: string;
}

// Curated pool of high-yield questions covering Units 5, 6, 7, 8
const DAILY_QUESTIONS_POOL: DailyQuestion[] = [
  {
    id: 'dq-1',
    unitId: 5,
    unitTitleAr: 'الوحدة الخامسة: يومي والروتين',
    categoryAr: 'حروف الجر مع الأيام',
    question: 'I brush my teeth _____ Monday morning.',
    questionAr: 'أنا أنظف أسناني بالفرشاة صباح يوم الإثنين. اختر حرف الجر الصحيح:',
    options: ['on', 'in', 'at', 'to'],
    correctIndex: 0,
    explanationAr: 'نستخدم دائماً حرف الجر (on) قبل أيام الأسبوع (on Monday, on Sunday).',
  },
  {
    id: 'dq-2',
    unitId: 5,
    unitTitleAr: 'الوحدة الخامسة: الوقت والمفرد الغائب',
    categoryAr: 'المفرد الغائب مع الوقت',
    question: 'When _____ Ali come to school? - He comes at seven.',
    questionAr: 'متى يأتي علي إلى المدرسة؟ - يأتي في السابعة. اختر أداة السؤال المناسبة:',
    options: ['does', 'do', 'is', 'did'],
    correctIndex: 0,
    explanationAr: 'مع الفاعل المفرد الغائب (Ali) في زمن المضارع البسيط نستخدم Does للسؤال.',
  },
  {
    id: 'dq-3',
    unitId: 6,
    unitTitleAr: 'الوحدة السادسة: المضارع المستمر',
    categoryAr: 'زمن المضارع المستمر',
    question: 'Look! They are _____ football in the park.',
    questionAr: 'انظر! هم يلعبون كرة القدم في الحديقة الآن. اختر الصيغة الصحيحة للفعل:',
    options: ['playing', 'plays', 'played', 'play'],
    correctIndex: 0,
    explanationAr: 'بعد فعل الكينونة (are) في المضارع المستمر نضيف ing للفعل: playing.',
  },
  {
    id: 'dq-4',
    unitId: 6,
    unitTitleAr: 'الوحدة السادسة: الملابس والتفضيلات',
    categoryAr: 'قواعد التفضيل والمفردات',
    question: 'I like _____ books, but I don\'t like shopping.',
    questionAr: 'أنا أحب قراءة الكتب، لكنني لا أحب التسوق. اختر صيغة الفعل بعد like:',
    options: ['reading', 'read', 'reads', 'to read'],
    correctIndex: 0,
    explanationAr: 'بعد الفعل like نستخدم اسم الفعل المنتهي بـ ing: like reading books.',
  },
  {
    id: 'dq-5',
    unitId: 7,
    unitTitleAr: 'الوحدة السابعة: الأثاث والمباني',
    categoryAr: 'قاعدة There is / There are',
    question: 'There _____ four cushions on the sofa.',
    questionAr: 'توجد أربع وسائد على الأريكة. اختر الفعل المناسب:',
    options: ['are', 'is', 'be', 'am'],
    correctIndex: 0,
    explanationAr: 'أربع وسائد (four cushions) اسم جمع، لذا نستخدم معه There are.',
  },
  {
    id: 'dq-6',
    unitId: 7,
    unitTitleAr: 'الوحدة السابعة: الأعداد الترتيبية',
    categoryAr: 'الأعداد الترتيبية للأدوار',
    question: 'What is the correct ordinal spelling for number 5?',
    questionAr: 'ما هي الكتابة الإملائية الترتيبية الصحيحة للرقم 5 (الخامس)؟',
    options: ['fifth', 'fiveth', 'fifeth', 'fivth'],
    correctIndex: 0,
    explanationAr: 'الترتيب الخامس يكتب fifth بحرف f وليس ve (1st, 2nd, 3rd, 4th, 5th).',
  },
  {
    id: 'dq-7',
    unitId: 8,
    unitTitleAr: 'الوحدة الثامنة: الماضي البسيط',
    categoryAr: 'الأفعال الشاذة في الماضي',
    question: 'Yesterday, Fatma went shopping and she _____ some shoes.',
    questionAr: 'أمس، ذهبت فاطمة للتسوق واشترت بعض الأحذية. اختر ماضي الفعل buy:',
    options: ['bought', 'buyed', 'bringing', 'buys'],
    correctIndex: 0,
    explanationAr: 'الفعل buy فعل شاذ غير منتظم وماضيه هو bought.',
  },
  {
    id: 'dq-8',
    unitId: 8,
    unitTitleAr: 'الوحدة الثامنة: السؤال بالماضي',
    categoryAr: 'السؤال بالماضي مع Did',
    question: '"Did you have eggs for breakfast?" - "Yes, I _____."',
    questionAr: 'أكمل الإجابة المختصرة بالإثبات على سؤال الماضي:',
    options: ['did', 'do', 'had', 'was'],
    correctIndex: 0,
    explanationAr: 'السؤال بدأ بـ Did فتكون الإجابة المختصرة: Yes, I did.',
  },
  {
    id: 'dq-9',
    unitId: 7,
    unitTitleAr: 'الوحدة السابعة: في الشارع اليمني',
    categoryAr: 'حروف الجر والاتجاهات',
    question: 'Where can I buy orange juice? - At the supermarket, it\'s _____ to the bookshop.',
    questionAr: 'أين يمكن شراء عصير البرتقال؟ - في السوبرماركت بجانب المكتبة. اختر حرف الجر:',
    options: ['next', 'behind', 'in', 'under'],
    correctIndex: 0,
    explanationAr: 'التركيب هو: next to (بجانب).',
  },
  {
    id: 'dq-10',
    unitId: 8,
    unitTitleAr: 'الوحدة الثامنة: الأفعال الماضية',
    categoryAr: 'أفعال الكينونة في الماضي',
    question: 'Ahmed and Saleh _____ hungry yesterday, so they went to a restaurant.',
    questionAr: 'كان أحمد وصالح جائعين بالأمس، فذهبا إلى المطعم. اختر ماضي الكينونة للجمع:',
    options: ['were', 'was', 'are', 'is'],
    correctIndex: 0,
    explanationAr: 'أحمد وصالح فاعل جمع، لذا نستخدم were في زمن الماضي البسيط.',
  },
];

interface Props {
  progress: StudentProgress;
  onCompleteDailyChallenge: (todayStr: string, points: number) => void;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
  isEmbeddedCard?: boolean;
}

export const DailyChallenge: React.FC<Props> = ({
  progress,
  onCompleteDailyChallenge,
  isOpenModal = false,
  onCloseModal,
  isEmbeddedCard = false,
}) => {
  // Today's date string YYYY-MM-DD
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const isCompletedToday = progress.lastDailyChallengeDate === todayStr;

  // Pick deterministic question based on today's day number
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
  );
  const questionIndex = dayOfYear % DAILY_QUESTIONS_POOL.length;

  const [currentQIndex, setCurrentQIndex] = useState(questionIndex);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(isCompletedToday);
  const [practiceMode, setPracticeMode] = useState(false);

  const activeQuestion = DAILY_QUESTIONS_POOL[currentQIndex];

  const handleSelectAnswer = (idx: number) => {
    if (showExplanation) return;
    setSelectedIdx(idx);
    setShowExplanation(true);

    const isCorrect = idx === activeQuestion.correctIndex;
    if (isCorrect) {
      sounds.playSuccess();
      sounds.playFanfare();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#EF4444', '#10B981', '#6366F1'],
      });
      speakText('Correct! Daily challenge completed!');

      if (!isCompletedToday && !practiceMode) {
        onCompleteDailyChallenge(todayStr, 30);
      }
    } else {
      sounds.playError();
      speakText('Try to review this grammar rule.');
    }
  };

  const handleRandomQuestion = () => {
    sounds.playFlip();
    const nextIdx = (currentQIndex + 1) % DAILY_QUESTIONS_POOL.length;
    setCurrentQIndex(nextIdx);
    setSelectedIdx(null);
    setShowExplanation(false);
    setPracticeMode(true);
  };

  const streakCount = progress.dailyChallengeStreak || (isCompletedToday ? progress.streakDays : 0);

  // Content rendering
  const challengeBody = (
    <div className="space-y-5">
      {/* Question Header Card */}
      <div className="bg-slate-50 border-2 border-indigo-100 rounded-3xl p-6 text-center relative shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="bg-indigo-100 text-indigo-800 text-xs font-black px-3 py-1 rounded-full font-english">
            {activeQuestion.unitTitleAr}
          </span>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
            {activeQuestion.categoryAr}
          </span>
        </div>

        <h3 className="font-english font-black text-xl md:text-2xl text-slate-900 mb-2 leading-snug">
          {activeQuestion.question}
        </h3>
        <p className="text-xs md:text-sm text-slate-600 font-bold mb-3">
          {activeQuestion.questionAr}
        </p>

        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => speakText(activeQuestion.question)}
            className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            <span>استمع للسؤال</span>
          </button>
        </div>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {activeQuestion.options.map((opt, optIdx) => {
          const isSelected = selectedIdx === optIdx;
          const isCorrect = optIdx === activeQuestion.correctIndex;

          let btnClass = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';

          if (showExplanation) {
            if (isCorrect) {
              btnClass =
                'bg-emerald-500 border-emerald-600 text-white font-black shadow-md ring-2 ring-emerald-300';
            } else if (isSelected && !isCorrect) {
              btnClass = 'bg-rose-500 border-rose-600 text-white font-black ring-2 ring-rose-200';
            } else {
              btnClass = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={optIdx}
              disabled={showExplanation}
              onClick={() => handleSelectAnswer(optIdx)}
              className={`p-4 rounded-2xl border-2 font-english font-bold text-base md:text-lg transition-all duration-200 flex items-center justify-between group active:scale-95 shadow-xs ${btnClass}`}
            >
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs font-english">
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span>{opt}</span>
              </div>

              {showExplanation && (
                <>
                  {isCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
                  {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-white" />}
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Pedagogical Explanation */}
      {showExplanation && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 animate-fadeIn">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 mb-1">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>توضيح الإجابة وقاعدة المنهج:</span>
          </div>
          <p className="text-xs md:text-sm text-slate-700 font-semibold leading-relaxed">
            {activeQuestion.explanationAr}
          </p>

          <div className="mt-4 pt-3 border-t border-amber-200/60 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <Award className="w-4 h-4" />
              <span>+30 نقطة ومواصلة سلسلة التحدي!</span>
            </span>

            <button
              onClick={handleRandomQuestion}
              className="text-xs text-indigo-700 font-bold hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>جرب سؤال تحدٍّ عشوائي آخر</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // If used as an embedded card on the Home page
  if (isEmbeddedCard) {
    return (
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-0.5 rounded-3xl shadow-md my-6">
        <div className="bg-white rounded-[23px] p-6">
          {/* Card Top Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center text-2xl shadow-sm">
                🔥
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-lg md:text-xl text-slate-900">
                    تحدي اليوم (Daily Challenge)
                  </h3>
                  <span className="bg-amber-100 text-amber-800 text-[11px] font-black px-2.5 py-0.5 rounded-full border border-amber-200">
                    سؤال يومي متجدد
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 font-semibold">
                  أجب يومياً لتنشيط الذاكرة، مضاعفة نقاطك والحفاظ على سلسلة الالتزام!
                </p>
              </div>
            </div>

            {/* Streak Counter */}
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <div className="bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-2xl flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-pulse" />
                <div className="text-right">
                  <span className="text-[10px] text-orange-700 font-bold block">سلسلة التحدي</span>
                  <span className="font-black font-english text-sm text-orange-950">
                    {streakCount} أيام متتالية
                  </span>
                </div>
              </div>

              {isCompletedToday && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>مكتمل اليوم!</span>
                </div>
              )}
            </div>
          </div>

          {/* Question Body */}
          {challengeBody}
        </div>
      </div>
    );
  }

  // Modal view
  if (!isOpenModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full flex flex-col overflow-hidden animate-fadeIn my-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shadow-inner backdrop-blur-xs">
              🔥
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-xl text-white">تحدي اليوم (Daily Challenge)</h3>
                <span className="text-xs bg-white/20 text-white font-bold px-2 py-0.5 rounded-full">
                  +30 نقطة
                </span>
              </div>
              <p className="text-white/85 text-xs mt-0.5">
                سؤال عشوائي متجدد من منهج الصف السابع لليمن
              </p>
            </div>
          </div>

          <button
            onClick={onCloseModal}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">{challengeBody}</div>
      </div>
    </div>
  );
};
