import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './css/AddAsset.css'; 

function AddAsset() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    status: '',
    image_url: '',
    username: '',
    message: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const assetData = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      status: formData.status,
      image_url: formData.image_url,
      username: formData.username,
    };

    try {
      const response = await fetch('/add_asset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(assetData),
      });

      if (response.status === 201) {
        setFormData({ ...formData, message: 'Asset added successfully' });
        navigate('/admin-dashboard');
      } else {
        setFormData({ ...formData, message: 'Failed to add asset' });
      }
    } catch (error) {
      console.error('Error adding asset:', error);
    }
  };

  return (
    <div className="add-asset-container">
      <h1>Add New Asset</h1>
      <form onSubmit={handleSubmit} className="asset-form">
        <input type="text" name="name" placeholder="Asset Name" value={formData.name} onChange={handleInputChange} className="form-input" />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} className="form-input" />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} className="form-input" />
        <input type="text" name="status" placeholder="Status" value={formData.status} onChange={handleInputChange} className="form-input" />
        <input type="text" name="image_url" placeholder="Image URL" value={formData.image_url} onChange={handleInputChange} className="form-input" />
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} className="form-input" />
        <button type="submit" className="form-button">Add Asset</button>
        {formData.message && <p className="form-message">{formData.message}</p>}
      </form>
      <Link to="/admin" className="go-back-link">Go back to the admin dashboard</Link>
      <Outlet />
    </div>
  );
}

export default AddAsset;