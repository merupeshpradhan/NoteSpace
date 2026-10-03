import { useEffect, useState } from "react";
import NoteLeftHeader from "../../components/Layout/Navbar/NoteLeftHeader.jsx";
import NoteTopHeader from "../../components/Layout/Navbar/NoteTopHeader.jsx";
import NoteList from "../../components/NotePage/NoteList.jsx";
import NoteFooter from "../../components/Layout/Footer/NoteFooter.jsx";
import Profile from "../../components/UserView/Profile.jsx";
import StudyTime from "../../components/NotePage/CateGories/StudyTime.jsx";
import FavoritesNotes from "../../components/NotePage/CateGories/FavoriteNotes.jsx";
import Marketing from "../../components/NotePage/CateGories/Marketing.jsx";
import MovieWatching from "../../components/NotePage/CateGories/MovieWatching.jsx";
import CreateNote from "../../components/NotePage/CreateNote.jsx";
import api from "../../Api/api.js";
import { FaStar, FaRegStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewCreateNot, setViewCreateNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [updateNoteView, setUpdateNoteView] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Get the active sidebar item from the URL
  const activeTab =
    currentPath === "/notes"
      ? "all"
      : currentPath === "/notes/favorites"
        ? "favorites"
        : currentPath === "/notes/study"
          ? "study"
          : currentPath === "/notes/marketing"
            ? "marketing"
            : currentPath === "/notes/movies"
              ? "movies"
              : currentPath === "/notes/profile"
                ? "profile"
                : "all";

  async function fetchNote() {
    try {
      const res = await api.get("/note");

      // console.log("All notes: ", res.data.notes);

      setNotes(res.data.notes || []);
    } catch (error) {
      console.log(error);

      toast.error("Please sign in again to see your notes.", {
        autoClose: 3000,
        toastId: "fetch-notes-error",
      });

      navigate("/");
    }
  }

  useEffect(() => {
    fetchNote();
  }, []);

  // console.log(notes);

  const filterNotes = notes.filter((note) =>
    note?.noteName?.toLowerCase().includes(searchText.toLowerCase()),
  );

  async function handleDeleteNote(noteId) {
    setLoading(true);

    try {
      await api.delete(`/note/notedelete/${noteId}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      toast.success("Note deleted successfully!", {
        autoClose: 3000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete note.");
    } finally {
      setLoading(false);
    }
  }

  function handleUpdateSuccess(updatedNote) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note,
      ),
    );
  }

  async function handleStarNote(noteId) {
    try {
      const res = await api.post(`/note/star/${noteId}`);

      // Update state using the 'star' property matching your Prisma schema
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteId ? { ...note, isStarred: !note.isStarred } : note,
        ),
      );

      toast.success(res.data.message || "Note star updated!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update star status.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-x-hidden selection:bg-teal-500 selection:text-white relative">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Left Sidebar with responsive state management */}
      <NoteLeftHeader
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onGoToAllNotes={() => {
          setIsSidebarOpen(false);
          setSearchText("");
        }}
        activeTab={activeTab}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-72 transition-all duration-300 relative z-10">
        <NoteTopHeader
          onOpenSidebar={() => setIsSidebarOpen(true)}
          clickNewNote={() => setViewCreateNote(true)}
          onSelectContent={(content) => {
            setIsSidebarOpen(false); // Auto-close drawer on mobile
          }}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <main className="flex-1 pt-24 px-4 sm:px-8 pb-12 flex flex-col justify-between">
          {/* Dynamic Content Container with Smooth Fade-In Animation */}
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 fill-mode-forwards">
            {searchText === "" ? (
              <>
                {currentPath === "/notes" && (
                  <NoteList notes={notes} setNotes={setNotes} />
                )}
                {currentPath === "/notes/favorites" && <FavoritesNotes />}
                {currentPath === "/notes/study" && (
                  <StudyTime
                    notes={notes}
                    updateNoteView={updateNoteView}
                    setUpdateNoteView={setUpdateNoteView}
                    selectedNote={selectedNote}
                    setSelectedNote={setSelectedNote}
                    handleStarNote={handleStarNote}
                    handleDeleteNote={handleDeleteNote}
                    handleUpdateSuccess={handleUpdateSuccess}
                  />
                )}
                {currentPath === "/notes/marketing" && <Marketing />}
                {currentPath === "/notes/movies" && <MovieWatching />}
                {currentPath === "/notes/profile" && <Profile />}
              </>
            ) : (
              <section className="w-full min-h-full py-6 px-2 sm:px-6">
                {/* Search Header Info */}
                <div className="max-w-7xl mx-auto mb-8">
                  <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shadow-inner">
                      🔍
                    </span>
                    Search Results for "{searchText}"
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    Found {filterNotes.length} matching{" "}
                    {filterNotes.length === 1 ? "note" : "notes"}.
                  </p>
                </div>

                {filterNotes.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-400 text-2xl mb-4 shadow-inner">
                      🔍
                    </div>
                    <h3 className="text-xl font-semibold text-white tracking-tight">
                      No matching notes found
                    </h3>
                    <p className="text-slate-400 text-sm mt-1 max-w-sm">
                      Try searching with a different keyword or check your
                      spelling.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {filterNotes.map((note, index) => (
                      <div
                        key={note.id}
                        style={{ animationDelay: `${index * 50}ms` }}
                        className="group relative bg-slate-900/85 backdrop-blur-xl border border-slate-800 hover:border-teal-500/40 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 flex flex-col justify-between animate-in fade-in zoom-in-95 fill-mode-forwards"
                      >
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                        <div className="relative z-10 space-y-3">
                          <div className="w-full flex items-center justify-between">
                            {note.type ? (
                              <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-teal-500/15 text-teal-400 border border-teal-500/20 shadow-sm">
                                {note.type}
                              </span>
                            ) : (
                              <span></span>
                            )}

                            <div className="w-9 h-9 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center">
                              {note.isStarred ? (
                                <FaStar className="text-amber-400 text-sm drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                              ) : (
                                <FaRegStar className="text-slate-400 text-sm" />
                              )}
                            </div>
                          </div>

                          <h4 className="text-lg font-bold text-white tracking-tight group-hover:text-teal-400 transition-colors line-clamp-1">
                            {note.noteName}
                          </h4>

                          <p className="text-slate-300 text-sm leading-relaxed line-clamp-4 wrap-break-words">
                            {note.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>
        </main>

        <footer className="mt-auto pb-6">
          <div className="border-t border-slate-800/80 pt-6 px-4 sm:px-8">
            <NoteFooter />
          </div>
        </footer>
      </div>

      {/* Create Note Modal with Smooth Backdrop Blur */}
      {viewCreateNot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg transform transition-all animate-in zoom-in-95 duration-200">
            <CreateNote
              onClose={() => setViewCreateNote(false)}
              setNotes={setNotes}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Notes;
