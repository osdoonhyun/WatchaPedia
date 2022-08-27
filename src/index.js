import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './component/App';
import firebase from "./firebase";

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(firebase);
root.render(
  <App />
);

