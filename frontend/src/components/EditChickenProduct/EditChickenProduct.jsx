import React, { useState } from "react";
import AdminTopBar from "../AdminTopBar/AdminTopBar";
import "./EditChickenProduct.css"; // Import CSS file

const EditChickenProduct = () => {
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
    console.log("Updated Chicken Product Data:", formData);
    // Send updated data to backend (API request)
  };

  // Handle product removal
  const handleRemove = () => {
    if (window.confirm("Are you sure you want to remove this product?")) {
      console.log("Product Removed:", formData);
      setFormData({ name: "", price: "", description: "", stock: "" });
      // API call to remove the product from the backend
    }
  };

  return (
    <div>
      <AdminTopBar />
      <div className="edit-chicken-container">
        <h2>Edit Chicken Product</h2>
        <form onSubmit={handleSubmit} className="edit-chicken-form">
          <label>Product Name:</label>
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

          <div className="button-group">
            <button type="submit" className="edit-btn">Update Product</button>
            <button type="button" className="remove-btn" onClick={handleRemove}>Remove Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditChickenProduct;
