import { FaSearch, FaBell, FaBars } from "react-icons/fa";
import CreateNote from "../../NotePage/CreateNote.jsx";

function NoteTopHeader({ onOpenSidebar }) {
  return (
    <header className="fixed top-0 left-0 md:left-72 right-0 h-16 bg-white border-b border-zinc-200 px-4 sm:px-8 flex items-center justify-between z-30 shadow-xs">
      {/* Left side: Mobile Hamburger & Search */}
      <div className="flex items-center gap-3 w-full max-w-md">
        <button
          onClick={onOpenSidebar}
          className="md:hidden text-zinc-600 hover:text-zinc-900 p-2 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer"
          aria-label="Open Sidebar"
        >
          <FaBars className="text-lg" />
        </button>

        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-400">
            <FaSearch className="text-xs" />
          </span>
          <input
            type="text"
            placeholder="Search notes globally..."
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-100 transition-all"
          />
        </div>
      </div>

      {/* Right side: Notifications & Profile */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Notification Bell */}
        <button className="relative p-2 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer">
          <FaBell className="text-sm" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-lime-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* User Details */}
        <div className="flex items-center gap-3 pl-2 border-l border-zinc-200">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-zinc-800">John Doe</p>
            <p className="text-[10px] text-zinc-400">john@example.com</p>
          </div>
          <div className="w-9 h-9 rounded-full overflow-hidden bg-zinc-100 border border-zinc-200 flex items-center justify-center font-bold text-zinc-700 text-xs">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default NoteTopHeader;
