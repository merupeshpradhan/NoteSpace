import { useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateNote({ onClose }) {
  const [noteName, setNoteName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleCrateNote(e) {
    e.preventDefault();
    setLoading(true);
    const todoId = toast.loading("Creating note...");

    try {
      console.log("Submit..");

      const res = await api.post(
        "/note/notecreat",
        {
          noteName,
          description,
        },
        { withCredentials: true },
      );

      toast.update(todoId, {
        render: "Successfully add note!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setLoading(false);
      setNoteName("");
      setDescription("");

      if (onClose) onClose();
      navigate("/notes");
    } catch (error) {
      console.log(error);
      toast.update(todoId, {
        render: "Somting wrong to add note!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      setLoading(false);
    }
  }

  return (
    <section className="fixed inset-0 z-50 bg-black/60 grid place-items-center backdrop-blur-xs">
      <div className="w-full h-full grid justify-items-center place-items-center p-4">
        <form
          onSubmit={handleCrateNote}
          className="relative w-full max-w-md h-fit grid justify-items-center gap-3 text-white border border-slate-800 bg-slate-900 p-6 rounded-2xl shadow-2xl"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors cursor-pointer w-7 h-7 flex items-center justify-center rounded-full bg-slate-800/60 hover:bg-slate-800"
          >
            ✕
          </button>
          <h3 className="text-lg font-semibold">Create a note</h3>
          <div className="grid gap-1 w-full">
            <span className="text-xs text-slate-300">Note name</span>
            <input
              type="text"
              placeholder="Note name"
              value={noteName}
              onChange={(e) => setNoteName(e.target.value)}
              className="border border-slate-700 bg-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-lime-500"
              required
            />
          </div>
          <div className="grid gap-1 w-full">
            <span className="text-xs text-slate-300">Description</span>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-slate-700 bg-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-lime-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="border border-lime-500 bg-lime-500 hover:bg-lime-600 text-zinc-900 font-semibold p-2.5 w-1/2 rounded-xl cursor-pointer transition-colors mt-2"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default CreateNote;
