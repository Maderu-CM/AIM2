import React from 'react';
import './css/AdminDashboardLayout.css';

function AdminDashboardLayout({ left, right }) {
  return (
    <div style={{ display: 'flex' }} className="main-container">
      <div style={{ width: '200px', padding: '20px' }} className="left-container">
        {left}
      </div>
      <div style={{ flex: 1, padding: '20px' }} className="right-container">
        {right}
      </div>
    </div>
  );
}

export default AdminDashboardLayout;