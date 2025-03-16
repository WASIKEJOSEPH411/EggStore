import React, { useState } from "react";
import AdminTopBar from "../AdminTopBar/AdminTopBar";
import "./EditDrinks.css"; // Import CSS file

const EditDrinks = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Drink Data:", formData);
    // Add API request logic to update drink details in the backend
  };

  return (
    <div>
      <AdminTopBar />
      <div className="edit-drinks-container">
        <h2>Edit Drink</h2>
        <form onSubmit={handleSubmit} className="edit-drinks-form">
          <label>Drink Name:</label>
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

          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          <label>Stock Quantity:</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />

          <button type="submit" className="edit-btn">Update Drink</button>
        </form>
      </div>
    </div>
  );
};

export default EditDrinks;
