function DeleteNote({ deleteNote }) {
  return (
    <div>
      <button
        onClick={deleteNote}
        className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-sm transition-colors duration-200 cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteNote;
