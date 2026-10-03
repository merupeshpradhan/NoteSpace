import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";

import { toast } from "react-toastify";
import api from "../../../Api/api.js";

function StudyTime({
  notes,
  setNotes,
  setUpdateNoteView,
  setSelectedNote,
  handleStarNote,
  handleDeleteNote,
  handleUpdateSuccess,
  setLoading,
}) {
  const studyNote = notes.filter(
    (note) => note.type?.toLowerCase() === "study",
  );

  return (
    <section className="w-full min-h-full px-2 sm:px-6">
      {/* Page Title Header */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shadow-inner">
              📚
            </span>
            Study Notes
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Focused repository for your learning materials and academic
            thoughts.
          </p>
        </div>
      </div>

      {studyNote.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-500">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 text-2xl mb-4 shadow-inner">
            🎓
          </div>
          <h3 className="text-xl font-semibold text-white tracking-tight">
            No study notes found
          </h3>
          <p className="text-slate-400 text-sm mt-1 max-w-sm">
            You haven't created any notes with the "study" type yet. Add one to
            see it listed here!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {studyNote.map((study, index) => (
            <div
              key={study.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className="group relative bg-slate-900/85 backdrop-blur-xl border border-slate-800 hover:border-teal-500/40 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 flex flex-col justify-between animate-in fade-in zoom-in-95 fill-mode-forwards cursor-pointer"
            >
              {/* Subtle top card glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

              <div className="relative z-10 space-y-3">
                {/* Styled Category/Type Badge */}
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-teal-500/15 text-teal-400 border border-teal-500/20 shadow-sm">
                  {study.type}
                </span>

                {/* Star Toggle Button */}
                <button
                  type="button"
                  onClick={() => handleStarNote(study.id)}
                  className="w-9 h-9 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                  title={study.isStarred ? "Unstar note" : "Star note"}
                >
                  {study.isStarred ? (
                    <FaStar className="text-amber-400 text-sm drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                  ) : (
                    <FaRegStar className="text-slate-400 hover:text-amber-300 text-sm transition-colors" />
                  )}
                </button>

                <h4 className="text-lg font-bold text-white tracking-tight group-hover:text-teal-400 transition-colors line-clamp-1">
                  {study.noteName}
                </h4>

                <p className="text-slate-300 text-sm leading-relaxed line-clamp-4 wrap-break-word">
                  {study.description}
                </p>
              </div>

              {/* Bottom accent bar / card footer */}
              <div className="relative z-10 flex items-center justify-between mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-500">
                <span>Study Material</span>
                <span className="text-teal-400/80 group-hover:translate-x-1 transition-transform duration-200">
                  View →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default StudyTime;
