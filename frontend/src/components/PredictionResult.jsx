/*
  PredictionResult.jsx
  --------------------
  This component displays the result of the fraud prediction in the Fraud Detection System frontend.
  - Receives result, onAgain, and onDone as props from the parent.
  - Pure presentational component: no state or logic.
  - Shows whether the transaction is predicted to be fraudulent or safe.
  - Provides buttons for the user to detect again or finish the process.
*/
import React from 'react';

const PredictionResult = ({ result, onAgain, onDone }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '5vh' }}>
      <h2>Prediction Result</h2>
      <p>
        <strong>
          {result.is_fraud === 1
            ? '⚠️ This transaction is predicted to be FRAUDULENT.'
            : '✅ This transaction is predicted to be SAFE.'}
        </strong>
      </p>
      {/* plots will be added  here */}
      <div style={{ marginTop: '2rem' }}>
        <button onClick={onAgain} style={{ marginRight: '1rem', padding: '0.5rem 2rem' }}>
          Detect Again
        </button>
        <button onClick={onDone} style={{ padding: '0.5rem 2rem' }}>
          Done
        </button>
      </div>
    </div>
  );
};

export default PredictionResult;