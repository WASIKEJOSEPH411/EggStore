import React, { useState } from "react";
import axios from "axios";
import AdminTopBar from "../AdminTopBar/AdminTopBar";
import "./AddGradeEgg.css"; // Import CSS file

const AddGradeEgg = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    size: "",
    description: "",
  });

  const [message, setMessage] = useState(""); // Success/Error messages
  const [loading, setLoading] = useState(false); // Loading state

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:4000/admin/add-grade-egg", formData); // API call

      setMessage("Grade Egg added successfully!");
      setFormData({ name: "", price: "", quantity: "", size: "", description: "" }); // Reset form
    } catch (error) {
      console.error("Error adding Grade Egg:", error); // Log error
      setMessage("Error adding Grade Egg. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminTopBar />
      <div className="add-grade-egg-container">
        <h2>Add Grade Egg</h2>

        {message && <p className="message">{message}</p>} {/* Display messages */}

        <form onSubmit={handleSubmit} className="add-grade-egg-form">
          <label>Egg Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Price (KSh):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />

          <label>Size:</label>
          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
          >
            <option value="">Select Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>

          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="add-btn" disabled={loading}>
            {loading ? "Adding..." : "Add Grade Egg"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGradeEgg;
