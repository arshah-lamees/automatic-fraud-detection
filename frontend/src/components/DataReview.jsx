/*
DataReview.jsx
--------------
Displays a review table of the transaction data before submission.
- Receives formData, onEdit, and onSubmit as props
- Pure presentational component: no state or logic
- Lets user review, edit, or submit their transaction
*/
import React from 'react';

const DataReview = ({ formData, onEdit, onSubmit }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '5vh' }}>
      <h2>Review Transaction Data</h2>
      <table style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
        <tbody>
          {Object.entries(formData).map(([key, value]) => (
            <tr key={key}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', textTransform: 'capitalize' }}>
                {key.replace(/_/g, ' ')}
              </td>
              <td style={{ padding: '0.5rem' }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '2rem' }}>
        <button onClick={onEdit} style={{ marginRight: '1rem', padding: '0.5rem 2rem' }}>
          Edit
        </button>
        <button onClick={onSubmit} style={{ padding: '0.5rem 2rem' }}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default DataReview;