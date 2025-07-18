/*
  RegisterPage.jsx
  -------------------
  This component implements the user registration functionality for the Fraud Detection System frontend.
  - Allows new users to create an account by providing a username, email, and password.
  - Handles form state, error display, and success feedback.
  - On successful registration, shows a success message and redirects to the login page.
  - Provides navigation link back to the login page.

*/
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 1500);
      } else {
        const err = await response.json();
        setError(err.detail || 'Registration failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="centered-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">Registration successful! Redirecting to login...</div>}
        <button type="submit">Register</button>
      </form>
      <div className="register-links">
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
} 