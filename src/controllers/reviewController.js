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

exports.getMapReviews = async (req, res) => {
  try {
    const { northEastLat, northEastLng, southWestLat, southWestLng } = req.query;

    const reviews = await Review.find({
      latitude: { $lt: northEastLat, $gt: southWestLat },
      longitude: { $lt: northEastLng, $gt: southWestLng }
    }, { _id: 1, latitude: 1, longitude: 1, address: 1 });

    res.json({ reviews });
  } catch (error) {
    console.error('Error fetching map reviews:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  
}

exports.submitReview = async (req, res) => {
  try {
    const {
      address,
      advantage,
      disadvantage,
      residenceType,
      residenceYear,
      residenceFloor,
      overallRating,
      strengthKeywords,
      weaknessKeywords,
      userId,
      userName,
      latitude,
      longitude
    } = req.body;

    const newReview = new Review({
      address,
      advantage,
      disadvantage,
      residenceType,
      residenceYear,
      residenceFloor,
      overallRating,
      strengthKeywords,
      weaknessKeywords,
      userId,
      userName,
      latitude,
      longitude
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};
