import React, { Component } from 'react';

class AddData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      quantity: '',
      successMessage: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access_token');

    if (!token) {
      console.error('No token found. Please log in first.');
      return;
    }

    const data = {
      name: this.state.name,
      quantity: this.state.quantity,
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    };

    fetch('http://127.0.0.1:5000/add_data', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          this.setState({
            successMessage: 'Data added successfully',
            name: '', 
            quantity: '',
          });
        } else {
          console.error('Failed to add data:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error adding data:', error);
      });
  };

  render() {
    return (
      <div>
        <h1>Add Data</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleInputChange}
              required
            />
          </div>
          {this.state.successMessage && (
          <div className="success-message">{this.state.successMessage}</div>
        )}
          <button type="submit">Add Data</button>
        </form>
      </div>
    );
  }
}

export default AddData;
