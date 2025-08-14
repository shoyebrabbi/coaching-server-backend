import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AdmissionPage from './pages/AdmissionPage';
import LoginPage from './pages/LoginPage';
import TeachersPage from './pages/TeachersPage';
import AboutPage from './pages/AboutPage'; // নতুন পেইজ ইম্পোর্ট করা হলো
import ContactPage from './pages/ContactPage'; // নতুন পেইজ ইম্পোর্ট করা হলো

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen font-sans">
        <Navbar />
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admission" element={<AdmissionPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/about" element={<AboutPage />} /> {/* নতুন রুট যোগ করা হলো */}
            <Route path="/contact" element={<ContactPage />} /> {/* নতুন রুট যোগ করা হলো */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
