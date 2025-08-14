import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">
          কোচিং ম্যানেজমেন্ট
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-800 hover:text-blue-600">হোম</Link>
          <Link to="/admission" className="text-gray-800 hover:text-blue-600">ভর্তি</Link>
          {token ? (
            <button onClick={logout} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
              লগআউট
            </button>
          ) : (
            <Link to="/login" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              লগইন
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
