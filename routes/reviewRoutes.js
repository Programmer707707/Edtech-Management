const express = require('express');
const router = express.Router();
const { addReview, getReviews, getAverageRating } = require('../controllers/reviewController');
const authenticate = require('../middlewares/authenticate');


/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Add a review for a course
 *     tags: [Reviews]
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
 *               studentId:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 description: A rating between 1 and 5
 *               comment:
 *                 type: string
 *                 description: Optional comment for the course
 *     responses:
 *       201:
 *         description: Review added successfully
 *       400:
 *         description: Invalid input or missing required fields
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticate, addReview);

/**
 * @swagger
 * /api/reviews/{courseId}:
 *   get:
 *     summary: Get all reviews for a specific course
 *     tags: [Reviews]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The ID of the course
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched reviews for the course
 *       400:
 *         description: Invalid course ID
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: No reviews found for this course
 *       500:
 *         description: Internal server error
 */
router.get('/:courseId', authenticate, getReviews);


/**
 * @swagger
 * /api/reviews/{courseId}/average-rating:
 *   get:
 *     summary: Get the average rating for a specific course
 *     tags: [Reviews]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The ID of the course
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched average rating for the course
 *       400:
 *         description: Invalid course ID
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Course not found or no reviews available
 *       500:
 *         description: Internal server error
 */
router.get('/:courseId/average-rating', authenticate, getAverageRating);

module.exports = router;
