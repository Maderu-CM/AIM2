import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllocateAsset from './components/AllocateAsset';
import AddAsset from './components/AddAsset';
import RequestAsset from './components/AssetRequest';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard';
import ProcurementManagerDashboard from './components/ProcurementManagerDashboard';
import NormalEmployeeDashboard from './components/NormalEmployeeDashboard';
import UserCompletedRequests from './components/UserCompletedRequests';
import ActiveRequests from './components/ActiveRequests';
import ViewUserRequest from './components/ViewUserRequest';
import ManagerCompleteRequest from './components/ProcurementManagerCompletedRequest';
import ApproveAssetRequest from './components/ApproveAssetRequest';
import Dashboard from './components/Dashboard';
import AdminDataManagement from './components/AdminDataManagement';
import ModifyAsset from './components/ModifyAsset';
import UpdateAsset from './components/UpdateAsset';
import DeleteAsset from './components/DeleteAsset';
import AddData from './components/AddData';

function App() {
  const userRole = localStorage.getItem('user_role');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add_asset" element={<AddAsset />} />
          <Route path="/allocate_asset" element={<AllocateAsset />} />
          <Route path="/request_asset" element={<RequestAsset />} />
          <Route path="/dashboard/*" element={userRole === 'admin' ? <AdminDashboard /> : userRole === 'procurementManager' ? <ProcurementManagerDashboard /> : userRole === 'normalEmployee' ? <NormalEmployeeDashboard /> : <Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/procurement" element={<ProcurementManagerDashboard />} />
          <Route path="/normalemployee" element={<NormalEmployeeDashboard />} />
          <Route path="/admin/pending-requests" element={<ViewUserRequest />} />
          <Route path="/procurement/completed-requests" element={<ManagerCompleteRequest />} />
          <Route path="/admin/allocate-asset" element={<AllocateAsset />} />
          <Route path="/procurement/allocate-asset" element={<AllocateAsset />} />
          <Route path="/procurement/add-data" element={<AddData />} />
          <Route path="/update_asset/:assetId" element={<UpdateAsset />} />
          <Route path="/delete-asset/:assetId" element={<DeleteAsset />} />
          <Route path="/admin/add-asset" element={<AddAsset />} />
          <Route path="/admin/modify-asset" element={<ModifyAsset />} />
          <Route path="/procurement/add-asset" element={<AddAsset />} />
          <Route path="/procurement/approve-asset-request" element={<ApproveAssetRequest />} />
          <Route path="/procurement/pending-requests" element={<ViewUserRequest />} />
          <Route path="/request-asset" element={<RequestAsset />} />
          <Route path="/active-requests" element={<ActiveRequests />} />
          <Route path="/user-completed-requests" element={<UserCompletedRequests />} />
          <Route path="/admin/data-management" element={<AdminDataManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;