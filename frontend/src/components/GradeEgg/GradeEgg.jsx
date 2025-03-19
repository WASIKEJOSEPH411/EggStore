import React, { useState, useEffect } from "react";
import axios from "axios";
import TopBar from "../TopBar/TopBar";
import "./Grade.css";

const GradeEgg = () => {
  const [gradeEggs, setGradeEggs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGradeEggs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/gradeegg/gradeeggs");
        setGradeEggs(response.data);
      } catch (error) {
        setError(`Failed to load Grade Eggs: ${error.message}`);
      }
    };

    fetchGradeEggs();
  }, []);

  return (
    <div>
      <TopBar />
      <div className="grade-egg-section">
        <h2>Grade A Eggs</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="egg-list">
          {gradeEggs.length > 0 ? (
            gradeEggs.map((egg) => (
              <div key={egg._id} className="egg-card">
                <img src={egg.imageUrl} alt={egg.name} />
                <h3>{egg.name}</h3>
                <p>{egg.description}</p>
                <p className="price">KSh {egg.price} per tray</p>
                <button className="egg-btn">Order Now</button>
              </div>
            ))
          ) : (
            <p>Loading grade eggs...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GradeEgg;
