import React, { useEffect, useState } from "react";
import axios from "axios";
import TopBar from "../TopBar/TopBar";
import "./Drinks.css";

const Drinks = () => {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/drinks/drinks");
        setDrinks(response.data);
      } catch (error) {
        console.error("Error fetching drinks:", error);
      }
    };

    fetchDrinks();
  }, []);

  return (
    <div>
      <TopBar />
      <div className="drinks-section">
        <h2>Our Refreshing Drinks</h2>
        <div className="drinks-list">
          {drinks.map((drink) => (
            <div className="drink-card" key={drink._id}>
              <img src={`http://localhost:5000${drink.img}`} alt={drink.name} />
              <h3>{drink.name}</h3>
              <p>{drink.description}</p>
              <p className="price">Price: KES {drink.price}</p>
              <button className="drink-btn">Order Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Drinks;
