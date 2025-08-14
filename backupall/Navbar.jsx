import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">
          কোচিং ম্যানেজমেন্ট
        </Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-gray-800 hover:text-blue-600">হোম</Link>
          <Link to="/admission" className="text-gray-800 hover:text-blue-600">ভর্তি</Link>
          {token ? (
            <button
              onClick={handleLogout}
              className="text-gray-800 hover:text-blue-600"
            >
              লগআউট
            </button>
          ) : (
            <Link to="/login" className="text-gray-800 hover:text-blue-600">
              লগইন
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
