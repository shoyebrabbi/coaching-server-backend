import React, { useState } from 'react';

function StudentForm({ onStudentAdded }) {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [enrolledCourse, setEnrolledCourse] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = { name, studentId, enrolledCourse, contactNumber };

    fetch('http://localhost:5000/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('শিক্ষার্থীর আইডি অবশ্যই ইউনিক হতে হবে।');
        }
        return res.json();
      })
      .then(addedStudent => {
        onStudentAdded(addedStudent);
        // Reset form
        setName('');
        setStudentId('');
        setEnrolledCourse('');
        setContactNumber('');
      })
      .catch(error => {
        console.error('Error adding student:', error);
        alert(error.message);
      });
  };

  return (
    <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">নতুন শিক্ষার্থী ভর্তি করুন</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="শিক্ষার্থীর নাম"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="শিক্ষার্থী আইডি"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="ভর্তিকৃত কোর্স"
          value={enrolledCourse}
          onChange={(e) => setEnrolledCourse(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="যোগাযোগ নম্বর"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
        <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition">
          ভর্তি করুন
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
