import NoteLeftHeader from "../../components/NoteLeftHeader.jsx";
import NoteTopHeader from "../../components/NoteTopHeader.jsx";
import NoteList from "../../components/NoteList.jsx";

function Notes() {
  return (
    <div className="grid grid-cols-[260px_1fr] min-h-screen">
      <NoteLeftHeader />
      <main>
        <NoteTopHeader />
        <section>
          <NoteList/>
        </section>
      </main>
    </div>
  );
}

export default Notes;
