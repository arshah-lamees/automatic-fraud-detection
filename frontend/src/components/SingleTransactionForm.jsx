/*
  SingleTransactionForm.jsx
  ------------------------
  This component implements the form for entering a single transaction in the Fraud Detection System frontend.
  - Pure presentational component: receives all data and handlers as props from its parent.
  - Renders a comprehensive form for all transaction fields, including dropdowns for categorical and error fields.
  - Handles user input for transaction details and triggers the review action on submit.
  - Ensures data is collected in the format expected by the backend for fraud prediction.
*/
import React from 'react';

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

const SingleTransactionForm = ({ form, onChange, onReview }) => {
  const isWeekday = form.dayofweek !== '' && Number(form.dayofweek) >= 1 && Number(form.dayofweek) <= 5;

  return (
    <div style={{ textAlign: 'center', marginTop: '5vh' }}>
      <h2>Single Transaction Entry</h2>
      <form onSubmit={onReview} style={{ display: 'inline-block', textAlign: 'left', marginTop: '2rem' }}>
        {/* Numeric fields with min=0 to prevent negative numbers */}
        <div style={{ marginBottom: '1rem' }}>
          <label>Client ID:</label>
          <input type="number" name="client_id" value={form.client_id} onChange={onChange} required min="0" />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Card ID:</label>
          <input type="number" name="card_id" value={form.card_id} onChange={onChange} required min="0" />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Amount:</label>
          <input type="number" step="0.01" name="amount" value={form.amount} onChange={onChange} required min="0" />
        </div>
        {/* use_chip as dropdown */}
        <div style={{ marginBottom: '1rem' }}>
          <label>Transaction Type:</label>
            <select name="use_chip" value={form.use_chip} onChange={onChange} required>
            <option value="">Select</option>
            <option value="Swipe Transaction">Swipe Transaction</option>
            <option value="Chip Transaction">Chip Transaction</option>
            </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Merchant ID:</label>
          <input type="number" name="merchant_id" value={form.merchant_id} onChange={onChange} required min="0" />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Merchant City:</label>
          <input type="text" name="merchant_city" value={form.merchant_city} onChange={onChange} required />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Merchant State:</label>
          <input type="text" name="merchant_state" value={form.merchant_state} onChange={onChange} required />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Zip:</label>
          <input type="number" step="0.01" name="zip" value={form.zip} onChange={onChange} required min="0" />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>MCC:</label>
          <input type="number" name="mcc" value={form.mcc} onChange={onChange} required min="0" />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Hour:</label>
          <input type="number" min="0" max="23" name="hour" value={form.hour} onChange={onChange} required />
        </div>
        {/* dayofweek as dropdown */}
        <div style={{ marginBottom: '1rem' }}>
          <label>Day of Week:</label>
          <select name="dayofweek" value={form.dayofweek} onChange={onChange} required>
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
            onChange={onChange}
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
        {/* error fields as dropdowns */}
        {["bad_cvv","bad_card_number","bad_pin","bad_zipcode","insufficient_balance","technical_glitch"].map((name, i) => (
          <div style={{ marginBottom: '1rem' }} key={name}>
            <label>{name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())+":"}</label>
            <select name={name} value={form[name]} onChange={onChange} required>
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