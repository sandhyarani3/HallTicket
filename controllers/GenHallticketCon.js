const Student = require("../models/Student"); // assuming Mongoose or DB logic

const generateHallticket = async (req, res) => {
  const { studentId, location, time } = req.body;

  try {
    // fetch student by ID
    const student = await Student.findOne({ studentId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Return full data
    res.json({
      student,
      location,
      time,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { generateHallticket };
