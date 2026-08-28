import { useEffect, useState } from "react";
import HomeHeader from "../../components/Layout/Navbar/HomeHeader.jsx";
import HeroSection from "../../components/HomePageView/HeroSection.jsx";
import Feature from "../../components/HomePageView/Feature.jsx";
import SocialProof from "../../components/HomePageView/SocialProof.jsx";
import Footer from "../../components/Layout/Footer/HomeFooter.jsx";
import SignIn from "../../components/Auth/SignIn.jsx";
import SignUp from "../../components/Auth/SignUp.jsx";

function Home() {
  const [signinView, setSigninView] = useState(false);
  const [signupView, setSignupView] = useState(false);

  useEffect(() => {
    if (signinView || signupView) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [signinView, signupView]);

  function handleSignIn() {
    setSigninView((prev) => !prev);
  }

  function handleSignUp() {
    setSignupView((prev) => !prev);
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-white overflow-x-hidden scroll-smooth">
      {/* Sticky Header */}
      <HomeHeader
        handleSignIn={handleSignIn}
        handleSignUp={handleSignUp}
        setSigninView={setSigninView}
        setSignupView={setSignupView}
        signinView={signinView}
        signupView={signupView}
      />

      {/* Main Page Flow Sections with Matching IDs */}
      <main className="flex-1 flex flex-col">
        <HeroSection handleSignIn={handleSignIn} handleSignUp={handleSignUp} />

        {/* Testimonials link will scroll here */}
        <div id="testimonials">
          <SocialProof />
        </div>

        {/* Features link will scroll here */}
        <div id="features">
          <Feature />
        </div>
      </main>

      {/* Footer */}
      <Footer />

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
    </div>
  );
}

export default Home;
