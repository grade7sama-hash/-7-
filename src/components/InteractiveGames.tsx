import React, { useState, useEffect } from 'react';
import { Lesson } from '../types/curriculum';
import {
  Volume2,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Award,
  Zap,
  Flame,
  HelpCircle,
  Play,
  Clock,
  Layers,
  Check,
  Star,
  RefreshCw,
} from 'lucide-react';
import { speakText } from '../utils/speech';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface Props {
  lesson: Lesson;
  onCompleted?: (points: number) => void;
}

type GameMode = 'speed' | 'balloon' | 'memory' | 'spelling' | 'sentences' | 'special';

export const InteractiveGame: React.FC<Props> = ({ lesson, onCompleted }) => {
  const [activeGame, setActiveGame] = useState<GameMode>('speed');
  const [totalEarnedPoints, setTotalEarnedPoints] = useState(0);

  const triggerCelebration = (pts: number = 30) => {
    sounds.playFanfare();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EC4899'],
    });
    setTotalEarnedPoints((prev) => prev + pts);
    onCompleted?.(pts);
  };

  return (
    <div className="space-y-6">
      {/* Game Selector Header & Points Counter */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-600 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner backdrop-blur-xs">
              🎮
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-xl md:text-2xl text-white">
                  مركز الألعاب والمسابقات التفاعلية
                </h3>
                <span className="text-xs bg-amber-400 text-slate-900 font-black px-2.5 py-0.5 rounded-full">
                  6 ألعاب مشوقة
                </span>
              </div>
              <p className="text-white/80 text-xs md:text-sm mt-0.5">
                تعلم والعب بمفردات وقواعد درس: <span className="font-english font-bold">{lesson.title}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 self-start md:self-auto">
            <Award className="w-5 h-5 text-amber-300" />
            <span className="text-xs text-white/90">نقاط الألعاب المكتسبة:</span>
            <span className="font-black text-amber-300 font-english text-lg">+{totalEarnedPoints}</span>
          </div>
        </div>

        {/* Game Mode Pills Bar */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => {
              setActiveGame('speed');
              sounds.playFlip();
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeGame === 'speed'
                ? 'bg-amber-400 text-slate-950 shadow-md scale-102 font-black ring-2 ring-amber-300'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span>⏱️ سباق الكلمات (Speed Quiz)</span>
            <span className="px-1.5 py-0.2 bg-rose-500 text-white rounded-full text-[10px] font-black uppercase tracking-wider animate-pulse">
              جديد!
            </span>
          </button>

          <button
            onClick={() => {
              setActiveGame('balloon');
              sounds.playFlip();
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeGame === 'balloon'
                ? 'bg-amber-400 text-slate-950 shadow-md scale-102 font-black ring-2 ring-amber-300'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span>🎈 فرقعة البالونات السريعة</span>
          </button>

          <button
            onClick={() => {
              setActiveGame('memory');
              sounds.playFlip();
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeGame === 'memory'
                ? 'bg-amber-400 text-slate-950 shadow-md scale-102 font-black'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span>⚡ بطاقات الذاكرة والمطابقة</span>
          </button>

          <button
            onClick={() => {
              setActiveGame('spelling');
              sounds.playFlip();
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeGame === 'spelling'
                ? 'bg-amber-400 text-slate-950 shadow-md scale-102 font-black'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span>🔤 صائد الحروف والتهجئة</span>
          </button>

          <button
            onClick={() => {
              setActiveGame('sentences');
              sounds.playFlip();
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeGame === 'sentences'
                ? 'bg-amber-400 text-slate-950 shadow-md scale-102 font-black'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span>🚂 قطار بناء الجمل (مستويات)</span>
          </button>

          <button
            onClick={() => {
              setActiveGame('special');
              sounds.playFlip();
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeGame === 'special'
                ? 'bg-amber-400 text-slate-950 shadow-md scale-102 font-black'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span>🎯 {lesson.game.titleAr.slice(0, 22)}...</span>
          </button>
        </div>
      </div>

      {/* Active Game Body */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs">
        {activeGame === 'speed' && (
          <SpeedQuizGame lesson={lesson} onVictory={() => triggerCelebration(50)} />
        )}

        {activeGame === 'balloon' && (
          <BalloonPopGame lesson={lesson} onVictory={() => triggerCelebration(35)} />
        )}

        {activeGame === 'memory' && (
          <MemoryFlipGame lesson={lesson} onVictory={() => triggerCelebration(40)} />
        )}

        {activeGame === 'spelling' && (
          <WordSpellingGame lesson={lesson} onVictory={() => triggerCelebration(35)} />
        )}

        {activeGame === 'sentences' && (
          <MultiLevelSentenceBuilder lesson={lesson} onVictory={() => triggerCelebration(45)} />
        )}

        {activeGame === 'special' && (
          <SpecializedLessonGame
            config={lesson.game}
            onVictory={() => triggerCelebration(30)}
          />
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   0. NEW GAME: SPEED QUIZ (سباق الكلمات السريع مع عداد تنازلي ومساعدات)
========================================================================= */
interface SpeedQuestion {
  question: string;
  questionAr: string;
  options: string[];
  correctIdx: number;
}

const QUESTION_TIME_LIMIT = 10; // 10 seconds per fast question

const SpeedQuizGame: React.FC<{ lesson: Lesson; onVictory: () => void }> = ({
  lesson,
  onVictory,
}) => {
  // Build a rich pool of fast-paced multiple choice questions from quiz, activities, and vocabulary
  const questions: SpeedQuestion[] = React.useMemo(() => {
    const list: SpeedQuestion[] = [];

    // From lesson quiz
    lesson.quiz.forEach((q) => {
      list.push({
        question: q.question,
        questionAr: q.questionAr,
        options: q.options,
        correctIdx: q.correctIndex,
      });
    });

    // From lesson activities
    lesson.activities.forEach((act) => {
      if ((act.type === 'multiple-choice' || act.type === 'fill-blank') && act.options) {
        const correctI = act.options.findIndex((opt) => opt === act.correctAnswer);
        if (correctI >= 0) {
          list.push({
            question: act.question,
            questionAr: act.questionAr,
            options: act.options,
            correctIdx: correctI,
          });
        }
      }
    });

    // From vocabulary meanings
    lesson.vocabulary.slice(0, 4).forEach((v) => {
      const correctText = v.word;
      const otherVocabs = lesson.vocabulary.filter((x) => x.word !== v.word);
      const shuffledOthers = [...otherVocabs].sort(() => Math.random() - 0.5).slice(0, 2);
      const opts = [correctText, ...shuffledOthers.map((o) => o.word)].sort(() => Math.random() - 0.5);
      list.push({
        question: `What is the English word for "${v.arabic}"?`,
        questionAr: `ما هي الكلمة الإنجليزية لـ "${v.arabic}"؟`,
        options: opts,
        correctIdx: opts.indexOf(correctText),
      });
    });

    return list.slice(0, 6); // 6 questions per fast-paced race
  }, [lesson]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeBonusTotal, setTimeBonusTotal] = useState(0);

  // Lifelines
  const [freezeUsed, setFreezeUsed] = useState(false);
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);

  const currentQ = questions[currentIdx] || questions[0];

  // Timer Effect
  useEffect(() => {
    if (isGameOver || isAnswered) return;

    if (timeLeft <= 0) {
      // Time is up!
      sounds.playError();
      setIsAnswered(true);
      setSelectedIdx(-1); // -1 means timed out
      setStreak(0);

      const timeoutTimer = setTimeout(() => {
        advanceNextQuestion();
      }, 1200);

      return () => clearTimeout(timeoutTimer);
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t === 3) {
          sounds.playFlip(); // warning beep
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isGameOver, isAnswered]);

  const handleSelectAnswer = (optionIdx: number) => {
    if (isAnswered || isGameOver) return;
    setIsAnswered(true);
    setSelectedIdx(optionIdx);

    const isCorrect = optionIdx === currentQ.correctIdx;
    if (isCorrect) {
      sounds.playSuccess();
      const speedBonus = timeLeft * 3;
      const multiplier = streak >= 3 ? 2.0 : streak >= 1 ? 1.5 : 1.0;
      const questionPoints = Math.round((20 + speedBonus) * multiplier);

      setScore((s) => s + questionPoints);
      setTimeBonusTotal((b) => b + speedBonus);
      setStreak((st) => {
        const nextSt = st + 1;
        if (nextSt > maxStreak) setMaxStreak(nextSt);
        return nextSt;
      });

      speakText('Correct!');
    } else {
      sounds.playError();
      setStreak(0);
      speakText('Oops!');
    }

    setTimeout(() => {
      advanceNextQuestion();
    }, 1100);
  };

  const advanceNextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((idx) => idx + 1);
      setTimeLeft(QUESTION_TIME_LIMIT);
      setSelectedIdx(null);
      setIsAnswered(false);
      setHiddenOptions([]);
    } else {
      setIsGameOver(true);
      onVictory();
    }
  };

  const handleUseFreeze = () => {
    if (freezeUsed || isAnswered) return;
    sounds.playFlip();
    setFreezeUsed(true);
    setTimeLeft((t) => t + 5);
  };

  const handleUseFiftyFifty = () => {
    if (fiftyFiftyUsed || isAnswered) return;
    sounds.playFlip();
    setFiftyFiftyUsed(true);

    const wrongIndexes = currentQ.options
      .map((_, i) => i)
      .filter((i) => i !== currentQ.correctIdx);

    // Pick 2 wrong indexes to hide
    const toHide = wrongIndexes.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenOptions(toHide);
  };

  const handleRestartRace = () => {
    setCurrentIdx(0);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setSelectedIdx(null);
    setIsAnswered(false);
    setIsGameOver(false);
    setTimeBonusTotal(0);
    setFreezeUsed(false);
    setFiftyFiftyUsed(false);
    setHiddenOptions([]);
  };

  // Timer visual progress percentage
  const timerPercentage = (timeLeft / QUESTION_TIME_LIMIT) * 100;
  const timerColor =
    timeLeft > 5 ? 'bg-emerald-500' : timeLeft > 2 ? 'bg-amber-500' : 'bg-rose-500 animate-pulse';

  if (isGameOver) {
    const accuracy = Math.round((score / (questions.length * 40)) * 100);
    const medal =
      score >= 120 ? '🥇 بطل السباق الذهبي' : score >= 80 ? '🥈 الفارس الفضي' : '🥉 المتسابق البرونزي';

    return (
      <div className="text-center py-8 max-w-lg mx-auto">
        <div className="text-6xl mb-3 animate-bounce">⚡🏁</div>
        <span className="text-xs font-black uppercase tracking-widest text-indigo-600 block mb-1">
          نهاية سباق الكلمات السريع!
        </span>
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{medal}</h3>
        <p className="text-sm text-slate-600 mb-6">
          أنهيت سلسلة الأسئلة السريعة بنجاح وحققت نتيجة رائعة!
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6">
          <div>
            <span className="text-slate-400 text-xs block">مجموع النقاط</span>
            <span className="font-english font-black text-2xl text-indigo-600">+{score}</span>
          </div>
          <div>
            <span className="text-slate-400 text-xs block">مكافأة السرعة</span>
            <span className="font-english font-black text-2xl text-emerald-600">+{timeBonusTotal}</span>
          </div>
          <div>
            <span className="text-slate-400 text-xs block">أطول كومبو</span>
            <span className="font-english font-black text-2xl text-amber-600">x{maxStreak} 🔥</span>
          </div>
        </div>

        <button
          onClick={handleRestartRace}
          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 inline-flex items-center gap-2 text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>إعادة السباق لتحطيم الرقم القياسي</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-2">
      {/* Race Top Bar */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center font-english shadow-xs">
            {currentIdx + 1}
          </span>
          <span className="text-xs font-bold text-slate-700">
            السؤال {currentIdx + 1} من {questions.length}
          </span>
        </div>

        {/* Streak & Score */}
        <div className="flex items-center gap-3">
          {streak >= 2 && (
            <div className="flex items-center gap-1 bg-orange-100 text-orange-800 px-2.5 py-1 rounded-full text-xs font-black animate-pulse border border-orange-200">
              <Flame className="w-3.5 h-3.5 fill-orange-500" />
              <span>كومبو x{streak >= 3 ? '2.0' : '1.5'}</span>
            </div>
          )}

          <div className="bg-slate-100 px-3 py-1 rounded-xl font-english font-black text-sm text-indigo-700">
            {score} pts
          </div>
        </div>
      </div>

      {/* Countdown Timer Bar */}
      <div className="mb-6 space-y-1.5">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="flex items-center gap-1 text-slate-500">
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            <span>الوقت المتبقي:</span>
          </span>
          <span
            className={`font-english font-black text-base ${
              timeLeft <= 3 ? 'text-rose-600 animate-pulse text-lg' : 'text-slate-800'
            }`}
          >
            {timeLeft}s ⏱️
          </span>
        </div>

        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className={`h-full rounded-full transition-all duration-300 ${timerColor}`}
            style={{ width: `${timerPercentage}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-slate-50 border-2 border-indigo-100 rounded-3xl p-6 text-center mb-6 shadow-xs relative">
        <h3 className="font-english font-black text-xl md:text-2xl text-slate-900 mb-2 leading-snug">
          {currentQ.question}
        </h3>
        <p className="text-xs md:text-sm text-slate-500 font-semibold">{currentQ.questionAr}</p>

        <button
          onClick={() => speakText(currentQ.question)}
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors"
          title="استمع للسؤال"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Multiple Choice Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {currentQ.options.map((opt, optIdx) => {
          const isSelected = selectedIdx === optIdx;
          const isCorrect = optIdx === currentQ.correctIdx;
          const isHidden = hiddenOptions.includes(optIdx);

          let btnClass = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';

          if (isAnswered) {
            if (isCorrect) {
              btnClass = 'bg-emerald-500 border-emerald-600 text-white font-black shadow-md ring-2 ring-emerald-300';
            } else if (isSelected && !isCorrect) {
              btnClass = 'bg-rose-500 border-rose-600 text-white font-black ring-2 ring-rose-200';
            } else {
              btnClass = 'bg-slate-100 border-slate-200 text-slate-400 opacity-50';
            }
          }

          if (isHidden) {
            return (
              <div
                key={optIdx}
                className="p-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-slate-300 text-center font-bold text-xs"
              >
                (تم حذف الخيار 💡)
              </div>
            );
          }

          return (
            <button
              key={optIdx}
              disabled={isAnswered}
              onClick={() => handleSelectAnswer(optIdx)}
              className={`p-4 rounded-2xl border-2 font-english font-bold text-base md:text-lg transition-all duration-200 text-center shadow-xs flex items-center justify-between group active:scale-95 ${btnClass}`}
            >
              <span className="w-6 h-6 rounded-lg bg-slate-100 group-hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs font-english">
                {String.fromCharCode(65 + optIdx)}
              </span>
              <span className="flex-1 px-2">{opt}</span>
              {isAnswered && isCorrect ? <Check className="w-5 h-5 text-white" /> : null}
            </button>
          );
        })}
      </div>

      {/* Power-up Lifelines */}
      <div className="flex items-center justify-center gap-3 pt-2 border-t border-slate-100">
        <button
          onClick={handleUseFreeze}
          disabled={freezeUsed || isAnswered}
          className="px-3.5 py-1.5 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 disabled:opacity-40 text-blue-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
          title="تمديد الوقت بـ 5 ثوانٍ إضافية"
        >
          <span>⏱️ +5 ثوانٍ إضافية</span>
          {freezeUsed && <span className="text-[10px] text-blue-500">(مستخدم)</span>}
        </button>

        <button
          onClick={handleUseFiftyFifty}
          disabled={fiftyFiftyUsed || isAnswered}
          className="px-3.5 py-1.5 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 disabled:opacity-40 text-amber-900 text-xs font-bold flex items-center gap-1.5 transition-colors"
          title="حذف خيارين خاطئين 50:50"
        >
          <span>💡 حذف إجابتين (50:50)</span>
          {fiftyFiftyUsed && <span className="text-[10px] text-amber-600">(مستخدم)</span>}
        </button>
      </div>
    </div>
  );
};

/* =========================================================================
   1. GAME: BALLOON POP CHALLENGE (لعبة فرقعة البالونات السريعة)
========================================================================= */
const BALLOON_COLORS = [
  'bg-red-500 border-red-600',
  'bg-blue-500 border-blue-600',
  'bg-emerald-500 border-emerald-600',
  'bg-amber-500 border-amber-600',
  'bg-purple-500 border-purple-600',
  'bg-pink-500 border-pink-600',
];

const BalloonPopGame: React.FC<{ lesson: Lesson; onVictory: () => void }> = ({
  lesson,
  onVictory,
}) => {
  // Generate questions from lesson vocabulary
  const vocabList = lesson.vocabulary.slice(0, 8);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [poppedId, setPoppedId] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentVocab = vocabList[currentIdx];

  // Options: current + 3 random wrong options
  const [options, setOptions] = useState<{ id: string; text: string; isCorrect: boolean }[]>([]);

  useEffect(() => {
    if (!currentVocab) return;
    const correctOpt = { id: 'c', text: currentVocab.word, isCorrect: true };
    const otherVocabs = lesson.vocabulary.filter((v) => v.word !== currentVocab.word);
    const shuffledOthers = [...otherVocabs].sort(() => Math.random() - 0.5).slice(0, 3);
    const wrongOpts = shuffledOthers.map((v, i) => ({
      id: `w-${i}`,
      text: v.word,
      isCorrect: false,
    }));

    const all = [correctOpt, ...wrongOpts].sort(() => Math.random() - 0.5);
    setOptions(all);
    setPoppedId(null);
  }, [currentIdx, lesson]);

  const handlePop = (opt: { id: string; text: string; isCorrect: boolean }) => {
    if (poppedId) return; // already processing
    setPoppedId(opt.id);

    if (opt.isCorrect) {
      sounds.playPop();
      sounds.playSuccess();
      speakText(opt.text);
      setScore((s) => s + 10 + streak * 2);
      setStreak((st) => st + 1);

      setTimeout(() => {
        if (currentIdx + 1 < vocabList.length) {
          setCurrentIdx((idx) => idx + 1);
        } else {
          setIsGameOver(true);
          onVictory();
        }
      }, 700);
    } else {
      sounds.playError();
      setStreak(0);
      setTimeout(() => {
        setPoppedId(null);
      }, 600);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setStreak(0);
    setIsGameOver(false);
  };

  if (isGameOver) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-3 animate-bounce">🎈🏆</div>
        <h3 className="text-2xl font-black text-slate-900 mb-1">
          بطل فرقعة البالونات!
        </h3>
        <p className="text-slate-600 mb-4">
          أحسنت! حققت <span className="font-black text-indigo-600 font-english">{score} نقطة</span> في تحدي البالونات السريعة!
        </p>
        <button
          onClick={handleRestart}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 inline-flex items-center gap-2 text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>العب مرة أخرى</span>
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Top Status */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-pink-100 text-pink-700 font-bold flex items-center justify-center text-xs font-english">
            {currentIdx + 1}/{vocabList.length}
          </span>
          <span className="text-xs font-bold text-slate-600">المرحلة {currentIdx + 1}</span>
        </div>

        <div className="flex items-center gap-4">
          {streak > 1 && (
            <div className="flex items-center gap-1 text-xs font-black text-orange-600 animate-pulse bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
              <Flame className="w-3.5 h-3.5 fill-orange-500" />
              <span>كومبو متتالي x{streak}</span>
            </div>
          )}
          <span className="text-sm font-bold font-english text-indigo-600">
            النقاط: {score}
          </span>
        </div>
      </div>

      {/* Target Clue (Arabic Meaning) */}
      <div className="bg-slate-50 border-2 border-dashed border-indigo-200 rounded-3xl p-6 text-center mb-8 relative">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
          فرقع البالون الذي يحمل الكلمة الإنجليزية لـ:
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
          "{currentVocab?.arabic}"
        </h2>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => speakText(currentVocab?.word)}
            className="p-1.5 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>تلميح صوتي</span>
          </button>
        </div>
      </div>

      {/* Floating Balloons Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 min-h-[220px] items-center">
        {options.map((opt, i) => {
          const colorClass = BALLOON_COLORS[i % BALLOON_COLORS.length];
          const isPopped = poppedId === opt.id;

          return (
            <button
              key={opt.id}
              onClick={() => handlePop(opt)}
              className={`relative flex flex-col items-center justify-center transition-all duration-300 transform active:scale-95 ${
                isPopped
                  ? opt.isCorrect
                    ? 'scale-125 opacity-0'
                    : 'animate-shake'
                  : 'hover:-translate-y-2'
              }`}
            >
              {/* Balloon Body */}
              <div
                className={`w-28 h-36 sm:w-32 sm:h-40 rounded-[50%] ${colorClass} text-white shadow-lg border-2 flex flex-col items-center justify-center p-3 relative select-none`}
              >
                {/* Shiny highlight */}
                <div className="absolute top-3 left-4 w-4 h-8 bg-white/40 rounded-full rotate-[-25deg]" />

                <span className="font-english font-black text-base sm:text-lg text-center leading-tight drop-shadow-sm">
                  {opt.text}
                </span>

                {/* Balloon Knot & String */}
                <div className="absolute -bottom-2 w-3 h-3 bg-inherit rounded-full rotate-45" />
                <div className="absolute -bottom-7 w-0.5 h-6 bg-slate-400" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* =========================================================================
   2. GAME: MEMORY FLIP CARDS GAME (تحدي بطاقات الذاكرة والمطابقة)
========================================================================= */
interface MemoryCard {
  id: string;
  text: string;
  pairId: string;
  isFlipped: boolean;
  isMatched: boolean;
  lang: 'en' | 'ar';
}

const MemoryFlipGame: React.FC<{ lesson: Lesson; onVictory: () => void }> = ({
  lesson,
  onVictory,
}) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [isVictory, setIsVictory] = useState(false);

  // Initialize cards
  const setupGame = () => {
    const vocabSlice = lesson.vocabulary.slice(0, 6);
    const deck: MemoryCard[] = [];

    vocabSlice.forEach((v, idx) => {
      deck.push({
        id: `en-${idx}`,
        text: v.word,
        pairId: `pair-${idx}`,
        isFlipped: false,
        isMatched: false,
        lang: 'en',
      });
      deck.push({
        id: `ar-${idx}`,
        text: v.arabic,
        pairId: `pair-${idx}`,
        isFlipped: false,
        isMatched: false,
        lang: 'ar',
      });
    });

    // Shuffle deck
    setCards(deck.sort(() => Math.random() - 0.5));
    setFlippedIds([]);
    setMoves(0);
    setIsVictory(false);
  };

  useEffect(() => {
    setupGame();
  }, [lesson]);

  const handleCardClick = (card: MemoryCard) => {
    if (card.isFlipped || card.isMatched || flippedIds.length === 2) return;

    sounds.playFlip();
    const newFlipped = [...flippedIds, card.id];
    setFlippedIds(newFlipped);

    if (card.lang === 'en') {
      speakText(card.text);
    }

    // Flip card visually
    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c))
    );

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const first = cards.find((c) => c.id === newFlipped[0])!;
      const second = card;

      if (first.pairId === second.pairId) {
        // Matched!
        sounds.playSuccess();
        setTimeout(() => {
          setCards((prev) => {
            const updated = prev.map((c) =>
              c.pairId === first.pairId ? { ...c, isMatched: true } : c
            );
            if (updated.every((c) => c.isMatched)) {
              setIsVictory(true);
              onVictory();
            }
            return updated;
          });
          setFlippedIds([]);
        }, 500);
      } else {
        // Not matched
        sounds.playError();
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedIds([]);
        }, 900);
      }
    }
  };

  const matchedPairsCount = cards.filter((c) => c.isMatched).length / 2;
  const totalPairs = cards.length / 2;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div>
          <h4 className="font-bold text-slate-800 text-sm">
            اقلب البطاقات وطابق الكلمة الإنجليزية بمعناها العربي!
          </h4>
          <span className="text-xs text-slate-400">
            عدد المحاولات: <span className="font-bold font-english text-indigo-600">{moves}</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200">
            تمت مطابقة {matchedPairsCount} من {totalPairs}
          </span>
          <button
            onClick={setupGame}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
            title="إعادة خلط البطاقات"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isVictory ? (
        <div className="text-center py-10 bg-amber-50/50 rounded-3xl border border-amber-200">
          <div className="text-6xl mb-3 animate-bounce">⚡🎉</div>
          <h3 className="text-2xl font-black text-slate-900 mb-1">
            ذاكرة فولاذية مذهلة!
          </h3>
          <p className="text-sm text-slate-600 mb-6">
            أنهيت مطابقة جميع بطاقات الدرس في{' '}
            <span className="font-bold font-english text-indigo-600">{moves}</span> محاولات!
          </p>
          <button
            onClick={setupGame}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 inline-flex items-center gap-2 text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>العب جولة جديدة</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
          {cards.map((card) => {
            const isRevealed = card.isFlipped || card.isMatched;

            return (
              <button
                key={card.id}
                disabled={card.isMatched}
                onClick={() => handleCardClick(card)}
                className={`h-24 sm:h-28 rounded-2xl border-2 font-bold transition-all duration-300 flex items-center justify-center p-3 text-center shadow-xs select-none ${
                  card.isMatched
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-800 opacity-60 scale-95 ring-2 ring-emerald-300'
                    : isRevealed
                    ? card.lang === 'en'
                      ? 'bg-indigo-600 border-indigo-700 text-white shadow-md scale-102 font-english text-base'
                      : 'bg-purple-600 border-purple-700 text-white shadow-md scale-102 text-sm'
                    : 'bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 border-slate-300 text-slate-400 text-2xl hover:scale-102'
                }`}
              >
                {isRevealed ? (
                  <span className="leading-tight">{card.text}</span>
                ) : (
                  <span>❓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   3. GAME: WORD SPELLING SCRAMBLE (صائد الحروف وتهجئة الكلمات)
========================================================================= */
const WordSpellingGame: React.FC<{ lesson: Lesson; onVictory: () => void }> = ({
  lesson,
  onVictory,
}) => {
  // Extract clean single words from lesson vocabulary, verbs, and activities
  const validWords = React.useMemo(() => {
    const list: { word: string; arabic: string }[] = [];

    lesson.vocabulary.forEach((v) => {
      const clean = v.word.trim();
      if (clean.includes('->')) {
        // e.g. "go -> went" or "buy -> bought"
        const parts = clean.split('->').map((p) => p.trim());
        if (parts[1] && parts[1].length >= 3) {
          list.push({ word: parts[1], arabic: `ماضي الفعل (${v.arabic})` });
        }
      } else if (!clean.includes(' ') && clean.length >= 3) {
        list.push({ word: clean, arabic: v.arabic });
      } else {
        // Phrase like "wash my face" -> extract meaningful keywords like "wash", "face"
        const tokens = clean
          .split(/\s+/)
          .filter((t) => t.length >= 4 && !['this', 'the', 'with', 'your'].includes(t.toLowerCase()));
        tokens.forEach((tok) => {
          list.push({ word: tok, arabic: v.arabic });
        });
      }
    });

    // Deduplicate
    const unique = list.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.word.toLowerCase() === item.word.toLowerCase())
    );

    return unique.length > 0 ? unique.slice(0, 7) : [{ word: 'ENGLISH', arabic: 'اللغة الإنجليزية' }];
  }, [lesson]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const currentItem = validWords[currentIdx] || validWords[0];

  const targetCleanWord = currentItem ? currentItem.word.toUpperCase().replace(/[^A-Z]/g, '') : '';
  const [lettersPool, setLettersPool] = useState<{ id: string; char: string }[]>([]);
  const [assembledLetters, setAssembledLetters] = useState<{ id: string; char: string }[]>([]);
  const [status, setStatus] = useState<'idle' | 'success' | 'wrong'>('idle');

  useEffect(() => {
    if (!targetCleanWord) return;
    const pool = targetCleanWord.split('').map((char, i) => ({
      id: `${char}-${i}`,
      char,
    }));
    setLettersPool(pool.sort(() => Math.random() - 0.5));
    setAssembledLetters([]);
    setStatus('idle');
  }, [currentIdx, targetCleanWord]);

  const addLetter = (item: { id: string; char: string }) => {
    sounds.playFlip();
    setAssembledLetters([...assembledLetters, item]);
    setLettersPool(lettersPool.filter((l) => l.id !== item.id));
    setStatus('idle');
  };

  const removeLetter = (item: { id: string; char: string }) => {
    sounds.playFlip();
    setLettersPool([...lettersPool, item]);
    setAssembledLetters(assembledLetters.filter((l) => l.id !== item.id));
    setStatus('idle');
  };

  const checkWord = () => {
    const spelled = assembledLetters.map((l) => l.char).join('');
    if (spelled === targetCleanWord) {
      sounds.playSuccess();
      setStatus('success');
      speakText(currentItem.word);

      setTimeout(() => {
        if (currentIdx + 1 < validWords.length) {
          setCurrentIdx((idx) => idx + 1);
        } else {
          onVictory();
        }
      }, 900);
    } else {
      sounds.playError();
      setStatus('wrong');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-2">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
        <span className="text-xs font-bold text-slate-500">
          الكلمة {currentIdx + 1} من {validWords.length}
        </span>
        <button
          onClick={() => {
            const pool = targetCleanWord.split('').map((char, i) => ({
              id: `${char}-${i}`,
              char,
            }));
            setLettersPool(pool.sort(() => Math.random() - 0.5));
            setAssembledLetters([]);
            setStatus('idle');
          }}
          className="text-xs text-indigo-600 font-bold flex items-center gap-1 hover:underline"
        >
          <RotateCcw className="w-3.5 h-3.5" /> إعادة الحروف
        </button>
      </div>

      {/* Clue banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center mb-6">
        <span className="text-xs font-bold text-amber-800 block mb-1">
          رتّب الحروف لتهجئة الكلمة الإنجليزية (من اليسار إلى اليمين ⬅️):
        </span>
        <h3 className="text-2xl font-black text-slate-900 mb-2">"{currentItem?.arabic}"</h3>
        <button
          onClick={() => speakText(currentItem?.word)}
          className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
        >
          <Volume2 className="w-4 h-4" />
          <span>استمع لنطق الكلمة</span>
        </button>
      </div>

      {/* Direction Guide for English Spelling */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2 px-1">
        <span>صف الحروف الإنجليزية:</span>
        <span className="text-indigo-600 font-english">Left to Right ➡️</span>
      </div>

      {/* Assembly Zone - STRICTLY LTR FOR ENGLISH SPELLING */}
      <div
        dir="ltr"
        className="min-h-20 p-4 border-2 border-dashed border-indigo-300 rounded-2xl bg-indigo-50/40 mb-6 flex flex-row flex-wrap gap-2 items-center justify-center transition-all"
      >
        {assembledLetters.length === 0 ? (
          <span className="text-slate-400 text-xs italic" dir="rtl">
            اضغط على الحروف بالأسفل لصفها هنا من اليسار إلى اليمين
          </span>
        ) : (
          assembledLetters.map((l) => (
            <button
              key={l.id}
              onClick={() => removeLetter(l)}
              className="w-12 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-english font-black text-xl shadow-sm flex items-center justify-center transition-transform active:scale-95 group relative"
              title="اضغط لإعادة الحرف"
            >
              <span>{l.char}</span>
            </button>
          ))
        )}
      </div>

      {/* Letter Tiles Pool - LTR */}
      <div dir="ltr" className="flex flex-row flex-wrap gap-2 justify-center mb-6">
        {lettersPool.map((l) => (
          <button
            key={l.id}
            onClick={() => addLetter(l)}
            className="w-12 h-12 rounded-xl bg-white border-2 border-slate-300 hover:border-indigo-500 hover:bg-indigo-50 text-slate-800 font-english font-black text-xl shadow-xs flex items-center justify-center transition-transform active:scale-95"
          >
            {l.char}
          </button>
        ))}
      </div>

      {/* Check Button */}
      <div className="text-center">
        <button
          onClick={checkWord}
          disabled={assembledLetters.length !== targetCleanWord.length}
          className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 text-sm inline-flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>تحقق من صحة الكلمة</span>
        </button>

        {status === 'success' && (
          <div className="mt-3 text-emerald-600 font-bold text-sm flex items-center justify-center gap-1.5 animate-bounce">
            <CheckCircle2 className="w-5 h-5" />
            <span>تهجئة متقنة 100%! أحسنت!</span>
          </div>
        )}
        {status === 'wrong' && (
          <p className="mt-3 text-rose-500 font-bold text-xs">
            ترتيب الحروف غير سليم، اضغط على الحرف لحذفه وإعادة ترتيبه.
          </p>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   4. GAME: MULTI-LEVEL SENTENCE TRAIN (قطار بناء الجمل متعدد المستويات)
========================================================================= */
const MultiLevelSentenceBuilder: React.FC<{ lesson: Lesson; onVictory: () => void }> = ({
  lesson,
  onVictory,
}) => {
  // Generate 4 progressive sentences from lesson grammar and dialogue
  const sentencesList: { en: string; ar: string }[] = [];

  if (lesson.grammar.examples && lesson.grammar.examples.length > 0) {
    lesson.grammar.examples.forEach((eg) => {
      sentencesList.push({ en: eg.english, ar: eg.arabic });
    });
  }
  if (lesson.dialogue && lesson.dialogue.length > 0) {
    lesson.dialogue.forEach((d) => {
      sentencesList.push({ en: d.text, ar: d.arabic });
    });
  }
  // Fallback to activities sentences
  lesson.activities.forEach((act) => {
    if (typeof act.correctAnswer === 'string' && act.correctAnswer.split(' ').length > 2) {
      sentencesList.push({ en: act.correctAnswer, ar: act.questionAr });
    }
  });

  const uniqueSentences = sentencesList.slice(0, 4);
  const [levelIdx, setLevelIdx] = useState(0);
  const currentSentence = uniqueSentences[levelIdx] || uniqueSentences[0];

  const targetWords = currentSentence ? currentSentence.en.replace(/[.?]/g, '').trim().split(/\s+/) : [];
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isPassed, setIsPassed] = useState<boolean | null>(null);

  useEffect(() => {
    if (!currentSentence) return;
    const shuffled = [...targetWords].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
    setSelectedWords([]);
    setIsPassed(null);
  }, [levelIdx, lesson]);

  const addWord = (w: string, idx: number) => {
    sounds.playFlip();
    setSelectedWords([...selectedWords, w]);
    const next = [...availableWords];
    next.splice(idx, 1);
    setAvailableWords(next);
    setIsPassed(null);
  };

  const removeWord = (w: string, idx: number) => {
    sounds.playFlip();
    setAvailableWords([...availableWords, w]);
    const next = [...selectedWords];
    next.splice(idx, 1);
    setSelectedWords(next);
    setIsPassed(null);
  };

  const verifySentence = () => {
    const constructed = selectedWords.join(' ').toLowerCase().trim();
    const target = targetWords.join(' ').toLowerCase().trim();

    if (constructed === target) {
      sounds.playSuccess();
      setIsPassed(true);
      speakText(selectedWords.join(' '));

      setTimeout(() => {
        if (levelIdx + 1 < uniqueSentences.length) {
          setLevelIdx((l) => l + 1);
        } else {
          onVictory();
        }
      }, 1000);
    } else {
      sounds.playError();
      setIsPassed(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-2">
      {/* Top Level Bar */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs font-english">
            {levelIdx + 1}/{uniqueSentences.length}
          </span>
          <span className="text-xs font-bold text-slate-700">المستوى {levelIdx + 1}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {uniqueSentences.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === levelIdx ? 'bg-amber-400 scale-125' : i < levelIdx ? 'bg-emerald-500' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Target prompt */}
      <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl text-center mb-6">
        <span className="text-xs text-slate-500 font-bold block mb-1">
          رتب الكلمات الإنجليزية لتكوين هذه الجملة:
        </span>
        <h3 className="text-xl font-bold text-slate-900 mb-2">"{currentSentence?.ar}"</h3>
        <button
          onClick={() => speakText(currentSentence?.en)}
          className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold inline-flex items-center gap-1"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>استمع للجملة</span>
        </button>
      </div>

      {/* Direction Guide for English Sentence Order */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2 px-1">
        <span>بناء الجملة الإنجليزية:</span>
        <span className="text-indigo-600 font-english">Left to Right ➡️</span>
      </div>

      {/* Train Assembly line - STRICTLY LTR FOR ENGLISH SENTENCES */}
      <div
        dir="ltr"
        className="min-h-24 p-4 border-2 border-dashed border-indigo-200 rounded-2xl bg-indigo-50/30 mb-6 flex flex-row flex-wrap gap-2 items-center justify-center transition-all"
      >
        {selectedWords.length === 0 ? (
          <span className="text-slate-400 text-xs italic" dir="rtl">
            اضغط على عربات الكلمات لربطها بقطار الجملة من اليسار إلى اليمين 🚂
          </span>
        ) : (
          selectedWords.map((w, idx) => (
            <button
              key={`${w}-${idx}`}
              onClick={() => removeWord(w, idx)}
              className="px-4 py-2 bg-indigo-600 text-white font-english font-bold rounded-xl shadow-xs hover:bg-indigo-700 transition-transform active:scale-95 text-base flex items-center gap-1.5"
            >
              <span>{w}</span>
              <span className="text-xs text-indigo-200">✕</span>
            </button>
          ))
        )}
      </div>

      {/* Words Pool - LTR */}
      <div dir="ltr" className="flex flex-row flex-wrap gap-2 justify-center mb-6">
        {availableWords.map((w, idx) => (
          <button
            key={`${w}-${idx}`}
            onClick={() => addWord(w, idx)}
            className="px-4 py-2.5 bg-white border border-slate-300 hover:border-indigo-500 text-slate-800 font-english font-bold rounded-xl shadow-xs transition-transform active:scale-95 text-base"
          >
            {w}
          </button>
        ))}
      </div>

      {/* Action */}
      <div className="text-center">
        <button
          onClick={verifySentence}
          disabled={selectedWords.length !== targetWords.length}
          className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 text-sm inline-flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>تأكيد ترتيب القطار</span>
        </button>

        {isPassed === true && (
          <div className="mt-3 text-emerald-600 font-bold text-sm flex items-center justify-center gap-1.5 animate-bounce">
            <CheckCircle2 className="w-5 h-5" />
            <span>ترتيب صحيح! الانتقال للمستوى التالي...</span>
          </div>
        )}
        {isPassed === false && (
          <p className="mt-3 text-rose-500 font-bold text-xs">
            الترتيب غير صحيح، راجع موضع الفاعل والفعل ثم حاول مجدداً.
          </p>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   5. GAME: SPECIALIZED LESSON GAME
========================================================================= */
const SpecializedLessonGame: React.FC<{ config: any; onVictory: () => void }> = ({
  config,
  onVictory,
}) => {
  // Renders the original specialized game (Clock, Clothes Detective, Past Match, etc.)
  if (config.type === 'clock') {
    return <ClockGameSpecial data={config.data} onComplete={onVictory} />;
  }
  if (config.type === 'past-match') {
    return <PastMatchGameSpecial data={config.data} onComplete={onVictory} />;
  }
  if (config.type === 'clothes-detective') {
    return <ClothesDetectiveGameSpecial data={config.data} onComplete={onVictory} />;
  }
  if (config.type === 'preposition-drop') {
    return <PrepositionGameSpecial data={config.data} onComplete={onVictory} />;
  }
  if (config.type === 'routine-sequence') {
    return <RoutineSequenceGameSpecial data={config.data} onComplete={onVictory} />;
  }
  return <div className="text-center p-4">لعبة التحدي الخاصة</div>;
};

/* Specialized: Clock */
const ClockGameSpecial: React.FC<{ data: any; onComplete: () => void }> = ({ data, onComplete }) => {
  const questions = data.questions || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedHour, setSelectedHour] = useState<number>(12);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const currentQ = questions[currentIdx] || questions[0];

  const checkAnswer = () => {
    if (selectedHour === currentQ.targetHour) {
      sounds.playSuccess();
      setFeedback('correct');
      speakText(`Correct! ${currentQ.label}`);
      setTimeout(() => {
        if (currentIdx + 1 < questions.length) {
          setCurrentIdx(currentIdx + 1);
          setFeedback('idle');
          setSelectedHour(12);
        } else {
          onComplete();
        }
      }, 1000);
    } else {
      sounds.playError();
      setFeedback('wrong');
    }
  };

  const hourAngle = (selectedHour % 12) * 30;

  return (
    <div className="flex flex-col items-center max-w-lg mx-auto py-2">
      <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-2xl mb-6">
        <button
          onClick={() => speakText(currentQ.label)}
          className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl"
        >
          <Volume2 className="w-5 h-5" />
        </button>
        <div className="text-right">
          <span className="text-xs font-bold text-amber-700 block">اضبط الساعة على:</span>
          <span className="text-xl font-black font-english text-amber-950">{currentQ.label}</span>
        </div>
      </div>

      <div className="relative w-56 h-56 bg-slate-900 rounded-full border-8 border-amber-400 shadow-xl flex items-center justify-center p-4">
        <div className="w-4 h-4 bg-amber-400 rounded-full z-20 shadow-md" />
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => {
          const angle = (num * 30 - 90) * (Math.PI / 180);
          const x = 50 + 38 * Math.cos(angle);
          const y = 50 + 38 * Math.sin(angle);
          return (
            <div
              key={num}
              style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
              className="absolute text-slate-300 font-bold text-sm font-english select-none"
            >
              {num}
            </div>
          );
        })}
        <div
          className="absolute w-1 bg-amber-200 rounded-full origin-bottom z-10"
          style={{ height: '75px', top: '37px', left: 'calc(50% - 2px)' }}
        />
        <div
          className="absolute w-2 bg-amber-500 rounded-full origin-bottom z-15 transition-transform duration-300 shadow-md"
          style={{ height: '52px', top: '60px', left: 'calc(50% - 4px)', transform: `rotate(${hourAngle}deg)` }}
        />
      </div>

      <div className="mt-6 w-full">
        <div className="grid grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => (
            <button
              key={h}
              onClick={() => {
                setSelectedHour(h);
                sounds.playFlip();
                setFeedback('idle');
              }}
              className={`py-2 rounded-xl font-bold font-english transition-all ${
                selectedHour === h
                  ? 'bg-amber-500 text-white shadow-md scale-105 ring-2 ring-amber-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {h}:00
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={checkAnswer}
          className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md text-sm"
        >
          تحقق من ضبط الساعة
        </button>
      </div>
    </div>
  );
};

/* Specialized: Past Match */
const PastMatchGameSpecial: React.FC<{ data: any; onComplete: () => void }> = ({ data, onComplete }) => {
  const pairs: { present: string; past: string }[] = data.pairs || [];
  const [selectedPresent, setSelectedPresent] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);

  const handlePick = (present: string, past: string) => {
    sounds.playFlip();
    const pair = pairs.find((p) => p.present === present);
    if (pair && pair.past === past) {
      sounds.playSuccess();
      const updated = [...matched, present];
      setMatched(updated);
      setSelectedPresent(null);
      speakText(`${present} ... ${past}`);
      if (updated.length === pairs.length) {
        onComplete();
      }
    } else {
      sounds.playError();
      setSelectedPresent(null);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto py-2">
      <div className="space-y-2">
        <h5 className="font-bold text-center text-xs text-slate-500 mb-2">المضارع (Present)</h5>
        {pairs.map((p) => (
          <button
            key={p.present}
            disabled={matched.includes(p.present)}
            onClick={() => setSelectedPresent(p.present)}
            className={`w-full py-2.5 px-3 rounded-xl font-english font-bold text-sm border text-center transition-all ${
              matched.includes(p.present)
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 line-through opacity-60'
                : selectedPresent === p.present
                ? 'bg-indigo-600 text-white border-indigo-700 ring-2 ring-indigo-300'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            {p.present}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <h5 className="font-bold text-center text-xs text-slate-500 mb-2">الماضي (Past)</h5>
        {pairs.map((p) => {
          const isMatched = matched.includes(p.present);
          return (
            <button
              key={p.past}
              disabled={isMatched || !selectedPresent}
              onClick={() => selectedPresent && handlePick(selectedPresent, p.past)}
              className={`w-full py-2.5 px-3 rounded-xl font-english font-bold text-sm border text-center transition-all ${
                isMatched
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 opacity-60'
                  : selectedPresent
                  ? 'bg-purple-50 hover:bg-purple-100 border-purple-300 text-purple-900 cursor-pointer'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              {p.past}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* Specialized: Clothes Detective */
const ClothesDetectiveGameSpecial: React.FC<{ data: any; onComplete: () => void }> = ({ data, onComplete }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (id === data.correctId) {
      sounds.playSuccess();
      speakText('Correct detective! You found him!');
      setTimeout(onComplete, 800);
    } else {
      sounds.playError();
      speakText('Wrong person, read the clue again!');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-2">
      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 mb-6 text-center">
        <p className="font-english font-bold text-slate-900 text-lg mb-2">{data.riddle}</p>
        <button
          onClick={() => speakText(data.riddle)}
          className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
        >
          <Volume2 className="w-4 h-4" />
          <span>استمع لوصف اللغز</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.options.map((opt: any) => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt.id)}
            className={`p-5 rounded-2xl border-2 text-center transition-all ${
              selectedId === opt.id
                ? opt.id === data.correctId
                  ? 'border-emerald-500 bg-emerald-50 shadow-md scale-105'
                  : 'border-rose-500 bg-rose-50 shadow-md'
                : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30'
            }`}
          >
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center text-3xl">
              {opt.id === 'A' ? '👦' : opt.id === 'B' ? '🧑' : '👨'}
            </div>
            <h5 className="font-bold text-slate-900 mb-1">{opt.name}</h5>
            <p className="text-xs text-slate-600 leading-relaxed">{opt.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

/* Specialized: Prepositions */
const PrepositionGameSpecial: React.FC<{ data: any; onComplete: () => void }> = ({ data, onComplete }) => {
  const items: { word: string; arabic: string; symbol: string }[] = data.items || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentItem = items[currentIdx] || items[0];

  const handlePick = (word: string) => {
    if (word === currentItem.word) {
      sounds.playSuccess();
      speakText(`${word} means ${currentItem.arabic}`);
      setTimeout(() => {
        if (currentIdx + 1 < items.length) {
          setCurrentIdx(currentIdx + 1);
        } else {
          onComplete();
        }
      }, 700);
    } else {
      sounds.playError();
    }
  };

  return (
    <div className="max-w-md mx-auto py-2 text-center">
      <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl mb-6">
        <span className="text-xs font-bold text-emerald-800 block mb-2">
          ما حرف الجر المناسب؟ ({currentIdx + 1}/{items.length})
        </span>
        <div className="text-5xl mb-2">{currentItem.symbol}</div>
        <h3 className="text-2xl font-bold text-slate-900">{currentItem.arabic}</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.map((it) => (
          <button
            key={it.word}
            onClick={() => handlePick(it.word)}
            className="py-3 px-4 rounded-xl font-english font-bold text-base border bg-white hover:bg-emerald-50 hover:border-emerald-400 text-slate-800 transition-all"
          >
            {it.word}
          </button>
        ))}
      </div>
    </div>
  );
};

/* Specialized: Routine Sequence */
const RoutineSequenceGameSpecial: React.FC<{ data: any; onComplete: () => void }> = ({ data, onComplete }) => {
  const items: { day: string; action: string; labelAr: string }[] = data.items || [];
  const [currentOrder, setCurrentOrder] = useState<any[]>([]);

  useEffect(() => {
    setCurrentOrder([...items].sort(() => Math.random() - 0.5));
  }, [data]);

  const moveItem = (fromIdx: number, toIdx: number) => {
    sounds.playFlip();
    const updated = [...currentOrder];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);
    setCurrentOrder(updated);
  };

  const checkOrder = () => {
    const isCorrect = currentOrder.every((item, idx) => item.action === items[idx].action);
    if (isCorrect) {
      sounds.playSuccess();
      speakText('Great job! Perfect sequence!');
      setTimeout(onComplete, 800);
    } else {
      sounds.playError();
      alert('الترتيب ليس صحيحاً تماماً بعد، حاول تحريك العناصر لأعلى أو لأسفل!');
    }
  };

  return (
    <div className="max-w-md mx-auto py-2">
      <div className="space-y-2 mb-6">
        {currentOrder.map((item, idx) => (
          <div
            key={item.action}
            className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm font-english">
                {idx + 1}
              </span>
              <div>
                <p className="font-english font-bold text-slate-900 text-sm">{item.action}</p>
                <p className="text-xs text-slate-500">{item.labelAr}</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                disabled={idx === 0}
                onClick={() => moveItem(idx, idx - 1)}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 font-bold"
              >
                ▲
              </button>
              <button
                disabled={idx === currentOrder.length - 1}
                onClick={() => moveItem(idx, idx + 1)}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 font-bold"
              >
                ▼
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={checkOrder}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md text-sm"
        >
          تأكيد الترتيب
        </button>
      </div>
    </div>
  );
};
