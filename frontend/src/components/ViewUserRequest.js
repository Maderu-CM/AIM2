import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/ViewUserRequest.css';

class ViewUserRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRequests: [],
      completedRequests: [],
    };
  }

  componentDidMount() {
    fetch('/admin_view_user_requests', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          activeRequests: data.active_requests,
          completedRequests: data.completed_requests,
        });
      })
      .catch(error => {
        console.error('Error fetching user requests:', error);
      });
  }

  render() {
    return (
      <div className="view-user-requests">
        <h1 className="main-title">User Requests</h1>

        <div className="request-type">
          <h2>Active Requests</h2>
          {this.state.activeRequests.length > 0 ? (
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Reason</th>
                  <th>Quantity</th>
                  <th>Urgency</th>
                  <th>Status</th>
                  <th>Completion Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.activeRequests.map((request, index) => (
                  <tr key={index}>
                    <td>{request.reason}</td>
                    <td>{request.quantity}</td>
                    <td>{request.urgency}</td>
                    <td>{request.status}</td>
                    <td>{request.completion_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-requests">No active requests found.</div>
          )}
        </div>

        <div className="request-type">
          <h2>Completed Requests</h2>
          {this.state.completedRequests.length > 0 ? (
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Reason</th>
                  <th>Quantity</th>
                  <th>Urgency</th>
                  <th>Status</th>
                  <th>Completion Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.completedRequests.map((request, index) => (
                  <tr key={index}>
                    <td>{request.reason}</td>
                    <td>{request.quantity}</td>
                    <td>{request.urgency}</td>
                    <td>{request.status}</td>
                    <td>{request.completion_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-requests">No completed requests found.</div>
          )}
        </div>

        {this.state.activeRequests.length === 0 && this.state.completedRequests.length === 0 && (
          <div className="no-requests">No requests found.</div>
        )}
        <Link to="/admin" className="go-back-link">Go back to the admin dashboard</Link>
      </div>
    );
  }
}

export default ViewUserRequests;
