import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopBar from "../TopBar/TopBar";
import "./ChickenProduct.css";

const ChickenProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/addchickenproduct/chicken");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Add to Cart Function (Prevents Duplicates & Updates Quantity)
  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const newCart = [...cart, { ...product, quantity: 1 }];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }

    alert(`${product.name} added to cart!`);
  };

  // ✅ Navigate to Cart Page
  const goToCart = () => {
    navigate("/order");
  };

  return (
    <div>
      <TopBar />
      <div className="chicken-product">
        <h2>Our Chicken Products</h2>

        {/* ✅ View Cart Button (Shows Total Items in Cart) */}
        <button onClick={goToCart} className="cart-btn">
          View Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
        </button>

        {/* ✅ Handle Loading & Errors */}
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
                  <button className="product-btn" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
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
