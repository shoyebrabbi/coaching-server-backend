import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import CourseForm from '../components/CourseForm';
import EditCourseForm from '../components/EditCourseForm';

function HomePage() {
  const { token } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(''); // অ্যাকশন এররের জন্য নতুন state

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then(res => {
        if (!res.ok) throw new Error('ডেটা লোড করতে সমস্যা হয়েছে');
        return res.json();
      })
      .then(data => {
        setCourses(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const secureFetch = (url, options = {}) => {
    if (!token) return Promise.reject('No token found');
    return fetch(url, {
      ...options,
      headers: { ...options.headers, 'Content-Type': 'application/json', 'x-auth-token': token },
    });
  };

  const handleCourseAdded = (newCourse) => setCourses([...courses, newCourse]);
  const handleUpdateCourse = (updatedCourse) => {
    setCourses(courses.map(c => (c._id === updatedCourse._id ? updatedCourse : c)));
    setEditingCourse(null);
  };
  const handleDeleteCourse = (id) => {
    setActionError(''); // পুরোনো এরর মুছে ফেলা হলো
    if (window.confirm('এই কোর্সটি ডিলিট করতে চান?')) {
      secureFetch(`http://localhost:5000/api/courses/${id}`, { method: 'DELETE' })
        .then(res => {
          if (res.ok) {
            setCourses(courses.filter(c => c._id !== id));
          } else {
            setActionError('ডিলিট করার অনুমতি নেই।');
          }
        })
        .catch(() => setActionError('ডিলিট করার সময় সার্ভারে সমস্যা হয়েছে।'));
    }
  };

  return (
    <div className="p-4 md:p-8">
      {token && <CourseForm onCourseAdded={handleCourseAdded} />}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">কোর্সসমূহ</h2>
        
        {actionError && <p className="text-center text-red-500 mb-4 bg-red-100 p-3 rounded-lg">{actionError}</p>}

        {isLoading ? (
          <p className="text-center text-gray-500">লোড হচ্ছে...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.length > 0 ? courses.map(course => (
              <div key={course._id} className="bg-white rounded-lg shadow-lg p-6">
                {editingCourse && editingCourse._id === course._id && token ? (
                  <EditCourseForm course={editingCourse} onUpdate={handleUpdateCourse} onCancel={() => setEditingCourse(null)} />
                ) : (
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold">{course.name}</h3>
                    <p className="text-gray-700">{course.description}</p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-semibold">ফি: {course.fee} টাকা</span>
                      <span className="font-semibold">সময়কাল: {course.duration}</span>
                    </div>
                    {token && (
                      <div className="flex space-x-2 pt-4">
                        <button onClick={() => setEditingCourse(course)} className="flex-1 text-sm bg-yellow-500 text-white font-bold py-2 px-3 rounded-md hover:bg-yellow-600">এডিট</button>
                        <button onClick={() => handleDeleteCourse(course._id)} className="flex-1 text-sm bg-red-600 text-white font-bold py-2 px-3 rounded-md hover:bg-red-700">ডিলিট</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )) : <p className="col-span-full text-center text-gray-500">কোনো কোর্স পাওয়া যায়নি।</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
