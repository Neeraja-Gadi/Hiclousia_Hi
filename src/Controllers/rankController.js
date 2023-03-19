const Student = require('../models/studentModel');
// const { Authority, Certificate, Education_Level, Experience } = require('../config/constants');

exports.git = async (req, res) => {
  try {
    // Get all students from the database
    const students = await Student.find();
    
    // Filter students based on query parameters
    let filteredStudents = students.filter((student) => {
      if (req.query.authority && student.authority !== req.query.authority) {
        return false;
      }
      if (req.query.certificate && student.certificate !== req.query.certificate) {
        return false;
      }
      if (req.query.educationLevel && student.education_Level !== req.query.educationLevel) {
        return false;
      }
      if (req.query.experience && student.experience !== req.query.experience) {
        return false;
      }
      return true;
    });
    
    // Sort filtered students based on sum of their weights
    filteredStudents = filteredStudents.map((student) => {
      const weight = parseInt(Authority[student.authority])
        + parseInt(Certificate[student.certificate])
        + parseInt(Education_Level[student.education_Level])
        + parseInt(Experience[student.experience]);
      return { ...student._doc, weight };
    }).sort((a, b) => b.weight - a.weight);
    
    // Get top two ranked students
    const topTwoRankedStudents = filteredStudents.slice(0, 2);
    
    res.status(200).json({
      success: true,
      data: topTwoRankedStudents,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
