import React, { useState } from 'react';
import { FileText, ExternalLink, BookOpen, ChevronRight, ChevronLeft, Download } from 'lucide-react';

interface Props {
  initialPage?: number;
  bookPageNumber?: number;
}

export const PdfReferenceViewer: React.FC<Props> = ({ initialPage = 1, bookPageNumber = 29 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pdfUrl = '/assets/aistudio/7___________________-______-32-65_df43b53f.pdf';

  return (
    <div className="inline-block">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-colors shadow-2xs"
        title="عرض صفحة الكتاب المدرسي الأصلية"
      >
        <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
        <span>الكتاب المدرسي (ص {bookPageNumber})</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-sm">
                  كتاب اللغة الإنجليزية للصف السابع الأساسي (اليمن) - ص {bookPageNumber}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>فتح في تبويب جديد</span>
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Embedded PDF */}
            <div className="flex-1 bg-slate-800 p-2">
              <iframe
                src={`${pdfUrl}#page=${initialPage}`}
                className="w-full h-full rounded-xl border border-slate-700 bg-white"
                title="Yemen Grade 7 English Textbook PDF"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
