import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../Api/api.js";
import { toast } from "react-toastify";
import { FaRegStar, FaStar } from "react-icons/fa";

function FavoriteNotes() {
  const [starNotes, setStarNotes] = useState([]);
  const navigate = useNavigate();

  const hashFetched = useRef(false);

  async function fetchFavoriteNotes() {
    if (hashFetched.current) return;
    hashFetched.current = true;

    const toastId = toast.loading("Fetching Favorite notes...");

    try {
      const res = await api.get("/note");

      const notes = (res.data.notes || []).reverse();

      // Filter for starred notes (adjust note.star vs note.isStarred to match your backend model)
      const filterStarNote = notes.filter((note) => note.isStarred === true);
      setStarNotes(filterStarNote);

      toast.update(toastId, {
        render: "Favorite notes!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.log(error);

      toast.update(toastId, {
        render: "Please sign in again to see your notes.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });

      navigate("/");
    }
  }

  useEffect(() => {
    fetchFavoriteNotes();
  }, []);

  async function handleStarNote(noteId) {
    try {
      const res = await api.post(`/note/star/${noteId}`);

      //   If they unstar it while on the favorites page, filter it out immediately from state
      setStarNotes((prevNotes) =>
        prevNotes
          .map((note) =>
            note.id === noteId ? { ...note, isStarred: !note.isStarred } : note,
          )
          .filter((note) => note.isStarred === true),
      );

      toast.success(res.data.message || "Note star updated!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update star status.");
    }
  }

  return (
    <section className="w-full min-h-full py-6 px-2 sm:px-6">
      {/* Page Header Section */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-inner">
              ⭐
            </span>
            Starred Notes
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Quickly access and manage your favorite and important notes.
          </p>
        </div>
      </div>

      {starNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-500">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-2xl mb-4 shadow-inner">
            ⭐
          </div>
          <h3 className="text-xl font-semibold text-white tracking-tight">
            No starred notes found
          </h3>
          <p className="text-slate-400 text-sm mt-1 max-w-sm">
            Star your important notes from the main notes list to easily find
            them right here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {starNotes.map((note, index) => (
            <div
              key={note.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className="group relative bg-slate-900/85 backdrop-blur-xl border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between animate-in fade-in zoom-in-95 fill-mode-forwards"
            >
              {/* Subtle top card glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

              <div className="relative z-10 space-y-3">
                <div className="w-full flex items-center justify-between">
                  {/* Styled Category/Type Badge */}
                  {note.type ? (
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/20 shadow-sm">
                      {note.type}
                    </span>
                  ) : (
                    <span></span>
                  )}

                  {/* Star Toggle Button */}
                  <button
                    type="button"
                    onClick={() => handleStarNote(note.id)}
                    className="w-9 h-9 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                    title={note.isStarred ? "Unstar note" : "Star note"}
                  >
                    {note.isStarred ? (
                      <FaStar className="text-amber-400 text-sm drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                    ) : (
                      <FaRegStar className="text-slate-400 hover:text-amber-300 text-sm transition-colors" />
                    )}
                  </button>
                </div>

                <h4 className="text-lg font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors line-clamp-1">
                  {note.noteName}
                </h4>

                <p className="text-slate-300 text-sm leading-relaxed line-clamp-4 wrap-break-word">
                  {note.description}
                </p>
              </div>

              {/* Card Footer / Status */}
              <div className="relative z-10 flex items-center justify-between mt-6 pt-4 border-t border-slate-800/80">
                <span className="text-xs text-amber-400/80 font-medium">
                  ★ Favorite Note
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default FavoriteNotes;
