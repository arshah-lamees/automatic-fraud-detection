/*
  App.js
  -------------------
  This is the main entry point for the Fraud Detection System frontend.
  - Manages routing and authentication state.
  - Provides access to all pages and components.
  - Handles the overall application structure and navigation.
*/

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import SingleTransactionFlowControl from './flowHelpers/FlowControl';
import BatchUploadForm from './components/BatchUploadForm';
import ThankYou from './components/ThankYou';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './AuthContext';
import './App.css';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/" element={
            <ProtectedRoute>
              <WelcomePage />
            </ProtectedRoute>
          } />
          <Route path="/single" element={
            <ProtectedRoute>
              <SingleTransactionFlowControl />
            </ProtectedRoute>
          } />
          <Route path="/batch" element={
            <ProtectedRoute>
              <BatchUploadForm />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;