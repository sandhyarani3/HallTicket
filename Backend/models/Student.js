const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: String,
  name: String,
  fatherName: String,
  course: String,
  marks: Number,
  photo: String
});

module.exports = mongoose.model('Student', studentSchema);
