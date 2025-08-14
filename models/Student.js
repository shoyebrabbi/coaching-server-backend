// models/Student.js

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true // প্রতিটি শিক্ষার্থীর আইডি ইউনিক হতে হবে
  },
  enrolledCourse: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Student', studentSchema);
