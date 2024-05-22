const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/api/latest-reviews', reviewController.getLatestReviews);

module.exports = router;
