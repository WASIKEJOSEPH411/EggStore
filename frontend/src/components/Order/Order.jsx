import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopBar from "../TopBar/TopBar";
import "./Order.css";

const Order = () => {
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Load cart from local storage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Kenyan Phone Number Validation
  const isValidPhoneNumber = (phone) => /^(\+254|0)7\d{8}$/.test(phone);

  // Clear Cart
  const clearCart = () => {
    if (cart.length === 0) {
      setError("Cart is already empty.");
      return;
    }
    setCart([]);
    localStorage.removeItem("cart");
    setSuccessMessage("Cart cleared successfully!");
  };

  // Handle Order Placement
  const handleOrder = async () => {
    setError("");
    setSuccessMessage("");

    // Validate customer details
    if (!customer.name || !customer.phone) {
      setError("Please enter your name and phone number.");
      return;
    }

    if (!isValidPhoneNumber(customer.phone)) {
      setError("Please enter a valid Kenyan phone number.");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        customer,
        items: cart,
        total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      };

      // POST request to create the order
      await axios.post("http://localhost:5000/order/orders", orderData);
      setSuccessMessage("Order placed successfully!");
      clearCart(); // Clear cart after successful order

      setTimeout(() => navigate("/order-confirmation"), 2000);
    } catch (err) {
      setError("Failed to place order. Please try again.");
      console.error("Order error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-container">
      <TopBar />
      <h2>Your Order</h2>

      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <div className="customer-details">
        <input
          type="text"
          placeholder="Your Name"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Your Phone Number"
          value={customer.phone}
          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
        />
      </div>

      {cart.length > 0 ? (
        <ul className="order-list">
          {cart.map((item, index) => (
            <li key={index} className="order-item">
              <img
                src={item.image ? `http://localhost:5000${item.image}` : "/placeholder.jpg"}
                alt={item.name}
                className="order-img"
              />
              <div>
                <p className="order-name">{item.name}</p>
                <p className="order-price">
                  KES {item.price} x {item.quantity} = KES {item.price * item.quantity}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <h3 className="total-amount">
        Total: KES {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
      </h3>

      <div className="buttons">
        <button onClick={handleOrder} className="order-btn" disabled={loading}>
          {loading ? "Placing Order..." : "Place Order"}
        </button>

        <button onClick={clearCart} className="clear-cart-btn">
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Order;
