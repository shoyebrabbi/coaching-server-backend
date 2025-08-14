// routes/students.js

const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const auth = require('../middleware/authMiddleware'); // অথেন্টিকেশন মিডলওয়্যার

// সকল শিক্ষার্থীর তালিকা দেখুন (GET)
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// নতুন শিক্ষার্থী যোগ করুন (POST)
router.post('/', auth, async (req, res) => {
  const student = new Student({
    name: req.body.name,
    studentId: req.body.studentId,
    enrolledCourse: req.body.enrolledCourse,
    contactNumber: req.body.contactNumber
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// একজন শিক্ষার্থী ডিলিট করুন (DELETE)
router.delete('/:id', auth, async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'শিক্ষার্থীকে খুঁজে পাওয়া যায়নি' });
        }
        res.json({ message: 'শিক্ষার্থীকে সফলভাবে ডিলিট করা হয়েছে' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- নতুন সংযোজন: একজন শিক্ষার্থীর তথ্য আপডেট করুন (PUT) ---
// API Endpoint: PUT /api/students/:id
router.put('/:id', auth, async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // আপডেটেড তথ্য ফেরত পাওয়ার জন্য
        );
        if (!updatedStudent) {
            return res.status(404).json({ message: 'শিক্ষার্থীকে খুঁজে পাওয়া যায়নি' });
        }
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;
