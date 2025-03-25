import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopBar from "../TopBar/TopBar";
import "./Drinks.css";

const Drinks = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/drinks/drinks");
        setDrinks(response.data);
      } catch (error) {
        console.error("Error fetching drinks:", error.message);
        setError("Failed to load drinks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDrinks();
  }, []);

  // ✅ Add to Cart Function (Prevents Duplicates & Updates Quantity)
  const handleAddToCart = (drink) => {
    const existingItem = cart.find((item) => item._id === drink._id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item._id === drink._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const newCart = [...cart, { ...drink, quantity: 1 }];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }

    alert(`${drink.name} added to cart!`);
  };

  // ✅ Navigate to Cart Page
  const goToCart = () => {
    navigate("/order");
  };

  return (
    <div>
      <TopBar />
      <div className="drinks-section">
        <h2>Our Refreshing Drinks</h2>

        {/* ✅ View Cart Button (Shows Total Items in Cart) */}
        <button onClick={goToCart} className="cart-btn">
          View Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
        </button>

        {/* ✅ Handle Loading & Errors */}
        {loading ? (
          <p>Loading drinks...</p>
        ) : error ? (
          <div className="error-container">
            <p className="error">{error}</p>
            <button onClick={() => window.location.reload()} className="retry-btn">
              Retry
            </button>
          </div>
        ) : (
          <div className="drinks-list">
            {drinks.length === 0 ? (
              <p>No drinks available.</p>
            ) : (
              drinks.map((drink) => (
                <div key={drink._id} className="drink-card">
                  <img
                    src={drink.img ? `http://localhost:5000${drink.img}` : "/placeholder.jpg"}
                    alt={drink.name}
                    className="drink-image"
                  />
                  <h3>{drink.name}</h3>
                  <p className="price">KES {drink.price}</p>
                  <p>{drink.description}</p>
                  <button className="drink-btn" onClick={() => handleAddToCart(drink)}>
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

export default Drinks;
