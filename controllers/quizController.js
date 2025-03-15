const Quiz = require('../models/Quiz');
const Student = require('../models/Student');
const Course = require('../models/Course');
const mongoose = require('mongoose');

const createQuiz = async (req, res) => {
  const { courseId, questions } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid courseId' });
    }

    const course = await Course.findById(courseId); 
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const quiz = new Quiz({
      courseId,
      questions,
    });

    await quiz.save();
    res.status(200).json({ message: 'Quiz created successfully', quiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating quiz', error: err.message });
  }
};



const submitQuiz = async (req, res) => {
  const { studentId, quizId, answers } = req.body;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.quizScores = student.quizScores || {};
    student.quizScores[quizId] = score;
    await student.save();

    res.status(200).json({ message: 'Quiz submitted successfully', score });
  } catch (err) {
    console.error('Error submitting quiz:', err);
    res.status(500).json({ message: 'Error submitting quiz', error: err.message });
  }
};

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('courseId', 'name category instructor'); 

    if (!quizzes || quizzes.length === 0) {
      return res.status(404).json({ message: 'No quizzes found' });
    }

    res.status(200).json(quizzes);
  } catch (err) {
    console.error('Error fetching quizzes:', err);
    res.status(500).json({ message: 'Failed to fetch quizzes', error: err.message });
  }
};

module.exports = { createQuiz, submitQuiz, getAllQuizzes };
