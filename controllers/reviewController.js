const Review = require('../models/Review');

const addReview = async (req, res) => {
  const { courseId, studentId, rating, comment } = req.body;

  try {
    const review = new Review({
      courseId,
      studentId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: 'Review added successfully', review });
  } catch (err) {
    console.error('Error adding review:', err);
    res.status(500).json({ message: 'Failed to add review', error: err.message });
  }
};


const getReviews = async (req, res) => {
  const { courseId } = req.params;

  try {
    const reviews = await Review.find({ courseId }).populate('studentId', 'name email');

    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this course' });
    }

    res.status(200).json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: 'Failed to fetch reviews', error: err.message });
  }
};


const getAverageRating = async (req, res) => {
  const { courseId } = req.params;

  try {
    const reviews = await Review.find({ courseId });
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this course' });
    }

    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    res.status(200).json({ courseId, averageRating });
  } catch (err) {
    console.error('Error fetching average rating:', err);
    res.status(500).json({ message: 'Failed to fetch average rating', error: err.message });
  }
};

module.exports = { addReview, getReviews, getAverageRating };
