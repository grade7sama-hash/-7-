import React, { useState } from 'react';
import { ActivityExercise } from '../types/curriculum';
import { Volume2, CheckCircle2, XCircle, Sparkles, Check, X, Award, RotateCcw } from 'lucide-react';
import { speakText } from '../utils/speech';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface Props {
  activities: ActivityExercise[];
  onPointsEarned?: (pts: number) => void;
}

export const InteractiveActivities: React.FC<Props> = ({ activities, onPointsEarned }) => {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [validated, setValidated] = useState<Record<string, boolean>>({});
  const [matchedPairs, setMatchedPairs] = useState<Record<string, { [en: string]: string }>>({});
  const [selectedEn, setSelectedEn] = useState<string | null>(null);

  // For sentence ordering word clicker
  const [sentenceWords, setSentenceWords] = useState<Record<string, string[]>>({});

  const handleSelectOption = (actId: string, opt: string) => {
    sounds.playFlip();
    setAnswers({ ...answers, [actId]: opt });
  };

  const handleSentenceWordClick = (actId: string, word: string, targetAnswer: string) => {
    sounds.playFlip();
    const currentList = sentenceWords[actId] || [];
    const updated = [...currentList, word];
    setSentenceWords({ ...sentenceWords, [actId]: updated });
    setAnswers({ ...answers, [actId]: updated.join(' ') });
  };

  const handleRemoveSentenceWord = (actId: string, idx: number) => {
    sounds.playFlip();
    const currentList = sentenceWords[actId] || [];
    const updated = [...currentList];
    updated.splice(idx, 1);
    setSentenceWords({ ...sentenceWords, [actId]: updated });
    setAnswers({ ...answers, [actId]: updated.join(' ') });
  };

  const checkAnswer = (act: ActivityExercise) => {
    const studentAns = (answers[act.id] || '').toString().trim();
    let isCorrect = false;

    if (act.type === 'multiple-choice' || act.type === 'fill-blank' || act.type === 'true-false') {
      isCorrect = studentAns.toLowerCase() === (act.correctAnswer as string).toLowerCase();
    } else if (act.type === 'sentence-order') {
      const cleanStudent = studentAns.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
      const cleanCorrect = (typeof act.correctAnswer === 'string' ? act.correctAnswer : '')
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .trim();
      isCorrect = cleanStudent === cleanCorrect;
    }

    setValidated({ ...validated, [act.id]: isCorrect });

    if (isCorrect) {
      sounds.playSuccess();
      confetti({ particleCount: 35, spread: 45, origin: { y: 0.7 } });
      speakText('Correct! Well done!');
      onPointsEarned?.(15);
    } else {
      sounds.playError();
      speakText('Try again!');
    }
  };

  // Matching logic
  const handleMatchPick = (actId: string, en: string, ar: string) => {
    sounds.playFlip();
    const cur = matchedPairs[actId] || {};
    cur[en] = ar;
    setMatchedPairs({ ...matchedPairs, [actId]: cur });

    const totalPairs = activities.find((a) => a.id === actId)?.pairs?.length || 0;
    if (Object.keys(cur).length === totalPairs) {
      setValidated({ ...validated, [actId]: true });
      sounds.playSuccess();
      confetti({ particleCount: 40, spread: 50 });
      speakText('All matched correctly!');
      onPointsEarned?.(25);
    }
  };

  const completedCount = Object.values(validated).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / activities.length) * 100);

  return (
    <div className="space-y-6">
      {/* Top Activities Overview Bar */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-5 rounded-3xl text-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">✏️</span>
            <h3 className="font-bold text-lg md:text-xl text-white">
              الأنشطة والتدريبات التفاعلية المرافقة للدرس
            </h3>
          </div>
          <p className="text-white/80 text-xs mt-1">
            تمارين متنوعة لترسيخ القواعد والمفردات وحل أنشطة كتاب التلميذ
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 self-stretch sm:self-auto justify-between sm:justify-start">
          <div>
            <span className="text-[11px] text-white/80 block">التمارين المنجزة:</span>
            <span className="font-black font-english text-base text-amber-300">
              {completedCount} / {activities.length}
            </span>
          </div>
          <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Exercises List */}
      <div className="space-y-5">
        {activities.map((act, idx) => {
          const isChecked = validated[act.id] !== undefined;
          const isCorrect = validated[act.id] === true;

          // Split sentence order tokens if available
          const sentenceTokens =
            act.type === 'sentence-order' && typeof act.correctAnswer === 'string'
              ? act.correctAnswer.split(/\s+/).sort(() => 0.5 - Math.random())
              : [];

          return (
            <div
              key={act.id}
              className={`bg-white rounded-3xl border-2 transition-all p-6 shadow-xs ${
                isChecked
                  ? isCorrect
                    ? 'border-emerald-400 bg-emerald-50/20 shadow-sm'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 font-black text-sm flex items-center justify-center font-english shadow-2xs">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {act.type === 'multiple-choice'
                          ? 'اختيار من متعدد'
                          : act.type === 'fill-blank'
                          ? 'أكمل الفراغ'
                          : act.type === 'sentence-order'
                          ? 'ترتيب الجملة'
                          : act.type === 'true-false'
                          ? 'صح أم خطأ'
                          : 'مطابقة وتوصيل'}
                      </span>
                    </div>
                    <h4 className="font-english font-black text-lg md:text-xl text-slate-900 mt-1">
                      {act.question}
                    </h4>
                    <p className="text-xs md:text-sm text-slate-500 font-semibold mt-0.5">
                      {act.questionAr}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => speakText(act.question)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors shrink-0"
                  title="استمع للسؤال"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* 1. Multiple Choice & Fill in Blank */}
              {(act.type === 'multiple-choice' || act.type === 'fill-blank') && act.options && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  {act.options.map((opt, optIdx) => {
                    const isSelected = answers[act.id] === opt;
                    return (
                      <button
                        key={optIdx}
                        disabled={isChecked && isCorrect}
                        onClick={() => handleSelectOption(act.id, opt)}
                        className={`p-3.5 rounded-2xl border font-english font-bold text-base transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-102 ring-2 ring-indigo-300'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 2. True / False */}
              {act.type === 'true-false' && (
                <div className="grid grid-cols-2 gap-4 mb-4 max-w-md mx-auto">
                  <button
                    disabled={isChecked && isCorrect}
                    onClick={() => handleSelectOption(act.id, 'True')}
                    className={`py-3.5 px-4 rounded-2xl border-2 font-bold transition-all flex items-center justify-center gap-2 text-base ${
                      answers[act.id] === 'True'
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-300'
                        : 'bg-slate-50 hover:bg-emerald-50 text-slate-700 border-slate-200 hover:border-emerald-400'
                    }`}
                  >
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>صح (True)</span>
                  </button>

                  <button
                    disabled={isChecked && isCorrect}
                    onClick={() => handleSelectOption(act.id, 'False')}
                    className={`py-3.5 px-4 rounded-2xl border-2 font-bold transition-all flex items-center justify-center gap-2 text-base ${
                      answers[act.id] === 'False'
                        ? 'bg-rose-600 text-white border-rose-700 shadow-md ring-2 ring-rose-300'
                        : 'bg-slate-50 hover:bg-rose-50 text-slate-700 border-slate-200 hover:border-rose-400'
                    }`}
                  >
                    <X className="w-5 h-5 text-rose-500" />
                    <span>خطأ (False)</span>
                  </button>
                </div>
              )}

              {/* 3. Sentence Order (Interactive Tiles + Input) */}
              {act.type === 'sentence-order' && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>اضغط على الكلمات بالترتيب الإنجليزي (من اليسار لليمين ➡️):</span>
                    <button
                      onClick={() => {
                        setSentenceWords({ ...sentenceWords, [act.id]: [] });
                        setAnswers({ ...answers, [act.id]: '' });
                      }}
                      className="text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" /> إعادة البدء
                    </button>
                  </div>

                  {/* Assembled Line (LTR) */}
                  <div
                    dir="ltr"
                    className="min-h-14 p-3 bg-indigo-50/50 border-2 border-dashed border-indigo-200 rounded-2xl mb-3 flex flex-row flex-wrap gap-2 items-center"
                  >
                    {(!sentenceWords[act.id] || sentenceWords[act.id].length === 0) ? (
                      <span className="text-slate-400 text-xs italic">
                        Click the words below to build your sentence...
                      </span>
                    ) : (
                      sentenceWords[act.id].map((w, wIdx) => (
                        <button
                          key={`${w}-${wIdx}`}
                          onClick={() => handleRemoveSentenceWord(act.id, wIdx)}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-english font-bold text-sm rounded-xl shadow-2xs flex items-center gap-1"
                        >
                          <span>{w}</span>
                          <span className="text-xs text-indigo-200">✕</span>
                        </button>
                      ))
                    )}
                  </div>

                  {/* Words to Click */}
                  <div dir="ltr" className="flex flex-row flex-wrap gap-2 mb-3">
                    {sentenceTokens.map((w, wIdx) => {
                      const countInAssembled = (sentenceWords[act.id] || []).filter((x) => x === w).length;
                      const countInCorrect = (act.correctAnswer as string).split(/\s+/).filter((x) => x === w).length;
                      const isUsed = countInAssembled >= countInCorrect;

                      return (
                        <button
                          key={`${w}-${wIdx}`}
                          disabled={isUsed}
                          onClick={() => handleSentenceWordClick(act.id, w, act.correctAnswer as string)}
                          className={`px-3.5 py-2 rounded-xl font-english font-bold text-sm border shadow-2xs transition-all ${
                            isUsed
                              ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed'
                              : 'bg-white hover:bg-indigo-50 border-slate-300 text-slate-800 active:scale-95'
                          }`}
                        >
                          {w}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 4. Matching Pairs */}
              {act.type === 'matching' && act.pairs && (
                <div className="mb-4">
                  <p className="text-xs text-slate-500 font-bold mb-3">
                    اضغط على العنصر في العمود الأول ثم اختر مطابقه في العمود الثاني:
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Left Column */}
                    <div className="space-y-2">
                      {act.pairs.map((p) => {
                        const currentMatches = matchedPairs[act.id] || {};
                        const isMatched = Boolean(currentMatches[p.en]);
                        const isSelected = selectedEn === p.en;

                        return (
                          <button
                            key={p.en}
                            disabled={isMatched}
                            onClick={() => {
                              sounds.playFlip();
                              setSelectedEn(p.en);
                            }}
                            className={`w-full py-2.5 px-3 rounded-xl font-english font-bold text-sm border text-center transition-all ${
                              isMatched
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 line-through opacity-70'
                                : isSelected
                                ? 'bg-indigo-600 text-white border-indigo-700 ring-2 ring-indigo-300'
                                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                            }`}
                          >
                            {p.en} {isMatched ? '✓' : ''}
                          </button>
                        );
                      })}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-2">
                      {act.pairs.map((p) => {
                        const currentMatches = matchedPairs[act.id] || {};
                        const isMatched = Object.values(currentMatches).includes(p.ar);

                        return (
                          <button
                            key={p.ar}
                            disabled={isMatched || !selectedEn}
                            onClick={() => {
                              if (selectedEn) {
                                const pairObj = act.pairs?.find((item) => item.en === selectedEn);
                                if (pairObj && pairObj.ar === p.ar) {
                                  handleMatchPick(act.id, selectedEn, p.ar);
                                  setSelectedEn(null);
                                } else {
                                  sounds.playError();
                                  alert('ليست مطابقة صحيحة، حاول مجدداً!');
                                  setSelectedEn(null);
                                }
                              }
                            }}
                            className={`w-full py-2.5 px-3 rounded-xl font-bold text-sm border text-center transition-all ${
                              isMatched
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 opacity-70'
                                : selectedEn
                                ? 'bg-purple-50 hover:bg-purple-100 border-purple-300 text-purple-900 cursor-pointer'
                                : 'bg-slate-50 border-slate-200 text-slate-400'
                            }`}
                          >
                            {p.ar} {isMatched ? '✓' : ''}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Validation / Action */}
              {act.type !== 'matching' && (
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => checkAnswer(act)}
                    disabled={!answers[act.id]}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold rounded-xl text-sm shadow-xs transition-transform active:scale-95 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>تحقق من الإجابة</span>
                  </button>

                  {isChecked && (
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <span className="flex items-center gap-1.5 text-emerald-600 font-bold text-sm animate-bounce">
                          <CheckCircle2 className="w-5 h-5" />
                          <span>إجابة صحيحة! (+15 نقطة)</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-rose-500 font-bold text-sm">
                          <XCircle className="w-5 h-5" />
                          <span>حاول مجدداً</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Pedagogical Explanation */}
              {isChecked && act.explanationAr && (
                <div className="mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 font-semibold border border-slate-100">
                  💡 {act.explanationAr}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
