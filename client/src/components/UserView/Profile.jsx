import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaRegEdit,
  FaTimes,
  FaCheckCircle,
  FaSave,
} from "react-icons/fa";
import { toast } from "react-toastify";

import api from "../../Api/api.js";

function Profile() {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setUser(parsedUser);
        setName(parsedUser.name || "");
        setEmail(parsedUser.email || "");
      } catch (error) {
        setUser({});
      }
    }
  }, []);

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function handleUpdateProfile(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error("Please fill out all fields.");
      return;
    }

    setLoading(true);

    const toastId = toast.loading("Transmitting updates...");

    try {
      const res = await api.put("/users/update-details", {
        name,
        email,
      });

      const updatedUser = res.data.user || {
        ...user,
        name,
        email,
      };

      setUser(updatedUser);

      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.update(toastId, {
        render: "Data sync successful.",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setIsEditing(false);
    } catch (error) {
      console.log(error);

      const errorMsg =
        error.response?.data?.message || "Sync failed.";

      toast.update(toastId, {
        render: errorMsg,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // INFO ROW
  // =========================================================

  const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="relative border-b border-slate-800 py-4 sm:py-5 group">
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Icon */}

        <div className="mt-1 shrink-0 text-cyan-500 opacity-80 group-hover:scale-110 transition-transform duration-300">
          <Icon size={17} className="sm:w-4.5 sm:h-4.5" />
        </div>

        {/* Content */}

        <div className="flex-1 min-w-0 grid gap-1">
          <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-widest text-slate-600 font-medium">
            {label}
          </span>

          <span className="text-slate-100 text-sm sm:text-base font-light tracking-wide break-all selection:bg-cyan-500 selection:text-black">
            {value || "—"}
          </span>
        </div>
      </div>

      {/* Hover Line */}

      <div className="absolute bottom-0 left-0 h-px w-0 bg-cyan-400 group-hover:w-full transition-all duration-300 ease-out opacity-60" />
    </div>
  );

  return (
    <section className="relative w-full min-h-screen flex items-start justify-center px-3 py-5 sm:px-5 sm:py-8 md:px-8 md:py-10 bg-black font-mono selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* =========================================================
          BACKGROUND GLOW
      ========================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-cyan-500/5 blur-[100px]" />

        <div className="absolute top-1/2 -right-40 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-cyan-500/5 blur-[120px]" />

        <div className="absolute -bottom-32 left-1/3 w-64 h-64 rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      {/* =========================================================
          MAIN CONTAINER
      ========================================================== */}

      <div className="relative z-10 w-full max-w-2xl mt-2 sm:mt-6 md:mt-10">
        {/* =======================================================
            PROFILE CARD
        ======================================================== */}

        <div className="relative w-full bg-[#0a0a0a] border border-slate-800 p-4 sm:p-6 md:p-10 shadow-[0_0_60px_-15px_rgba(0,255,255,0.15)] transition-all duration-500">
          {/* Scanline */}

          <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_2px,rgba(0,255,255,0.02)_2px,rgba(0,255,255,0.02)_3px)]" />

          {/* =====================================================
              HEADER
          ====================================================== */}

          <header className="relative z-10 pb-6 sm:pb-8 border-b border-slate-800 mb-2">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              {/* User Information */}

              <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                {/* Avatar */}

                <div className="relative group w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                  <img
                    src={
                      user?.avatar ||
                      `https://api.dicebear.com/8.x/pixel-art/svg?seed=${
                        user.name || "guest"
                      }`
                    }
                    alt="avatar"
                    className="w-full h-full object-cover border border-slate-700 grayscale group-hover:grayscale-0 transition-all duration-300"
                  />

                  {/* Hover overlay */}

                  <div className="absolute inset-0 bg-cyan-500 mix-blend-multiply opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

                  {/* Corner accents */}

                  <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* User Name */}

                <div className="min-w-0 grid gap-1">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400 tracking-tight wrap-break-word line-clamp-2 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                    {user?.name || "ANONYMOUS"}
                  </h1>

                  <p className="text-[9px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-widest text-slate-500 flex items-center gap-2 min-w-0">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />

                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                    </span>

                    <span className="truncate">
                      ONLINE_ID: {user?.id || "GUEST_USER"}
                    </span>
                  </p>
                </div>
              </div>

              {/* =================================================
                  EDIT BUTTON
              ================================================== */}

              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-black border border-slate-700 text-cyan-300 text-xs sm:text-sm font-medium uppercase tracking-wider transition-all hover:border-cyan-500 hover:text-cyan-100 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] active:scale-95"
              >
                {isEditing ? (
                  <>
                    <FaTimes />
                    ABORT
                  </>
                ) : (
                  <>
                    <FaRegEdit />
                    MODIFY
                  </>
                )}
              </button>
            </div>
          </header>

          {/* =====================================================
              BODY
          ====================================================== */}

          <main
            className={`relative z-10 mt-4 ${
              !isEditing ? "animate-stagger-in" : ""
            }`}
          >
            {!isEditing ? (
              /* ===================================================
                 VIEW MODE
              ==================================================== */

              <div className="grid">
                <InfoRow
                  icon={FaUser}
                  label="Full Name"
                  value={user?.name}
                />

                <InfoRow
                  icon={FaEnvelope}
                  label="System Email"
                  value={user?.email}
                />

                {/* Access Level */}

                <div className="py-5 flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 text-xs text-slate-500 border-b border-slate-800">
                  <span className="tracking-wider">
                    ACCESS_LEVEL
                  </span>

                  <span className="w-fit text-cyan-300 px-2 py-1 border border-cyan-900 bg-cyan-950/30 rounded">
                    STANDARD_USER
                  </span>
                </div>
              </div>
            ) : (
              /* ===================================================
                 EDIT MODE
              ==================================================== */

              <form
                onSubmit={handleUpdateProfile}
                className="grid gap-5 sm:gap-6 pt-2"
              >
                {/* Name */}

                <div className="grid gap-2 animate-fadeIn">
                  <label className="text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-widest text-cyan-500 font-semibold">
                    New Name Identifier
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full min-w-0 px-3 sm:px-4 py-3 bg-black border border-slate-700 text-white text-sm sm:text-lg font-light focus:outline-none focus:border-cyan-400 transition-all placeholder:text-slate-700 selection:bg-cyan-500"
                    placeholder="Enter Name"
                  />
                </div>

                {/* Email */}

                <div className="grid gap-2 animate-fadeIn">
                  <label className="text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-widest text-cyan-500 font-semibold">
                    Update Email Vector
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full min-w-0 px-3 sm:px-4 py-3 bg-black border border-slate-700 text-white text-sm sm:text-lg font-light focus:outline-none focus:border-cyan-400 transition-all placeholder:text-slate-700 selection:bg-cyan-500"
                    placeholder="user@example.com"
                  />
                </div>

                {/* =================================================
                    ACTIONS
                ================================================== */}

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t border-slate-800 mt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:flex-1 flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-cyan-500 text-black text-xs sm:text-sm font-bold uppercase tracking-[0.12em] sm:tracking-widest transition-all hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                  >
                    {loading ? (
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    ) : (
                      <FaSave />
                    )}

                    {loading ? "Committing..." : "Commit Changes"}
                  </button>

                  {/* Already Saved */}

                  {!loading &&
                    user.name === name &&
                    user.email === email && (
                      <div className="w-full sm:w-auto flex items-center justify-center text-green-500 animate-fadeIn p-3 sm:p-4 border border-slate-800 bg-black">
                        <FaCheckCircle size={20} />
                      </div>
                    )}
                </div>

                <p className="text-[9px] sm:text-[10px] text-slate-700 text-center pt-1 px-2 leading-relaxed">
                  Data will be written to persistent storage upon commit.
                </p>
              </form>
            )}
          </main>

          {/* =====================================================
              VERSION
          ====================================================== */}

          <div className="absolute bottom-1 right-2 text-[7px] sm:text-[8px] text-slate-800">
            SYS_VER 9.1.2
          </div>
        </div>

        {/* =======================================================
            TERMINAL OUTPUT
        ======================================================== */}

        {!isEditing && (
          <div className="mt-3 sm:mt-4 p-3 bg-[#050505] border border-slate-900 text-slate-600 text-[8px] sm:text-[10px] font-mono overflow-hidden min-h-16 opacity-60">
            <p className="truncate">
              &gt; INFO: User profile loaded successfully.
            </p>

            <p className="truncate">
              &gt; STATUS: Secure connection established [OK]
            </p>

            <p className="animate-pulse">_</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Profile;
