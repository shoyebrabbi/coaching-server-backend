// routes/teachers.js

const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
const auth = require('../middleware/authMiddleware'); // অথেন্টিকেশন মিডলওয়্যার

// সকল শিক্ষকের তালিকা দেখুন (GET) - সবার জন্য উন্মুক্ত
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// নতুন শিক্ষক যোগ করুন (POST) - শুধুমাত্র অ্যাডমিন
router.post('/', auth, async (req, res) => {
  const teacher = new Teacher({
    name: req.body.name,
    subject: req.body.subject,
    qualification: req.body.qualification,
    imageUrl: req.body.imageUrl
  });
  try {
    const newTeacher = await teacher.save();
    res.status(201).json(newTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// একজন শিক্ষকের তথ্য আপডেট করুন (PUT) - শুধুমাত্র অ্যাডমিন
router.put('/:id', auth, async (req, res) => {
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTeacher) return res.status(404).json({ message: 'শিক্ষককে খুঁজে পাওয়া যায়নি' });
        res.json(updatedTeacher);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// একজন শিক্ষককে ডিলিট করুন (DELETE) - শুধুমাত্র অ্যাডমিন
router.delete('/:id', auth, async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);
        if (!teacher) return res.status(404).json({ message: 'শিক্ষককে খুঁজে পাওয়া যায়নি' });
        res.json({ message: 'শিক্ষককে সফলভাবে ডিলিট করা হয়েছে' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
