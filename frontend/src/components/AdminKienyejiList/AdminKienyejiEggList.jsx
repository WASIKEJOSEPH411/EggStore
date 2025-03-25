import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


import "./AdminKienyejiEggList.css"; // Fixed missing extension
import AdminTopBar from "../AdminTopBar/AdminTopBar";

const API_URL = "http://localhost:5000/kienyejiegg/kienyejiegg";

const AdminKienyejiEggList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Hook to navigate

  const handleEdit = (product) => {
    navigate(`/editkienyejiegg/${product._id}`, { state: { product } }); // Pass product data
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setError("Failed to load Kienyeji eggs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <AdminTopBar/>

      <div className="kienyeji-egg-section">
        <h2>Kienyeji Eggs</h2>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <div className="error-container">
            <p className="error">{error}</p>
            <button onClick={() => window.location.reload()} className="retry-btn">
              Retry
            </button>
          </div>
        ) : (
          <div className="egg-list">
            {products.length === 0 ? (
              <p>No Kienyeji eggs available.</p>
            ) : (
              products.map((product) => (
                <div className="egg-card" key={product._id || product.id}>
                  <img 
                    src={product.imageUrl ? `http://localhost:5000${product.imageUrl.startsWith("/") ? product.imageUrl : `/uploads/${product.imageUrl}`}` : "/placeholder.jpg"} 
                    alt={product.name} 
                    className="egg-image"
                  />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p className="price">KSh {product.price} per tray</p>
                  <button onClick={() => handleEdit(product)} className="egg-btn">Edit</button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminKienyejiEggList;
