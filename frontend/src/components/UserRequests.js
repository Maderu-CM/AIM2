import React, { useState, useEffect } from 'react';

const UserRequests = () => {
  const [userRequests, setUserRequests] = useState({
    pending: [],
    approved: [],
    rejected: [],
  });

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await fetch('http://127.0.0.1:5000/user_requests', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUserRequests({
          pending: data.pending_requests || [],
          approved: data.approved_requests || [],
          rejected: data.rejected_requests || [],
        });
      } catch (error) {
        console.error('Error fetching user requests:', error);
      }
    };

    fetchUserRequests();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div>
      <h2>User Requests</h2>
      {/* Render your user requests data here */}
      <div>
        <h3>Pending Requests</h3>
        {/* Render pending requests data */}
        {userRequests.pending.map((request) => (
          <div key={request.id}>
            {/* Render individual pending request details */}
            <p>{request.reason}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
      <div>
        <h3>Approved Requests</h3>
        {/* Render approved requests data */}
        {userRequests.approved.map((request) => (
          <div key={request.id}>
            {/* Render individual approved request details */}
            <p>{request.reason}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
      <div>
        <h3>Rejected Requests</h3>
        {/* Render rejected requests data */}
        {userRequests.rejected.map((request) => (
          <div key={request.id}>
            {/* Render individual rejected request details */}
            <p>{request.reason}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRequests;
