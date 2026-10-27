import React from 'react';
import { Unit, Lesson, StudentProgress } from '../types/curriculum';
import {
  Clock,
  Tv,
  Home,
  History,
  CheckCircle2,
  ChevronLeft,
  BookOpen,
  Award,
  Sparkles,
} from 'lucide-react';
import { PdfReferenceViewer } from './PdfReferenceViewer';

interface Props {
  units: Unit[];
  selectedUnit: Unit;
  onSelectUnit: (unit: Unit) => void;
  onSelectLesson: (lesson: Lesson) => void;
  progress: StudentProgress;
}

export const UnitOverview: React.FC<Props> = ({
  units,
  selectedUnit,
  onSelectUnit,
  onSelectLesson,
  progress,
}) => {
  const getUnitIcon = (name: string) => {
    switch (name) {
      case 'Clock':
        return <Clock className="w-6 h-6" />;
      case 'Tv':
        return <Tv className="w-6 h-6" />;
      case 'Home':
        return <Home className="w-6 h-6" />;
      case 'History':
        return <History className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Units Selection Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900">
              الوحدات الدراسية (Units 5 - 8)
            </h2>
            <p className="text-xs md:text-sm text-slate-500 mt-0.5">
              منهج اللغة الإنجليزية للصف السابع الأساسي - كتاب التلميذ (Pupil's Book)
            </p>
          </div>
          <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200">
            4 وحدات معتمدة
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {units.map((unit) => {
            const isSelected = unit.id === selectedUnit.id;
            const unitLessonIds = unit.lessons.map((l) => l.id);
            const completedCount = unitLessonIds.filter((id) =>
              progress.completedLessons.includes(id)
            ).length;
            const percent = Math.round((completedCount / unit.lessons.length) * 100);

            return (
              <button
                key={unit.id}
                onClick={() => onSelectUnit(unit)}
                className={`p-5 rounded-3xl text-right transition-all border-2 flex flex-col justify-between relative overflow-hidden shadow-xs hover:shadow-md ${
                  isSelected
                    ? 'border-indigo-600 bg-white ring-4 ring-indigo-100 scale-102'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {/* Top strip */}
                <div className="flex items-start justify-between w-full mb-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm bg-gradient-to-tr ${unit.themeColor}`}
                  >
                    {getUnitIcon(unit.iconName)}
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 font-english bg-slate-100 px-2.5 py-1 rounded-full">
                    ص {unit.pages}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-black text-indigo-600 block mb-0.5">
                    {unit.numberAr}
                  </span>
                  <h3 className="font-black text-base md:text-lg text-slate-900 leading-snug mb-1">
                    {unit.titleAr}
                  </h3>
                  <p className="font-english text-xs text-slate-500 font-semibold mb-3">
                    {unit.title}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full mt-2 pt-2 border-t border-slate-100">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-1">
                    <span>الإنجاز:</span>
                    <span className="font-english text-indigo-600">{percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${unit.themeColor} rounded-full transition-all`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Unit Details & Lessons List */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
                {selectedUnit.numberAr}
              </span>
              <span className="text-xs text-slate-400 font-bold font-english">
                Pages {selectedUnit.pages}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              {selectedUnit.titleAr}
            </h2>
            <p className="font-english text-slate-500 font-bold text-base mt-0.5">
              {selectedUnit.title}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 max-w-md">
            <span className="text-xs font-bold text-slate-500 block mb-1">محور القواعد في الوحدة:</span>
            <p className="text-xs text-slate-700 leading-relaxed font-semibold">
              {selectedUnit.keyGrammarAr}
            </p>
          </div>
        </div>

        {/* Lessons List in this unit */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-base">
              دروس {selectedUnit.numberAr} ({selectedUnit.lessons.length} دروس تفاعلية):
            </h3>
            <span className="text-xs text-slate-500 font-semibold">
              اختر درساً للبدء في القواعد والأنشطة والألعاب والاختبار
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedUnit.lessons.map((lesson) => {
              const isCompleted = progress.completedLessons.includes(lesson.id);
              const quizScore = progress.lessonScores[lesson.id];

              return (
                <div
                  key={lesson.id}
                  onClick={() => onSelectLesson(lesson)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between group hover:shadow-md ${
                    isCompleted
                      ? 'bg-emerald-50/30 border-emerald-200 hover:border-emerald-400'
                      : 'bg-white border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/20'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-english font-bold text-xs shadow-2xs">
                          Lesson {lesson.id}
                        </span>
                        <span className="text-xs font-bold text-slate-400">
                          ص {lesson.pageNumber}
                        </span>
                      </div>

                      {isCompleted ? (
                        <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>مكتمل {quizScore !== undefined ? `(${quizScore}%)` : ''}</span>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                          جديد
                        </span>
                      )}
                    </div>

                    <h4 className="font-english font-extrabold text-base md:text-lg text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                      {lesson.title}
                    </h4>
                    <p className="text-xs md:text-sm font-bold text-slate-700 mt-1">
                      {lesson.titleAr}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {lesson.descriptionAr}
                    </p>
                  </div>

                  {/* Badges strip & Enter button */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="bg-slate-100 px-2 py-0.5 rounded font-bold">
                        {lesson.vocabulary.length} مفردات
                      </span>
                      <span className="bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full font-bold text-[11px] flex items-center gap-1">
                        <span>🎮 6 ألعاب تفاعلية</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-indigo-600 font-bold text-xs group-hover:translate-x-[-4px] transition-transform">
                      <span>ابدأ الدرس</span>
                      <ChevronLeft className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
