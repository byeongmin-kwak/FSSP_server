// reviewController.js
const Review = require('../models/reviewModel'); // 리뷰 모델

// 최신 리뷰 조회
exports.getLatestReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(10);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

// 지도에서 리뷰 조회
exports.getMapReviews = async (req, res) => {
  const { northEastLat, northEastLng, southWestLat, southWestLng } = req.query;

  // 입력 파라미터 검증
  if (!northEastLat || !northEastLng || !southWestLat || !southWestLng) {
    return res.status(400).json({ error: 'All coordinate parameters are required.' });
  }

  // 숫자로 변환 가능한지 확인
  const coordinates = [northEastLat, northEastLng, southWestLat, southWestLng];
  if (coordinates.some(coord => isNaN(parseFloat(coord)))) {
    return res.status(400).json({ error: 'All coordinates must be valid numbers' });
  }

  // 좌표 값 확인 및 변환
  const neLat = parseFloat(northEastLat);
  const neLng = parseFloat(northEastLng);
  const swLat = parseFloat(southWestLat);
  const swLng = parseFloat(southWestLng);

  try {
    // MongoDB 쿼리
    const reviews = await Review.find({
      latitude: { $gte: swLat, $lte: neLat },
      longitude: { $gte: swLng, $lte: neLng }
    }, {
      _id: 1, latitude: 1, longitude: 1, address: 1, overallRating: 1, jibunAddress: 1, bcode: 1, buildingName: 1, // 필요한 필드만 선택적으로 반환
    });

    res.json({ reviews });
  } catch (error) {
    console.error('Error fetching map reviews:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};

// 리뷰 작성
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
      advantageKeywords,
      disadvantageKeywords,
      userId,
      userName,
      latitude,
      longitude,
      bcode,
      jibunAddress,
      buildingName,
    } = req.body;

    // 좌표 값을 숫자형으로 변환
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    const newReview = new Review({
      address,
      advantage,
      disadvantage,
      residenceType,
      residenceYear,
      residenceFloor,
      overallRating,
      advantageKeywords,
      disadvantageKeywords,
      userId,
      userName,
      latitude: lat,
      longitude: lng,
      bcode,
      jibunAddress,
      buildingName,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.getReviewsByAddress = async (req, res) => {
  try {
    const address = req.query.address;
    const revies = await Review.find({ address: address});
    res.json(revies);
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
};