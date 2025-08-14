// models/Course.js

const mongoose = require('mongoose');

// এখানে আমরা ডেটাবেসে 'Course' দেখতে কেমন হবে, তার একটি কাঠামো বা Schema তৈরি করছি।
// প্রতিটি কোর্সের একটি নাম, বর্ণনা, ফি এবং সময়কাল থাকবে।
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // নাম অবশ্যই দিতে হবে
  },
  description: {
    type: String,
    required: true
  },
  fee: {
    type: Number,
    required: true
  },
  duration: {
    type: String, // যেমন: "3 months"
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now // কোর্সটি কখন তৈরি হলো, তার সময় স্বয়ংক্রিয়ভাবে যোগ হবে
  }
});

// Schema-টিকে একটি মডেলে পরিণত করা হচ্ছে এবং এক্সপোর্ট করা হচ্ছে।
// আমরা অন্যান্য ফাইলে 'Course' নামটি ব্যবহার করে এই মডেলটিকে কল করতে পারব।
module.exports = mongoose.model('Course', courseSchema);
