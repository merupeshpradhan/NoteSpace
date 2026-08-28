import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeHeader from "../../components/Layout/Navbar/HomeHeader.jsx";
import Footer from "../../components/Layout/Footer/HomeFooter.jsx";
import SignIn from "../../components/Auth/SignIn.jsx";
import SignUp from "../../components/Auth/SignUp.jsx";

export default function About() {
  const [signInView, setSignInView] = useState(false);
  const [SignUpView, setSignUpView] = useState(false);

  useEffect(() => {
    if (signInView || SignUpView) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  function handleSignIn() {
    setSignInView((prev) => !prev);
  }

  function handleSignUp() {
    SignUpView((prev) => !prev);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between">
      {/* Standard Site Navbar */}
      <HomeHeader />

      {/* Main About Content */}
      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-12 w-full">
        {/* Header Section */}
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            About <span className="text-lime-400">NoteSpace</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl">
            Built for modern teams and creators who need speed, minimal design,
            and zero friction when capturing brilliant ideas.
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-lime-400">Our Mission</h2>
          <p className="text-zinc-300 leading-relaxed">
            We believe that thoughts shouldn't get lost in messy folders or
            slow, bloated software. NoteSpace provides a clean, lightning-fast
            environment designed to amplify your workflow, keep your thoughts
            organized, and help you collaborate seamlessly.
          </p>
        </div>

        {/* Features / Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-3">
            <h3 className="text-xl font-semibold text-white">Lightning Fast</h3>
            <p className="text-zinc-400 text-sm">
              Optimized performance ensures your notes load instantly, keeping
              pace with your speed of thought.
            </p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-3">
            <h3 className="text-xl font-semibold text-white">
              Designed for Focus
            </h3>
            <p className="text-zinc-400 text-sm">
              A distraction-free dark interface framed with sleek lime accents
              lets you focus entirely on your content.
            </p>
          </div>
        </div>

        {/* Call to Action Footer inside content */}
        <div className="pt-6 flex items-center justify-between border-t border-zinc-800">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm font-medium text-zinc-400 hover:text-lime-400 transition-colors"
          >
            &larr; Back to Home
          </Link>
          <button
            onClick={handleSignIn}
            className="px-6 py-3 bg-lime-400 text-black font-semibold rounded-xl hover:bg-lime-300 transition-all cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </main>

      {/* Standard Site Footer */}
      <Footer />
      {signInView && (
        <SignIn
          onClose={() => setSignInView(false)}
          onSwitchToSignUp={() => {
            setSignInView(false);
            setSignUpView(true);
          }}
        />
      )}

      {SignUpView && (
        <SignUp
          onClose={() => setSignUpView(false)}
          onSwitchToSignIn={() => {
            setSignUpView(false);
            setSignInView(true);
          }}
        />
      )}
    </div>
  );
}
