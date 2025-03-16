import React from 'react';
import './Admin.css';
import AdminTopBar from '../AdminTopBar/AdminTopBar';

const Admin = () => {
  return (
    <div className="admin-container">
      {/* Admin TopBar for Navigation */}
      <AdminTopBar />

      <div className="admin-content">
        <h2>Admin Panel</h2>
        <p>Manage your egg store here.</p>
      </div>
    </div>
  );
};

export default Admin;
