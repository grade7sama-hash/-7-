import React from 'react';
import { StudentProgress, Unit } from '../types/curriculum';
import { Award, Flame, BarChart2, BookOpen, Sparkles } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface Props {
  progress: StudentProgress;
  units: Unit[];
  currentUnit: Unit;
  onSelectUnit: (unit: Unit) => void;
  onOpenReport: () => void;
  onOpenDailyChallenge?: () => void;
  onGoHome: () => void;
}

export const Navbar: React.FC<Props> = ({
  progress,
  units,
  currentUnit,
  onSelectUnit,
  onOpenReport,
  onOpenDailyChallenge,
  onGoHome,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Logo / Title */}
          <div
            onClick={onGoHome}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Yemen flag accent badge */}
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 via-white to-black p-0.5 shadow-sm flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-lg">
                🇾🇪
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-black text-slate-900 text-base md:text-lg tracking-tight group-hover:text-indigo-600 transition-colors">
                  اللغة الإنجليزية التفاعلية
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  الصف السابع (اليمن)
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded-md">
                  ✍️ تصميم الأستاذ: فتحي الواسعي
                </span>
                <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                  • حفظ الحقوق الفكرية
                </span>
              </div>
            </div>
          </div>

          {/* Center Unit shortcuts (desktop) */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-2xl text-xs font-bold">
            {units.map((u) => (
              <button
                key={u.id}
                onClick={() => onSelectUnit(u)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  u.id === currentUnit.id
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                الوحدة {u.id}
              </button>
            ))}
          </div>

          {/* Student Status & Report Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Streak & Points */}
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-2xl text-xs font-bold">
              <span className="flex items-center gap-1 text-amber-600" title="أيام الالتزام">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>{progress.streakDays}</span>
              </span>
              <div className="w-px h-3 bg-slate-300" />
              <span className="flex items-center gap-1 text-indigo-700" title="مجموع النقاط">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>{progress.totalPoints}</span>
              </span>
            </div>

            {/* PWA Install Button (Works Offline) */}
            <PWAInstallButton variant="navbar" />

            {/* Daily Challenge Action */}
            {onOpenDailyChallenge && (
              <button
                onClick={onOpenDailyChallenge}
                className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 cursor-pointer"
                title="تحدي اليوم اليومي (+30 نقطة)"
              >
                <Flame className="w-4 h-4 text-yellow-200 fill-yellow-200" />
                <span className="hidden sm:inline">تحدي اليوم</span>
                <span className="sm:hidden">التحدي</span>
                <span className="bg-white/20 text-[10px] px-1 rounded-full hidden md:inline">+30</span>
              </button>
            )}

            {/* Periodic Progress Report Button */}
            <button
              onClick={onOpenReport}
              className="px-3.5 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
            >
              <BarChart2 className="w-4 h-4" />
              <span className="hidden sm:inline">تقارير المتابعة والتقدم</span>
              <span className="sm:hidden">التقرير</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
