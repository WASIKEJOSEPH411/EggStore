import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopBar from "../TopBar/TopBar";
import "./Order.css";

const Order = () => {
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({ 
    name: "", 
    phone: "",
    email: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const isValidPhoneNumber = (phone) => /^(\+254|0)7\d{8}$/.test(phone);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const clearCart = () => {
    if (cart.length === 0) {
      setError("Cart is already empty.");
      return;
    }
    setCart([]);
    localStorage.removeItem("cart");
    setSuccessMessage("Cart cleared successfully!");
  };

  const handleOrder = async () => {
    setError("");
    setSuccessMessage("");

    // Validate customer details
    if (!customer.name || !customer.phone || !customer.email || !customer.address) {
      setError("Please fill in all customer details.");
      return;
    }

    if (!isValidPhoneNumber(customer.phone)) {
      setError("Please enter a valid Kenyan phone number.");
      return;
    }

    if (!isValidEmail(customer.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    // Ensure each cart item has a productId
    const itemsWithProductId = cart.map(item => ({
      ...item,
      productId: item._id || item.id 
    }));

    setLoading(true);

    try {
      const orderData = {
        customer,
        items: itemsWithProductId,
        total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      };

       await axios.post("http://localhost:5000/order/orders", orderData);
      setSuccessMessage("Order placed successfully!");
      clearCart();

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order. Please try again.");
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
          required
        />
        <input
          type="tel"
          placeholder="Your Phone Number (e.g., 0712345678)"
          value={customer.phone}
          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={customer.email}
          onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Your Delivery Address"
          value={customer.address}
          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
          required
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