import React, { useState, useEffect } from 'react';

const ActiveRequests = () => {
  const [activeRequests, setActiveRequests] = useState([]);

  useEffect(() => {
    fetchActiveRequests();
  }, []);

  const fetchActiveRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/active_requests', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setActiveRequests(data.active_requests);
    } catch (error) {
      console.error('Error fetching active requests:', error.message);
    }
  };

  return (
    <div>
      <h2>Active Requests</h2>
      {activeRequests.length > 0 ? (
        activeRequests.map((request) => (
          <div key={request.id} className="request-container">
            <h3>Request ID: {request.id}</h3>
            <table className="request-table">
              <tbody>
                <tr>
                  <td className="field">Reason:</td>
                  <td className="value">{request.reason}</td>
                </tr>
                <tr>
                  <td className="field">Quantity:</td>
                  <td className="value">{request.quantity}</td>
                </tr>
                <tr>
                  <td className="field">Urgency:</td>
                  <td className="value">{request.urgency}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>No active requests available.</p>
      )}
    </div>
  );
};

export default ActiveRequests;