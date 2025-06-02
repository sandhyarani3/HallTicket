const Student = require('../models/Student');

exports.createStudent = async (req, res) => {
  const { studentId, name, fatherName, course, marks } = req.body;
  const photo = req.file?.path;

  try {
    const student = new Student({ studentId, name, fatherName, course, marks, photo });
    await student.save();
    res.status(201).json({ message: 'Hallticket data saved', student });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save student' });
  }
};
