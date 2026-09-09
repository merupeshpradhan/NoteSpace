import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../Api/api.js";

function UpdateNote({ noteData, viewUpdateNote,onUpdateSuccess }) {
  const [noteName, setNoteName] = useState(noteData?.noteName || "");
  const [description, setDescription] = useState(noteData?.description || "");
  const [loading, setLoading] = useState(false);

  console.log(noteData);

  async function handleUpdateNote(e) {
    e.preventDefault();
    setLoading(true);
    const todoId = toast.loading("Updating note...");

    try {
      console.log("Submit...");

      const res = await api.put(
        `/note/noteupdate/${noteData.id}`,
        {
          noteName,
          description,
        },
        { withCredentials: true },
      );

      console.log(res);

      toast.update(todoId, {
        render: "Successfully update note!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      if(res.data.note){
        onUpdateSuccess(res.data.note)
      }

      window.location.reload();

      setLoading(false);
      viewUpdateNote();
    } catch (error) {
      console.log(error);
      toast.update(todoId, {
        render: "Somting wrong while updating note.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      setLoading(false);
    }
  }

  return (
    <section className="w-full bg-black/60  fixed inset-0 z-50 grid place-items-center backdrop-blur-xs">
      <form onSubmit={handleUpdateNote} className="grid">
        <button onClick={viewUpdateNote}>Close</button>
        <h3 className="text-lg font-semibold">Update this note</h3>
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
          {loading ? "Updating..." : "updated"}
        </button>
      </form>
    </section>
  );
}

export default UpdateNote;
