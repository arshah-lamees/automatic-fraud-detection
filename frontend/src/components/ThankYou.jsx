/*
  ThankYou.jsx
  ------------
  This component displays a thank you message after the user completes the transaction flow in the Fraud Detection System frontend.
  - Pure presentational component: no state or logic.
  - Provides user feedback that their submission was received.
*/
   import React from 'react';

   const ThankYou = () => (
     <div style={{ textAlign: 'center', marginTop: '10vh' }}>
       <h1>Thank You!</h1>
       <p>Your submission has been received.</p>
     </div>
   );

   export default ThankYou;