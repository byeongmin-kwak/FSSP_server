const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/latest-reviews', reviewController.getLatestReviews);
router.get('/map-reviews', reviewController.getMapReviews);
router.post('/reviews', reviewController.submitReview);

module.exports = router;
