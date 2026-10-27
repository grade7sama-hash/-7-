import React, { useState, useEffect } from 'react';
import { UNITS_DATA } from './data/curriculumData';
import { Unit, Lesson } from './types/curriculum';
import {
  loadStudentProgress,
  saveStudentProgress,
  recordQuizCompletion,
  recordSpeakingPractice,
  recordGamePlayed,
  recordDailyChallenge,
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { UnitOverview } from './components/UnitOverview';
import { LessonView } from './components/LessonView';
import { ProgressReportModal } from './components/ProgressReportModal';
import { DailyChallenge } from './components/DailyChallenge';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { BookOpen, Sparkles, Award, Star, Volume2, Flame } from 'lucide-react';
import { PdfReferenceViewer } from './components/PdfReferenceViewer';

export default function App() {
  const [units] = useState<Unit[]>(UNITS_DATA);
  const [selectedUnit, setSelectedUnit] = useState<Unit>(UNITS_DATA[0]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState(loadStudentProgress);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isDailyChallengeOpen, setIsDailyChallengeOpen] = useState(false);

  const handleCompleteDailyChallenge = (todayStr: string, points: number) => {
    const updated = recordDailyChallenge(progress, todayStr, points);
    setProgress(updated);
  };

  // Sync progress changes
  const handleUpdateStudentName = (name: string) => {
    const updated = { ...progress, studentName: name };
    setProgress(updated);
    saveStudentProgress(updated);
  };

  const handleQuizCompleted = (lessonId: string, score: number) => {
    if (!activeLesson) return;
    const updated = recordQuizCompletion(
      progress,
      lessonId,
      activeLesson.title,
      activeLesson.unitId,
      score
    );
    setProgress(updated);
  };

  const handleEarnPoints = (pts: number) => {
    const updated = recordGamePlayed(progress, pts);
    setProgress(updated);
  };

  const handleRecordSpeakingScore = (score: number) => {
    const updated = recordSpeakingPractice(progress, score);
    setProgress(updated);
  };

  // Find next/prev lesson within current unit or across units
  const allLessons = units.flatMap((u) => u.lessons);
  const currentLessonIndex = activeLesson
    ? allLessons.findIndex((l) => l.id === activeLesson.id)
    : -1;

  const handleNextLesson = () => {
    if (currentLessonIndex >= 0 && currentLessonIndex + 1 < allLessons.length) {
      const nextL = allLessons[currentLessonIndex + 1];
      setActiveLesson(nextL);
      const nextU = units.find((u) => u.id === nextL.unitId);
      if (nextU) setSelectedUnit(nextU);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      const prevL = allLessons[currentLessonIndex - 1];
      setActiveLesson(prevL);
      const prevU = units.find((u) => u.id === prevL.unitId);
      if (prevU) setSelectedUnit(prevU);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Navbar */}
      <Navbar
        progress={progress}
        units={units}
        currentUnit={selectedUnit}
        onSelectUnit={(u) => {
          setSelectedUnit(u);
          setActiveLesson(null);
        }}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenDailyChallenge={() => setIsDailyChallengeOpen(true)}
        onGoHome={() => setActiveLesson(null)}
      />

      {/* Main Content Area */}
      <main className="flex-1 px-4 py-6 md:py-8 max-w-6xl w-full mx-auto">
        {/* Welcome & Curriculum Hero Header (shown when on overview) */}
        {!activeLesson && (
          <>
            <div className="mb-6 bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg">
              <div className="relative z-10 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-amber-400 text-slate-900 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                    منهج الجمهورية اليمنية المعتمد 🇾🇪
                  </span>
                  <span className="bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full">
                    الصف السابع الأساسي
                  </span>
                  <span className="bg-emerald-500/90 text-white font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-xs">
                    <span>👨‍🏫 إعداد وتصميم: الأستاذ فتحي الواسعي</span>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 leading-tight">
                  تطبيق اللغة الإنجليزية التفاعلي - تصميم الأستاذ فتحي الواسعي
                </h1>

                <p className="text-white/85 text-sm md:text-base leading-relaxed mb-6">
                  دروس تفاعلية تفصيلية للوحدات (الخامسة، السادسة، السابعة، والثامنة) تتضمن شرح القواعد
                  المبسط، الأنشطة والتمارين، ألعاب تعليمية مشوقة لكل درس، معمل المحادثة والاستماع بالذكاء الصوتي،
                  واختبارات تقييمية مع تقارير متابعة دورية لمستوى الطالب.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setIsDailyChallengeOpen(true)}
                    className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black rounded-xl text-sm flex items-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
                  >
                    <Flame className="w-4 h-4 text-orange-700 fill-orange-700" />
                    <span>🔥 حل تحدي اليوم (+30 نقطة)</span>
                  </button>

                  <button
                    onClick={() => setIsReportOpen(true)}
                    className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-sm flex items-center gap-2 border border-white/20 transition-transform active:scale-95 cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-amber-300" />
                    <span>تقرير الأداء والشهادة</span>
                  </button>

                  <PdfReferenceViewer initialPage={1} bookPageNumber={29} />
                </div>
              </div>

              {/* Background decorative elements */}
              <div className="absolute left-[-20px] bottom-[-30px] opacity-10 text-9xl select-none font-english font-black">
                YEMEN
              </div>
            </div>

            {/* PWA Offline Installation Card */}
            <div className="mb-6">
              <PWAInstallButton variant="card" />
            </div>

            {/* Daily Challenge Interactive Card Section */}
            <div className="mb-8">
              <DailyChallenge
                progress={progress}
                onCompleteDailyChallenge={handleCompleteDailyChallenge}
                isEmbeddedCard={true}
              />
            </div>
          </>
        )}

        {/* Dynamic View: Lesson View OR Unit Overview */}
        {activeLesson ? (
          <LessonView
            lesson={activeLesson}
            unitColor={selectedUnit.themeColor}
            onBackToUnit={() => setActiveLesson(null)}
            onQuizCompleted={handleQuizCompleted}
            onEarnPoints={handleEarnPoints}
            onRecordSpeakingScore={handleRecordSpeakingScore}
            onNextLesson={handleNextLesson}
            onPrevLesson={handlePrevLesson}
            hasNext={currentLessonIndex < allLessons.length - 1}
            hasPrev={currentLessonIndex > 0}
          />
        ) : (
          <UnitOverview
            units={units}
            selectedUnit={selectedUnit}
            onSelectUnit={(u) => setSelectedUnit(u)}
            onSelectLesson={(lesson) => {
              setActiveLesson(lesson);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            progress={progress}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-semibold text-slate-700">
            تطبيق اللغة الإنجليزية التفاعلي للصف السابع الأساسي (اليمن) • <span className="text-indigo-700 font-bold">إعداد وتصميم الأستاذ: فتحي الواسعي</span> (جميع الحقوق محفوظة)
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsReportOpen(true)}
              className="text-indigo-600 hover:underline font-bold"
            >
              تقرير الطالب
            </button>
            <span>•</span>
            <span className="font-english">Designed by Teacher Fathi Al-Wasei</span>
          </div>
        </div>
      </footer>

      {/* Periodic Progress Report Modal */}
      <ProgressReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        progress={progress}
        units={units}
        onUpdateStudentName={handleUpdateStudentName}
      />

      {/* Daily Challenge Modal */}
      <DailyChallenge
        progress={progress}
        onCompleteDailyChallenge={handleCompleteDailyChallenge}
        isOpenModal={isDailyChallengeOpen}
        onCloseModal={() => setIsDailyChallengeOpen(false)}
      />

      {/* Global Offline Status Indicator */}
      <OfflineIndicator />
    </div>
  );
}
