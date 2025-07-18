/*
  LoginPage.jsx
  -------------------
  implements the login functionality for the Fraud Detection System frontend.
  - Allows users to log in using either their username or email, and password.
  - Handles form state, error display, and authentication logic.
  - On successful login, stores the authentication token and redirects to the welcome page.
  - Provides navigation links to registration and password reset pages.
  - Uses context (useAuth) for authentication state management.
 
*/
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });
      if (response.ok) {
        const data = await response.json();
        login(data.access_token);
        navigate('/'); // Redirect to welcome page
      } else {
        const err = await response.json();
        setError(err.detail || err.msg || JSON.stringify(err) || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="centered-container">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username or Email:</label>
            <input
              type="text"
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              required
              autoFocus
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
          {error && (
            <div className="error">
              {typeof error === 'string' ? error : (error.detail || error.msg || JSON.stringify(error))}
            </div>
          )}
          <button type="submit">Login</button>
        </form>
        <div className="login-links">
          <Link to="/forgot-password">Forgot password?</Link> |{' '}
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
} 