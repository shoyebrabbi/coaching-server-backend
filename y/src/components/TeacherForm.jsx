import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function TeacherForm({ onTeacherAdded }) {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [qualification, setQualification] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const newTeacher = { name, subject, qualification };

    fetch('http://localhost:5000/api/teachers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify(newTeacher),
    })
      .then(res => {
        if (!res.ok) throw new Error('শিক্ষক যোগ করতে সমস্যা হয়েছে।');
        return res.json();
      })
      .then(addedTeacher => {
        onTeacherAdded(addedTeacher);
        setName('');
        setSubject('');
        setQualification('');
      })
      .catch(err => setError(err.message));
  };

  return (
    <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">নতুন শিক্ষক যোগ করুন</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="শিক্ষকের নাম"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="বিষয়"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="যোগ্যতা"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 transition">
          শিক্ষক যোগ করুন
        </button>
      </form>
    </div>
  );
}

export default TeacherForm;
