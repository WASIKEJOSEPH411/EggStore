import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for the menu toggle
import './AdminTopBar.css';

const AdminTopBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu

  return (
    <div className="admin-topbar">
      {/* Go Back Button */}
      <button className="go-back-btn" onClick={() => navigate(-1)}>⬅ Go Back</button>

      <div className="admin-title">
        <h2>Admin Panel</h2>
      </div>

      {/* Menu Icon for Small Screens */}
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Navigation Links */}
      <nav className={`admin-nav ${menuOpen ? "open" : ""}`}>
        <Link to="/addchickenproduct" onClick={() => setMenuOpen(false)}>Add Chicken Product</Link>
        <Link to="/adddrinks" onClick={() => setMenuOpen(false)}>Add Drinks</Link>
        <Link to="/addgradeegg" onClick={() => setMenuOpen(false)}>Add Grade Egg</Link>
        <Link to="/addkienyejiegg" onClick={() => setMenuOpen(false)}>Add Kienyeji Egg</Link>
        <Link to="/editdrinks" onClick={() => setMenuOpen(false)}>Edit Drinks</Link>
        <Link to="/editgradeegg" onClick={() => setMenuOpen(false)}>Edit Grade Egg</Link>
        <Link to="/editkienyejiegg" onClick={() => setMenuOpen(false)}>Edit Kienyeji Egg</Link>
        <Link to="/adminchikenlisting" onClick={() => setMenuOpen(false)}>AdminChickenListing</Link>
      </nav>
    </div>
  );
};

export default AdminTopBar;
