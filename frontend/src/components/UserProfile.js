import React, { useState, useEffect } from 'react';

function UserProfile() {
  // Define the initial state for user data
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this with the actual API endpoint to fetch user data
        const response = await fetch('/api/user'); // Replace '/api/user' with your API endpoint
        if (response.ok) {
          const user = await response.json();
          setUserData(user);
        } else {
          console.error('Failed to fetch user data');
          setUserData(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserData(null);
      }
      setLoading(false);
    };

    // Call the fetchData function to fetch user data
    fetchData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <h1>User Profile</h1>
      {loading ? (
        <p>Loading user data...</p>
      ) : userData ? (
        <div>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role}</p>
          {/* Display other user information as needed */}
        </div>
      ) : (
        <p>Error loading user data.</p>
      )}
    </div>
  );
}

export default UserProfile;