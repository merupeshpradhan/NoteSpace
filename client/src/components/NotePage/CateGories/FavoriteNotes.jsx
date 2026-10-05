import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../Api/api.js";
import { toast } from "react-toastify";
import {
  FaRegStar,
  FaStar,
  FaBookmark,
  FaFileAlt,
} from "react-icons/fa";

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
    <section className="relative w-full min-h-full px-2 sm:px-4 lg:px-6 overflow-hidden">
      {/* =====================================================
          BACKGROUND GLOW
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-72 h-72 rounded-full bg-amber-500/5 blur-[100px]" />

        <div className="absolute top-1/3 -right-40 w-80 h-80 rounded-full bg-orange-500/5 blur-[120px]" />

        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-yellow-500/5 blur-[110px]" />
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            {/* Title */}

            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="w-11 h-11 sm:w-13 sm:h-13 shrink-0 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.08)]">
                <FaBookmark className="text-lg sm:text-xl" />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-amber-400/70 font-semibold mb-1">
                  Your Collection
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-linear-to-r from-white via-amber-100 to-amber-400 bg-clip-text text-transparent">
                  Favorite Notes
                </h2>

                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  Your important notes, saved in one place.
                </p>
              </div>
            </div>

            {/* =================================================
                STATS
            ================================================== */}

            <div className="w-full sm:w-auto flex items-center gap-3">
              <div className="flex-1 sm:flex-none min-w-28 px-4 py-3 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <FaStar className="text-amber-400 text-sm" />

                  <span className="text-[10px] uppercase tracking-wider text-slate-500">
                    Starred
                  </span>
                </div>

                <p className="text-xl font-bold text-white mt-1">
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
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl py-20 px-5 text-center shadow-xl">
            {/* Background glow */}

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/5 blur-[70px]" />

            <div className="relative">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-2xl shadow-[0_0_30px_rgba(245,158,11,0.08)]">
                <FaRegStar />
              </div>

              <h3 className="text-xl font-semibold text-white mt-5">
                No Favorite Notes
              </h3>

              <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto leading-relaxed">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {starNotes.map((note, index) => (
                <div
                  key={note.id}
                  style={{
                    animationDelay: `${index * 60}ms`,
                  }}
                  className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/75 backdrop-blur-xl p-5 sm:p-6 shadow-xl hover:border-amber-500/40 hover:shadow-[0_20px_50px_-20px_rgba(245,158,11,0.2)] hover:-translate-y-1 transition-all duration-300 animate-in fade-in zoom-in-95 fill-mode-forwards"
                >
                  {/* =================================================
                      TOP HOVER GLOW
                  ================================================== */}

                  <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-400/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute inset-0 bg-linear-to-b from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* =================================================
                      CARD CONTENT
                  ================================================== */}

                  <div className="relative z-10">
                    {/* Top Row */}

                    <div className="flex items-center justify-between gap-3 mb-5">
                      {/* Type */}

                      {note.type ? (
                        <span className="max-w-[70%] truncate text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
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
                        className="shrink-0 w-9 h-9 rounded-xl bg-slate-800/70 border border-slate-700/60 flex items-center justify-center cursor-pointer hover:border-amber-500/50 hover:bg-amber-500/10 transition-all duration-200 active:scale-90"
                        title="Remove from favorites"
                      >
                        <FaStar className="text-amber-400 text-sm drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                      </button>
                    </div>

                    {/* =================================================
                        TITLE
                    ================================================== */}

                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0 w-9 h-9 rounded-xl bg-slate-800/70 border border-slate-700/60 flex items-center justify-center text-amber-400">
                        <FaFileAlt className="text-sm" />
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-base sm:text-lg font-bold text-white tracking-tight line-clamp-2 group-hover:text-amber-400 transition-colors">
                          {note.noteName}
                        </h4>
                      </div>
                    </div>

                    {/* =================================================
                        DESCRIPTION
                    ================================================== */}

                    <div className="mt-5">
                      <p className="text-[10px] uppercase tracking-widest text-slate-600 mb-1">
                        Details
                      </p>

                      <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 wrap-break-word min-h-15">
                        {note.description || "No description available."}
                      </p>
                    </div>

                    {/* =================================================
                        DIVIDER
                    ================================================== */}

                    <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)] shrink-0" />

                        <span className="text-[10px] sm:text-xs text-amber-400/80 font-medium truncate">
                          Favorite Note
                        </span>
                      </div>

                      <span className="text-[9px] uppercase tracking-wider text-slate-600 shrink-0">
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

            <div className="mt-6 sm:mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl px-4 sm:px-5 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-slate-500">
                  <FaStar className="text-amber-400" />
                  <span>
                    You have{" "}
                    <span className="text-amber-400 font-semibold">
                      {totalFavorites}
                    </span>{" "}
                    favorite{" "}
                    {totalFavorites === 1 ? "note" : "notes"}.
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