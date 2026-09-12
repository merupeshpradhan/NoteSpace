import { useEffect, useRef, useState } from "react";
import api from "../../Api/api.js";
import DeleteNote from "./DeleteNote.jsx";
import UpdateNote from "./UpdateNote.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [updateNoteView, setUpdateNoteView] = useState(false);
  const navigate = useNavigate();

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const toastId = toast.loading("Fetching notes...");

    async function fetchNots() {
      try {
        const res = await api.get("/note");
        setNotes((res.data.notes || []).reverse());
      } catch (error) {
        toast.update(toastId, {
          render: "Signin again and access the website",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });

        console.log(error);
        navigate("/");
      }
    }

    fetchNots();
  }, [navigate]);

  async function handleDeleteNote(noteId) {
    setLoading(true);

    try {
      await api.delete(`/note/notedelete/${noteId}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete note.");
    } finally {
      setLoading(false);
    }
  }

  function handleUpdateSuccess(updateNote) {
    setNotes((prevNotes) => [
      updateNote,
      ...prevNotes.filter((note) => note.id !== updateNote.id),
    ]);
  }

  return (
    <section className="w-full min-h-full py-4 px-2 sm:px-6">
      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-500">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 text-2xl mb-4 shadow-inner">
            📝
          </div>
          <h3 className="text-xl font-semibold text-white tracking-tight">No notes found</h3>
          <p className="text-slate-400 text-sm mt-1 max-w-sm">
            Create your first note using the "+ New Note" button above to start organizing your thoughts.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {notes.map((note, index) => (
            <div
              key={note.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className="group relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 hover:border-teal-500/40 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 flex flex-col justify-between animate-in fade-in zoom-in-95 fill-mode-forwards cursor-pointer"
            >
              {/* Subtle top card glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase px-2.5 py-1 rounded-md bg-slate-800/50 border border-slate-700/50">
                    ID: {note.id}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight group-hover:text-teal-400 transition-colors line-clamp-1">
                  {note.noteName}
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed line-clamp-4 break-words">
                  {note.description}
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => {
                    setSelectedNote(note);
                    setUpdateNoteView(true);
                  }}
                  className="px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500 text-indigo-400 hover:text-white text-xs font-semibold rounded-xl border border-indigo-500/20 transition-all duration-200 cursor-pointer active:scale-95"
                >
                  Update
                </button>
                <DeleteNote deleteNote={() => handleDeleteNote(note.id)} />
              </div>
            </div>
          ))}
        </div>
      )}

      {updateNoteView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg transform transition-all animate-in zoom-in-95 duration-200">
            <UpdateNote
              noteData={selectedNote}
              viewUpdateNote={() => setUpdateNoteView(false)}
              onUpdateSuccess={handleUpdateSuccess}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default NoteList;