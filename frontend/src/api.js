  // src/api.js
  import axios from 'axios';

  // Set your backend URL here
  const BASE_URL = 'http://127.0.0.1:8000';

  let accessToken = localStorage.getItem('access_token') || null;

  export function setAccessToken(token) {
    accessToken = token;
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
  }

  export function getAccessToken() {
    return accessToken;
  }

  export async function apiFetch(url, options = {}) {
    const headers = options.headers || {};
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return fetch(url, { ...options, headers });
  }

  export const submitTransaction = async (transactionData) => {
    // 1. Store the transaction (POST)
    const storeResponse = await apiFetch('http://127.0.0.1:8000/transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transactionData),
    });
    if (!storeResponse.ok) {
      const err = await storeResponse.json();
      throw new Error(err.detail || 'Failed to store transaction');
    }
    const transaction = await storeResponse.json();
    // 2. Predict using the returned transaction's ID (GET)
    const predictResponse = await apiFetch(`http://127.0.0.1:8000/predict/${transaction.id}`);
    if (!predictResponse.ok) {
      const err = await predictResponse.json();
      throw new Error(err.detail || 'Failed to get prediction');
    }
    return await predictResponse.json();
  };