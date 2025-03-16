import React from "react";
import "./Hero.css"; 
import backgroundImage from "../../assets/eggstorebg.jpg"; // Import the image

const Hero = () => {
  return (
    <div className="hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="overlay"></div>
      <div className="hero-content">
        <h1>Welcome to Our Store</h1>
        <p>Fresh eggs, chicken products, and refreshing drinks.</p>
        <button className="hero-btn">Shop Now</button>
      </div>
    </div>
  );
};

export default Hero;
