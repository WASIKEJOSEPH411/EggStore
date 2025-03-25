import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./AdminDrinkList.css";
import AdminTopBar from "../AdminTopBar/AdminTopBar";

const AdminDrinkList = () => {
  const [drinks, setDrinks] = useState([]);
  const navigate = useNavigate(); // Initialize navigation

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

  const handleEdit = (drink) => {
    navigate(`/editdrinkproduct/${drink._id}`, { state: { drink } }); // Navigate to edit page
  };

  return (
    <div>
      <AdminTopBar />
      <div className="drinks-section">
        <h2>Our Refreshing Drinks</h2>
        <div className="drinks-list">
          {drinks.map((drink) => (
            <div className="drink-card" key={drink._id}>
              <img src={`http://localhost:5000${drink.img}`} alt={drink.name} />
              <h3>{drink.name}</h3>
              <p>{drink.description}</p>
              <p className="price">Price: KES {drink.price}</p>
              <button onClick={() => handleEdit(drink)} className="product-btn">
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDrinkList;
