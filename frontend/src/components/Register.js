import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Register.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: '' });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Registration successful');
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder="Username"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Admin">Admin</option>
            <option value="Procurement Manager">Procurement Manager</option>
            <option value="Normal Employee">Normal Employee</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;