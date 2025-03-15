const Student = require('../models/Student');
const Course = require('../models/Course');


const createStudent = async (req, res) => {
  const { name, email, courses, enrollDate } = req.body;
  console.log(req.body); 

  try {
    const student = new Student({
      name,
      email,
      courses: courses || [],  
      enrollDate: enrollDate || Date.now(),
    });

    await student.save();
    res.status(201).json({ message: 'Student created successfully', student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating student', error: err.message });
  }
};


const enrollInCourse = async (req, res) => {
  const { studentId, courseId } = req.params;

  try {
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    student.courses.push(courseId);
    await student.save();

    res.status(200).json({ message: 'Student enrolled in course successfully', student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error enrolling student in course', error: err.message });
  }
};


const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('courses');
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

module.exports = {
  createStudent,
  enrollInCourse,
  getAllStudents
};
