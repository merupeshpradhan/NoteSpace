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
    <div className="min-h-screen bg-zinc-50/50 flex">
      {/* Left Sidebar with responsive state management */}
      <NoteLeftHeader
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSelectContent={setActiveContent}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-72">
        <NoteTopHeader
          onOpenSidebar={() => setIsSidebarOpen(true)}
          clickNewNote={() => setViewCreateNote(true)}
        />

        <main className="flex-1 pt-20 px-4 sm:px-8 pb-8 flex flex-col justify-between">
          <div className="space-y-6">
            {/* <NoteList /> */}
            {activeContent === "all" && <NoteList />}
            {activeContent === "favorites" && <FavoritesNotes />}
            {activeContent === "study" && <StudyTime />}
            {activeContent === "Marketing" && <Marketing />}
            {activeContent === "movies" && <MovieWatching />}
            {activeContent === "profile" && <Profile />}
          </div>
        </main>
        <div className="mt-12">
          <NoteFooter />
        </div>
      </div>
      {viewCreateNot && <CreateNote onClose={() => setViewCreateNote(false)} />}
    </div>
  );
}

export default Notes;
