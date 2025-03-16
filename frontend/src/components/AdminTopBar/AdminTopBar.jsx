import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminTopBar.css'; // Import CSS for styling

const AdminTopBar = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  return (
    <div className="admin-topbar">
      {/* Go Back Button */}
      <button className="go-back-btn" onClick={() => navigate(-1)}>⬅ Go Back</button>

      <div className="admin-title">
        <h2>Admin Panel</h2>
      </div>

      <nav className="admin-nav">
        <Link to="/addchickenproduct">Add Chicken Product</Link>
        <Link to="/adddrinks">Add Drinks</Link>
        <Link to="/addgradeegg">Add Grade Egg</Link>
        <Link to="/addkienyejiegg">Add Kienyeji Egg</Link>
        <Link to="/editchickenproduct">Edit Chicken Product</Link>
        <Link to="/editdrinks">Edit Drinks</Link>
        <Link to="/editgradeegg">Edit Grade Egg</Link>
        <Link to="/editkienyejiegg">Edit Kienyeji Egg</Link>
      </nav>
    </div>
  );
};

export default AdminTopBar;
