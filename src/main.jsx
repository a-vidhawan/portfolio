import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Entry point for the React application.  This file mounts the App
// component into the #root element defined in index.html.  We use
// React.StrictMode to enable additional checks in development mode.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);