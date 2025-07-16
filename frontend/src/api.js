  // src/api.js
  import axios from 'axios';

  // Set your backend URL here
  const BASE_URL = 'http://10.60.69.155:8000';

  export const submitTransaction = async (transactionData) => {
    // 1. Store the transaction
    const storeResponse = await axios.post(`${BASE_URL}/transaction`, transactionData);
    const transaction = storeResponse.data;
    // 2. Predict using the returned transaction's ID
    const predictResponse = await axios.get(`${BASE_URL}/predict/${transaction.id}`);
    return predictResponse.data;
  };