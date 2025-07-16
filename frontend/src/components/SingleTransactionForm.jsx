import React, { useState } from 'react';
import DataReview from './DataReview';
import { submitTransaction } from '../api';
import PredictionResult from './PredictionResult';

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
  // Set default value of error fields to 0 (No Error)
  error_0: 0,
  error_1: 0,
  error_2: 0,
  error_3: 0,
  error_4: 0,
  error_5: 0,
};

const daysOfWeek = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
];

const yesNoOptions = [
  { value: 1, label: 'Yes' },
  { value: 0, label: 'No' },
];

const errorOptions = [
  { value: 1, label: 'Error' },
  { value: 0, label: 'No Error' },
];

const prepareTransactionData = (form) => ({
  client_id: Number(form.client_id),
  card_id: Number(form.card_id),
  amount: Number(form.amount),
  use_chip: form.use_chip, // Must be "Swipe Transaction" or "Chip Transaction"
  merchant_id: Number(form.merchant_id),
  merchant_city: form.merchant_city,
  merchant_state: form.merchant_state,
  zip: Number(form.zip),
  mcc: Number(form.mcc),
  hour: Number(form.hour),
  dayofweek: Number(form.dayofweek),
  is_weekend: Number(form.is_weekend),
  error_0: Number(form.error_0),
  error_1: Number(form.error_1),
  error_2: Number(form.error_2),
  error_3: Number(form.error_3),
  error_4: Number(form.error_4),
  error_5: Number(form.error_5),
});

const SingleTransactionForm = () => {
  const [form, setForm] = useState(initialFormState);
  const [reviewMode, setReviewMode] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Helper to determine if selected day is a weekday (Monday=1 to Friday=5)
  const isWeekday = form.dayofweek !== '' && form.dayofweek >= 1 && form.dayofweek <= 5;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // If dayofweek changes and is a weekday, set is_weekend to 0 (No)
    if (name === 'dayofweek') {
      let updatedForm = { ...form, [name]: value };
      if (value >= 1 && value <= 5) {
        updatedForm.is_weekend = 0; // No
      }
      setForm(updatedForm);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // When user clicks "Review"
  const handleReview = (e) => {
    e.preventDefault();
    setReviewMode(true);
  };

  // When user clicks "Edit"
  const handleEdit = () => {
    setReviewMode(false);
  };

  // When user clicks "Submit"
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
    // Optionally navigate to a Thank You page
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
        onDone={handleDone}
        onAgain={handleAgain}
      />
    );
  }
  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '5vh' }}>Loading...</div>;
  }
  // If in review mode, show the review component
  if (reviewMode) {
    return (
      <DataReview
        formData={form}
        onEdit={handleEdit}
        onSubmit={handleSubmit}
      />
    );
  }

  // Otherwise, show the form
  return (
    <div style={{ textAlign: 'center', marginTop: '5vh' }}>
      <h2>Single Transaction Entry</h2>
      <form onSubmit={handleReview} style={{ display: 'inline-block', textAlign: 'left', marginTop: '2rem' }}>
        {/* Numeric fields with min=0 to prevent negative numbers */}
        <div style={{ marginBottom: '1rem' }}>
          <label>Client ID:</label>
          <input type="number" name="client_id" value={form.client_id} onChange={handleChange} required min="0" />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Card ID:</label>
          <input type="number" name="card_id" value={form.card_id} onChange={handleChange} required min="0" />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Amount:</label>
          <input type="number" step="0.01" name="amount" value={form.amount} onChange={handleChange} required min="0" />
        </div>
        {/* use_chip as dropdown */}
        <div style={{ marginBottom: '1rem' }}>
          <label>Transaction Type:</label>
            <select name="use_chip" value={form.use_chip} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Swipe Transaction">Swipe Transaction</option>
            <option value="Chip Transaction">Chip Transaction</option>
            </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Merchant ID:</label>
          <input type="number" name="merchant_id" value={form.merchant_id} onChange={handleChange} required min="0" />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Merchant City:</label>
          <input type="text" name="merchant_city" value={form.merchant_city} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Merchant State:</label>
          <input type="text" name="merchant_state" value={form.merchant_state} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Zip:</label>
          <input type="number" step="0.01" name="zip" value={form.zip} onChange={handleChange} required min="0" />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>MCC:</label>
          <input type="number" name="mcc" value={form.mcc} onChange={handleChange} required min="0" />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Hour:</label>
          <input type="number" min="0" max="23" name="hour" value={form.hour} onChange={handleChange} required />
        </div>
        {/* dayofweek as dropdown */}
        <div style={{ marginBottom: '1rem' }}>
          <label>Day of Week:</label>
          <select name="dayofweek" value={form.dayofweek} onChange={handleChange} required>
            <option value="">Select</option>
            {daysOfWeek.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>
        {/* is_weekend as dropdown, auto-set and disabled if weekday */}
        <div style={{ marginBottom: '1rem' }}>
          <label>Is Weekend:</label>
          <select
            name="is_weekend"
            value={isWeekday ? 0 : form.is_weekend}
            onChange={handleChange}
            required
            disabled={isWeekday}
          >
            <option value="">Select</option>
            {yesNoOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {isWeekday && <span style={{ marginLeft: '1rem', color: 'gray' }}>(Auto-set to No for weekdays)</span>}
        </div>
        {/* error_0 to error_5 as dropdowns */}
        {[0,1,2,3,4,5].map((i) => (
          <div style={{ marginBottom: '1rem' }} key={`error_${i}`}>
            <label>{`Error ${i}:`}</label>
            <select name={`error_${i}`} value={form[`error_${i}`]} onChange={handleChange} required>
              <option value="">Select</option>
              {errorOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        ))}
        {/* Submit Button */}
        <div style={{ textAlign: 'center' }}>
          <button type="submit" style={{ padding: '0.5rem 2rem' }}>
            Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default SingleTransactionForm;