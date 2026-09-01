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
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-zinc-200 flex flex-col justify-between shadow-xl md:shadow-none transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Top Section: Brand & Search */}
        <div>
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-zinc-100">
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <span className="w-3.5 h-3.5 rounded-full bg-lime-500 inline-block ring-4 ring-lime-100"></span>
              <span className="font-bold text-lg tracking-tight text-zinc-900">
                NoteSpace
              </span>
            </div>
            {/* Close button for mobile screens */}
            <button
              onClick={onClose}
              className="md:hidden text-zinc-400 hover:text-zinc-700 p-1 rounded-lg cursor-pointer"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* Quick Search Bar */}
          <div className="px-4 pt-5">
            <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-sm text-zinc-500 focus-within:border-lime-500 focus-within:ring-2 focus-within:ring-lime-100 transition-all">
              <FaSearch className="text-zinc-400 text-xs" />
              <input
                type="text"
                placeholder="Search notes..."
                className="bg-transparent border-none outline-none w-full text-zinc-800 placeholder-zinc-400 text-xs"
              />
            </div>
          </div>

          {/* Main Navigation Links */}
          <div className="px-4 py-6 space-y-6">
            <div className="space-y-1">
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Menu
              </p>
              <button
                onClick={() => {
                  setActiveTab("all");
                  onSelectContent("all");
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === "all"
                    ? "bg-lime-50 text-lime-800 font-semibold"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
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
                    ? "bg-lime-50 text-lime-800 font-semibold"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                <FaStar className="text-sm" />
                Favorites
              </button>
            </div>

            {/* Categories / Folders */}
            <div className="space-y-1">
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Categories
              </p>
              <button
                onClick={() => {
                  setActiveTab("study");
                  onSelectContent("study");
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === "study"
                    ? "bg-zinc-100 text-zinc-900 font-semibold"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                <FaGraduationCap className="text-lime-600 text-sm" />
                Study Times
              </button>
              <button
                onClick={() => {
                  setActiveTab("marketing");
                  onSelectContent("Marketing");
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === "marketing"
                    ? "bg-zinc-100 text-zinc-900 font-semibold"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                <FaBullhorn className="text-amber-500 text-sm" />
                Marketing Dates
              </button>
              <button
                onClick={() => {
                  setActiveTab("movies");
                  onSelectContent("movies");
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === "movies"
                    ? "bg-zinc-100 text-zinc-900 font-semibold"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                <FaFilm className="text-indigo-500 text-sm" />
                Movie Watching
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: User Profile & SignOut */}
        <div className="p-4 border-t border-zinc-100 bg-zinc-50/50">
          <button
            onClick={() => {
              onSelectContent("profile");
              setActiveTab("profile");
            }}
            className="flex items-center gap-3 mb-3 px-2 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-700 font-semibold text-sm border border-zinc-300">
              <FaUser className="text-xs" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-zinc-800 truncate">
                Account Profile
              </p>
              <p className="text-xs text-zinc-400 truncate">Active session</p>
            </div>
          </button>

          <div className="grid gap-2">
            <SignOut className="w-full border border-zinc-200 rounded-xl py-2 text-xs font-semibold bg-white text-zinc-700 hover:bg-zinc-100 hover:text-red-600 transition-all cursor-pointer shadow-xs" />
          </div>
        </div>
      </aside>
    </>
  );
}

export default NoteLeftHeader;
