const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/latest-reviews', reviewController.getLatestReviews);

module.exports = router;
