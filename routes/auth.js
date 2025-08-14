const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// অ্যাডমিন রেজিস্ট্রেশন (POST /api/auth/register)
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'ইউজার আগে থেকেই موجود' });
    }
    user = new User({ username, password });
    await user.save();
    res.status(201).send('অ্যাডমিন সফলভাবে রেজিস্টার হয়েছে');
  } catch (err) {
    res.status(500).send('সার্ভার এরর');
  }
});

// অ্যাডমিন লগইন (POST /api/auth/login)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'ভুল ইউজারনেম অথবা পাসওয়ার্ড' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'ভুল ইউজারনেম অথবা পাসওয়ার্ড' });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).send('সার্ভার এরর');
  }
});

module.exports = router;
