import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/ModifyAsset.css'

class ModifyAsset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assets: [],
      message: '',
    };
  }

  componentDidMount() {
    fetch('/get_all_assets', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Failed to fetch assets');
        }
      })
      .then((data) => {
        this.setState({ assets: data.assets });
      })
      .catch((error) => {
        console.error('Error fetching assets:', error);
      });
  }

  handleDelete = (assetId) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      fetch(`/remove_data/${assetId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            this.setState({ message: 'Asset deleted successfully' });

            this.setState((prevState) => ({
              assets: prevState.assets.filter((asset) => asset.id !== assetId),
            }));
          } else if (response.status === 404) {
            this.setState({ message: 'Asset not found' });
          } else if (response.status === 403) {
            this.setState({ message: 'Unauthorized. Only Admins can delete data.' });
          } else {
            this.setState({ message: 'Failed to delete asset' });
          }
        })
        .catch((error) => {
          console.error('Error deleting asset:', error);
        });
    }
  };

  render() {
    return (
      <div className="modify-assets-container">
        <h1 className="header-title">Modify Assets</h1>
        <div className="assets-list">
          {this.state.assets.map((asset) => (
            <div key={asset.id} className="asset-item">
              <h2>{asset.name}</h2>
              <p className="category">Category: {asset.category}</p>
              <button onClick={() => this.handleDelete(asset.id)} className="delete-button">
                Delete Asset
              </button>
              <Link to={`/update_asset/${asset.id}`} className="update-link">
                Update Asset
              </Link>
              <hr className="divider" />
            </div>
          ))}
        </div>
        {this.state.message && <p className="message">{this.state.message}</p>}
        <p>
          <Link to="/admin" className="go-back-link">
            Go back to the admin dashboard
          </Link>
        </p>
      </div>
    );
  }
}

export default ModifyAsset;