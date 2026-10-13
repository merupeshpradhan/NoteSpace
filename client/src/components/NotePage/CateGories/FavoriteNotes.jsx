import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../Api/api.js";
import { toast } from "react-toastify";
import {
  FaRegStar,
  FaStar,
  FaBookmark,
} from "react-icons/fa";
import {
  FiFileText,
  FiAlignLeft,
  FiCalendar,
} from "react-icons/fi";

function FavoriteNotes() {
  const [starNotes, setStarNotes] = useState([]);
  const navigate = useNavigate();

  const hashFetched = useRef(false);

  async function fetchFavoriteNotes() {
    if (hashFetched.current) return;
    hashFetched.current = true;

    try {
      const res = await api.get("/note");

      const notes = (res.data.notes || []).reverse();

      const filterStarNote = notes.filter(
        (note) => note.isStarred === true,
      );

      setStarNotes(filterStarNote);
    } catch (error) {
      console.log(error);

      toast.error("Please sign in again to see your notes.", {
        autoClose: 3000,
      });

      navigate("/");
    }
  }

  useEffect(() => {
    fetchFavoriteNotes();
  }, []);

  // Start this page from the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function handleStarNote(noteId) {
    try {
      const res = await api.post(`/note/star/${noteId}`);

      setStarNotes((prevNotes) =>
        prevNotes
          .map((note) =>
            note.id === noteId
              ? { ...note, isStarred: !note.isStarred }
              : note,
          )
          .filter((note) => note.isStarred === true),
      );

      toast.success(res.data.message || "Note star updated!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update star status.");
    }
  }

  const totalFavorites = starNotes.length;

  return (
    <section className="relative min-h-full w-full overflow-hidden px-2 sm:px-4 lg:px-6 cursor-default">
      {/* =====================================================
         BACKGROUND GLOW
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-amber-500/5 blur-[100px]" />

        <div className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-orange-500/5 blur-[120px]" />

        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-yellow-500/5 blur-[110px]" />
      </div>

      {/* =====================================================
         MAIN CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Title */}

            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.08)] sm:h-13 sm:w-13">
                <FaBookmark className="text-lg sm:text-xl" />
              </div>

              <div className="min-w-0">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-400/70 sm:text-xs">
                  Your Collection
                </p>

                <h2 className="bg-linear-to-r from-white via-amber-100 to-amber-400 bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
                  Favorite Notes
                </h2>

                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  Your important notes, saved in one place.
                </p>
              </div>
            </div>

            {/* =================================================
                STATS
            ================================================== */}

            <div className="flex w-full items-center gap-3 sm:w-auto">
              <div className="min-w-28 flex-1 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 backdrop-blur-xl sm:flex-none">
                <div className="flex items-center gap-2">
                  <FaStar className="text-sm text-amber-400" />

                  <span className="text-[10px] uppercase tracking-wider text-slate-500">
                    Starred
                  </span>
                </div>

                <p className="mt-1 text-xl font-bold text-white">
                  {totalFavorites}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            EMPTY STATE
        ==================================================== */}

        {starNotes.length === 0 ? (
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 px-5 py-20 text-center shadow-xl backdrop-blur-xl">
            {/* Background glow */}

            <div className="absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 bg-amber-500/5 blur-[70px]" />

            <div className="relative">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-2xl text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.08)]">
                <FaRegStar />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-white">
                No Favorite Notes
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-400">
                You haven't starred any notes yet. Star your important notes
                and they will appear here for quick access.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 text-xs text-amber-400/70">
                <FaStar />
                <span>Your starred notes will appear here</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* =================================================
                NOTE GRID
            ================================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {starNotes.map((note, index) => (
                <div
                  key={note.id}
                  style={{
                    animationDelay: `${index * 60}ms`,
                  }}
                  className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/75 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-[0_20px_50px_-20px_rgba(245,158,11,0.2)] sm:p-6 animate-in fade-in zoom-in-95 fill-mode-forwards"
                >
                  {/* =================================================
                      TOP HOVER GLOW
                  ================================================== */}

                  <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-400/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-amber-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* =================================================
                      CARD CONTENT
                  ================================================== */}

                  <div className="relative z-10">
                    {/* Top Row */}

                    <div className="mb-5 flex items-center justify-between gap-3">
                      {/* Type */}

                      {note.type ? (
                        <span className="max-w-[70%] truncate rounded-lg border border-amber-500/20 bg-amber-500/10 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider text-amber-400 sm:text-[10px]">
                          {note.type}
                        </span>
                      ) : (
                        <span className="text-[9px] uppercase tracking-wider text-slate-600">
                          NOTE
                        </span>
                      )}

                      {/* Star */}

                      <button
                        type="button"
                        onClick={() => handleStarNote(note.id)}
                        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-700/60 bg-slate-800/70 transition-all duration-200 hover:border-amber-500/50 hover:bg-amber-500/10 active:scale-90"
                        title="Remove from favorites"
                      >
                        <FaStar className="text-sm text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                      </button>
                    </div>

                    {/* =================================================
                        TITLE WITH ICON
                    ================================================== */}

                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-amber-500/25 bg-amber-500/10 text-amber-400">
                        <FiFileText className="text-sm" />
                      </div>

                      <div className="min-w-0">
                        <h4 className="line-clamp-2 text-base font-bold tracking-tight text-white transition-colors group-hover:text-amber-400 sm:text-lg">
                          {note.noteName || "Untitled note"}
                        </h4>
                      </div>
                    </div>

                    {/* =================================================
                        REMINDER DATE WITH ICON
                    ================================================== */}

                    <div className="mt-3 flex items-center gap-2.5 text-xs text-slate-400">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-amber-500/25 bg-amber-500/10 text-amber-400">
                        <FiCalendar className="text-sm" />
                      </div>
                      {note.reminderDate ? (
                        <span className="inline-flex items-center rounded-md bg-slate-800/80 px-2.5 py-1 font-medium text-slate-200 ring-1 ring-inset ring-slate-700/50">
                          {new Date(note.reminderDate).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </span>
                      ) : (
                        <span className="italic text-slate-500">No date set</span>
                      )}
                    </div>

                    {/* =================================================
                        DESCRIPTION WITH ICON
                    ================================================== */}

                    <div className="mt-3 flex items-start gap-2.5">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-700/50 bg-slate-800/80 text-slate-400">
                        <FiAlignLeft className="text-sm" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="min-h-15 line-clamp-3 text-sm leading-relaxed text-slate-300 wrap-break-word">
                          {note.description || "No description available."}
                        </p>
                      </div>
                    </div>

                    {/* =================================================
                        DIVIDER
                    ================================================== */}

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]" />

                        <span className="truncate text-[10px] font-medium text-amber-400/80 sm:text-xs">
                          Favorite Note
                        </span>
                      </div>

                      <span className="shrink-0 text-[9px] uppercase tracking-wider text-slate-600">
                        Saved
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* =================================================
                BOTTOM INFO
            ================================================== */}

            <div className="mt-6 sm:mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 px-4 py-4 backdrop-blur-xl sm:px-5">
              <div className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                  <FaStar className="text-amber-400" />
                  <span>
                    You have{" "}
                    <span className="font-semibold text-amber-400">
                      {totalFavorites}
                    </span>{" "}
                    favorite {totalFavorites === 1 ? "note" : "notes"}.
                  </span>
                </div>

                <span className="text-slate-600">
                  Click the star to remove a note from favorites.
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default FavoriteNotes;