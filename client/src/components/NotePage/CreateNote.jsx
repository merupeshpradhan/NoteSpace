import { useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaTimes,
  FaPenNib,
  FaTag,
  FaHeading,
  FaAlignLeft,
  FaClock,
} from "react-icons/fa";

function CreateNote({ onClose }) {
  const [type, setType] = useState("");
  const [noteName, setNoteName] = useState("");
  const [reminderDate, setReminderDate] = useState(""); // state for reminder date
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleCrateNote(e) {
    e.preventDefault();

    // Custom Validation
    if (!type) {
      toast.error("Please select a note type!");
      return;
    }
    if (!noteName.trim()) {
      toast.error("Please enter a note name!");
      return;
    }
    if (!description.trim()) {
      toast.error("Please enter a description!");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Creating note...");

    try {
      await api.post(
        "/note/notecreat",
        {
          type,
          noteName,
          reminderDate: reminderDate
            ? new Date(reminderDate).toISOString()
            : null, // reminder date to backend
          description,
        },
        { withCredentials: true },
      );

      toast.update(toastId, {
        render: "Successfully added note!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setNoteName("");
      setReminderDate("");
      setDescription("");
      setType("");

      if (onClose) onClose();
    } catch (error) {
      console.log(error);
      toast.update(toastId, {
        render: "Something went wrong adding note!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-slate-900/90 border border-slate-800 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl overflow-hidden group animate-in zoom-in-95 duration-200">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 z-20"
        >
          <FaTimes className="text-xs" />
        </button>

        {/* Header */}
        <div className="relative flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0 shadow-inner">
            <FaPenNib className="text-lg" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight">
              Create a New Note
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Organize your thoughts and set automated reminders.
            </p>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleCrateNote} className="space-y-4 relative z-10">
          {/* Note Type Select */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-300 uppercase tracking-wider">
              <FaTag className="text-teal-400 text-[10px]" /> Note Type{" "}
              <span className="text-red-400">*</span>
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

          {/* Note Name Input */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-300 uppercase tracking-wider">
              <FaHeading className="text-teal-400 text-[10px]" /> Note Name{" "}
              <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., React Advanced Concepts"
              value={noteName}
              onChange={(e) => setNoteName(e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-800/80 px-4 py-3 rounded-2xl text-sm text-slate-200 outline-none focus:border-teal-500/80 focus:ring-2 focus:ring-teal-500/25 transition-all placeholder:text-slate-600"
            />
          </div>

          {/* Reminder Date Input (Fixed state binding & label) */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-300 uppercase tracking-wider">
              <FaClock className="text-teal-400 text-[10px]" /> Reminder Date &
              Time (Optional)
            </label>
            <input
              type="datetime-local"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-800/80 px-4 py-3 rounded-2xl text-sm text-slate-200 outline-none focus:border-teal-500/80 focus:ring-2 focus:ring-teal-500/25 transition-all cursor-pointer"
            />
          </div>

          {/* Description Input */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-300 uppercase tracking-wider">
              <FaAlignLeft className="text-teal-400 text-[10px]" /> Description{" "}
              <span className="text-red-400">*</span>
            </label>
            <textarea
              rows="3"
              placeholder="Write down the details of your note..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-800/80 px-4 py-3 rounded-2xl text-sm text-slate-200 outline-none focus:border-teal-500/80 focus:ring-2 focus:ring-teal-500/25 transition-all resize-none placeholder:text-slate-600"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-700/80 text-slate-300 hover:bg-slate-800/60 text-xs font-semibold transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all duration-200 shadow-lg shadow-teal-500/20 cursor-pointer disabled:opacity-50 active:scale-95"
            >
              {loading ? "Creating..." : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateNote;
