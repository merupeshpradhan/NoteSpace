import { useState } from "react";
import {
  FaBook,
  FaStar,
  FaSearch,
  FaUser,
  FaGraduationCap,
  FaBullhorn,
  FaFilm,
  FaTimes,
} from "react-icons/fa";
import SignOut from "../../Auth/SignOut";

function NoteLeftHeader({ isOpen, onClose, onSelectContent }) {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <>
      {/* Mobile Overlay Background */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900/90 backdrop-blur-xl border-r border-slate-800 flex flex-col justify-between shadow-2xl md:shadow-none transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Top Section: Brand & Search */}
        <div>
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-800/80">
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <span className="w-3.5 h-3.5 rounded-full bg-teal-500 inline-block ring-4 ring-teal-500/25"></span>
              <span className="font-bold text-lg tracking-tight text-white">
                NoteSpace
              </span>
            </div>
            {/* Close button for mobile screens */}
            <button
              onClick={onClose}
              className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* Quick Search Bar */}
          <div className="px-4 pt-5">
            <div className="flex items-center gap-2 bg-slate-950/50 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-400 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 transition-all">
              <FaSearch className="text-slate-500 text-xs" />
              <input
                type="text"
                placeholder="Search notes..."
                className="bg-transparent border-none outline-none w-full text-slate-200 placeholder-slate-500 text-xs"
              />
            </div>
          </div>

          {/* Main Navigation Links */}
          <div className="px-4 py-6 space-y-6">
            <div className="space-y-1">
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Menu
              </p>
              <button
                onClick={() => {
                  setActiveTab("all");
                  onSelectContent("all");
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === "all"
                    ? "bg-teal-500/10 text-teal-400 font-semibold border border-teal-500/20"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <FaBook className="text-sm" />
                All Notes
              </button>
              <button
                onClick={() => {
                  setActiveTab("favorites");
                  onSelectContent("favorites");
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === "favorites"
                    ? "bg-teal-500/10 text-teal-400 font-semibold border border-teal-500/20"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <FaStar className="text-sm" />
                Favorites
              </button>
            </div>

            {/* Categories / Folders */}
            <div className="space-y-1">
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Categories
              </p>
              <button
                onClick={() => {
                  setActiveTab("study");
                  onSelectContent("study");
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === "study"
                    ? "bg-slate-800 text-white font-semibold border border-slate-700"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <FaGraduationCap className="text-teal-400 text-sm" />
                Study Times
              </button>
              <button
                onClick={() => {
                  setActiveTab("marketing");
                  onSelectContent("Marketing");
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === "marketing"
                    ? "bg-slate-800 text-white font-semibold border border-slate-700"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <FaBullhorn className="text-amber-400 text-sm" />
                Marketing Dates
              </button>
              <button
                onClick={() => {
                  setActiveTab("movies");
                  onSelectContent("movies");
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === "movies"
                    ? "bg-slate-800 text-white font-semibold border border-slate-700"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <FaFilm className="text-indigo-400 text-sm" />
                Movie Watching
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: User Profile & SignOut */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/30">
          <button
            onClick={() => {
              onSelectContent("profile");
              setActiveTab("profile");
            }}
            className="flex items-center gap-3 mb-3 px-2 cursor-pointer w-full text-left"
          >
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-semibold text-sm border border-slate-700">
              <FaUser className="text-xs" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-slate-200 truncate">
                Account Profile
              </p>
              <p className="text-xs text-slate-500 truncate">Active session</p>
            </div>
          </button>

          <div className="grid gap-2">
            <SignOut className="w-full border border-slate-800 rounded-xl py-2 text-xs font-semibold bg-slate-900 text-slate-300 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30 transition-all cursor-pointer shadow-sm" />
          </div>
        </div>
      </aside>
    </>
  );
}

export default NoteLeftHeader;