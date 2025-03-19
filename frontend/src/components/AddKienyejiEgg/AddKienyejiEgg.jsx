import React, { useState } from "react";
import AdminTopBar from "../AdminTopBar/AdminTopBar";
import "./AddKienyejiEgg.css";
import axios from "axios";

const AddKienyejiEgg = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    origin: "",
    description: "",
    image: null,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      await axios.post("http://localhost:5000/kienyejiegg/kienyejiegg", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Kienyeji Egg added successfully!");
      setFormData({ name: "", price: "", quantity: "", origin: "", description: "", image: null });

      // Reset file input
      document.querySelector('input[type="file"]').value = "";
    } catch (error) {
      console.error("Error adding Kienyeji Egg:", error.response?.data || error.message);
      setMessage("Error adding Kienyeji Egg. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminTopBar />
      <div className="add-kienyeji-egg-container">
        <h2>Add Kienyeji Egg</h2>

        {message && <p className="message">{message}</p>}

        <form onSubmit={handleSubmit} className="add-kienyeji-egg-form" encType="multipart/form-data">
          <label>Egg Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Price (KSh):</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />

          <label>Quantity:</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />

          <label>Origin:</label>
          <select name="origin" value={formData.origin} onChange={handleChange} required>
            <option value="">Select Origin</option>
            <option value="Local Farm">Local Farm</option>
            <option value="Upcountry">Upcountry</option>
          </select>

          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>

          <label>Upload Image:</label>
          <input type="file" name="image" accept="image/*" onChange={handleImageChange} required />

          <button type="submit" className="add-btn" disabled={loading}>
            {loading ? "Adding..." : "Add Kienyeji Egg"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddKienyejiEgg;
