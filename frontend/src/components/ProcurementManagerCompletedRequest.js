import React, { useState, useEffect } from 'react';

function ManagerCompleteRequest() {
  const [completedRequests, setCompletedRequests] = useState([]);

  useEffect(() => {
    fetchCompletedRequests();
  }, []);

  const fetchCompletedRequests = async () => {
    try {
      const response = await fetch('/completed-requests');
      if (response.status === 200) {
        const data = await response.json();
        setCompletedRequests(data);
      } else {
        console.error('Failed to fetch completed requests');
      }
    } catch (error) {
      console.error('Error fetching completed requests:', error);
    }
  };

  return (
    <>
      <h1>Manager Completed Requests</h1>
      <ul>
        {completedRequests.map((request) => (
          <li key={request.id}>
            Requested by: {request.user}
            Requested item: {request.item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ManagerCompleteRequest;