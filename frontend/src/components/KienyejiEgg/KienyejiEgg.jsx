import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import "./KienyejiEgg.css";

const API_URL = "http://localhost:5000/kienyejiegg/kienyejiegg";

const KienyejiEgg = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setError("Failed to load Kienyeji Eggs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Function to add items to cart and update quantity if already added
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
      <div className="kienyeji-egg-section">
        <h2>Kienyeji Eggs</h2>

        {/* ✅ View Cart Button with item count */}
        <button onClick={goToCart} className="cart-btn">
          View Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
        </button>

        {/* ✅ Loading & Error Handling */}
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
              <p>No Kienyeji Eggs available.</p>
            ) : (
              products.map((product) => (
                <div key={product._id} className="egg-card">
                  <img
                    src={product.imageUrl ? `http://localhost:5000${product.imageUrl}` : "/placeholder.jpg"}
                    alt={product.name}
                    className="egg-image"
                  />
                  <h3>{product.name}</h3>
                  <p className="price">KSh {product.price} per tray</p>
                  <p>{product.description}</p>
                  <button className="egg-btn" onClick={() => handleAddToCart(product)}>
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

export default KienyejiEgg;
