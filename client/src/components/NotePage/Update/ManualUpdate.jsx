import {
  FaTag,
  FaHeading,
  FaAlignLeft,
} from "react-icons/fa";

function ManualUpdate({
  handleManualUpdate,
  type,
  setType,
  noteName,
  setNoteName,
  description,
  setDescription,
  viewUpdateNote,
  loading,

}) {
  return (
    <div>
      <form onSubmit={handleManualUpdate} className="space-y-4 relative z-10">
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-300 uppercase tracking-wider">
            <FaTag className="text-teal-400 text-[10px]" /> Note Type
          </label>
          <select
            name="type"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-slate-950/60 border border-slate-800/80 px-4 py-3 rounded-2xl text-sm text-slate-200 outline-none focus:border-teal-500/80 focus:ring-2 focus:ring-teal-500/25 transition-all cursor-pointer"
          >
            <option value="" disabled className="bg-slate-900 text-slate-500">
              Select a type...
            </option>
            <option value="study" className="bg-slate-900 text-slate-200">
              Study
            </option>
            <option
              value="marketing-dates"
              className="bg-slate-900 text-slate-200"
            >
              Marketing Dates
            </option>
            <option
              value="movie-watching-time"
              className="bg-slate-900 text-slate-200"
            >
              Movie Watching Time
            </option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-300 uppercase tracking-wider">
            <FaHeading className="text-teal-400 text-[10px]" /> Note Name
          </label>
          <input
            type="text"
            placeholder="e.g., React Advanced Concepts"
            value={noteName}
            onChange={(e) => setNoteName(e.target.value)}
            className="w-full bg-slate-950/60 border border-slate-800/80 px-4 py-3 rounded-2xl text-sm text-slate-200 outline-none focus:border-teal-500/80 focus:ring-2 focus:ring-teal-500/25 transition-all placeholder:text-slate-600"
          />
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-300 uppercase tracking-wider">
            <FaAlignLeft className="text-teal-400 text-[10px]" /> Description
          </label>
          <textarea
            rows="3"
            placeholder="Write down the details of your note..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-slate-950/60 border border-slate-800/80 px-4 py-3 rounded-2xl text-sm text-slate-200 outline-none focus:border-teal-500/80 focus:ring-2 focus:ring-teal-500/25 transition-all resize-none placeholder:text-slate-600"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80 mt-6">
          <button
            type="button"
            onClick={viewUpdateNote}
            className="px-5 py-2.5 rounded-xl border border-slate-700/80 text-slate-300 hover:bg-slate-800/60 text-xs font-semibold transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all duration-200 shadow-lg shadow-teal-500/20 cursor-pointer disabled:opacity-50 active:scale-95"
          >
            {loading ? "Updating..." : "Update Note"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ManualUpdate;
