// reviewController.js

const Review = require('../models/reviewModel'); // 리뷰 모델

exports.getLatestReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(10);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};
