import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import your main application component
import './styles/global.css'; // Import global base styles

// Get the root DOM element where the React app will be rendered
const rootElement = document.getElementById('root');

// Create the root container using the modern React 18 API
const root = ReactDOM.createRoot(rootElement);

// Render the application
root.render(
  // React.StrictMode enables development-time checks and warnings
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Note: You would typically handle things like Web Vitals setup here if needed,
// but for this minimal e-commerce site, this structure is sufficient.
