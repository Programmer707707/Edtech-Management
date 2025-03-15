const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authenticate = require('../middlewares/authenticate'); 


/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               instructor:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course created successfully
 *       401:
 *         description: Unauthorized
 */

router.post('/', authenticate, courseController.createCourse);  

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: 
 *       - Courses
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved courses
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get('/', authenticate, courseController.getAllCourses);  


/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the course to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the course
 *       404:
 *         description: Course not found
 */
router.get('/:id', authenticate, courseController.getCourseById); 

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the course to update
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               instructor:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       404:
 *         description: Course not found
 */
router.put('/:id', authenticate, courseController.updateCourse); 

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the course to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 */
router.delete('/:id', authenticate, courseController.deleteCourse);  



module.exports = router;
