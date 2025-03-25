import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminTopBar from "../AdminTopBar/AdminTopBar";
import "./EditDrinks.css"; // Import styles

const EditDrinks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const drink = location.state?.drink; // Get drink data passed from AdminDrinkList

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    available: "true",
    quantity: "",
    description: "",
  });

  // Populate form with existing drink data
  useEffect(() => {
    if (drink) {
      setFormData({
        name: drink.name || "",
        price: drink.price || "",
        category: drink.category || "",
        available: drink.available ? "true" : "false",
        quantity: drink.quantity || "",
        description: drink.description || "",
      });
    }
  }, [drink]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/drinks/drinks/${drink._id}`, formData);
      alert("Drink updated successfully!");
      navigate("/admindrinklist"); // Redirect back to drinks list
    } catch (error) {
      console.error("Error updating drink:", error);
      alert("Failed to update drink. Try again.");
    }
  };

  // Handle drink deletion
  const handleRemove = async () => {
    if (window.confirm("Are you sure you want to delete this drink?")) {
      try {
        await axios.delete(`http://localhost:5000/drinks/drinks/${drink._id}`);
        alert("Drink deleted successfully!");
        navigate("/admindrinklist");
      } catch (error) {
        console.error("Error deleting drink:", error);
        alert("Failed to delete drink. Try again.");
      }
    }
  };

  return (
    <div>
      <AdminTopBar />
      <div className="edit-form-container">
        <h2>Edit Drink</h2>
        <form className="edit-form">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />

          <label>Price (KES):</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} />

          <label>Category:</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} />

          <label>Available:</label>
          <select name="available" value={formData.available} onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          <label>Quantity:</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />

          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange}></textarea>

          <div className="button-group">
            <button type="button" onClick={handleUpdate} className="save-btn">
              Save Changes
            </button>
            <button type="button" onClick={handleRemove} className="remove-btn">
              Delete Product
            </button>
            <button type="button" onClick={() => navigate("/drinks/drinks")} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDrinks;
