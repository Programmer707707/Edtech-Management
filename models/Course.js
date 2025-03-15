const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  price: { type: Number },
  instructor: { type: String },
  enrollmentCount: { type: Number, default: 0 }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
