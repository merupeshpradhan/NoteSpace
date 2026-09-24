import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaShieldAlt,
  FaPhone,
  FaEdit,
} from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../Api/api.js";
import ProfileEditor from "./ProfileEditor";

function Profile() {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        setUser({});
      }
    }
  }, []);

  async function handleSaveProfile(updatedData) {
    if (
      !updatedData.name.trim() ||
      !updatedData.email.trim() ||
      !updatedData.phoneNumber.trim()
    ) {
      toast.error("Please fill out all fields.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Updating profile...");

    try {
      const res = await api.put("/users/update", updatedData, {
        withCredentials: true,
      });

      const updatedUser = res.data.user || { ...user, ...updatedData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.update(toastId, {
        render: "Profile updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setIsEditing(false);
    } catch (error) {
      console.log(error);
      const errorMsg =
        error.response?.data?.message || "Failed to update profile.";
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

  return (
    <section className="w-full flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="relative w-full max-w-md bg-slate-900/90 border border-slate-800 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl overflow-hidden group">
        {/* Subtle decorative moving background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>

        {/* Header Section */}
        <div className="relative flex flex-col items-center text-center mb-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-linear-to-tr from-slate-800 to-slate-900 border border-slate-700/80 flex items-center justify-center text-teal-400 shadow-xl mb-4 animate-[bounce_3s_ease-in-out_infinite]">
            <FaUser className="text-3xl sm:text-4xl" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight">
            User Profile
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Account Information</p>

          {/* Edit Toggle Button */}
          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="absolute top-0 right-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-teal-400 text-xs font-semibold transition-all cursor-pointer shadow-sm"
            >
              <FaEdit /> Edit
            </button>
          )}
        </div>

        {/* Conditional View: Details Card or Profile Editor Component */}
        {!isEditing ? (
          <div className="space-y-4 relative">
            {/* Name Field */}
            <div className="flex items-center gap-3.5 bg-slate-950/60 border border-slate-800/80 p-3.5 sm:p-4 rounded-2xl transition-all hover:border-slate-700">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 shrink-0">
                <FaUser className="text-sm animate-pulse" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                  Full Name
                </span>
                <p className="text-sm sm:text-base font-semibold text-slate-200 truncate">
                  {user?.name || "Guest User"}
                </p>
              </div>
            </div>

            {/* Email Field */}
            <div className="flex items-center gap-3.5 bg-slate-950/60 border border-slate-800/80 p-3.5 sm:p-4 rounded-2xl transition-all hover:border-slate-700">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                <FaEnvelope className="text-sm animate-pulse" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                  Email Address
                </span>
                <p className="text-sm sm:text-base font-semibold text-slate-200 truncate">
                  {user?.email || "No email provided"}
                </p>
              </div>
            </div>

            {/* Phone Number Field */}
            <div className="flex items-center gap-3.5 bg-slate-950/60 border border-slate-800/80 p-3.5 sm:p-4 rounded-2xl transition-all hover:border-slate-700">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <FaPhone className="text-sm animate-pulse" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                  Phone Number
                </span>
                <p className="text-sm sm:text-base font-semibold text-slate-200 truncate">
                  {user?.phoneNumber || "No phone number provided"}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center justify-between bg-slate-950/40 border border-slate-800/50 px-4 py-3 rounded-xl text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <FaShieldAlt className="text-teal-400 text-sm" /> Account Status
              </span>
              <span className="px-2.5 py-1 bg-teal-500/10 text-teal-400 font-medium rounded-full text-[10px]">
                Active
              </span>
            </div>
          </div>
        ) : (
          <ProfileEditor
            user={user}
            onSave={handleSaveProfile}
            onCancel={() => setIsEditing(false)}
            loading={loading}
          />
        )}
      </div>
    </section>
  );
}

export default Profile;
