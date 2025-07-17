/*
ThankYou.jsx
------------
Displays a thank you message after the user completes the transaction flow.
- Pure presentational component: no state or logic
*/
   // frontend/src/components/ThankYou.jsx
   import React from 'react';

   const ThankYou = () => (
     <div style={{ textAlign: 'center', marginTop: '10vh' }}>
       <h1>Thank You!</h1>
       <p>Your submission has been received.</p>
     </div>
   );

   export default ThankYou;