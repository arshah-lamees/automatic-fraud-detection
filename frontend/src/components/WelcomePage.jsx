/*
WelcomePage.jsx
---------------
Displays the welcome screen and navigation options for the app.
- Lets user choose between single transaction and batch upload
- Pure presentational component: no state or logic
*/
// src/components/WelcomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '10vh' }}>
      <h1>Welcome to the Fraud Detection System</h1>
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