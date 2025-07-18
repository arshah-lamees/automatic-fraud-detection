/*
  FlowControl.jsx
  ---------------
  This component manages the entire flow for the single transaction workflow in the Fraud Detection System frontend.
  - Manages all state for the single transaction process (form data, review mode, prediction result, loading state).
  - Handles logic for moving between steps: form entry, review, prediction result.
  - Prepares and validates data before sending to the backend.
  - Submits transaction data to the backend API and handles the response.
  - Passes only the necessary data and handlers to presentational child components.
  - Handles navigation (e.g., to the Thank You page) after completion.
  - Ensures the UI updates correctly based on the current step.
*/


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SingleTransactionForm from '../components/SingleTransactionForm';
import DataReview from '../components/DataReview';
import PredictionResult from '../components/PredictionResult';
import { submitTransaction } from '../api';

const initialFormState = {
  client_id: '',
  card_id: '',
  amount: '',
  use_chip: '',
  merchant_id: '',
  merchant_city: '',
  merchant_state: '',
  zip: '',
  mcc: '',
  hour: '',
  dayofweek: '',
  is_weekend: '',
  bad_cvv: 0,
  bad_card_number: 0,
  bad_pin: 0,
  bad_zipcode: 0,
  insufficient_balance: 0,
  technical_glitch: 0,
};

const prepareTransactionData = (form) => ({
  client_id: Number(form.client_id),
  card_id: Number(form.card_id),
  amount: Number(form.amount),
  use_chip: form.use_chip,
  merchant_id: Number(form.merchant_id),
  merchant_city: form.merchant_city,
  merchant_state: form.merchant_state,
  zip: Number(form.zip),
  mcc: Number(form.mcc),
  hour: Number(form.hour),
  dayofweek: Number(form.dayofweek),
  is_weekend: Number(form.is_weekend),
  bad_cvv: Number(form.bad_cvv),
  bad_card_number: Number(form.bad_card_number),
  bad_pin: Number(form.bad_pin),
  bad_zipcode: Number(form.bad_zipcode),
  insufficient_balance: Number(form.insufficient_balance),
  technical_glitch: Number(form.technical_glitch),
});

const FlowControl = () => {
  const [form, setForm] = useState(initialFormState);
  const [reviewMode, setReviewMode] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dayofweek') {
      let updatedForm = { ...form, [name]: value };
      if (value === '' || value === undefined) {
        updatedForm.is_weekend = '';
      } else if (Number(value) >= 1 && Number(value) <= 5) {
        updatedForm.is_weekend = 0;
      } else {
        updatedForm.is_weekend = 1;
      }
      setForm(updatedForm);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleReview = (e) => {
    e.preventDefault();
    setReviewMode(true);
  };

  const handleEdit = () => {
    setReviewMode(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const preparedData = prepareTransactionData(form);
      const result = await submitTransaction(preparedData);
      setPrediction(result);
    } catch (error) {
      alert('Error submitting transaction: ' + error.message);
    }
    setLoading(false);
  };

  const handleDone = () => {
    setPrediction(null);
    setForm(initialFormState);
    setReviewMode(false);
    navigate('/thankyou');
  };

  const handleAgain = () => {
    setPrediction(null);
    setForm(initialFormState);
    setReviewMode(false);
  };

  if (prediction) {
    return (
      <PredictionResult
        result={prediction}
        onAgain={handleAgain}
        onDone={handleDone}
      />
    );
  }
  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '5vh' }}>Loading...</div>;
  }
  if (reviewMode) {
    return (
      <DataReview
        formData={form}
        onEdit={handleEdit}
        onSubmit={handleSubmit}
      />
    );
  }
  return (
    <SingleTransactionForm
      form={form}
      onChange={handleChange}
      onReview={handleReview}
    />
  );
};

export default FlowControl; 