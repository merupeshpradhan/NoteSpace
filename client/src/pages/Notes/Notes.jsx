import { useState } from "react";
import NoteLeftHeader from "../../components/Layout/Navbar/NoteLeftHeader.jsx";
import NoteTopHeader from "../../components/Layout/Navbar/NoteTopHeader.jsx";
import NoteList from "../../components/NotePage/NoteList.jsx";
import NoteFooter from "../../components/Layout/Footer/NoteFooter.jsx";
import Profile from "../../components/UserView/Profile.jsx";

function Notes() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState("all");

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
        <NoteTopHeader onOpenSidebar={() => setIsSidebarOpen(true)} />

        <main className="flex-1 pt-20 px-4 sm:px-8 pb-8 flex flex-col justify-between">
          <div className="space-y-6">
            {/* <NoteList /> */}
            {activeContent === "all" && <NoteList />}
            {activeContent === "profile" && <Profile />}
          </div>
        </main>
        <div className="mt-12">
          <NoteFooter />
        </div>
      </div>
    </div>
  );
}

export default Notes;
