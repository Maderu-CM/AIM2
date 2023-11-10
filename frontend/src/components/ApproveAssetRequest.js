import React, { useState, useEffect } from 'react';

function ApproveAssetRequest() {
  const [assetRequests, setAssetRequests] = useState([]);

  useEffect(() => {
    fetchAssetRequests();
  }, []);

  const fetchAssetRequests = async () => {
    try {
      const response = await fetch('/api/asset-requests');
      if (response.status === 200) {
        const data = await response.json();
        setAssetRequests(data);
      } else {
        console.error('Failed to fetch asset requests');
      }
    } catch (error) {
      console.error('Error fetching asset requests:', error);
    }
  };

  const handleApproveRequest = async (requestId) => {
    try {
      const response = await fetch(`/api/approve_request/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        fetchAssetRequests();
      } else {
        console.error('Failed to approve the request');
      }
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  return (
    <div>
      <h1>Approve Asset Requests</h1>
      <ul>
        {assetRequests.map((request) => (
          <li key={request.id}>
            Requested by: {request.user}
            Requested item: {request.item}
            <button onClick={() => handleApproveRequest(request.id)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApproveAssetRequest;