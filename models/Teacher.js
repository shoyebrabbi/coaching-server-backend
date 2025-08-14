// models/Teacher.js

const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  // ভবিষ্যতে ছবি যোগ করার জন্য এই ফিল্ডটি রাখা হলো
  imageUrl: {
    type: String,
    default: ''
  },
  joiningDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Teacher', teacherSchema);
