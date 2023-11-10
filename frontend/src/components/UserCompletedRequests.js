import React from 'react';
import { Link } from 'react-router-dom';

function UserCompletedRequests({ approvedRequests, declinedRequests }) {
  return (
    <div>
      <h1>User Completed Requests</h1>
      <h2>Approved Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Request</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {approvedRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.item}</td>
              <td>Approved</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Declined Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Request</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {declinedRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.item}</td>
              <td>Declined</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserCompletedRequests;
