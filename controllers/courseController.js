const Course = require('../models/Course');

const createCourse = async (req, res) => {
    try {
      const { name, description, category, price, instructor } = req.body;
      const newCourse = new Course({ name, description, category, price, instructor });
      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create course' });
    }
};

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
};

const getCourseById = async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) return res.status(404).json({ error: 'Course not found' });
      res.status(200).json(course);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch course' });
    }
};

const updateCourse = async (req, res) => {
    try {
      const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedCourse) return res.status(404).json({ error: 'Course not found' });
      res.status(200).json(updatedCourse);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update course' });
    }
};


const deleteCourse = async (req, res) => {
    try {
      const deletedCourse = await Course.findByIdAndDelete(req.params.id);
      if (!deletedCourse) return res.status(404).json({ error: 'Course not found' });
      res.status(200).json({ message: 'Course deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete course' });
    }
};
  


module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
