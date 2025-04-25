import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./AdminDrinkList.css";
import AdminTopBar from "../AdminTopBar/AdminTopBar";

const AdminDrinkList = () => {
  const [drinks, setDrinks] = useState([]);
  const navigate = useNavigate();

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
    navigate(`/editdrinkproduct/${drink._id}`, { state: { drink } });
  };

  return (
    <div className="page-wrapper">
      <AdminTopBar />
      <div className="admin-drink-container">
        <div className="header">
          <h2>Our Refreshing Drinks</h2>
          {/* Optional: add a search bar or filter here */}
        </div>
        <div className="drinks-list">
          {drinks.length > 0 ? (
            drinks.map((drink) => (
              <div className="drink-card" key={drink._id}>
                <img
                  src={`http://localhost:5000${drink.img}`}
                  alt={drink.name}
                  className="drink-image"
                />
                <h3>{drink.name}</h3>
                <p className="drink-description">{drink.description}</p>
                <p className="drink-price">Price: KES {drink.price}</p>
                <button
                  onClick={() => handleEdit(drink)}
                  className="edit-btn"
                >
                  Edit
                </button>
              </div>
            ))
          ) : (
            <p className="no-results">No drinks found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDrinkList;
