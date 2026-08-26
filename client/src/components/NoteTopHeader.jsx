function NoteTopHeader() {
  return (
    <section className="fixed w-full border-b-2 p-2 border-dashed">
      <div className="grid grid-cols-5 justify-center items-center  ">
        <div className="text-center">Search note</div>
        <div className="text-center">Search note</div> 
        <div className="text-center">Create note</div>
        <div className="text-center">User Detials</div>
      </div>
    </section>
  );
}

export default NoteTopHeader;
