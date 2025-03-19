import React, { useState } from "react";
import axios from "axios";
import AdminTopBar from "../AdminTopBar/AdminTopBar";
import "./AddGradeEgg.css"; // Ensure styling is applied

const AddGradeEgg = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    size: "",
    description: "",
    image: null, // Image file state
  });

  const [message, setMessage] = useState(""); // Success/Error messages
  const [loading, setLoading] = useState(false); // Loading state

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("quantity", formData.quantity);
      formDataToSend.append("size", formData.size);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image", formData.image); // Append image file

      await axios.post("http://localhost:5000/gradeegg/gradeeggs", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Grade Egg added successfully!");
      setFormData({ name: "", price: "", quantity: "", size: "", description: "", image: null }); // Reset form
    } catch (error) {
      console.error("Error adding Grade Egg:", error);
      setMessage("❌ Error adding Grade Egg. Try again.");
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
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Price (KSh):</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />

          <label>Quantity:</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />

          <label>Size:</label>
          <select name="size" value={formData.size} onChange={handleChange} required>
            <option value="">Select Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>

          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>

          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} required />

          <button type="submit" className="add-btn" disabled={loading}>
            {loading ? "Adding..." : "Add Grade Egg"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGradeEgg;
