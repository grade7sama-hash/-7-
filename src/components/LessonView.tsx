import React, { useState } from 'react';
import { Lesson } from '../types/curriculum';
import {
  BookOpen,
  Lightbulb,
  CheckSquare,
  Gamepad2,
  Mic,
  Award,
  Volume2,
  Music,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { speakText } from '../utils/speech';
import { GrammarView } from './GrammarView';
import { InteractiveActivities } from './InteractiveActivities';
import { InteractiveGame } from './InteractiveGames';
import { SpeakingLab } from './SpeakingLab';
import { LessonQuiz } from './LessonQuiz';
import { PdfReferenceViewer } from './PdfReferenceViewer';

interface Props {
  lesson: Lesson;
  unitColor: string;
  onBackToUnit: () => void;
  onQuizCompleted: (lessonId: string, score: number) => void;
  onEarnPoints: (points: number) => void;
  onRecordSpeakingScore: (score: number) => void;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

type TabType = 'study' | 'grammar' | 'activities' | 'game' | 'speaking' | 'quiz';

export const LessonView: React.FC<Props> = ({
  lesson,
  unitColor,
  onBackToUnit,
  onQuizCompleted,
  onEarnPoints,
  onRecordSpeakingScore,
  onNextLesson,
  onPrevLesson,
  hasNext,
  hasPrev,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('study');
  const [playingSongIdx, setPlayingSongIdx] = useState<number | null>(null);

  // Prepare items for speaking lab from vocabulary and dialogue
  const speakingItems = [
    ...(lesson.dialogue
      ? lesson.dialogue.map((d) => ({
          english: d.text,
          arabic: d.arabic,
          speaker: d.speaker,
        }))
      : []),
    ...lesson.vocabulary.map((v) => ({
      english: v.exampleSentence || v.word,
      arabic: v.exampleArabic || v.arabic,
    })),
  ];

  const handlePlaySong = () => {
    if (!lesson.songLyrics) return;
    const fullSong = lesson.songLyrics.join('. ');
    speakText(fullSong, {
      rate: 0.85,
      pitch: 1.1,
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToUnit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة للوحدة</span>
          </button>
          <div className="h-4 w-px bg-slate-200 hidden sm:block" />
          <span className="text-xs font-bold text-slate-400">
            الوحدة {lesson.unitId} • الدرس {lesson.id}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <PdfReferenceViewer
            initialPage={lesson.pdfPage}
            bookPageNumber={lesson.pageNumber}
          />

          {hasPrev && onPrevLesson && (
            <button
              onClick={onPrevLesson}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
              title="الدرس السابق"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {hasNext && onNextLesson && (
            <button
              onClick={onNextLesson}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
              title="الدرس التالي"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Lesson Header Banner */}
      <div className={`bg-gradient-to-r ${unitColor} p-6 md:p-8 rounded-3xl text-white shadow-md`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
                Lesson {lesson.id} • صفحة {lesson.pageNumber}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black font-english text-white mb-1">
              {lesson.title}
            </h1>
            <p className="text-white/90 text-base md:text-lg font-bold">{lesson.titleAr}</p>
            <p className="text-white/80 text-xs md:text-sm mt-2 max-w-2xl">
              {lesson.descriptionAr}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto bg-white/10 backdrop-blur-md p-2 rounded-2xl">
            <button
              onClick={() => speakText(lesson.title)}
              className="p-3 bg-white text-indigo-700 hover:bg-amber-400 hover:text-slate-900 rounded-xl font-bold transition-all shadow-sm active:scale-95 flex items-center gap-2 text-xs"
            >
              <Volume2 className="w-4 h-4" />
              <span>استمع لعنوان الدرس</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
        <button
          onClick={() => setActiveTab('study')}
          className={`flex items-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'study'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>الدرس والمفردات</span>
        </button>

        <button
          onClick={() => setActiveTab('grammar')}
          className={`flex items-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'grammar'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>شرح القواعد (Grammar)</span>
        </button>

        <button
          onClick={() => setActiveTab('activities')}
          className={`flex items-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'activities'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>الأنشطة والتمارين ({lesson.activities.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('game')}
          className={`flex items-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'game'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>🎮 مركز الألعاب (6 ألعاب)</span>
        </button>

        <button
          onClick={() => setActiveTab('speaking')}
          className={`flex items-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'speaking'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>المحادثة والاستماع 🎙️</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'quiz'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>الاختبار السريع ({lesson.quiz.length})</span>
        </button>
      </div>

      {/* Tab 1: Study & Authentic Dialogue / Song / Vocabulary */}
      {activeTab === 'study' && (
        <div className="space-y-6">
          {/* Song Section if available */}
          {lesson.songLyrics && (
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white rounded-3xl p-6 md:p-8 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">
                    🎵
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">أنشودة الدرس المصاحبة (Song)</h3>
                    <p className="text-white/70 text-xs">استمع للأنشودة وردد مع الكلمات لحفظ التراكيب</p>
                  </div>
                </div>

                <button
                  onClick={handlePlaySong}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm transition-transform active:scale-95"
                >
                  <Music className="w-4 h-4" />
                  <span>تشغيل الأنشودة كاملة</span>
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-2">
                {lesson.songLyrics.map((line, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-1.5 px-3 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <p className="font-english font-bold text-base md:text-lg text-white/95">
                      {line}
                    </p>
                    <button
                      onClick={() => speakText(line)}
                      className="p-1.5 text-white/60 hover:text-white rounded"
                      title="استمع لهذا البيت"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dialogue Section if available */}
          {lesson.dialogue && (
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">
                    حوار الدرس التفاعلي (Interactive Dialogue)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    اضغط على أي جملة للاستماع إلى النطق، أو تدرب على المحادثة في تبويب المحادثة
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {lesson.dialogue.map((line, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs font-english shrink-0 shadow-xs">
                      {line.speaker.slice(0, 2).toUpperCase()}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-indigo-700">
                          {line.speaker} {line.speakerAr ? `(${line.speakerAr})` : ''}
                        </span>
                        <button
                          onClick={() => speakText(line.text)}
                          className="p-1.5 bg-white text-indigo-600 hover:bg-indigo-100 rounded-lg shadow-2xs transition-colors"
                          title="استمع للحوار"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="font-english font-bold text-base md:text-lg text-slate-900">
                        {line.text}
                      </p>
                      <p className="text-xs md:text-sm text-slate-600 font-semibold">{line.arabic}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vocabulary Flashcards Section */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">
                  مفردات وعبارات الدرس (Vocabulary & Key Phrases)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  ({lesson.vocabulary.length} كلمات أساسية) اضغط على أيقونة الصوت للاستماع للنطق الصحيح
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {lesson.vocabulary.map((vocab, vIdx) => (
                <div
                  key={vIdx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="font-english font-extrabold text-base md:text-lg text-slate-900 leading-snug">
                        {vocab.word}
                      </span>
                      <button
                        onClick={() => speakText(vocab.word)}
                        className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl transition-colors shrink-0"
                        title="استمع للكلمة"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs md:text-sm font-bold text-emerald-800 mb-2">
                      {vocab.arabic}
                    </p>
                  </div>

                  {vocab.exampleSentence && (
                    <div className="mt-2 pt-2 border-t border-slate-200/60 text-xs">
                      <p className="font-english text-slate-600 font-semibold italic">
                        "{vocab.exampleSentence}"
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Grammar View */}
      {activeTab === 'grammar' && <GrammarView grammar={lesson.grammar} />}

      {/* Tab 3: Activities */}
      {activeTab === 'activities' && (
        <InteractiveActivities
          activities={lesson.activities}
          onPointsEarned={onEarnPoints}
        />
      )}

      {/* Tab 4: Interactive Games Center */}
      {activeTab === 'game' && (
        <InteractiveGame
          lesson={lesson}
          onCompleted={(pts) => onEarnPoints(pts)}
        />
      )}

      {/* Tab 5: Speaking Lab */}
      {activeTab === 'speaking' && (
        <SpeakingLab
          items={speakingItems}
          lessonTitle={lesson.title}
          onRecordScore={onRecordSpeakingScore}
        />
      )}

      {/* Tab 6: Lesson Quiz */}
      {activeTab === 'quiz' && (
        <LessonQuiz
          questions={lesson.quiz}
          lessonTitle={lesson.title}
          onQuizFinished={(score) => onQuizCompleted(lesson.id, score)}
        />
      )}
    </div>
  );
};
