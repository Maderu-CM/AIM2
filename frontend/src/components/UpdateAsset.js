import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './css/UpdateAsset.css'

function UpdateAsset() {
  const { assetId } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`/get_asset/${assetId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setName(data.name);
          setDescription(data.description);
          setCategory(data.category);
          setStatus(data.status);
          setImageUrl(data.image_url);
          setUsername(data.username);
        }
      })
      .catch((error) => console.error('Error fetching asset data:', error));
  }, [assetId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'status':
        setStatus(value);
        break;
      case 'image_url':
        setImageUrl(value);
        break;
      case 'username':
        setUsername(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedAssetData = {
      name,
      description,
      category,
      status,
      image_url,
      username,
    };
  
    fetch(`/update_asset/${assetId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(updatedAssetData),
    })
      .then((response) => {
        if (response.status === 200) {
          setMessage('Asset updated successfully');
        } else if (response.status === 404) {
          setMessage('Asset not found');
        } else {
          setMessage('Failed to update asset');
        }
      })
      .catch((error) => {
        console.error('Error updating asset:', error);
      });
  };

  return (
    <div className="update-asset-container">
      <h1 className="asset-header">Update Asset</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Asset Name"
          value={name}
          onChange={handleInputChange}
          className="asset-name-input"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={handleInputChange}
          className="description-input"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={category}
          onChange={handleInputChange}
          className="category-input"
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={status}
          onChange={handleInputChange}
          className="status-input"
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={image_url}
          onChange={handleInputChange}
          className="image-url-input"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleInputChange}
          className="username-input"
        />
        <button type="submit" className="update-button">Update Asset</button>
        {message && <p className="update-message">{message}</p>}
      </form>
      <p>
        <Link to="/admin" className="go-back-link">Go back to the admin dashboard</Link>
      </p>
    </div>
  );
}

export default UpdateAsset;