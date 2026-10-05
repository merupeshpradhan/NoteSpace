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

  async function handleUpdateProfile(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Please fill out all fields.");
      return;
    }
    setLoading(true);
    const toastId = toast.loading("Transmitting updates...");
    try {
      const res = await api.put("/users/update-details", { name, email });
      const updatedUser = res.data.user || { ...user, name, email };
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
      const errorMsg = error.response?.data?.message || "Sync failed.";
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

  // Helper to render data rows with staggered animation class
  const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="relative border-b border-slate-800 py-4 group">
      <div className="flex items-start gap-4">
        <div className="mt-1 text-cyan-500 opacity-80 group-hover:scale-110 transition-transform">
          <Icon size={18} />
        </div>
        <div className="flex-1 grid gap-0.5">
          <span className="text-[11px] uppercase tracking-widest text-slate-600 font-medium">
            {label}
          </span>
          <span className="text-slate-100 text-base font-light tracking-wide break-all selection:bg-cyan-500 selection:text-black">
            {value || "—"}
          </span>
        </div>
      </div>
      {/* Animated underlining effect on hover */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-cyan-400 group-hover:w-full transition-all duration-300 ease-out opacity-60" />
    </div>
  );

  return (
    <section className="w-full min-h-screen flex items-start justify-center p-4 md:p-8 bg-black font-mono selection:bg-cyan-500 selection:text-black">
      <div className="w-full max-w-2xl mt-10">
        {/* Main Interface Container - smoothly animates height changes */}
        <div className="relative bg-[#0a0a0a] border border-slate-800 p-6 md:p-10 shadow-[0_0_60px_-15px_rgba(0,255,255,0.15)] transition-[height] duration-500 ease-in-out">
          {/* Decorative Scanline effect */}
          <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_2px,rgba(0,255,255,0.02)_2px,rgba(0,255,255,0.02)_3px)]" />

          {/* Header Area */}
          <header className="flex items-center justify-between pb-8 border-b border-slate-800 mb-2">
            <div className="flex items-center gap-5">
              {/* Glitch effect on hover for avatar */}
              <div className="relative group w-20 h-20">
                <img
                  src={
                    user?.avatar ||
                    `https://api.dicebear.com/8.x/pixel-art/svg?seed=${user.name || "guest"}`
                  }
                  alt="avatar"
                  className="w-full h-full object-cover border border-slate-700 grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-cyan-500 mix-blend-multiply opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                {/* Corner accents */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="grid gap-1">
                <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 tracking-tight break-all drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                  {user?.name || "ANONYMOUS"}
                </h1>
                <p className="text-xs uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  ONLINE_ID: {user?.id || "GUEST_USER"}
                </p>
              </div>
            </div>

            {/* Kinetic Toggle Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2.5 px-5 py-2.5 bg-black border border-slate-700 text-cyan-300 text-sm font-medium uppercase tracking-wider transition-all hover:border-cyan-500 hover:text-cyan-100 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] active:scale-95"
            >
              {isEditing ? (
                <>
                  <FaTimes /> ABORT
                </>
              ) : (
                <>
                  <FaRegEdit /> MODIFY
                </>
              )}
            </button>
          </header>

          {/* Body Content - Applies the stagger animation class when mounting/updating */}
          <main className={`mt-4 ${!isEditing ? "animate-stagger-in" : ""}`}>
            {!isEditing ? (
              // View Mode
              <div className="grid">
                <InfoRow icon={FaUser} label="Full Name" value={user?.name} />
                <InfoRow
                  icon={FaEnvelope}
                  label="System Email"
                  value={user?.email}
                />

                <div className="py-5 flex items-center justify-between text-xs text-slate-500 border-b border-slate-800">
                  <span>ACCESS_LEVEL</span>
                  <span className="text-cyan-300 px-2 py-0.5 border border-cyan-900 bg-cyan-950/30 rounded">
                    STANDARD_USER
                  </span>
                </div>
              </div>
            ) : (
              // Edit Mode - Simple inputs that feel like a terminal
              <form onSubmit={handleUpdateProfile} className="grid gap-6 pt-2">
                <div className="grid gap-2 animate-fadeIn">
                  <label className="text-xs uppercase tracking-widest text-cyan-500 font-semibold">
                    New Name Identifier
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-black border border-slate-700 text-white text-lg font-light focus:outline-none focus:border-cyan-400 focus:ring-0 transition-all placeholder:text-slate-700 selection:bg-cyan-500"
                    placeholder="Enter Name"
                  />
                </div>

                <div className="grid gap-2 animate-fadeIn animation-delay-100">
                  <label className="text-xs uppercase tracking-widest text-cyan-500 font-semibold">
                    Update Email Vector
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-black border border-slate-700 text-white text-lg font-light focus:outline-none focus:border-cyan-400 focus:ring-0 transition-all placeholder:text-slate-700 selection:bg-cyan-500"
                    placeholder="user@example.com"
                  />
                </div>

                <div className="flex gap-4 pt-4 border-t border-slate-800 mt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-cyan-500 text-black text-sm font-bold uppercase tracking-widest transition-all hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                  >
                    {loading ? (
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    ) : (
                      <FaSave />
                    )}
                    {loading ? "Committing..." : "Commit Changes"}
                  </button>

                  {/* Subtle success indicator icon when not loading */}
                  {!loading && user.name === name && user.email === email && (
                    <div className="flex items-center text-green-500 animate-fadeIn p-4 border border-slate-800 bg-black">
                      <FaCheckCircle size={24} />
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-slate-700 text-center pt-2">
                  Data will be written to persistent storage upon commit.
                </p>
              </form>
            )}
          </main>

          {/* Footer accent */}
          <div className="absolute bottom-2 right-2 text-[8px] text-slate-800">
            SYS_VER 9.1.2
          </div>
        </div>

        {/* Optional decorative terminal output block below the main box */}
        {!isEditing && (
          <div className="mt-4 p-3 bg-[#050505] border border-slate-900 text-slate-600 text-[10px] font-mono overflow-hidden h-16 opacity-60">
            <p>
              &gt; INFO: User profile loaded successfully in{" "}
              {Math.random().toFixed(2)}ms.
            </p>
            <p>&gt; STATUS: Secure connection established [OK]</p>
            <p className="animate-pulse">_</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Profile;
