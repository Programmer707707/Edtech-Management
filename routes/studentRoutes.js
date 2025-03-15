const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authenticate = require('../middlewares/authenticate');  

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', authenticate, studentController.createStudent);  

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all students
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, studentController.getAllStudents);  

/**
 * @swagger
 * /api/students/{studentId}/enroll:
 *   post:
 *     summary: Enroll a student in a course
 *     tags: [Students]
 *     parameters:
 *       - name: studentId
 *         in: path
 *         description: ID of the student to enroll
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student enrolled successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Student or course not found
 */
router.post('/:studentId/enroll/:courseId', authenticate, studentController.enrollInCourse); 

module.exports = router;
