function NoteTopHeader() {
  return (
    <section className="fixed top-0 left-65  w-[calc(100%-260px)] border-b-2 p-2 border-dashed bg-white z-10">
      <div className="w-full grid grid-cols-[auto_auto] justify-between items-center  ">
        {/* Left Side: Search Bar */}
        <div>
          <input placeholder="Search note" className="border py-0.5 px-2" />
        </div>

        {/* Right side: Profile, Notification, And User Detials in a sub-grid */}
        <div className="grid grid-flow-col auto-cols-max items-center gap-6">
          <div className="text-center grid">
            <img src="user_profile.png" alt="Your detials" width={50} />
          </div>
          <div className="">Notification</div>
          <div className="">User Detials</div>
        </div>
      </div>
    </section>
  );
}

export default NoteTopHeader;
