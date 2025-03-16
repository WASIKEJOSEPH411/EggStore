import React from "react";
import TopBar from "../TopBar/TopBar"; // Ensure the correct path to TopBar component
import "./Grade.css"; // Ensure you have a CSS file for styling

// Import Egg Image
import gradeEgg from "../../assets/gradeegg.jpg"; // Make sure the image exists in this path

const GradeEgg = () => {
  return (
    <div>
      <TopBar /> {/* Include TopBar for navigation */}
      <div className="grade-egg-section">
        <h2>Grade A Eggs</h2>
        <div className="egg-card">
          <img src={gradeEgg} alt="Grade A Eggs" />
          <h3>Grade A Eggs - Per Tray</h3>
          <p>High-quality, fresh Grade A eggs perfect for breakfast and baking.</p>
          <p className="price">KSh 450 per tray</p>
          <button className="egg-btn">Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default GradeEgg;
