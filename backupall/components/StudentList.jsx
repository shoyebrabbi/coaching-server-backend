import React from 'react';

function StudentList({ students, onDelete }) {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">আমাদের শিক্ষার্থী তালিকা</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">নাম</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">আইডি</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">কোর্স</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">যোগাযোগ</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{student.name}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{student.studentId}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{student.enrolledCourse}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{student.contactNumber}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                  <button onClick={() => onDelete(student._id)} className="text-sm bg-red-600 text-white font-bold py-1 px-3 rounded-md hover:bg-red-700 transition">
                    ডিলিট
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;
