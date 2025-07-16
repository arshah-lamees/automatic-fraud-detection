import React from 'react';
import { useNavigate } from 'react-router-dom';

const PredictionResult = ({ result, onAgain }) => {
  const navigate = useNavigate();

  const handleDone = () => {
    navigate('/thankyou');
  };

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
      {/* You can add feature plots here in the next step */}
      <div style={{ marginTop: '2rem' }}>
        <button onClick={onAgain} style={{ marginRight: '1rem', padding: '0.5rem 2rem' }}>
          Detect Again
        </button>
        <button onClick={handleDone} style={{ padding: '0.5rem 2rem' }}>
          Done
        </button>
      </div>
    </div>
  );
};

export default PredictionResult;