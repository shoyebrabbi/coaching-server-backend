import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import EditStudentForm from './EditStudentForm'; // এডিট ফর্ম ইম্পোর্ট করা হলো

// AdmissionPage থেকে পাঠানো নতুন props গুলো এখানে গ্রহণ করা হচ্ছে
function StudentList({ students, onDelete, onEdit, editingStudent, onUpdate, onCancelEdit }) {
  const { token } = useContext(AuthContext);

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">আমাদের শিক্ষার্থী তালিকা</h2>
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
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
                {/* --- কন্ডিশনাল রেন্ডারিং --- */}
                {editingStudent && editingStudent._id === student._id ? (
                  // যদি এই শিক্ষার্থীকে এডিট করা হয়, তাহলে এডিট ফর্ম দেখানো হবে
                  <td colSpan="5" className="p-4 border-b border-gray-200">
                    <EditStudentForm 
                      student={editingStudent} 
                      onUpdate={onUpdate} 
                      onCancel={onCancelEdit} 
                    />
                  </td>
                ) : (
                  // অন্যথায়, সাধারণ তথ্য দেখানো হবে
                  <>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{student.name}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{student.studentId}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{student.enrolledCourse}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{student.contactNumber}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                      {/* শুধুমাত্র লগইন করা থাকলে বাটনগুলো দেখাবে */}
                      {token && (
                        <div className="flex space-x-2 justify-end">
                          <button onClick={() => onEdit(student)} className="text-sm bg-yellow-500 text-white font-bold py-1 px-3 rounded-md hover:bg-yellow-600">
                            এডিট
                          </button>
                          <button onClick={() => onDelete(student._id)} className="text-sm bg-red-600 text-white font-bold py-1 px-3 rounded-md hover:bg-red-700">
                            ডিলিট
                          </button>
                        </div>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;
