import NoteLeftHeader from "../../components/Layout/Navbar/NoteLeftHeader.jsx";
import NoteTopHeader from "../../components/Layout/Navbar/NoteTopHeader.jsx";
import NoteList from "../../components/NotePage/NoteList.jsx";

function Notes() {
  return (
    <div className="grid grid-cols-[260px_1fr] min-h-screen">
      <NoteLeftHeader />
      <main>
        <NoteTopHeader />
        <section>
          <NoteList />
        </section>
      </main>
    </div>
  );
}

export default Notes;
