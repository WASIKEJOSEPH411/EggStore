import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopBar from "../TopBar/TopBar";
import "./Grade.css";

const GradeEgg = () => {
  const [gradeEggs, setGradeEggs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGradeEggs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/gradeegg/gradeeggs");
        setGradeEggs(response.data);
      } catch (error) {
        console.error("Error fetching grade eggs:", error.message);
        setError("Failed to load Grade A Eggs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGradeEggs();
  }, []);

  // ✅ Add to Cart Function (Prevents Duplicates & Updates Quantity)
  const handleAddToCart = (egg) => {
    const existingItem = cart.find((item) => item._id === egg._id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item._id === egg._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const newCart = [...cart, { ...egg, quantity: 1 }];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }

    alert(`${egg.name} added to cart!`);
  };

  // ✅ Navigate to Cart Page
  const goToCart = () => {
    navigate("/order");
  };

  return (
    <div>
      <TopBar />
      <div className="grade-egg-section">
        <h2>Grade A Eggs</h2>

        {/* ✅ View Cart Button (Shows Total Items in Cart) */}
        <button onClick={goToCart} className="cart-btn">
          View Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
        </button>

        {/* ✅ Handle Loading & Errors */}
        {loading ? (
          <p>Loading eggs...</p>
        ) : error ? (
          <div className="error-container">
            <p className="error">{error}</p>
            <button onClick={() => window.location.reload()} className="retry-btn">
              Retry
            </button>
          </div>
        ) : (
          <div className="egg-list">
            {gradeEggs.length === 0 ? (
              <p>No Grade A Eggs available.</p>
            ) : (
              gradeEggs.map((egg) => (
                <div key={egg._id} className="egg-card">
                  <img
                    src={egg.imageUrl ? `http://localhost:5000${egg.imageUrl}` : "/placeholder.jpg"}
                    alt={egg.name}
                    className="egg-image"
                  />
                  <h3>{egg.name}</h3>
                  <p className="price">KSh {egg.price} per tray</p>
                  <p>{egg.description}</p>
                  <button className="egg-btn" onClick={() => handleAddToCart(egg)}>
                    Add to Cart
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GradeEgg;
