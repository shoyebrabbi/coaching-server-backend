import React, { useState } from 'react';

function EditCourseForm({ course, onUpdate, onCancel }) {
  // ফর্মের state-গুলো কোর্সের বর্তমান তথ্য দিয়ে শুরু করা হচ্ছে
  const [name, setName] = useState(course.name);
  const [description, setDescription] = useState(course.description);
  const [fee, setFee] = useState(course.fee);
  const [duration, setDuration] = useState(course.duration);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { name, description, fee: Number(fee), duration };

    // ব্যাকএন্ডে PUT রিকোয়েস্ট পাঠানো হচ্ছে
    fetch(`http://localhost:5000/api/courses/${course._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => response.json())
      .then(updatedCourse => {
        // App.jsx-কে জানানো হচ্ছে যে কোর্স আপডেট হয়েছে
        onUpdate(updatedCourse);
      })
      .catch(error => console.error('Error updating course:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4 p-4 bg-gray-100 rounded-lg">
      <h4 className="text-xl font-semibold mb-2 text-gray-700">কোর্স এডিট করুন</h4>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        required
      ></textarea>
      <div className="flex space-x-4">
        <input
          type="number"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
      </div>
      <div className="flex space-x-2">
        <button type="submit" className="flex-1 bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition">
          সেভ করুন
        </button>
        <button type="button" onClick={onCancel} className="flex-1 bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition">
          বাতিল
        </button>
      </div>
    </form>
  );
}

export default EditCourseForm;
