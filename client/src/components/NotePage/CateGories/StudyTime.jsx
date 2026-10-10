import { useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FiBookOpen, FiCalendar, FiEdit3, FiArrowRight } from "react-icons/fi";

import DeleteNote from "../DeleteNote.jsx";
import UpdateNote from "../Update/UpdateNote.jsx";

function StudyTime({
  notes = [],
  updateNoteView,
  setUpdateNoteView,
  selectedNote,
  setSelectedNote,
  handleStarNote,
  handleDeleteNote,
  handleUpdateSuccess,
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const studyNote = notes.filter(
    (note) => note.type?.toLowerCase() === "study",
  );

  const starredCount = studyNote.filter((note) => note.isStarred).length;

  const openUpdateModal = (study) => {
    setSelectedNote(study);
    setUpdateNoteView(true);
  };

  const closeUpdateModal = () => {
    setUpdateNoteView(false);
  };

  const handleAiUpdateSuccess = async () => {
    if (handleUpdateSuccess) {
      await handleUpdateSuccess();
    }
  };

  return (
    <section className="relative min-h-full w-full px-2 sm:px-4 lg:px-6">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/2 h-96 w-96 rounded-full bg-indigo-500/10 blur-[130px]" />
        <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 mx-auto mb-8 max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-teal-400/30 bg-linear-to-br from-teal-400/20 to-cyan-500/5 shadow-[0_0_35px_rgba(45,212,191,0.08)] sm:h-16 sm:w-16">
              <FiBookOpen className="text-2xl text-teal-400 sm:text-3xl" />
            </div>

            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-400">
                  Knowledge Base
                </span>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-400" />
              </div>

              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Study{" "}
                <span className="bg-linear-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  Notes
                </span>
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
                Your focused repository for learning materials, technical
                concepts, and academic thoughts.
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="flex items-center self-start overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/70 shadow-xl backdrop-blur-xl lg:self-auto">
            <div className="min-w-28 px-5 py-4">
              <div className="mb-1 flex items-center gap-2 text-teal-400">
                <FiBookOpen />
                <span className="text-xl font-bold text-white">
                  {studyNote.length}
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Total Notes
              </p>
            </div>

            <div className="h-10 w-px bg-slate-800" />

            <div className="min-w-28 px-5 py-4">
              <div className="mb-1 flex items-center gap-2 text-amber-400">
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

      {/* Empty state and note grid */}
      {studyNote.length === 0 ? (
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 px-6 py-24 text-center shadow-2xl backdrop-blur-xl">
            <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-teal-500/10 blur-[90px]" />

            <div className="relative">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-teal-500/20 bg-teal-500/10">
                <FiBookOpen className="text-3xl text-teal-400" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white">
                No study notes yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-400">
                No notes with the{" "}
                <span className="font-medium text-teal-400">Study</span> type
                have been created yet. Create your first study note and start
                building your knowledge base.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {studyNote.map((study, index) => (
            <article
              key={study.id}
              style={{ animationDelay: `${index * 70}ms` }}
              className="group relative min-w-0 overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/75 p-5 shadow-xl shadow-black/10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-500/5"
            >
              {/* Card decoration */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-teal-500/[0.07] via-transparent to-indigo-500/4 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="pointer-events-none absolute left-8 right-8 top-0 h-px bg-linear-to-r from-transparent via-teal-400/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                {/* Card top */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal-400/20 bg-linear-to-br from-teal-400/15 to-cyan-400/5 transition-transform duration-300 group-hover:scale-105">
                      <FiBookOpen className="text-lg text-teal-400" />
                    </div>

                    <div className="min-w-0">
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-teal-500/20 bg-teal-500/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-teal-400">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-400" />
                        {study.type}
                      </span>
                    </div>
                  </div>

                  {/* Star button */}
                  <button
                    type="button"
                    onClick={() => handleStarNote(study.id)}
                    title={
                      study.isStarred ? "Remove from favorites" : "Star note"
                    }
                    aria-label={
                      study.isStarred ? "Remove from favorites" : "Star note"
                    }
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 active:scale-90 ${
                      study.isStarred
                        ? "border-amber-400/20 bg-amber-400/10"
                        : "border-slate-700/60 bg-slate-800/60 hover:border-amber-400/30 hover:bg-amber-400/5"
                    }`}
                  >
                    {study.isStarred ? (
                      <FaStar className="text-base text-amber-400" />
                    ) : (
                      <FaRegStar className="text-base text-slate-500 transition-colors hover:text-amber-300" />
                    )}
                  </button>
                </div>

                {/* Note title */}
                <h3 className="mt-5 line-clamp-1 text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-teal-300">
                  {study.noteName || "Untitled note"}
                </h3>

                {/* Date */}
                {study.reminderDate && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <FiCalendar className="text-teal-500/80" />
                    <span>
                      {new Date(study.reminderDate).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </div>
                )}

                {/* Description */}
                <p className="mt-3 min-h-12 line-clamp-2 break-words text-sm leading-relaxed text-slate-300">
                  {study.description || "No description available."}
                </p>

                {/* Divider */}
                <div className="my-5 h-px bg-linear-to-r from-slate-800 via-slate-700/70 to-transparent" />

                {/* Footer */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
                    Study Material
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Update button opens the modal */}
                    <button
                      type="button"
                      onClick={() => openUpdateModal(study)}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-indigo-500/20 bg-indigo-500/5 px-3.5 py-2 text-xs font-semibold text-indigo-400 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-500 hover:text-white active:scale-95"
                    >
                      <FiEdit3 className="text-sm" />
                      Update
                    </button>

                    {/* Delete button */}
                    <DeleteNote deleteNote={() => handleDeleteNote(study.id)} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Bottom motivation */}
      {studyNote.length > 0 && (
        <div className="relative z-10 mx-auto mt-8 max-w-7xl">
          <div className="relative overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-900/40 px-5 py-4 backdrop-blur-xl">
            <div className="absolute bottom-0 left-0 top-0 w-1 bg-linear-to-b from-teal-400 to-cyan-500" />

            <div className="flex flex-col justify-between gap-3 pl-2 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-semibold text-slate-300">
                  Keep learning. Keep growing. 🚀
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  Every note is one step closer to mastering your skills.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-teal-400">
                <span>Study Progress</span>
                <FiArrowRight />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update modal: rendered once, outside the note cards */}
      {updateNoteView && selectedNote && (
        <UpdateNote
          noteData={selectedNote}
          viewUpdateNote={closeUpdateModal}
          onUpdateSuccess={handleAiUpdateSuccess}
        />
      )}
    </section>
  );
}

export default StudyTime;
