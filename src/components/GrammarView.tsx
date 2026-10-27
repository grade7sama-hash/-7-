import React from 'react';
import { GrammarRule } from '../types/curriculum';
import { Volume2, Lightbulb, BookCheck, AlertCircle } from 'lucide-react';
import { speakText } from '../utils/speech';

interface Props {
  grammar: GrammarRule;
}

export const GrammarView: React.FC<Props> = ({ grammar }) => {
  return (
    <div className="space-y-6">
      {/* Rule Header & Formula Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              قاعدة الدرس النحوية (Grammar Rule)
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black mb-1">{grammar.titleAr}</h2>
          <p className="font-english text-white/90 text-sm md:text-base font-medium mb-4">
            {grammar.title}
          </p>

          {grammar.formula && (
            <div className="bg-slate-900/40 backdrop-blur-md border border-white/20 rounded-2xl p-4 inline-block max-w-full">
              <span className="text-xs text-amber-200 font-bold block mb-1">صيغة القاعدة والتركيب:</span>
              <p className="font-english font-black text-lg md:text-xl text-white tracking-wide">
                {grammar.formula}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Arabic Detailed Explanation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
        <h3 className="font-bold text-slate-800 text-lg mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <span>الشرح المفصل والمبسط للقاعدة</span>
        </h3>
        <p className="text-slate-700 leading-relaxed text-base font-medium">
          {grammar.explanationAr}
        </p>

        {/* Syntax / Conjugation Table if available */}
        {grammar.table && (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse rounded-xl overflow-hidden border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-bold">
                <tr>
                  {grammar.table.headers.map((h, i) => (
                    <th key={i} className="p-3.5 text-center border-b border-slate-200">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {grammar.table.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={`p-3 text-center ${
                          cIdx > 0 ? 'font-english font-semibold text-slate-900' : 'font-bold text-slate-700'
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Illustrative Example Sentences */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
        <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
          <BookCheck className="w-5 h-5 text-emerald-600" />
          <span>أمثلة تطبيقية ونماذج من الكتاب المدرسي</span>
        </h3>

        <div className="space-y-3">
          {grammar.examples.map((eg, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 hover:bg-indigo-50/40 border border-slate-200 transition-colors flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <p className="font-english font-bold text-lg text-slate-900 leading-relaxed">
                  {eg.english}
                </p>
                <p className="text-xs md:text-sm text-slate-600 font-semibold">{eg.arabic}</p>
              </div>

              <button
                onClick={() => speakText(eg.english)}
                className="p-2.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-xl transition-transform active:scale-95 shrink-0"
                title="استمع للمثال"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Helpful Tips / Common Pitfalls */}
      {grammar.tipsAr && grammar.tipsAr.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-xs">
          <h4 className="font-bold text-amber-900 text-base mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <span>تنبيهات هامة وأخطاء شائعة يجب تجنبها:</span>
          </h4>
          <ul className="space-y-2">
            {grammar.tipsAr.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-amber-950 font-semibold">
                <span className="text-amber-600 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
