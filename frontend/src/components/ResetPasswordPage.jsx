/*
  ResetPasswordPage.jsx
  -------------------
  This component implements the password reset functionality for the Fraud Detection System frontend.
  - Allows users to reset their password by providing their email and a new password.
  - Handles form state, error display, and success feedback.
  - Pre-fills the email field if the user comes from the forgot password page.
  - On successful reset, shows a success message and redirects to the login page.
  - Provides navigation link back to the login page.

*/
import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialEmail = location.state?.email || '';// If coming from ForgotPasswordPage, email may be in location.state
  const [email, setEmail] = useState(initialEmail);
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const response = await fetch('http://127.0.0.1:8000/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, new_password: newPassword }),
      });
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        const data = await response.json();
        setError(data.detail || 'Could not reset password.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="centered-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">Password reset! Redirecting to login...</div>}
      <div style={{ marginTop: 16 }}>
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
} 