/*
  ForgotPasswordPage.jsx
  -------------------
  This component implements the 'forgot password' functionality for the Fraud Detection System frontend.
  - Allows users to request a password reset by verifying their email address.
  - Handles form state, error display, and success feedback.
  - On successful verification, provides a link to the reset password page with the email pre-filled.
  - Provides navigation links to registration and login pages.

*/
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setShowReset(false);
    try {
      const response = await fetch('http://127.0.0.1:8000/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setSuccess(true);
        setShowReset(true);
      } else {
        const data = await response.json();
        setError(data.detail || 'User not found. Please register.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="centered-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">Verify Email</button>
      </form>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">Email found! You can now <Link to="/reset-password" state={{ email }}>reset your password</Link>.</div>}
      {!success && (
        <div style={{ marginTop: 16 }}>
          <span>Don't have an account? <Link to="/register">Register</Link></span>
        </div>
      )}
      <div style={{ marginTop: 16 }}>
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
} 