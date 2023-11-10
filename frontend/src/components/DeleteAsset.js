import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DeleteAsset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  handleDelete = () => {
    const assetId = this.props.match.params.assetId;

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
      <div>
        <h1>Delete Asset</h1>
        <button onClick={this.handleDelete}>Delete Asset</button>
        {this.state.message && <p>{this.state.message}</p>}
        <p>
          <Link to="/">Go back to the home page</Link>
        </p>
      </div>
    );
  }
}

export default DeleteAsset;