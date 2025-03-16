import React, { useState } from "react";
import axios from "axios";
import AdminTopBar from "../AdminTopBar/AdminTopBar";
import "./AddChickenProduct.css";

const AddChickenProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    image: null,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Check if image is selected
    if (!formData.image) {
      setMessage("❌ Please select an image.");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("quantity", formData.quantity);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("available", true); // Default value
      formDataToSend.append("category", "Chicken"); // Example category
      formDataToSend.append("image", formData.image);

      console.log("📤 Sending FormData:", Object.fromEntries(formDataToSend));

      await axios.post("http://localhost:5000/addchickenproduct/addchickenproduct", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Chicken product added successfully!");
      setFormData({ name: "", price: "", quantity: "", description: "", image: null });
    } catch (error) {
      console.error("❌ Error adding chicken product:", error.response?.data || error.message);
      setMessage("❌ Error adding chicken product. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminTopBar />
      <div className="add-chicken-product-container">
        <h2>Add Chicken Product</h2>

        {message && <p className={`message ${message.includes("Error") ? "error" : "success"}`}>{message}</p>}

        <form onSubmit={handleSubmit} className="add-chicken-product-form">
          <label>Product Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Price (KSh):</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />

          <label>Quantity:</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />

          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>

          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} required />

          <button type="submit" className="add-btn" disabled={loading}>
            {loading ? "Adding..." : "Add Chicken Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddChickenProduct;
