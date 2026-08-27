import NoteLeftHeader from "../../components/Layout/Navbar/NoteLeftHeader.jsx";
import NoteTopHeader from "../../components/Layout/Navbar/NoteTopHeader.jsx";
import Footer from "../../components/Layout/Footer.jsx";
import NoteList from "../../components/NotePage/NoteList.jsx";

function Notes() {
  return (
    <div className="min-h-screen">
      <NoteLeftHeader />
      <main className="ml-65">
        <NoteTopHeader />
        <section className="min-h-screen">
          <NoteList />
          <Footer />
        </section>
      </main>
    </div>
  );
}

export default Notes;
