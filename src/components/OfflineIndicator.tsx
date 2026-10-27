import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <aside aria-label="حالة الاتصال" className="fixed bottom-4 left-4 z-50 max-w-sm bg-gradient-to-r from-emerald-700 to-teal-800 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-emerald-400/40 flex items-center gap-3 animate-bounce">
      <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
        <WifiOff className="w-4 h-4 text-emerald-200" />
      </div>
      <div className="text-xs">
        <p className="font-bold flex items-center gap-1.5">
          <span>وضع عدم الاتصال (بدون إنترنت)</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
        </p>
        <p className="text-[11px] text-emerald-100 font-medium">
          جميع الدروس، الألعاب، والاختبارات تعمل 100% دون استهلاك باقة الإنترنت!
        </p>
      </div>
    </aside>
  );
};
