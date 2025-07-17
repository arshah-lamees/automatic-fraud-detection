/*
WelcomePage.jsx
---------------
Displays the welcome screen and navigation options for the app.
- Lets user choose between single transaction and batch upload
- Now shows logged-in user info and logout button (JWT-aware)
*/
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const WelcomePage = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  // Decode user info from JWT (optional, for display)
  let username = '';
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      username = payload.sub || payload.username || '';
    } catch (e) {
      // ignore
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '10vh' }}>
      <h1>Welcome to the Fraud Detection System</h1>
      {username && <div style={{ marginBottom: 16 }}>Logged in as <b>{username}</b></div>}
      <button style={{ position: 'absolute', top: 20, right: 20 }} onClick={logout}>Logout</button>
      <p>
        Please choose an option below to get started.
      </p>
      <div style={{ marginTop: '2rem' }}>
        <button
          style={{ marginRight: '1rem', padding: '1rem 2rem' }}
          onClick={() => navigate('/single')}
        >
          Single Transaction
        </button>
        <button
          style={{ padding: '1rem 2rem' }}
          onClick={() => navigate('/batch')}
        >
          Batch Upload
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;