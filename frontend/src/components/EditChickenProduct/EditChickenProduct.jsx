import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminTopBar from "../AdminTopBar/AdminTopBar";
import axios from "axios";
import "./EditChickenProduct.css";

const EditChickenProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productState = location.product;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: "",
    category: "",
    available: false,
    quantity: "",
    description: "",
  });

  // Fetch product details on mount
  useEffect(() => {
    if (productState) {
      setEditedProduct({
        name: productState.name || "",
        price: productState.price || "",
        category: productState.category || "",
        available: productState.available || false,
        quantity: productState.quantity || "",
        description: productState.description || "",
        img: productState.img || "",
      });
      setLoading(false);
    } else {
      // Fallback: Fetch from API if state is not available
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/addchickenproduct/chicken/${id}`);
          setEditedProduct(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
      fetchProduct();
    }
  }, [id, productState]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: name === "available" ? value === "true" : value, // Convert string to boolean for availability
    }));
  };

  // Handle form submission (Update product)
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/addchickenproduct/addchickenproduct/${id}`, editedProduct);
      alert("Product updated successfully!");
      navigate("/adminchikenlisting");
    } catch (error) {
      console.error("Failed to update product:", error);
      setError("Error updating product. Please try again.");
    }
  };

  // Handle product deletion
  const handleRemove = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/addchickenproduct/addchickenproduct/${id}`);
        alert("Product deleted successfully!");
        navigate("/adminchikenlisting");
      } catch (error) {
        console.error("Failed to delete product:", error);
        setError("Error deleting product. Please try again.");
      }
    }
  };

  return (
    <div className="edit-chicken-product">
      <AdminTopBar />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="edit-form-container">
          <h2>Edit Chicken Product</h2>
          <form className="edit-form">
            <label>Name:</label>
            <input type="text" name="name" value={editedProduct.name} onChange={handleChange} />

            <label>Price (KES):</label>
            <input type="number" name="price" value={editedProduct.price} onChange={handleChange} />

            <label>Category:</label>
            <input type="text" name="category" value={editedProduct.category} onChange={handleChange} />

            <label>Available:</label>
            <select name="available" value={editedProduct.available} onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

            <label>Quantity:</label>
            <input type="number" name="quantity" value={editedProduct.quantity} onChange={handleChange} />

            <label>Description:</label>
            <textarea name="description" value={editedProduct.description} onChange={handleChange}></textarea>

            <div className="button-group">
              <button type="button" onClick={handleUpdate} className="save-btn">
                Save Changes
              </button>
              <button type="button" onClick={handleRemove} className="remove-btn">
                Delete Product
              </button>
              <button type="button" onClick={() => navigate("/adminchikenlisting")} className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditChickenProduct;
