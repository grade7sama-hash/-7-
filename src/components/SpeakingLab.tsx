import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, Award, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { speakText, stopSpeaking, calculateSpeakingScore, SpeechRecognizer } from '../utils/speech';
import confetti from 'canvas-confetti';

interface SpeakingPracticeItem {
  english: string;
  arabic: string;
  speaker?: string;
}

interface Props {
  items: SpeakingPracticeItem[];
  lessonTitle: string;
  onRecordScore?: (score: number) => void;
}

export const SpeakingLab: React.FC<Props> = ({ items, lessonTitle, onRecordScore }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingTarget, setIsSpeakingTarget] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.85); // slower for learners
  const [isSupported, setIsSupported] = useState(true);

  const recognizerRef = useRef<SpeechRecognizer | null>(null);

  useEffect(() => {
    const rec = new SpeechRecognizer();
    recognizerRef.current = rec;
    setIsSupported(rec.isSupported);

    return () => {
      rec.stop();
      stopSpeaking();
    };
  }, []);

  const currentItem = items[selectedIdx] || items[0];

  const handleListen = () => {
    if (!currentItem) return;
    setIsSpeakingTarget(true);
    speakText(currentItem.english, {
      rate: speechSpeed,
      onEnd: () => setIsSpeakingTarget(false),
      onError: () => setIsSpeakingTarget(false),
    });
  };

  const startRecording = () => {
    if (!recognizerRef.current || !recognizerRef.current.isSupported) {
      alert('ميزة التعرف على الصوت غير مدعومة في هذا المتصفح. يمكنك استخدام الاستماع الصوتي.');
      return;
    }

    setTranscript('');
    setScore(null);
    setIsListening(true);

    recognizerRef.current.start(
      (text, isFinal) => {
        setTranscript(text);
        if (isFinal) {
          setIsListening(false);
          evaluateSpeech(text);
        }
      },
      (error) => {
        console.warn('Speech recognition error', error);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const stopRecording = () => {
    if (recognizerRef.current) {
      recognizerRef.current.stop();
      setIsListening(false);
    }
  };

  const evaluateSpeech = (spoken: string) => {
    if (!currentItem) return;
    const finalScore = calculateSpeakingScore(spoken, currentItem.english);
    setScore(finalScore);

    if (finalScore >= 80) {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 },
      });
      speakText('Excellent pronunciation!');
    } else if (finalScore >= 60) {
      speakText('Good try!');
    } else {
      speakText('Listen again and practice.');
    }

    onRecordScore?.(finalScore);
  };

  // Split words for comparison highlight
  const targetWords = currentItem ? currentItem.english.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/) : [];
  const spokenWords = transcript.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-5 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shadow-inner backdrop-blur-xs">
              🎙️
            </div>
            <div>
              <h3 className="font-bold text-lg md:text-xl text-white">
                معمل المحادثة والاستماع (Listening & Speaking Lab)
              </h3>
              <p className="text-white/85 text-xs md:text-sm mt-0.5">
                استمع للنطق الإنجليزي الصحيح وسجّل صوتك لتحديد دقة نطقك وفهمك!
              </p>
            </div>
          </div>

          {/* Speed control */}
          <div className="flex items-center gap-2 bg-white/15 px-3 py-1.5 rounded-xl text-xs backdrop-blur-md self-start md:self-auto">
            <span className="text-white/80">سرعة القراءة:</span>
            <button
              onClick={() => setSpeechSpeed(0.75)}
              className={`px-2 py-0.5 rounded font-bold transition-colors ${
                speechSpeed === 0.75 ? 'bg-white text-emerald-800' : 'text-white hover:bg-white/10'
              }`}
            >
              بطيء (0.75x)
            </button>
            <button
              onClick={() => setSpeechSpeed(0.95)}
              className={`px-2 py-0.5 rounded font-bold transition-colors ${
                speechSpeed === 0.95 ? 'bg-white text-emerald-800' : 'text-white hover:bg-white/10'
              }`}
            >
              عادي (1.0x)
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Phrases selector pills */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-500 mb-2">
            اختر العبارة للتدريب الصوتي ({selectedIdx + 1} من {items.length}):
          </label>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedIdx(idx);
                  setScore(null);
                  setTranscript('');
                }}
                className={`px-3 py-2 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all border ${
                  selectedIdx === idx
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm scale-102'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {item.speaker ? `${item.speaker}: ` : ''}
                {item.english.length > 28 ? `${item.english.slice(0, 28)}...` : item.english}
              </button>
            ))}
          </div>
        </div>

        {/* Current Active Target Card */}
        <div className="bg-slate-50 border-2 border-emerald-100 rounded-2xl p-6 text-center mb-6 relative">
          {currentItem.speaker && (
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold mb-3">
              المتحدث: {currentItem.speaker}
            </span>
          )}

          <div className="my-2">
            <h2 className="text-2xl md:text-3xl font-extrabold font-english text-slate-900 tracking-wide leading-relaxed">
              {currentItem.english}
            </h2>
            <p className="text-base text-slate-600 font-semibold mt-2">{currentItem.arabic}</p>
          </div>

          {/* Action buttons: Listen & Speak */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <button
              onClick={handleListen}
              className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95 ${
                isSpeakingTarget
                  ? 'bg-amber-500 text-white ring-4 ring-amber-200 animate-pulse'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <Volume2 className="w-5 h-5" />
              <span>{isSpeakingTarget ? 'جارٍ الاستماع...' : 'استمع للنطق النموذجي'}</span>
            </button>

            {isSupported ? (
              <button
                onClick={isListening ? stopRecording : startRecording}
                className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95 ${
                  isListening
                    ? 'bg-rose-600 text-white ring-4 ring-rose-200 animate-pulse'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-5 h-5" />
                    <span>جارٍ الاستماع إليك... اضغط للإيقاف</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    <span>تحدث بصوتك (سجل الآن)</span>
                  </>
                )}
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>التعرف على الصوت يتطلب متصفح حديث، يمكنك الاستماع بالأعلى</span>
              </div>
            )}
          </div>
        </div>

        {/* Live speech feedback & Score */}
        {(transcript || isListening || score !== null) && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <span className="text-xs font-bold text-slate-500">صوتك الملتقط:</span>
              {score !== null && (
                <div
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-sm ${
                    score >= 80
                      ? 'bg-emerald-100 text-emerald-800'
                      : score >= 60
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>دقة النطق: {score}%</span>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-50 rounded-xl mb-3">
              <p className="font-english text-lg text-slate-800 font-medium">
                {transcript ? (
                  transcript
                ) : isListening ? (
                  <span className="text-slate-400 italic">تحدث الآن بوضوح في الميكروفون...</span>
                ) : (
                  <span className="text-slate-400 italic">لم يتم التقاط صوت</span>
                )}
              </p>
            </div>

            {/* Word by word diagnostic */}
            {score !== null && (
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-600 block mb-2">
                  تحليل الكلمات المنطوقة:
                </span>
                <div className="flex flex-wrap gap-2">
                  {targetWords.map((word, wIdx) => {
                    const isMatched = spokenWords.includes(word);
                    return (
                      <span
                        key={wIdx}
                        className={`px-2.5 py-1 rounded-lg text-sm font-english font-bold flex items-center gap-1 ${
                          isMatched
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {isMatched ? <CheckCircle className="w-3.5 h-3.5" /> : null}
                        {word}
                      </span>
                    );
                  })}
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  {score >= 80
                    ? '🎉 نطق ممتاز وواضح جداً! واصل هذا التألق!'
                    : score >= 60
                    ? '👍 نطق جيد وقريب جداً، استمع مرة أخرى وركّز على مخارج الحروف المتبقية.'
                    : '💡 استمع إلى النطق النموذجي مجدداً بضغطة زر، ثم كرر المحاولة بصوت أعلى.'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
