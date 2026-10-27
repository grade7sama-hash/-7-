import React, { useState } from 'react';
import { QuizQuestion } from '../types/curriculum';
import { Volume2, CheckCircle2, XCircle, RotateCcw, Award, ArrowRight, ArrowLeft } from 'lucide-react';
import { speakText } from '../utils/speech';
import confetti from 'canvas-confetti';

interface Props {
  questions: QuizQuestion[];
  lessonTitle: string;
  onQuizFinished: (scorePercentage: number) => void;
}

export const LessonQuiz: React.FC<Props> = ({ questions, lessonTitle, onQuizFinished }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQ = questions[currentIdx];
  const selectedOption = selectedAnswers[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (showExplanation) return; // Prevent changing after revealing
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIdx]: idx,
    });
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      setShowExplanation(selectedAnswers[currentIdx - 1] !== undefined);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const finishQuiz = () => {
    setIsCompleted(true);
    const score = calculateScore();
    if (score >= 80) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      speakText('Congratulations! You passed the quiz!');
    }
    onQuizFinished(score);
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsCompleted(false);
  };

  if (isCompleted) {
    const finalScore = calculateScore();
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center max-w-xl mx-auto my-4">
        <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl shadow-inner bg-amber-50 border-2 border-amber-200">
          {finalScore >= 80 ? '🏆' : finalScore >= 60 ? '⭐' : '📚'}
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-1">نتيجة الاختبار السريع للدرس</h3>
        <p className="text-slate-500 text-sm mb-6 font-english">{lessonTitle}</p>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-6">
          <div className="text-5xl font-black text-indigo-600 font-english mb-2">
            {finalScore}%
          </div>
          <p className="text-sm font-bold text-slate-700">
            {finalScore === 100
              ? '🎉 درجة ممتازة كاملة! فهم وإتقان مثالي للمنهج!'
              : finalScore >= 80
              ? '🌟 ممتاز جداً! أداء متميز ومستوى فهم عالٍ لقواعد ومفردات الدرس.'
              : finalScore >= 60
              ? '👍 مستوى جيد! تم اجتياز الاختبار، ويُفضّل مراجعة النقاط غير المكتملة.'
              : '📖 يحتاج إلى مراجعة، راجع شرح القواعد والأنشطة ثم أعد الاختبار.'}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
            <Award className="w-4 h-4 text-amber-500" />
            <span>تم تسجيل النتيجة وتحديث تقرير الأداء بنجاح</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={restartQuiz}
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>إعادة الاختبار</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Quiz Top bar */}
      <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-sm font-english">
            Q{currentIdx + 1}
          </span>
          <div>
            <h4 className="font-bold text-white text-base">
              اختبار تقييم الدرس ({currentIdx + 1} من {questions.length})
            </h4>
            <span className="text-xs text-slate-400">حدد الإجابة الصحيحة للتحقق الفوري</span>
          </div>
        </div>

        {/* Progress pills */}
        <div className="flex items-center gap-1.5">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentIdx
                  ? 'bg-amber-400 scale-125'
                  : selectedAnswers[idx] !== undefined
                  ? 'bg-emerald-500'
                  : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* Question Header with Audio */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <span className="text-xs font-bold text-indigo-600 block mb-1">
                السؤال رقم {currentIdx + 1}:
              </span>
              <h3 className="font-english text-xl md:text-2xl font-bold text-slate-900 leading-snug">
                {currentQ.question}
              </h3>
            </div>
            <button
              onClick={() => speakText(currentQ.question)}
              className="p-2.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-xl transition-colors shrink-0"
              title="استمع للسؤال"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
          <p className="text-slate-600 font-semibold text-sm">{currentQ.questionAr}</p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((opt, optIdx) => {
            const isSelected = selectedOption === optIdx;
            const isCorrect = optIdx === currentQ.correctIndex;

            let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
            if (showExplanation) {
              if (isCorrect) {
                btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-300';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-bold ring-2 ring-rose-200';
              }
            } else if (isSelected) {
              btnStyle = 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold';
            }

            return (
              <button
                key={optIdx}
                disabled={showExplanation}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full p-4 rounded-xl border-2 text-right transition-all flex items-center justify-between shadow-xs ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs font-english">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="font-english font-bold text-lg">{opt}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(opt);
                    }}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-md"
                    title="استمع للخيار"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  {showExplanation && (
                    <>
                      {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                      {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Pedagogical Explanation */}
        {showExplanation && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 animate-fadeIn">
            <span className="text-xs font-bold text-amber-800 block mb-1">
              💡 التوضيح التعليمي للإجابة:
            </span>
            <p className="text-sm text-slate-700 leading-relaxed font-semibold">
              {currentQ.explanationAr}
            </p>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="px-4 py-2 text-slate-500 hover:text-slate-800 disabled:opacity-30 font-bold text-sm flex items-center gap-1"
          >
            <ArrowRight className="w-4 h-4" />
            <span>السؤال السابق</span>
          </button>

          <button
            onClick={handleNext}
            disabled={selectedOption === undefined}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-2 text-sm"
          >
            <span>{currentIdx + 1 === questions.length ? 'إنهاء وتصحيح الاختبار' : 'السؤال التالي'}</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
