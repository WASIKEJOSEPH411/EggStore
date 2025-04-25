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
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const isValidPhoneNumber = (phone) => /^(?:2547\d{8})$/.test(phone);
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

  const sendSTKPush = async (phone, amount) => {
    try {
      const response = await axios.post("http://localhost:5000/mpesa/stkpush", {
        phone,
        amount,
      });
      return response.data;
    } catch (error) {
      console.error("STK Push Error:", error.response?.data || error.message);
      throw new Error("Failed to initiate payment. Please try again.");
    }
  };

  const handleOrder = async () => {
    setError("");
    setSuccessMessage("");

    if (!customer.name || !customer.phone || !customer.email || !customer.address) {
      setError("Please fill in all customer details.");
      return;
    }

    if (!isValidPhoneNumber(customer.phone)) {
      setError("Please enter a valid Kenyan phone number (e.g., 254712345678).");
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

    const itemsWithProductId = cart.map((item) => ({
      ...item,
      productId: item._id || item.id,
    }));

    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    setLoading(true);

    try {
      const mpesaResponse = await sendSTKPush(customer.phone, totalAmount);

      if (mpesaResponse.ResponseCode === "0") {
        alert("You will receive an M-Pesa prompt. Complete the payment to finish your order.");

        // Only place order after prompt success
        const orderData = {
          customer,
          items: itemsWithProductId,
          total: totalAmount,
        };

        await axios.post("http://localhost:5000/order/orders", orderData);
        setSuccessMessage("Order placed successfully!");
        clearCart();
        setTimeout(() => navigate("/"), 2000);
      } else {
        throw new Error(mpesaResponse.CustomerMessage || "Payment failed. Please try again.");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      setError(err.message || "An error occurred while placing the order.");
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
          placeholder="Your Phone Number (e.g., 254712345678)"
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
                src={
                  item.image
                    ? `http://localhost:5000${item.image}`
                    : "/placeholder.jpg"
                }
                alt={item.name}
                className="order-img"
              />
              <div>
                <p className="order-name">{item.name}</p>
                <p className="order-price">
                  KES {item.price} x {item.quantity} = KES{" "}
                  {item.price * item.quantity}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <h3 className="total-amount">
        Total: KES{" "}
        {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
      </h3>

      <div className="buttons">
        <button
          onClick={() => {
            if (cart.length > 0) {
              setShowConfirmModal(true);
            } else {
              setError("Your cart is empty.");
            }
          }}
          className="order-btn"
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

        <button onClick={clearCart} className="clear-cart-btn" disabled={loading}>
          Clear Cart
        </button>
      </div>

      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Order</h3>
            <p>Phone: <strong>{customer.phone}</strong></p>
            <p>Total Amount: <strong>KES {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</strong></p>
            <p>Proceed to pay via M-Pesa?</p>
            <div className="modal-buttons">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  handleOrder();
                }}
                className="confirm-btn"
              >
                Yes, Continue
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
