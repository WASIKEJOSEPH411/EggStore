import React, { useEffect, useState } from "react";
import TopBar from "../TopBar/TopBar";
import "./KienyejiEgg.css";

// Placeholder for API URL
const API_URL = "http://localhost:5000/kienyejiegg/kienyejiegg"; // Ensure this matches your backend route

const KienyejiEgg = () => {
  const [products, setProducts] = useState([]);

  // Fetch products dynamically
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setProducts(data); // Assuming API returns an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <TopBar />
      <div className="kienyeji-egg-section">
        <h2>Kienyeji Eggs</h2>
        <div className="egg-list">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="egg-card" key={product._id || product.id}>
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">KSh {product.price} per tray</p>
                <button className="egg-btn">Order Now</button>
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KienyejiEgg;
