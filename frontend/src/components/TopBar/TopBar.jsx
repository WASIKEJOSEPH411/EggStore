import React from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css';
import { FaPlus } from 'react-icons/fa';

const TopBar = () => {
  return (
    <div className="topbar-container">
      {/* Right side: Admin Login button */}
      <Link to="/admin-login" className="admin-icon">
        <FaPlus className="plus-icon" /> {/* Plus sign */}
      </Link>

      {/* Left side: Logo */}
      <div className="topbar-logo">🐔 Egg Store</div>

      {/* Center: Navigation */}
      <nav className="topbar-nav">
        <Link to="/" className="topbar-link">Home</Link>
        <Link to="/chickenproduct" className="topbar-link">Chicken Products</Link>
        <Link to="/drinks" className="topbar-link">Drinks</Link>
        <Link to="/gradeegg" className="topbar-link">Grade Eggs</Link>
        <Link to="/kienyejiegg" className="topbar-link">Kienyeji Eggs</Link>
      </nav>
    </div>
  );
};

export default TopBar;
