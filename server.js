require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB সফলভাবে সংযুক্ত'))
  .catch(err => console.error('MongoDB সংযোগে সমস্যা:', err));

app.get('/', (req, res) => {
  res.send('কোচিং ম্যানেজমেন্ট সার্ভার সফলভাবে চলছে!');
});

// API রুট
app.use('/api/courses', require('./routes/courses'));
app.use('/api/students', require('./routes/students'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/teachers', require('./routes/teachers')); // নতুন teachers রুট যোগ করা হলো

app.listen(PORT, '0.0.0.0', () => {
  console.log(`সার্ভার http://localhost:${PORT} -এ চলছে`);
});
