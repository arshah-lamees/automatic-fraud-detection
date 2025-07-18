/*
  AuthContext.js
  --------------
  This module implements authentication context for the Fraud Detection System frontend.
  - Provides a React context for managing and sharing authentication state (JWT token) across the app.
  - Exposes login and logout functions to update authentication state and persistent storage.
  - Includes a custom hook (useAuth) for easy access to authentication state and actions in any component.
  - Ensures all parts of the app can check login status and perform authentication actions.
*/
import React, { createContext, useContext, useState } from 'react';
import { setAccessToken, getAccessToken } from './api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getAccessToken());

  const login = (token) => {
    setAccessToken(token);
    setToken(token);
  };

  const logout = () => {
    setAccessToken(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 