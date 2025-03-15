const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate'); 
const { createQuiz, submitQuiz, getAllQuizzes } = require('../controllers/quizController');

/**
 * @swagger
 * /api/quizzes/create:
 *   post:
 *     summary: Create a new quiz for a course
 *     tags: [Quizzes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                     options:
 *                       type: array
 *                       items:
 *                         type: string
 *                     correctAnswer:
 *                       type: string
 *     responses:
 *       200:
 *         description: Quiz created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/create', authenticate ,createQuiz);

/**
 * @swagger
 * /api/quizzes:
 *   get:
 *     summary: Get all quizzes
 *     tags: [Quizzes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched all quizzes
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
router.get('/', authenticate, getAllQuizzes);

/**
 * @swagger
 * /api/quizzes/submit:
 *   post:
 *     summary: Submit answers to a quiz and get the score
 *     tags: [Quizzes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               quizId:
 *                 type: string
 *               answers:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Quiz submitted successfully with score
 *       400:
 *         description: Invalid input
 */
router.post('/submit', authenticate, submitQuiz);

module.exports = router;
