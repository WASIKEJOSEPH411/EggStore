import React, { useEffect, useState } from "react";
import axios from "axios";
import TopBar from "../TopBar/TopBar";
import "./ChickenProduct.css";

const ChickenProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/addchickenproduct/chicken");
        setProducts(response.data);
      } catch (error) {
        console.error(" Error fetching products:", error.message);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <TopBar />
      <div className="chicken-product">
        <h2>Our Chicken Products</h2>

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
          <div className="product-list">
            {products.length === 0 ? (
              <p>No chicken products available.</p>
            ) : (
              products.map((product) => (
                <div key={product._id} className="product-card">
                  <img
                    src={product.img ? `http://localhost:5000${product.img}` : "/placeholder.jpg"}
                    alt={product.name}
                    className="product-image"
                  />
                  <h3>{product.name}</h3>
                  <p className="price">KES {product.price} per kg</p>
                  <p>{product.description}</p>
                  <button className="product-btn">Order Now</button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChickenProduct;
