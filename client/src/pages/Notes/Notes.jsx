import NoteLeftHeader from "../../components/Layout/Navbar/NoteLeftHeader.jsx";
import NoteTopHeader from "../../components/Layout/Navbar/NoteTopHeader.jsx";
import NoteList from "../../components/NotePage/NoteList.jsx";
import NoteFooter from "../../components/Layout/Footer/NoteFooter.jsx";

function Notes() {
  return (
    <div className="min-h-screen">
      <NoteLeftHeader />
      <main className="ml-65">
        <NoteTopHeader />
        <section className="min-h-screen">
          <NoteList />
          <NoteFooter/>
        </section>
      </main>
    </div>
  );
}

export default Notes;
