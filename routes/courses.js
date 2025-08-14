const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const auth = require('../middleware/authMiddleware'); // অথেন্টিকেশন মিডলওয়্যার

// GET /api/courses - সকল কোর্সের তালিকা (সবার জন্য উন্মুক্ত)
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/courses - নতুন কোর্স যোগ (শুধুমাত্র অ্যাডমিন)
router.post('/', auth, async (req, res) => {
  // ...বাকি কোড আগের মতোই থাকবে
});

// PUT /api/courses/:id - কোর্স আপডেট (শুধুমাত্র অ্যাডমিন)
router.put('/:id', auth, async (req, res) => {
  // ...বাকি কোড আগের মতোই থাকবে
});

// DELETE /api/courses/:id - কোর্স ডিলিট (শুধুমাত্র অ্যাডমিন)
router.delete('/:id', auth, async (req, res) => {
  // ...বাকি কোড আগের মতোই থাকবে
});

module.exports = router;
