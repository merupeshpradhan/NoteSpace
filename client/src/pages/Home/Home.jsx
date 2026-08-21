import React from "react";
import HomeHeader from "../../components/HomeHeader.jsx";
import HeroSection from "../../components/HeroSection.jsx";
import Feature from "../../components/Feature.jsx";
import SocialProof from "../../components/SocialProof.jsx";
import Footer from "../../components/Footer.jsx";

function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white overflow-x-hidden scroll-smooth">
      {/* Sticky Header */}
      <HomeHeader />

      {/* Main Page Flow Sections with Matching IDs */}
      <main className="flex-1 flex flex-col">
        <HeroSection />

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
    </div>
  );
}

export default Home;
