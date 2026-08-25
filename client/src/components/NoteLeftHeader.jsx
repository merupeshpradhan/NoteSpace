import React from "react";

function NoteLeftHeader() {
  return (
    <section className="h-screen border-green-700 border-r-2 shadow shadow-cyan-500/50">
      <div className="border-b-2 border-dashed p-2 text-center">NoteSpace</div>
      <div className="h-1/3 border-b-2 grid items-center justify-center">
        <h3>All note data</h3>
      </div>
      <div className="h-1/2 grid items-center justify-center">
        <h3>User Data</h3>
      </div>
    </section>
  );
}

export default NoteLeftHeader;
