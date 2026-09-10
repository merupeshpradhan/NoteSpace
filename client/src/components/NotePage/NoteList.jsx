import { useEffect, useRef, useState } from "react";
import api from "../../Api/api.js";
import DeleteNote from "./DeleteNote.jsx";
import UpdateNote from "./UpdateNote.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [updateNoteView, setUpdateNoteView] = useState(false);
  const navigate = useNavigate();

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const toastId = toast.loading("Featching note...");

    async function fetchNots() {
      try {
        const res = await api.get("/note");
        console.log(res.data.notes);
        setNotes((res.data.notes || []).reverse());
        console.log(notes);

        toast.update(toastId, {
          render: "Welcome to note area!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (error) {
        if (error.response?.status === 401) {
          toast.dismiss(toastId);
          return;
        }

        toast.update(toastId, {
          render: "Signin again and access the website",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });

        console.log(error);

        navigate("/");
      }
    }

    fetchNots();
  }, []);

  async function handleDeleteNote(noteId) {
    setLoading(true);

    try {
      const res = await api.delete(`/note/notedelete/${noteId}`);

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));

      console.log("Not deleted now");

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function handleUpdateSuccess(updateNote) {
    setNotes((prevNotes) => [
      updateNote,
      ...prevNotes.filter((note) => note.id !== updateNote.id),
    ]);
  }

  return (
    <section className="h-full grid justify-items-center content-center">
      <div className="grid grid-cols-2 gap-10">
        {notes.map((note) => (
          <div
            key={note.id}
            className="w-md grid justify-items-center p-5 border border-cyan-500 rounded-2xl shadow-lg shadow-cyan-400"
          >
            <p>{note.id}</p>
            <p>{note.noteName}</p>
            <p>{note.description}</p>
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => {
                  setSelectedNote(note);
                  setUpdateNoteView(true);
                }}
                className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-sm transition-colors duration-200 cursor-pointer"
              >
                Update
              </button>
              <DeleteNote deleteNote={() => handleDeleteNote(note.id)} />
            </div>
          </div>
        ))}
      </div>
      {updateNoteView && (
        <UpdateNote
          noteData={selectedNote}
          viewUpdateNote={() => setUpdateNoteView(false)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </section>
  );
}

export default NoteList;
