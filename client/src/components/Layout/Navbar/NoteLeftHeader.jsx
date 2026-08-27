import React from "react";

function NoteLeftHeader() {
  return (
    <section className="h-screen w-65 fixed left-0 top-0 bg-white border-green-700 border-r-2 shadow shadow-cyan-500/50 z-50">
      <div className="p-2 mt-3 text-center">NoteSpace</div>
      <div className="h-3/6 p-2 mt-5 border-b-2 grid gap-2">
        <div className="grid gap-4">
          <button>Study Times</button>
          <button>Marketing Dates</button>
          <button>Movie Watching Dates</button>
        </div>
      </div>
      <div className="h-1/2 grid items-center justify-center">
        <h3>User Data</h3>
      </div>
    </section>
  );
}

export default NoteLeftHeader;
