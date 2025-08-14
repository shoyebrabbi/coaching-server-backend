import React, { useState, useEffect } from 'react';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';

function AdmissionPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  const handleStudentAdded = (newStudent) => setStudents([...students, newStudent]);
  const handleDeleteStudent = (id) => {
    if (window.confirm('এই শিক্ষার্থীকে ডিলিট করতে চান?')) {
      fetch(`http://localhost:5000/api/students/${id}`, { method: 'DELETE' })
        .then(res => res.ok && setStudents(students.filter(s => s._id !== id)));
    }
  };

  return (
    <div className="p-4 md:p-8">
      <StudentForm onStudentAdded={handleStudentAdded} />
      <StudentList students={students} onDelete={handleDeleteStudent} />
    </div>
  );
}

export default AdmissionPage;
