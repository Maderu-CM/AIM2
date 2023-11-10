import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserClassification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classification: 'Unknown',
    };
  }

  componentDidMount() {
    fetch('/classify', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.classification) {
          this.setState({ classification: data.classification });
        }
      })
      .catch((error) => {
        console.error('Error getting user classification:', error);
      });
  }

  render() {
    return (
      <div>
        <h1>User Classification</h1>
        <p>Your user classification is: {this.state.classification}</p>
        <p>
          <Link to="/">Go back to the home page</Link>
        </p>
      </div>
    );
  }
}

export default UserClassification;