import React, { useState } from "react";
import AdminTopBar from "../AdminTopBar/AdminTopBar";
import "./EditKienyejiEgg.css"; // Import CSS file

const EditKienyejiEgg = () => {
  const [formData, setFormData] = useState({
    price: "",
    quantity: "",
    description: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Kienyeji Egg Data:", formData);
    // Add API request logic to update kienyeji egg details in the backend
  };

  return (
    <div>
      <AdminTopBar />
      <div className="edit-kienyeji-egg-container">
        <h2>Edit Kienyeji Egg</h2>
        <form onSubmit={handleSubmit} className="edit-kienyeji-egg-form">
          <label>Price per Tray (KSh):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <label>Quantity (Trays):</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
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

          <button type="submit" className="edit-btn">Update Kienyeji Eggs</button>
        </form>
      </div>
    </div>
  );
};

export default EditKienyejiEgg;
