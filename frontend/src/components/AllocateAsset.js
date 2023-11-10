import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/AllocateAsset.css'

class AllocateAsset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asset_name: '',
      username: '',
      allocation_date: '',
      deallocation_date: '',
      message: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { asset_name, username, allocation_date, deallocation_date } = this.state;
    const allocationDate = new Date(allocation_date);
    const deallocationDate = new Date(deallocation_date);

    try {
      const response = await fetch(`http://127.0.0.1:5000/allocate_asset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          asset_name,
          username,
          allocation_date: allocationDate,
          deallocation_date: deallocationDate,
        }),
      });

      if (response.status === 201) {
        this.setState({ message: 'Asset allocated to employee successfully' });
      } else {
        const data = await response.json();
        this.setState({ message: data.message });
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  render() {
    return (
      <div className="allocate-asset-container">
        <h1 className="header-title">Allocate Asset</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="asset_name"
            placeholder="Asset Name"
            value={this.state.asset_name}
            onChange={this.handleInputChange}
            className="asset-name"
          />
          <input
            type="text"
            name="username" 
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleInputChange}
            className="username"
          />
          <input
            type="datetime-local"
            name="allocation_date"
            placeholder="Allocation Date"
            value={this.state.allocation_date}
            onChange={this.handleInputChange}
            className="allocation-date"
          />
          <input
            type="datetime-local"
            name="deallocation_date"
            placeholder="Deallocation Date"
            value={this.state.deallocation_date}
            onChange={this.handleInputChange}
            className="deallocation-date"
          />
          <button type="submit" className="allocate-button">Allocate Asset</button>
          {this.state.message && <p className="message">{this.state.message}</p>}
        </form>
        <p>
          <Link to="/admin" className="go-back-link">
            Go back to the admin dashboard
          </Link>
        </p>
      </div>
    );
  }
}

export default AllocateAsset;
