import React, { Component } from 'react';

class RequestAsset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asset_name: '',
      requestReason: '',
      requestQuantity: '',
      requestUrgency: '',
      error: null,
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access_token');

    if (!token) {
      this.setState({ error: 'No token found. Please log in first.' });
      return;
    }

    const requestData = {
      asset_name: this.state.asset_name,
      reason: this.state.requestReason,
      quantity: this.state.requestQuantity,
      urgency: this.state.requestUrgency,
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    const apiEndpoint = 'http://127.0.0.1:5000/request_asset';

    fetch(apiEndpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to submit request. Please check the data and try again.');
        }
        return response.json();
      })
      .then(data => {
        console.log('Request successful:', data);
        this.setState({ error: null });
      })
      .catch(error => {
        console.error('Failed to submit request:', error);
        this.setState({ error: error.message });
      });
  };

  render() {
    const { requestReason, requestQuantity, requestUrgency, asset_name, error } = this.state;

    return (
      <div>
        <h1>Request Asset</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="asset_name"
            placeholder="Asset Name"
            value={asset_name}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="requestReason"
            placeholder="Reason"
            value={requestReason}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="requestQuantity"
            placeholder="Quantity"
            value={requestQuantity}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="requestUrgency"
            placeholder="Urgency"
            value={requestUrgency}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit Request</button>
        </form>
        {error && <p>Error: {error}</p>}
      </div>
    );
  }
}

export default RequestAsset;
