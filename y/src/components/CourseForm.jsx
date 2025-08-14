import React, { useState } from 'react';

function CourseForm({ onCourseAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fee, setFee] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = { name, description, fee: Number(fee), duration };

    fetch('http://localhost:5000/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCourse),
    })
      .then(response => response.json())
      .then(addedCourse => {
        onCourseAdded(addedCourse);
        setName('');
        setDescription('');
        setFee('');
        setDuration('');
      })
      .catch(error => console.error('Error adding course:', error));
  };

  return (
    <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">নতুন কোর্স যোগ করুন</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="কোর্সের নাম"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          placeholder="কোর্সের বিবরণ"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
        <div className="flex space-x-4">
          <input
            type="number"
            placeholder="ফি"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="সময়কাল"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
          কোর্স যোগ করুন
        </button>
      </form>
    </div>
  );
}

export default CourseForm;
