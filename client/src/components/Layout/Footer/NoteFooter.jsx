import React from "react";

function NoteFooter() {
  return (
    <footer className="w-full py-5 px-6 border-t border-zinc-200 bg-white text-zinc-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-2 rounded-xl">
      <p>&copy; {new Date().getFullYear()} NoteSpace. All rights reserved.</p>

      <div className="flex items-center gap-4">
        {/* Live sync/status indicator */}
        <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
          All changes saved
        </span>

        <span className="text-zinc-300">|</span>

        <a href="#help" className="hover:text-zinc-800 transition-colors">
          Help
        </a>
        <a href="#privacy" className="hover:text-zinc-800 transition-colors">
          Privacy
        </a>
      </div>
    </footer>
  );
}

export default NoteFooter;
