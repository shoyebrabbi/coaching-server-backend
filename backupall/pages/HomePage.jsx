import React, { useState, useEffect } from 'react';
import CourseForm from '../components/CourseForm';
import EditCourseForm from '../components/EditCourseForm';

function HomePage() {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleCourseAdded = (newCourse) => setCourses([...courses, newCourse]);
  const handleUpdateCourse = (updatedCourse) => {
    setCourses(courses.map(c => (c._id === updatedCourse._id ? updatedCourse : c)));
    setEditingCourse(null);
  };
  const handleDeleteCourse = (id) => {
    if (window.confirm('এই কোর্সটি ডিলিট করতে চান?')) {
      fetch(`http://localhost:5000/api/courses/${id}`, { method: 'DELETE' })
        .then(res => res.ok && setCourses(courses.filter(c => c._id !== id)));
    }
  };

  return (
    <div className="p-4 md:p-8">
      <CourseForm onCourseAdded={handleCourseAdded} />
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">কোর্সসমূহ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map(course => (
            <div key={course._id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2">
              <div className="p-6">
                {editingCourse && editingCourse._id === course._id ? (
                  <EditCourseForm course={editingCourse} onUpdate={handleUpdateCourse} onCancel={() => setEditingCourse(null)} />
                ) : (
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900">{course.name}</h3>
                    <p className="text-gray-700">{course.description}</p>
                    <div className="flex justify-between items-center text-gray-800 pt-2">
                      <span className="font-semibold">ফি: {course.fee} টাকা</span>
                      <span className="font-semibold">সময়কাল: {course.duration}</span>
                    </div>
                    <div className="flex space-x-2 pt-4">
                      <button onClick={() => setEditingCourse(course)} className="flex-1 text-sm bg-yellow-500 text-white font-bold py-2 px-3 rounded-md hover:bg-yellow-600 transition">এডিট</button>
                      <button onClick={() => handleDeleteCourse(course._id)} className="flex-1 text-sm bg-red-600 text-white font-bold py-2 px-3 rounded-md hover:bg-red-700 transition">ডিলিট</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
