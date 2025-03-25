import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for the menu toggle
import "./TopBar.css";
import { FaUser, FaPlus } from "react-icons/fa"; 

const TopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="topbar-container">
      {/* Left Section (Sign In) */}
      <div className="left-section">
        <Link to="/signin" className="topbar-link">Sign In</Link>
        <Link to="/signup" className="topbar-link">Sign Up</Link>
      </div>

      {/* Center Section (Logo) */}
      <div className="topbar-logo">🐔 Egg Store</div>

      {/* Menu Toggle Button (Only for small screens) */}
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Center Navigation */}
      <nav className={`topbar-nav ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="topbar-link" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/chickenproduct" className="topbar-link" onClick={() => setMenuOpen(false)}>Chicken Products</Link>
        <Link to="/drinks" className="topbar-link" onClick={() => setMenuOpen(false)}>Drinks</Link>
        <Link to="/gradeegg" className="topbar-link" onClick={() => setMenuOpen(false)}>Grade Eggs</Link>
        <Link to="/kienyejiegg" className="topbar-link" onClick={() => setMenuOpen(false)}>Kienyeji Eggs</Link>
        <Link to="/order" className="topbar-link" onClick={() => setMenuOpen(false)}>Order</Link>
      </nav>

      {/* Right Section (Admin Login) */}
      <div className="admin-container">
        <Link to="/admin-login" className="admin-icon">
          <FaUser />
          <FaPlus className="plus-icon" />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
