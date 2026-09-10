import { useState } from "react";
import NoteLeftHeader from "../../components/Layout/Navbar/NoteLeftHeader.jsx";
import NoteTopHeader from "../../components/Layout/Navbar/NoteTopHeader.jsx";
import NoteList from "../../components/NotePage/NoteList.jsx";
import NoteFooter from "../../components/Layout/Footer/NoteFooter.jsx";
import Profile from "../../components/UserView/Profile.jsx";
import StudyTime from "../../components/NotePage/CateGories/StudyTime.jsx";
import FavoritesNotes from "../../components/NotePage/FavoritesNotes.jsx";
import Marketing from "../../components/NotePage/CateGories/Marketing.jsx";
import MovieWatching from "../../components/NotePage/CateGories/MovieWatching.jsx";
import CreateNote from "../../components/NotePage/CreateNote.jsx";

function Notes() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState("all");
  const [viewCreateNot, setViewCreateNote] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-x-hidden selection:bg-teal-500 selection:text-white relative">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Left Sidebar with responsive state management */}
      <NoteLeftHeader
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSelectContent={(content) => {
          setActiveContent(content);
          setIsSidebarOpen(false); // Auto-close drawer on mobile selection
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-72 transition-all duration-300 relative z-10">
        <NoteTopHeader
          onOpenSidebar={() => setIsSidebarOpen(true)}
          clickNewNote={() => setViewCreateNote(true)}
        />

        <main className="flex-1 pt-24 px-4 sm:px-8 pb-12 flex flex-col justify-between">
          {/* Dynamic Content Container with Smooth Fade-In Emotion */}
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 fill-mode-forwards">
            {activeContent === "all" && <NoteList />}
            {activeContent === "favorites" && <FavoritesNotes />}
            {activeContent === "study" && <StudyTime />}
            {activeContent === "Marketing" && <Marketing />}
            {activeContent === "movies" && <MovieWatching />}
            {activeContent === "profile" && <Profile />}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg transform transition-all animate-in zoom-in-95 duration-200">
            <CreateNote onClose={() => setViewCreateNote(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Notes;