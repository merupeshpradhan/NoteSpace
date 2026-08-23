import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";

function HomeHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [signinView, setSigninView] = useState(false);
  const [signupView, setSignupView] = useState(false);

  useEffect(() => {
    if (signinView || signupView) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  function handleSignUp() {
    if (signupView === false) {
      setSignupView(true);
    } else {
      setSignupView(false);
    }
  }

  function handleSignIn() {
    if (signinView === false) {
      setSigninView(true);
    } else {
      setSigninView(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand / Logo (Unified to NoteSpace) */}
        <Link
          to="/"
          className="text-xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-2"
        >
          <span className="w-3 h-3 rounded-full bg-lime-500 inline-block"></span>
          NoteSpace
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
          >
            Features
          </a>
          <a
            href="#testimonials"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
          >
            Testimonials
          </a>
          <span className="text-xs bg-lime-100 text-lime-800 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
            100% Free
          </span>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={handleSignUp}
            className="text-sm font-semibold text-zinc-700 hover:text-zinc-950 transition-colors px-3 py-2 cursor-pointer"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={handleSignIn}
            className="text-sm font-semibold text-zinc-950 bg-lime-400 hover:bg-lime-500 px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm active:scale-95"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-zinc-800 focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-200 px-6 py-6 flex flex-col gap-4 shadow-lg">
          <a
            href="#features"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-zinc-700 hover:text-zinc-950 py-1"
          >
            Features
          </a>
          <a
            href="#testimonials"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-zinc-700 hover:text-zinc-950 py-1"
          >
            Testimonials
          </a>
          <div className="text-sm font-semibold text-lime-700 bg-lime-50 px-3 py-2 rounded-lg text-center">
            🎉 Completely Free to Use
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t border-zinc-100">
            <Link
              to="/signin"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 font-semibold text-zinc-800 hover:bg-zinc-100 rounded-xl transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 font-semibold text-zinc-950 bg-lime-400 hover:bg-lime-500 rounded-xl transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}

      {signinView && (
        <SignIn
          onClose={() => setSigninView(false)}
          onSwitchToSignUp={() => {
            setSigninView(false);
            setSignupView(true);
          }}
        />
      )}
      
      {signupView && (
        <SignUp
          onClose={() => setSignupView(false)}
          onSwitchToSignIn={() => {
            setSignupView(false);
            setSigninView(true);
          }}
        />
      )}
    </header>
  );
}

export default HomeHeader;
