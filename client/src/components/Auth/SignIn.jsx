import axios from "axios";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignIn({ onClose, onSwitchToSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function handleSignIn(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please provide email and password.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Signing in to note space...");

    try {
      const res = await axios.post("http://localhost:3000/api/v1/users/login", {
        email,
        password,
      });

      console.log(res.data.data);


      toast.update(toastId, {
        render: "Welcome to Notes Space.",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setLoading(false);
      setEmail("");
      setPassword("");

      if (onClose) onClose();
      navigate("/notes");
    } catch (error) {
      console.log(error);
      const errorMsg =
        error?.response?.data?.message || "Something went wrong.";
      toast.update(toastId, {
        render: errorMsg,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      setLoading(false);
    }
  }

  return (
    <div className="fixed top-0 min-h-screen w-screen z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
      {/* Outer Gradient Border Wrapper */}
      <div className="relative w-full max-w-md p-px rounded-3xl bg-linear-to-b from-teal-500/50 via-slate-800 to-indigo-500/30 shadow-2xl">
        {/* Main Glass Modal Card */}
        <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-[23px] p-8 sm:p-10 text-slate-100 overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-36 h-36 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>

          {/* Close Action Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors cursor-pointer w-7 h-7 flex items-center justify-center rounded-full bg-slate-800/60 hover:bg-slate-800"
          >
            ✕
          </button>

          {/* Header Info */}
          <div className="mb-8">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 text-xl mb-4 shadow-inner">
              ✨
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white">
              Welcome back
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Please enter your details to sign in.
            </p>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                Email
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                Password
              </label>
              <div className="relative max-w-sm mx-auto">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full flex px-4 py-3 pr-10 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? (
                    <FaEyeSlash size={16} />
                  ) : (
                    <FaEye size={16} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-linear-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-medium rounded-xl shadow-lg shadow-teal-500/25 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 cursor-pointer text-sm"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer Navigation Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-slate-400">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  if (onSwitchToSignUp) {
                    onSwitchToSignUp();
                  }
                }}
                className="text-teal-400 hover:text-teal-300 font-medium transition-colors underline underline-offset-4 cursor-pointer bg-transparent border-none p-0 inline"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
