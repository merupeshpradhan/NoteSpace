import HomeHeader from "../../components/HomeHeader.jsx";
import HeroSection from "../../components/HeroSection.jsx";
import Feature from "../../components/Feature.jsx";
import SocialProof from "../../components/SocialProof.jsx";
import Footer from "../../components/Footer.jsx";

function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-between">
      <HomeHeader />
      <HeroSection />
      <Feature />
      <SocialProof />
      <Footer />
    </div>
  );
}

export default Home;
