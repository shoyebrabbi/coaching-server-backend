import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import TeacherForm from '../components/TeacherForm';

function TeachersPage() {
  const { token } = useContext(AuthContext);
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/teachers')
      .then(res => {
        if (!res.ok) throw new Error('শিক্ষকদের তালিকা লোড করা যায়নি');
        return res.json();
      })
      .then(data => {
        setTeachers(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const handleTeacherAdded = (newTeacher) => {
    setTeachers([...teachers, newTeacher]);
  };

  const handleDeleteTeacher = (id) => {
    if (!token) return alert('ডিলিট করার জন্য লগইন করুন।');
    if (window.confirm('এই শিক্ষককে তালিকা থেকে বাদ দিতে চান?')) {
      fetch(`http://localhost:5000/api/teachers/${id}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': token }
      })
      .then(res => {
        if (res.ok) {
          setTeachers(teachers.filter(t => t._id !== id));
        } else {
          alert('ডিলিট করার অনুমতি নেই।');
        }
      });
    }
  };

  return (
    <div className="p-4 md:p-8">
      {token && <TeacherForm onTeacherAdded={handleTeacherAdded} />}
      
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">আমাদের অভিজ্ঞ শিক্ষকগণ</h2>
        {isLoading ? (
          <p className="text-center text-gray-500">লোড হচ্ছে...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teachers.map(teacher => (
              <div key={teacher._id} className="bg-white rounded-lg shadow-lg text-center p-6 transition transform hover:-translate-y-2">
                <div className="mb-4">
                  {/* Placeholder for teacher image */}
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto flex items-center justify-center">
                    <span className="text-3xl text-gray-400">👤</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{teacher.name}</h3>
                <p className="text-blue-600 font-semibold">{teacher.subject}</p>
                <p className="text-gray-600 text-sm mt-1">{teacher.qualification}</p>
                {token && (
                  <button 
                    onClick={() => handleDeleteTeacher(teacher._id)} 
                    className="mt-4 text-xs bg-red-100 text-red-700 font-bold py-1 px-3 rounded-full hover:bg-red-200"
                  >
                    ডিলিট
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TeachersPage;
