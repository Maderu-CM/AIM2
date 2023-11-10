import React from 'react';
import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import AdminDashboardLayout from './AdminDashboardLayout';
import AddAsset from './AddAsset';
import ModifyAsset from './ModifyAsset';
import AllocateAsset from './AllocateAsset';
import ViewUserRequest from './ViewUserRequest';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleNavLinkClick = (path, event) => {
    event.preventDefault();
    console.log('Navigating to:', path);
    navigate(path);
  };

  const leftMenu = (
    <div>
      <h1>Admin Dashboard</h1>
      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <Link to="/admin/add-asset" className="nav-link" onClick={(event) => handleNavLinkClick('/admin/add-asset', event)}>
            Add Asset
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/modify-asset" className="nav-link" onClick={(event) => handleNavLinkClick('/admin/modify-asset', event)}>
            Modify Asset
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/allocate-asset" className="nav-link" onClick={(event) => handleNavLinkClick('/admin/allocate-asset', event)}>
            Allocate Asset
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/pending-requests" className="nav-link" onClick={(event) => handleNavLinkClick('/admin/pending-requests', event)}>
            View Pending Requests
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <AdminDashboardLayout left={leftMenu} right={<Outlet />}>
      <Routes>
        <Route path="/" element={<DefaultContent />} />
        <Route path="add-asset" element={<AddAsset />} />
        <Route path="modify-asset" element={<ModifyAsset />} />
        <Route path="allocate-asset" element={<AllocateAsset />} />
        <Route path="pending-request" element={<ViewUserRequest />} />
      </Routes>
    </AdminDashboardLayout>
  );
}

function DefaultContent() {
  return <div>Welcome to the Admin Dashboard! Select a section from the left menu.</div>;
}

export default AdminDashboard;