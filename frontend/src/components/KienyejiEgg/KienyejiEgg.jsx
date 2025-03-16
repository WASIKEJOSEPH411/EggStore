import React from "react";
import TopBar from "../TopBar/TopBar"; // Ensure correct path to TopBar component
import "./KienyejiEgg.css"; // Ensure you have a CSS file for styling

// Import Egg Image
import kienyejiegg from "../../assets/kienyejiegg.jpg"; // Ensure the image exists in this path

const KienyejiEgg = () => {
  return (
    <div>
      <TopBar /> {/* Include TopBar for navigation */}
      <div className="kienyeji-egg-section">
        <h2>Kienyeji Eggs</h2>
        <div className="egg-card">
          <img src={kienyejiegg} alt="Kienyeji Eggs" />
          <h3>Kienyeji Eggs - Per Tray</h3>
          <p>Fresh, organic Kienyeji eggs rich in flavor and nutrition.</p>
          <p className="price">KSh 600 per tray</p>
          <button className="egg-btn">Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default KienyejiEgg;
