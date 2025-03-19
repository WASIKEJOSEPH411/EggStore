import React, { useState } from "react";
import axios from "axios";
import AdminTopBar from "../AdminTopBar/AdminTopBar";
import "./AddDrinks.css";

const AddDrinks = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    image: null, // Image file
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const drinkData = new FormData();
    drinkData.append("name", formData.name);
    drinkData.append("price", formData.price);
    drinkData.append("quantity", formData.quantity);
    drinkData.append("description", formData.description);
    drinkData.append("image", formData.image);

    try {
      await axios.post("http://localhost:5000/drinks/drinks", drinkData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Drink added successfully!");
      setFormData({ name: "", price: "", quantity: "", description: "", image: null });
    } catch (error) {
      console.error("Error adding drink:", error);
      setMessage("Error adding drink. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminTopBar />
      <div className="add-drinks-container">
        <h2>Add Drinks</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit} className="add-drinks-form">
          <label>Drink Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Price (KSh):</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />

          <label>Quantity:</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />

          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>

          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} required />

          <button type="submit" className="add-btn" disabled={loading}>
            {loading ? "Adding..." : "Add Drink"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDrinks;
