import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import {
  Download,
  Smartphone,
  Laptop,
  CheckCircle2,
  Share,
  PlusSquare,
  X,
  WifiOff,
  FolderArchive,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Info,
  HelpCircle,
} from 'lucide-react';

interface Props {
  variant?: 'navbar' | 'banner' | 'card';
}

export const PWAInstallButton: React.FC<Props> = ({ variant = 'navbar' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  const handleDirectInstall = async () => {
    if (isInstallable) {
      setIsInstalling(true);
      try {
        const success = await install();
        if (success) {
          setShowOptionsModal(false);
        }
      } finally {
        setIsInstalling(false);
      }
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      setShowOptionsModal(true);
    }
  };

  // If already running inside standalone installed mode
  if (isInstalled) {
    if (variant === 'navbar') {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-[11px] font-bold shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span className="hidden sm:inline">يعمل بدون متصفح</span>
          <span>مثبت ✓</span>
        </div>
      );
    }
    return null;
  }

  return (
    <>
      {/* 1. Navbar Button */}
      {variant === 'navbar' && (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowOptionsModal(true)}
            className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
            title="تثبيت التطبيق مباشرة أو تحميله بدون إنترنت"
          >
            <Download className="w-4 h-4 text-emerald-100 animate-pulse" />
            <span className="hidden sm:inline">تثبيت التطبيق المباشر</span>
            <span className="sm:hidden">تثبيت</span>
          </button>
        </div>
      )}

      {/* 2. Main Overview Card on Home Screen */}
      {variant === 'card' && (
        <div className="bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 rounded-3xl p-6 md:p-8 text-white border-2 border-emerald-500/30 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-emerald-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>تثبيت مباشر وتطبيق مستقل (خارج المتصفح)</span>
              </span>
              <span className="bg-white/15 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <WifiOff className="w-3.5 h-3.5 text-emerald-300" />
                <span>يعمل 100% دون اتصال بالإنترنت</span>
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="text-xl sm:text-2xl font-black text-white mb-2 leading-snug">
                  تثبيت التطبيق مباشرة على هاتفك أو حاسوبك (بدون متصفح)
                </h2>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-4">
                  نظراً للظروف المعيشية وضعف شبكة الإنترنت، يمكنك تثبيت التطبيق ليظهر كأيقونة مستقلة على شاشة الهاتف الرئيسية وقائمة البرامج مثل أي تطبيق أصلي، ويفتح بشاشة كاملة مستقلة تماماً بدون أشرطة المتصفح ويعمل كاملاً بدون نت!
                </p>

                {/* Badges / Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-emerald-100 font-bold">
                  <div className="flex items-center gap-1.5 bg-black/20 p-2 rounded-xl border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>أيقونة خاصة على الشاشة</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/20 p-2 rounded-xl border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>يفتح كنافذة مستقلة كلياً</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/20 p-2 rounded-xl border border-white/10 col-span-2 sm:col-span-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>يشمل كتاب الوزارة PDF</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
                <button
                  onClick={handleDirectInstall}
                  disabled={isInstalling}
                  className="px-6 py-3.5 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black rounded-2xl text-sm flex items-center justify-center gap-2.5 shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                  <Smartphone className="w-5 h-5 text-slate-950" />
                  <span>{isInstalling ? 'جاري التثبيت...' : 'تثبيت مباشر على الجهاز الآن'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href="/downloads/English-Grade7-Yemen-Offline.zip"
                    download="English-Grade7-Yemen-Offline.zip"
                    className="flex-1 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 border border-white/15 transition-colors"
                    title="تحميل حزمة أوفلاين كاملة لنقلها بالبلوتوث أو الفلاش"
                  >
                    <FolderArchive className="w-4 h-4 text-amber-300" />
                    <span>تحميل حزمة (ZIP) أوفلاين</span>
                  </a>

                  <button
                    onClick={() => setShowOptionsModal(true)}
                    className="px-3 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 border border-white/15 transition-colors"
                    title="خيارات إضافية وملف APK"
                  >
                    <HelpCircle className="w-4 h-4 text-emerald-300" />
                    <span>دليل التثبيت</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Background Watermark */}
          <div className="absolute left-[-20px] bottom-[-25px] opacity-10 text-9xl select-none font-english font-black">
            APP
          </div>
        </div>
      )}

      {/* 3. Comprehensive Installation Modal */}
      {showOptionsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 md:p-8 shadow-2xl border border-slate-200 text-slate-800 animate-in zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Download className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900">
                    طرق تثبيت التطبيق المباشر (بدون متصفح)
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    خيارات متعددة لتشغيل التطبيق والتعلم بدون اتصال بالإنترنت
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowOptionsModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {/* Option 1: Direct OS Install (WebAPK) */}
              <div className="p-4 rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/50 relative overflow-hidden">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-600 text-white text-[11px] font-black px-2 py-0.5 rounded-full">
                      الخيار الأسهل والمباشر (موصى به)
                    </span>
                  </div>
                  <Smartphone className="w-5 h-5 text-emerald-600" />
                </div>

                <h4 className="font-black text-sm text-slate-900 mb-1">
                  1. التثبيت المباشر الفوري على شاشة الهاتف أو الحاسوب
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  يقوم نظام أندرويد بتحويل الموقع مباشرة إلى تطبيق أصلي مستقل (WebAPK) بأيقونة خاصة في درج التطبيقات، يفتح بشاشة كاملة دون ظهور أي أشرطة أو أزرار متصفح، ويعمل فوراً بدون نت.
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleDirectInstall}
                    disabled={isInstalling}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isInstalling ? 'جاري استدعاء التثبيت...' : 'اضغط هنا للتثبيت المباشر الآن'}</span>
                  </button>

                  {isIOS && (
                    <button
                      onClick={() => setShowIOSModal(true)}
                      className="px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5"
                    >
                      <span>طريقة آيفون / آيباد</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Option 2: Full Offline ZIP Package (Bluetooth / Flash Drive) */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100/70 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-500 text-slate-950 text-[11px] font-black px-2 py-0.5 rounded-full">
                      للمعلمين ونقل التطبيق أوفلاين
                    </span>
                  </div>
                  <FolderArchive className="w-5 h-5 text-amber-600" />
                </div>

                <h4 className="font-black text-sm text-slate-900 mb-1">
                  2. تحميل حزمة التطبيق المحمولة الكاملة (ملف ZIP أوفلاين 4MB)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  ملف مضغوط شامل لكل الدروس، الألعاب، القواعد، وكتاب الوزارة PDF. يمكن للمعلم تنزيله مرة واحدة ونقله للطلاب عبر <strong>الفلاش ميموري (Flash Drive)</strong> أو <strong>البلوتوث</strong> أو <strong>الشير إت (SHAREit)</strong>، ويعمل على أي كمبيوتر أو هاتف بمجرد فك الضغط وتشغيل الملف.
                </p>

                <a
                  href="/downloads/English-Grade7-Yemen-Offline.zip"
                  download="English-Grade7-Yemen-Offline.zip"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs shadow-sm transition-transform active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل الحزمة الكاملة الآن (4.0 ميجابايت)</span>
                </a>
              </div>

              {/* Option 3: Generate Android APK via PWABuilder */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <span className="bg-indigo-100 text-indigo-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                    ملف APK جاهز للمتجر
                  </span>
                  <ExternalLink className="w-5 h-5 text-indigo-600" />
                </div>

                <h4 className="font-black text-sm text-slate-900 mb-1">
                  3. إنشاء وتحميل ملف APK مخصص لأجهزة أندرويد
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">
                  تم إعداد هذا التطبيق بمعايير PWA الرسمية المتوافقة 100% مع أداة <strong>PWABuilder</strong> من شركة مايكروسوفت، التي تقوم بتحويل رابط التطبيق إلى ملف بصيغة <code>.apk</code> جاهز للتثبيت المباشر على أي هاتف أندرويد.
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <a
                    href="https://www.pwabuilder.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors"
                  >
                    <span>فتح منصة PWABuilder</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-slate-500 text-[11px]">ضع رابط التطبيق ثم اضغط Generate APK</span>
                </div>
              </div>
            </div>

            {/* Note about Teacher Rights */}
            <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-center text-xs text-indigo-900 font-bold">
              🇾🇪 تطبيق اللغة الإنجليزية التفاعلي للصف السابع • إعداد وتصميم الأستاذ: فتحي الواسعي
            </div>
          </div>
        </div>
      )}

      {/* 4. iOS Safari Instructions Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 text-slate-800 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="font-black text-base text-slate-900">
                  تثبيت التطبيق على آيفون / آيباد (iOS)
                </h3>
              </div>
              <button
                onClick={() => setShowIOSModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              لتثبيت التطبيق ليظهر كأيقونة مستقلة على شاشة هاتف الآيفون ويعمل بدون متصفح وبدون إنترنت:
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900 mb-0.5 flex items-center gap-1.5">
                    <span>اضغط على زر المشاركة</span>
                    <Share className="w-3.5 h-3.5 text-blue-600 inline" />
                  </p>
                  <p className="text-slate-500">في أسفل شاشة سفاري (المربع مع سهم للأعلى).</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900 mb-0.5 flex items-center gap-1.5">
                    <span>اختر «إضافة إلى الشاشة الرئيسية»</span>
                    <PlusSquare className="w-3.5 h-3.5 text-emerald-600 inline" />
                  </p>
                  <p className="text-slate-500">(Add to Home Screen) ثم اضغط «إضافة» في الزاوية العلوية.</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-800 font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>سيظهر التطبيق كأيقونة مستقلة فوراً ويفتح بشاشة كاملة بدون شريط سفاري.</span>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              فهمت ذلك، تم التثبيت
            </button>
          </div>
        </div>
      )}
    </>
  );
};
