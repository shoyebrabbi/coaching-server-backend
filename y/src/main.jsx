import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx'; // এই লাইনটি যোগ করা হয়েছে

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* AuthProvider দিয়ে App কে 감싸তে হবে */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
);