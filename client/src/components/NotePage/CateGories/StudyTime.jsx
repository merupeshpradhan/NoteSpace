import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../Api/api.js";

function StudyTime() {
  const [allNotes, setAllNotes] = useState([]);
  const [studyNote, setStudyNote] = useState([]);
  const navigate = useNavigate();

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const toastId = toast.loading("Fetching study notes...");

    async function fetchStudyNotes() {
      try {
        const res = await api.get("/note");
        console.log(res.data.notes);

        const notes = (res.data.notes || []).reverse();

        setAllNotes(notes);

        // Filter out only the study notes
        const filteredStudyNotes = notes.filter(
          (note) => note.type?.toLowerCase() === "study",
        );

        setStudyNote(filteredStudyNotes);

        console.log(studyNote);
        

        toast.update(toastId, {
          render: "All Study notes loaded successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (error) {
        toast.update(toastId, {
          render: "Please signIn again and access your notes.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });

        console.log(error);
        navigate("/");
      }
    }

    fetchStudyNotes();
  }, [navigate]);

return (
    <section className="w-full min-h-full py-4 px-2 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {studyNote.map((study) => (
          // Added the unique key prop here
          <div key={study.id} className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-teal-400 font-bold">{study.type}</h3>
            <h4 className="text-white text-lg mt-2">{study.noteName}</h4>
            <p className="text-slate-300 text-sm mt-1">{study.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StudyTime;
