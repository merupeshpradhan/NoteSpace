import { FaRegStar, FaStar } from "react-icons/fa";
import {
  FiCalendar,
  FiEdit3,
  FiArrowRight,
  FiBriefcase,
} from "react-icons/fi";

import DeleteNote from "../DeleteNote.jsx";
import UpdateNote from "../UpdateNote.jsx";

function Marketing({
  notes,
  updateNoteView,
  setUpdateNoteView,
  selectedNote,
  setSelectedNote,
  handleStarNote,
  handleDeleteNote,
  handleUpdateSuccess,
}) {
  const marketingNotes = notes.filter(
    (note) => note.type?.toLowerCase() === "marketing-dates",
  );

  const starredCount = marketingNotes.filter(
    (note) => note.isStarred,
  ).length;

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
          {/* Title */}

          <div className="flex items-start gap-4">
            <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-linear-to-br from-teal-400/20 to-cyan-500/5 border border-teal-400/30 flex items-center justify-center shadow-[0_0_35px_rgba(45,212,191,0.08)]">
              <FiBriefcase className="text-teal-400 text-2xl sm:text-3xl" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-teal-400">
                  Marketing
                </span>

                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                Marketing{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-300 to-cyan-400">
                  Notes
                </span>
              </h2>

              <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
                Keep track of campaigns, schedules, important dates, and
                marketing ideas.
              </p>
            </div>
          </div>

          {/* Stats */}

          <div className="flex items-center self-start lg:self-auto rounded-2xl border border-slate-800/80 bg-slate-900/70 backdrop-blur-xl overflow-hidden shadow-xl">
            <div className="px-5 py-4 min-w-28">
              <div className="flex items-center gap-2 text-teal-400 mb-1">
                <FiBriefcase />

                <span className="text-xl font-bold text-white">
                  {marketingNotes.length}
                </span>
              </div>

              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Total Notes
              </p>
            </div>

            <div className="w-px h-10 bg-slate-800" />

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

      {marketingNotes.length === 0 ? (
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl py-24 px-6 text-center shadow-2xl">
            {/* Glow */}

            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-teal-500/10 blur-[90px] rounded-full" />

            <div className="relative">
              <div className="mx-auto w-20 h-20 rounded-3xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shadow-[0_0_40px_rgba(20,184,166,0.08)]">
                <FiBriefcase className="text-teal-400 text-3xl" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white">
                No marketing notes yet
              </h3>

              <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto leading-relaxed">
                You haven't created any notes with the{" "}
                <span className="text-teal-400 font-medium">
                  Marketing
                </span>{" "}
                type yet. Create your first marketing note and start
                organizing your campaigns and schedules.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================
           NOTE GRID
        ========================================================== */

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 max-w-7xl mx-auto">
          {marketingNotes.map((marketing, index) => (
            <article
              key={marketing.id}
              style={{
                animationDelay: `${index * 70}ms`,
              }}
              className="group relative min-w-0 overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/75 backdrop-blur-xl p-5 shadow-xl shadow-black/10 transition-all duration-500 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-500/5 animate-in fade-in slide-in-from-bottom-3 fill-mode-both"
            >
              {/* Card hover glow */}

              <div className="absolute inset-0 bg-linear-to-br from-teal-500/[0.07] via-transparent to-indigo-500/4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Top glow line */}

              <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-teal-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* =================================================
                    CARD TOP
                ================================================== */}

                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Icon */}

                    <div className="shrink-0 w-11 h-11 rounded-xl bg-linear-to-br from-teal-400/15 to-cyan-400/5 border border-teal-400/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <FiBriefcase className="text-teal-400 text-lg" />
                    </div>

                    <div className="min-w-0">
                      {/* Type */}

                      <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-1 rounded-md bg-teal-500/10 text-teal-400 border border-teal-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />

                        {marketing.type}
                      </span>
                    </div>
                  </div>

                  {/* Star */}

                  <button
                    type="button"
                    onClick={() => handleStarNote(marketing.id)}
                    className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 cursor-pointer active:scale-90 ${
                      marketing.isStarred
                        ? "bg-amber-400/10 border-amber-400/20"
                        : "bg-slate-800/60 border-slate-700/60 hover:border-amber-400/30 hover:bg-amber-400/5"
                    }`}
                    title={
                      marketing.isStarred
                        ? "Remove from favorites"
                        : "Star note"
                    }
                  >
                    {marketing.isStarred ? (
                      <FaStar className="text-amber-400 text-base drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] transition-transform duration-300 group-hover:scale-110" />
                    ) : (
                      <FaRegStar className="text-slate-500 text-base hover:text-amber-300 transition-colors" />
                    )}
                  </button>
                </div>

                {/* =================================================
                    TITLE
                ================================================== */}

                <h3 className="mt-5 text-lg font-bold text-white tracking-tight line-clamp-1 group-hover:text-teal-300 transition-colors duration-300">
                  {marketing.noteName}
                </h3>

                {/* =================================================
                    DATE
                ================================================== */}

                {marketing.reminderDate && (
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                    <FiCalendar className="text-teal-500/80" />

                    <span>
                      {new Date(
                        marketing.reminderDate,
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}

                {/* =================================================
                    DESCRIPTION
                ================================================== */}

                <p className="mt-4 text-slate-300 text-sm leading-relaxed line-clamp-2 wrap-break-word min-h-12">
                  <span className="font-semibold text-slate-200">
                    Details:{" "}
                  </span>

                  {marketing.description || "No description available."}
                </p>

                {/* =================================================
                    DIVIDER
                ================================================== */}

                <div className="my-5 h-px bg-linear-to-r from-slate-800 via-slate-700/70 to-transparent" />

                {/* =================================================
                    FOOTER
                ================================================== */}

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] uppercase tracking-wider text-slate-600 font-medium">
                    Marketing Schedule
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Update */}

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedNote(marketing);
                        setUpdateNoteView(true);
                      }}
                      className="group/update inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-indigo-400 bg-indigo-500/5 border border-indigo-500/20 hover:bg-indigo-500 hover:border-indigo-400 hover:text-white transition-all duration-300 cursor-pointer active:scale-95"
                    >
                      <FiEdit3 className="text-sm group-hover/update:rotate-[-8deg] transition-transform" />

                      Update
                    </button>

                    {/* Delete */}

                    <DeleteNote
                      deleteNote={() => handleDeleteNote(marketing.id)}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* =========================================================
          BOTTOM MOTIVATION
      ========================================================== */}

      {marketingNotes.length > 0 && (
        <div className="relative z-10 max-w-7xl mx-auto mt-8">
          <div className="relative overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-900/40 backdrop-blur-xl px-5 py-4">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-teal-400 to-cyan-500" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pl-2">
              <div>
                <p className="text-sm font-semibold text-slate-300">
                  Plan smart. Market better. 🚀
                </p>

                <p className="text-xs text-slate-600 mt-1">
                  Keep your campaigns, schedules, and marketing ideas
                  organized.
                </p>
              </div>

              <div className="flex items-center gap-2 text-teal-400 text-xs font-medium">
                <span>Marketing Progress</span>

                <FiArrowRight />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          UPDATE MODAL
      ========================================================== */}

      {updateNoteView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="absolute inset-0" />

          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform animate-in zoom-in-95 slide-in-from-bottom-3 duration-300">
            <div className="absolute -inset-1 bg-linear-to-r from-teal-500/20 via-cyan-500/10 to-indigo-500/20 rounded-3xl blur-xl" />

            <div className="relative">
              <UpdateNote
                noteData={selectedNote}
                viewUpdateNote={() => setUpdateNoteView(false)}
                onUpdateSuccess={handleUpdateSuccess}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Marketing;