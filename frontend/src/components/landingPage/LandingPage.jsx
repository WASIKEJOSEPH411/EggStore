import React from "react";
import TopBar from "../TopBar/TopBar";
import Footer from "../Footer/Footer";
import Story from "../Story/Story";
import Hero from "../Hero/Hero";


const LandingPage = () => {
  return (
    <div className="landing-page">
      <TopBar />
      <Hero/>
      <Story/>
      <Footer />
    </div>
  );
};

export default LandingPage;
