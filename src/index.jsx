import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes/App';

import { authService } from './firebase';

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(authService);
root.render(

  <App />
);

