const express = require('express');
const mongoose = require('mongoose');
const Review = require('./models/Review'); // 리뷰 모델
const router = express.Router();

// 최신 리뷰 10개를 조회하는 엔드포인트
router.get('/api/latest-reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(10);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

module.exports = router;
