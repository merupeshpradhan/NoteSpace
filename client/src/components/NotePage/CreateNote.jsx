import { useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateNote({ onClose }) {
  const [noteName, setNoteName] = useState();
  const [description, setDescription] = useState();
  const [loading, setLoading] = useState(false);
  const navigat = useNavigate();

  async function handleCrateNote() {
    setLoading(true);
    const todoId = toast.loading("Creating note...");

    try {
      const res = await api.post(
        "/note/notecreat",
        {
          noteName,
          description,
        },
        { withCredentials: true },
      );

      toast.loading(todoId, {
        render: "Successfully add note!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setLoading(false);
      setNoteName("");
      setDescription("");

      navigat('/notes')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="h-screen bg-black/40">
      <div className="h-full grid justify-items-center place-items-center">
        <form
          onSubmit={handleCrateNote}
          className="relative h-fit grid justify-items-center gap-3 text-white border p-5 rounded"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2 right-2 text-slate-400 hover:text-white transition-colors cursor-pointer w-7 h-7 flex items-center justify-center rounded-full bg-slate-800/60 hover:bg-slate-800"
          >
            ✕
          </button>
          <h3>Create a note</h3>
          <div className="grid gap-1">
            <span>Note name</span>
            <input
              type="text"
              placeholder="Note name"
              className="border px-3 py-1 "
            />
          </div>
          <div className="grid gap-1">
            <span>Description</span>
            <input
              type="text"
              placeholder="Description"
              className="border px-3 py-1 "
            />
          </div>
          <button type="submit" className="border p-1 w-1/2">
            Create
          </button>
        </form>
      </div>
    </section>
  );
}

export default CreateNote;
