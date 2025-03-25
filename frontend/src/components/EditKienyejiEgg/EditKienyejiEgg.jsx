import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditKienyejiEgg = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/kienyejiegg/kienyejiegg/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product data.");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/kienyejiegg/kienyejiegg/${id}`, product);
      alert("Product updated successfully!");
      navigate("/adminKienyejiegglist");
    } catch (err) {
      setError("Failed to update product.");
      console.error("Error updating product:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/kienyejiegg/kienyejiegg/${id}`);
        alert("Product deleted successfully!");
        navigate("/adminKienyejiegglist");
      } catch (err) {
        setError("Failed to delete product.");
        console.error("Error deleting product:", err);
      }
    }
  };

  return (
    <div className="edit-product-container">
      <h2>Edit Kienyeji Egg Product</h2>
      {loading ? (
        <p>Loading product details...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} required />

          <label>Description:</label>
          <textarea name="description" value={product.description} onChange={handleChange} required />

          <label>Price (KES per tray):</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} required />

          

          <button type="submit">Update Product</button>
          <button type="button" className="delete-btn" onClick={handleDelete}>Delete Product</button>
        </form>
      )}
    </div>
  );
};

export default EditKienyejiEgg;