import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const activeLinkStyle = { color: '#3B82F6', fontWeight: 'bold' };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-xl font-bold text-gray-800">
          কোচিং ম্যানেজমেন্ট
        </NavLink>
        <div className="flex items-center space-x-6">
          <NavLink to="/" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)} className="text-gray-600 hover:text-blue-600">হোম</NavLink>
          <NavLink to="/admission" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)} className="text-gray-600 hover:text-blue-600">ভর্তি</NavLink>
          <NavLink to="/teachers" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)} className="text-gray-600 hover:text-blue-600">শিক্ষক</NavLink>
          <NavLink to="/about" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)} className="text-gray-600 hover:text-blue-600">আমাদের সম্পর্কে</NavLink>
          <NavLink to="/contact" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)} className="text-gray-600 hover:text-blue-600">যোগাযোগ</NavLink>
          {token ? (
            <button onClick={logout} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 text-sm font-semibold">
              লগআউট
            </button>
          ) : (
            <NavLink to="/login" className="text-gray-600 hover:text-blue-600">
              লগইন
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
