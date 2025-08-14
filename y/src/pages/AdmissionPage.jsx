import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';
import EditStudentForm from '../components/EditStudentForm'; // নতুন এডিট ফর্ম ইম্পোর্ট করা হলো

function AdmissionPage() {
  const { token } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('name');
  
  // --- নতুন সংযোজন: এডিটিং অবস্থা ট্র্যাক করার জন্য ---
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then(res => {
        if (!res.ok) throw new Error('শিক্ষার্থীদের তালিকা লোড করা যায়নি');
        return res.json();
      })
      .then(data => {
        setStudents(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);
  
  const handleStudentAdded = (newStudent) => setStudents([...students, newStudent]);
  
  // --- নতুন সংযোজন: শিক্ষার্থী আপডেট করার ফাংশন ---
  const handleUpdateStudent = (updatedStudent) => {
    setStudents(students.map(s => (s._id === updatedStudent._id ? updatedStudent : s)));
    setEditingStudent(null); // এডিটিং মোড বন্ধ করা
  };

  const handleDeleteStudent = (id) => {
    setActionError('');
    if (!token) {
        setActionError('ডিলিট করার জন্য আপনাকে লগইন করতে হবে।');
        return;
    }
    if (window.confirm('এই শিক্ষার্থীকে ডিলিট করতে চান?')) {
      fetch(`http://localhost:5000/api/students/${id}`, { 
        method: 'DELETE',
        headers: { 'x-auth-token': token } 
      })
        .then(res => {
            if (res.ok) {
                setStudents(students.filter(s => s._id !== id));
            } else {
                setActionError('ডিলিট করার অনুমতি নেই।');
            }
        })
        .catch(() => setActionError('ডিলিট করার সময় সার্ভারে সমস্যা হয়েছে।'));
    }
  };

  const filteredStudents = students.filter(student => {
    if (searchTerm === '') return true;
    const studentData = student[searchCategory]?.toString().toLowerCase();
    return studentData?.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-4 md:p-8">
      {token && <StudentForm onStudentAdded={handleStudentAdded} />}
      
      {actionError && <p className="text-center text-red-500 my-4 bg-red-100 p-3 rounded-lg">{actionError}</p>}

      <div className="my-8 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-gray-700">শিক্ষার্থী খুঁজুন</h3>
        <div className="flex items-center space-x-2">
          <select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="name">নাম</option>
            <option value="studentId">আইডি</option>
            <option value="enrolledCourse">কোর্স</option>
            <option value="contactNumber">যোগাযোগ</option>
          </select>
          <input
            type="text"
            placeholder="এখানে সার্চ করুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500 mt-10">তালিকা লোড হচ্ছে...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-10">{error}</p>
      ) : (
        <StudentList 
          students={filteredStudents} 
          onDelete={handleDeleteStudent}
          onEdit={setEditingStudent}
          editingStudent={editingStudent}
          onUpdate={handleUpdateStudent}
          onCancelEdit={() => setEditingStudent(null)}
        />
      )}
    </div>
  );
}

export default AdmissionPage;
