import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure this import is correct
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';


const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY; 

if (!publishableKey) {
  console.error("Missing publishable key. Please check your .env.local file.");
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
