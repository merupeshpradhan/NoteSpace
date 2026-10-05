import { useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FiBookOpen, FiFileText, FiArrowRight } from "react-icons/fi";

function NoteList({ notes, handleStarNote }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const starredCount = notes.filter((note) => note.isStarred).length;

  return (
    <section className="relative w-full min-h-full px-2 sm:px-4 lg:px-6">
      {/* =========================================================
          BACKGROUND DECORATION
      ========================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-teal-500/10 blur-[120px]" />

        <div className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-[130px]" />

        <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      {/* =========================================================
          HEADER
      ========================================================== */}

      <div className="relative z-10 max-w-7xl mx-auto mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          {/* Page Title */}

          <div className="flex items-start gap-4">
            {/* Icon */}

            <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-linear-to-br from-teal-400/20 to-cyan-500/5 border border-teal-400/30 flex items-center justify-center shadow-[0_0_35px_rgba(45,212,191,0.08)]">
              <FiBookOpen className="text-teal-400 text-2xl sm:text-3xl" />
            </div>

            {/* Text */}

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-teal-400">
                  Your Workspace
                </span>

                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                All{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-300 to-cyan-400">
                  Notes
                </span>
              </h2>

              <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
                View all your notes, keep your ideas organized, and star the
                notes that matter most.
              </p>
            </div>
          </div>

          {/* =====================================================
              STATS
          ====================================================== */}

          <div className="flex items-center self-start lg:self-auto rounded-2xl border border-slate-800/80 bg-slate-900/70 backdrop-blur-xl overflow-hidden shadow-xl">
            {/* Total Notes */}

            <div className="px-5 py-4 min-w-28">
              <div className="flex items-center gap-2 text-teal-400 mb-1">
                <FiFileText />

                <span className="text-xl font-bold text-white">
                  {notes.length}
                </span>
              </div>

              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Total Notes
              </p>
            </div>

            {/* Divider */}

            <div className="w-px h-10 bg-slate-800" />

            {/* Starred Notes */}

            <div className="px-5 py-4 min-w-28">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <FaStar />

                <span className="text-xl font-bold text-white">
                  {starredCount}
                </span>
              </div>

              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Starred
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          EMPTY STATE
      ========================================================== */}

      {notes.length === 0 ? (
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl py-24 px-6 text-center shadow-2xl">
            {/* Glow */}

            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-teal-500/10 blur-[90px] rounded-full" />

            <div className="relative">
              {/* Icon */}

              <div className="mx-auto w-20 h-20 rounded-3xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shadow-[0_0_40px_rgba(20,184,166,0.08)]">
                <FiBookOpen className="text-teal-400 text-3xl" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white">
                No notes yet
              </h3>

              <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto leading-relaxed">
                You haven't created any notes yet. Create your first note using
                the{" "}
                <span className="text-teal-400 font-medium">+ New Note</span>{" "}
                button to start organizing your thoughts.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================
           NOTE GRID
        ========================================================== */

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 max-w-7xl mx-auto">
          {notes.map((note, index) => (
            <article
              key={note.id}
              style={{
                animationDelay: `${index * 70}ms`,
              }}
              className="group relative min-w-0 overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/75 backdrop-blur-xl p-5 shadow-xl shadow-black/10 transition-all duration-500 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-500/5 animate-in fade-in slide-in-from-bottom-3 fill-mode-both"
            >
              {/* =================================================
                  CARD HOVER GLOW
              ================================================== */}

              <div className="absolute inset-0 bg-linear-to-br from-teal-500/[0.07] via-transparent to-indigo-500/4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* =================================================
                  TOP GLOW LINE
              ================================================== */}

              <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-teal-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* =================================================
                    CARD HEADER
                ================================================== */}

                <div className="flex items-start justify-between gap-3">
                  {/* Left */}

                  <div className="flex items-center gap-3 min-w-0">
                    {/* Note Icon */}

                    <div className="shrink-0 w-11 h-11 rounded-xl bg-linear-to-br from-teal-400/15 to-cyan-400/5 border border-teal-400/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <FiFileText className="text-teal-400 text-lg" />
                    </div>

                    {/* Type */}

                    <div className="min-w-0">
                      {note.type ? (
                        <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-1 rounded-md bg-teal-500/10 text-teal-400 border border-teal-500/20 max-w-full">
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-teal-400 animate-pulse" />

                          <span className="truncate">{note.type}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-1 rounded-md bg-slate-800/60 text-slate-500 border border-slate-700/50">
                          General Note
                        </span>
                      )}
                    </div>
                  </div>

                  {/* =================================================
                      STAR BUTTON
                  ================================================== */}

                  <button
                    type="button"
                    onClick={() => handleStarNote(note.id)}
                    className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 cursor-pointer active:scale-90 ${
                      note.isStarred
                        ? "bg-amber-400/10 border-amber-400/20"
                        : "bg-slate-800/60 border-slate-700/60 hover:border-amber-400/30 hover:bg-amber-400/5"
                    }`}
                    title={
                      note.isStarred ? "Remove from favorites" : "Star note"
                    }
                  >
                    {note.isStarred ? (
                      <FaStar className="text-amber-400 text-base drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] transition-transform duration-300 group-hover:scale-110" />
                    ) : (
                      <FaRegStar className="text-slate-500 text-base hover:text-amber-300 transition-colors" />
                    )}
                  </button>
                </div>

                {/* =================================================
                    NOTE TITLE
                ================================================== */}

                <h3 className="mt-5 text-lg font-bold text-white tracking-tight line-clamp-1 group-hover:text-teal-300 transition-colors duration-300">
                  {note.noteName}
                </h3>

                {/* =================================================
                    NOTE DESCRIPTION
                ================================================== */}

                <div className="mt-4 min-h-18">
                  <p className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold mb-1">
                    Details
                  </p>

                  <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 wrap-break-word">
                    {note.description || "No description available."}
                  </p>
                </div>

                {/* =================================================
                    DIVIDER
                ================================================== */}

                <div className="my-5 h-px bg-linear-to-r from-slate-800 via-slate-700/70 to-transparent" />

                {/* =================================================
                    READ ONLY FOOTER
                ================================================== */}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-400/70" />

                    <span className="text-[10px] uppercase tracking-wider text-slate-600 font-medium">
                      Note Details
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-teal-400 text-xs font-medium">
                    <span>View</span>

                    <FiArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* =========================================================
          BOTTOM INFORMATION
      ========================================================== */}

      {notes.length > 0 && (
        <div className="relative z-10 max-w-7xl mx-auto mt-8">
          <div className="relative overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-900/40 backdrop-blur-xl px-5 py-4">
            {/* Left Accent */}

            <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-teal-400 to-cyan-500" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pl-2">
              <div>
                <p className="text-sm font-semibold text-slate-300">
                  Your thoughts, organized. 📝
                </p>

                <p className="text-xs text-slate-600 mt-1">
                  Star important notes to quickly find them later.
                </p>
              </div>

              <div className="flex items-center gap-2 text-teal-400 text-xs font-medium">
                <span>Notes Workspace</span>

                <FiArrowRight />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default NoteList;
