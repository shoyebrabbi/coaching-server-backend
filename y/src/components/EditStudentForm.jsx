import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function EditStudentForm({ student, onUpdate, onCancel }) {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: student.name,
    studentId: student.studentId,
    enrolledCourse: student.enrolledCourse,
    contactNumber: student.contactNumber,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    fetch(`http://localhost:5000/api/students/${student._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify(formData),
    })
      .then(res => {
        // --- উন্নত এরর হ্যান্ডলিং ---
        if (!res.ok) {
          // যদি উত্তরটি JSON না হয়, তাহলে টেক্সট হিসেবে দেখানোর চেষ্টা করা হবে
          return res.text().then(text => {
            try {
              const errData = JSON.parse(text);
              throw new Error(errData.message || 'সার্ভার থেকে একটি ত্রুটি এসেছে।');
            } catch (jsonError) {
              // যদি JSON পার্স করতেও সমস্যা হয়, তাহলে HTML এর অংশ দেখানো হবে
              throw new Error(`সার্ভার থেকে একটি অপ্রত্যাশিত উত্তর এসেছে: ${text.slice(0, 100)}`);
            }
          });
        }
        return res.json();
      })
      .then(updatedStudent => {
        onUpdate(updatedStudent);
      })
      .catch(err => {
        console.error('Error updating student:', err);
        setError(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-gray-50 p-4 rounded-lg">
      <h4 className="font-semibold text-gray-700">শিক্ষার্থী এডিট করুন</h4>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
        required
      />
      <input
        type="text"
        name="studentId"
        value={formData.studentId}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
        required
      />
      <input
        type="text"
        name="enrolledCourse"
        value={formData.enrolledCourse}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
        required
      />
      <input
        type="text"
        name="contactNumber"
        value={formData.contactNumber}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex space-x-2">
        <button type="submit" className="flex-1 bg-green-600 text-white py-2 px-3 rounded-md hover:bg-green-700">সেভ</button>
        <button type="button" onClick={onCancel} className="flex-1 bg-gray-500 text-white py-2 px-3 rounded-md hover:bg-gray-600">বাতিল</button>
      </div>
    </form>
  );
}

export default EditStudentForm;
