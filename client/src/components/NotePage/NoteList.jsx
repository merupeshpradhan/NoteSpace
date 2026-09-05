import { useEffect, useState } from "react";
import api from "../../Api/api.js";
import DeleteNote from "./DeleteNote.jsx";

function NoteList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchNots() {
      try {
        const res = await api.get("/note");
        console.log(res.data.notes);
        setNotes(res.data.notes || []);
        console.log(notes);
      } catch (error) {
        console.log(error);
      }
    }

    fetchNots();
  }, []);

  function handleDeleteNote(noteId) {
    try {
      const res = api.delete(`/note/notedelete/${noteId}`);

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));

      console.log("Not deleted now");
    } catch (error) {
      console.log(error);
    }
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
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-sm transition-colors duration-200 cursor-pointer">
                Update
              </button>
              {/* <button
                onClick={() => handleDeleteNote(note.id)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-sm transition-colors duration-200 cursor-pointer"
              >
                Delete
              </button> */}
              <DeleteNote deleteNote={() => handleDeleteNote(note.id)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NoteList;
