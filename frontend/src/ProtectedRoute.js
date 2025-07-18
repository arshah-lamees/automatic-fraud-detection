/*
  ProtectedRoute.js
  -------------------
  This component implements a protected route for the Fraud Detection System frontend.
  - Checks if the user is authenticated (has a valid JWT token).
  - Redirects to the login page if the user is not authenticated.
  - Allows access to the protected route if the user is authenticated.
*/
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
} 