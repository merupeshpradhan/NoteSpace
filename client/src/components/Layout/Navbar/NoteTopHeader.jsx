function NoteTopHeader() {
  return (
    <section className="fixed top-0 left-65  w-[calc(100%-260px)] border-b-2 p-2 border-dashed bg-white z-10">
      <div className="grid grid-cols-4 justify-center items-center  ">
        <div className="text-center">Search note</div>
        <div className="text-center">Search note</div>
        <div className="text-center">Create note</div>
        <div className="text-center">User Detials</div>
      </div>
    </section>
  );
}

export default NoteTopHeader;
