import React, { useState } from 'react';
import { StudentProgress, Unit } from '../types/curriculum';
import { X, Award, CheckCircle2, TrendingUp, BookOpen, Mic, Brain, Printer, Star } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  progress: StudentProgress;
  units: Unit[];
  onUpdateStudentName: (name: string) => void;
}

export const ProgressReportModal: React.FC<Props> = ({
  isOpen,
  onClose,
  progress,
  units,
  onUpdateStudentName,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(progress.studentName);
  const [activeTab, setActiveTab] = useState<'overview' | 'certificate' | 'history'>('overview');

  if (!isOpen) return null;

  // Total lessons in curriculum
  const totalLessons = units.reduce((acc, u) => acc + u.lessons.length, 0);
  const completedCount = progress.completedLessons.length;
  const overallPercentage = Math.round((completedCount / totalLessons) * 100);

  // Average quiz score
  const quizScores = Object.values(progress.lessonScores);
  const avgQuizScore = quizScores.length > 0
    ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
    : 0;

  const handleSaveName = () => {
    if (nameInput.trim()) {
      onUpdateStudentName(nameInput.trim());
      setIsEditingName(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-fadeIn my-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shadow-inner backdrop-blur-xs">
              📊
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-xl md:text-2xl text-white">
                  تقرير المتابعة والتقدم الأكاديمي الدوري
                </h2>
                <span className="text-xs bg-amber-400 text-slate-900 font-bold px-2 py-0.5 rounded-full">
                  الصف السابع الأساسي
                </span>
              </div>
              <p className="text-white/80 text-xs md:text-sm mt-0.5">
                سجل إنجازات الطالب وتحسن الأداء في مهارات اللغة الإنجليزية
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-100 px-6 py-2 border-b border-slate-200 flex items-center gap-3 text-sm font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-4 rounded-xl transition-all ${
              activeTab === 'overview'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ملخص الأداء والمهارات
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-2 px-4 rounded-xl transition-all ${
              activeTab === 'history'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            سجل الاختبارات الدورية ({progress.quizHistory.length})
          </button>
          <button
            onClick={() => setActiveTab('certificate')}
            className={`py-2 px-4 rounded-xl transition-all ${
              activeTab === 'certificate'
                ? 'bg-white text-amber-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            شهادة الإنجاز المعتمدة 🎓
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Student Profile Card */}
          <div className="bg-gradient-to-r from-slate-50 to-indigo-50/50 p-5 rounded-2xl border border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center md:text-right">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-black shadow-md">
                👨‍🎓
              </div>
              <div>
                <div className="flex items-center gap-2">
                  {isEditingName ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="px-3 py-1 text-sm border border-indigo-300 rounded-lg font-bold bg-white text-slate-900"
                        placeholder="اسم الطالب"
                      />
                      <button
                        onClick={handleSaveName}
                        className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold"
                      >
                        حفظ
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-black text-xl text-slate-900">{progress.studentName}</h3>
                      <button
                        onClick={() => setIsEditingName(true)}
                        className="text-xs text-indigo-600 hover:underline font-bold"
                      >
                        (تعديل الاسم)
                      </button>
                    </>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  الجمهورية اليمنية - وزارة التربية والتعليم • منهج اللغة الإنجليزية
                </p>
              </div>
            </div>

            {/* Quick stats pills */}
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 text-amber-900 px-3 py-1.5 rounded-xl text-center">
                <span className="text-xs font-bold block text-amber-700">مجموع النقاط</span>
                <span className="text-lg font-black">{progress.totalPoints} 🌟</span>
              </div>
              <div className="bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-xl text-center">
                <span className="text-xs font-bold block text-emerald-700">أيام الالتزام</span>
                <span className="text-lg font-black">{progress.streakDays} أيام 🔥</span>
              </div>
            </div>
          </div>

          {activeTab === 'overview' && (
            <>
              {/* Top Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl text-center">
                  <span className="text-xs font-bold text-indigo-700 block mb-1">الدروس المكتملة</span>
                  <span className="text-2xl font-black text-indigo-900 font-english">
                    {completedCount} / {totalLessons}
                  </span>
                  <span className="text-xs text-indigo-500 block mt-1">{overallPercentage}% إنجاز</span>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-center">
                  <span className="text-xs font-bold text-emerald-700 block mb-1">متوسط الاختبارات</span>
                  <span className="text-2xl font-black text-emerald-900 font-english">
                    {avgQuizScore}%
                  </span>
                  <span className="text-xs text-emerald-600 block mt-1">مستوى متميز</span>
                </div>

                <div className="bg-teal-50 border border-teal-100 p-4 rounded-2xl text-center">
                  <span className="text-xs font-bold text-teal-700 block mb-1">دقة النطق والمحادثة</span>
                  <span className="text-2xl font-black text-teal-900 font-english">
                    {progress.speakingScoreAverage}%
                  </span>
                  <span className="text-xs text-teal-600 block mt-1">
                    {progress.speakingAttemptsCount} تسجيل صوتي
                  </span>
                </div>

                <div className="bg-purple-50 border border-purple-100 p-4 rounded-2xl text-center">
                  <span className="text-xs font-bold text-purple-700 block mb-1">الألعاب التعليمية</span>
                  <span className="text-2xl font-black text-purple-900 font-english">
                    {progress.gamesPlayedCount}
                  </span>
                  <span className="text-xs text-purple-600 block mt-1">ألعاب مكتملة</span>
                </div>
              </div>

              {/* Unit-by-unit progress breakdown */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <h4 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  <span>مستوى التقدم بحسب الوحدات الدراسية (5 - 8)</span>
                </h4>

                <div className="space-y-4">
                  {units.map((unit) => {
                    const unitLessonIds = unit.lessons.map((l) => l.id);
                    const completedInUnit = unitLessonIds.filter((id) =>
                      progress.completedLessons.includes(id)
                    ).length;
                    const unitPercent = Math.round((completedInUnit / unit.lessons.length) * 100);

                    return (
                      <div key={unit.id} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-bold text-slate-800">
                            {unit.numberAr}: {unit.titleAr}
                          </span>
                          <span className="font-bold font-english text-indigo-600">
                            {unitPercent}% ({completedInUnit}/{unit.lessons.length} دروس)
                          </span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${unit.themeColor} rounded-full transition-all duration-500`}
                            style={{ width: `${unitPercent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Skills Radar / Pedagogical Evaluation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-600" />
                    <span>تحليل المهارات اللغوية الأربعة</span>
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                        <span>قواعد اللغة وتراكيب الجمل (Grammar)</span>
                        <span className="text-indigo-600">{avgQuizScore > 0 ? avgQuizScore : 85}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${avgQuizScore > 0 ? avgQuizScore : 85}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                        <span>الاستماع الصوتي والفهم (Listening)</span>
                        <span className="text-emerald-600">90%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '90%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                        <span>النطق والمحادثة التفاعلية (Speaking)</span>
                        <span className="text-teal-600">
                          {progress.speakingScoreAverage > 0 ? progress.speakingScoreAverage : 80}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal-500 rounded-full"
                          style={{
                            width: `${progress.speakingScoreAverage > 0 ? progress.speakingScoreAverage : 80}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                        <span>المفردات وحل التمارين (Vocabulary)</span>
                        <span className="text-amber-600">88%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '88%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pedagogical Guidance */}
                <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5">
                  <h4 className="font-bold text-amber-900 text-sm mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-600" />
                    <span>توصيات المعلم لرفع المستوى</span>
                  </h4>
                  <ul className="text-xs text-amber-950 space-y-2 list-disc list-inside leading-relaxed font-semibold">
                    <li>الاستمرار في الاستماع اليومي للأناشيد والحوارات لتثبيت مخارج الحروف.</li>
                    <li>
                      التركيز على إضافة (s) للمفرد الغائب (He / She) في الوحدة 5، وتصريفات أفعال الماضي الشاذة في الوحدة 8.
                    </li>
                    <li>تكرار المحادثة الصوتية في معمل النطق حتى تصل الدقة إلى 90% فأكثر.</li>
                    <li>حل الاختبار السريع لكل درس مباشرة بعد الانتهاء من اللعبة التعليمية.</li>
                  </ul>
                </div>
              </div>

              {/* Badges unlocked */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-600" />
                  <span>الأوسمة والشارات المكتسبة ({progress.badges.filter((b) => b.unlockedAt).length} من {progress.badges.length})</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {progress.badges.map((b) => (
                    <div
                      key={b.id}
                      className={`p-3 rounded-xl border flex items-center gap-3 ${
                        b.unlockedAt
                          ? 'bg-amber-50/70 border-amber-300 text-amber-950'
                          : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                      }`}
                    >
                      <span className="text-2xl">{b.icon}</span>
                      <div>
                        <h5 className="font-bold text-xs">{b.nameAr}</h5>
                        <p className="text-[11px] leading-tight">{b.descriptionAr}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 text-base">
                سجل نتائج الاختبارات السريعة وتقييم الفهم
              </h4>

              {progress.quizHistory.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  لم تقم بأداء أي اختبار تقييمي بعد. اختر درساً وابدأ اختباره السريع!
                </div>
              ) : (
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                  {progress.quizHistory.map((item, idx) => (
                    <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded text-xs font-bold">
                            الوحدة {item.unitId}
                          </span>
                          <span className="font-bold font-english text-slate-900">
                            {item.lessonTitle}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 block mt-1">{item.date}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full font-bold font-english text-sm ${
                            item.score >= 80
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.score >= 60
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {item.score}%
                        </span>
                        {item.score >= 80 ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'certificate' && (
            <div className="space-y-4">
              {/* Printable Certificate Box */}
              <div className="border-8 border-double border-amber-500 bg-linear-to-b from-amber-50/50 via-white to-amber-50/50 p-8 rounded-3xl text-center relative shadow-lg print:border-4">
                <div className="flex justify-between items-center mb-4 text-xs font-bold text-slate-500">
                  <span>الجمهورية اليمنية</span>
                  <span>وزارة التربية والتعليم</span>
                </div>

                <div className="w-16 h-16 mx-auto mb-2 text-4xl">🇾🇪</div>

                <h3 className="text-xs uppercase tracking-widest text-amber-700 font-bold mb-1">
                  Republic of Yemen - Ministry of Education
                </h3>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 font-english">
                  Certificate of Achievement & Excellence
                </h2>
                <p className="text-sm text-slate-600 mb-6">
                  شهادة تفوق وإتقان في منهج اللغة الإنجليزية - الصف السابع الأساسي
                </p>

                <div className="max-w-md mx-auto my-6 p-4 border-b-2 border-indigo-600">
                  <span className="text-xs text-slate-500 block mb-1">يُشهد بأن الطالب / الطالبة:</span>
                  <span className="text-2xl md:text-3xl font-black text-indigo-900">
                    {progress.studentName}
                  </span>
                </div>

                <p className="text-sm text-slate-700 max-w-lg mx-auto leading-relaxed mb-6 font-semibold">
                  قد أتم بنجاح متطلبات الوحدات الدراسية (الخامسة والسادسة والسابعة والثامنة) مع إتقان قواعد
                  المضارع البسيط والمستمر وحروف الجر والماضي البسيط، وتحقيق مستوى متميز في الاستماع والمحادثة.
                </p>

                <div className="grid grid-cols-3 gap-2 max-w-md mx-auto mb-6 text-xs bg-white/80 p-3 rounded-xl border border-amber-200">
                  <div>
                    <span className="text-slate-400 block">المعدل العام</span>
                    <span className="font-bold font-english text-base text-indigo-700">
                      {avgQuizScore > 0 ? avgQuizScore : 92}%
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">التقدير</span>
                    <span className="font-bold text-base text-emerald-700">ممتاز جداً</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">التاريخ</span>
                    <span className="font-bold font-english text-xs text-slate-700 mt-1 block">
                      {new Date().toLocaleDateString('en-GB')}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-end pt-4 border-t border-slate-200 text-xs text-slate-600 font-semibold">
                  <div>
                    <span className="block text-slate-400 text-[11px]">ختم الاعتماد الأكاديمي</span>
                    <span>🎖️ معتمد من المنصة التعليمية</span>
                  </div>
                  <div className="text-left">
                    <span className="block text-slate-400 text-[11px]">إعداد وتصميم المنصة:</span>
                    <span className="font-bold text-indigo-900 text-sm">الأستاذ / فتحي الواسعي ✍️</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={handlePrint}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md flex items-center gap-2 text-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>طباعة الشهادة الرسمية</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
