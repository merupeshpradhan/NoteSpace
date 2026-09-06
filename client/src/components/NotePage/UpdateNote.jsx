function UpdateNote({ selectedNote, viewUpdateNote }) {
  return (
    <section className="w-full bg-black/60  fixed inset-0 z-50 grid place-items-center backdrop-blur-xs">
      <button onClick={viewUpdateNote}>Close</button>
      UpdateNote
    </section>
  );
}

export default UpdateNote;
