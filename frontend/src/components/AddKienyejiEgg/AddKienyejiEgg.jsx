import React, { useState } from "react";
import AdminTopBar from "../AdminTopBar/AdminTopBar";
import "./AddKienyejiEgg.css"; // Import CSS file
import axios from "axios";

const AddKienyejiEgg = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    origin: "",
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
      await axios.post("http://localhost:4000/admin/add-kienyeji-egg", formData); // API call

      setMessage("Kienyeji Egg added successfully!");
      setFormData({ name: "", price: "", quantity: "", origin: "", description: "" }); // Reset form
    } catch (error) {
      console.error("Error adding Kienyeji Egg:", error); // Log error
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

        {message && <p className="message">{message}</p>} {/* Display messages */}

        <form onSubmit={handleSubmit} className="add-kienyeji-egg-form">
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

          <label>Origin:</label>
          <select
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            required
          >
            <option value="">Select Origin</option>
            <option value="Local Farm">Local Farm</option>
            <option value="Upcountry">Upcountry</option>
          </select>

          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="add-btn" disabled={loading}>
            {loading ? "Adding..." : "Add Kienyeji Egg"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddKienyejiEgg;
