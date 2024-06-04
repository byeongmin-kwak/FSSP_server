const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  advantage: { type: String}, // 장점
  disadvantage: { type: String}, // 단점
  createdAt: { type: Date, default: Date.now }, // 만들어진 시간
  address: { type: String, required: true }, // 주소
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // 작성한 유저 아이디
  userName: {type: String}, // 유저 이름
  latitude: { type: Number}, // 위도
  longitude: { type: Number}, // 경도
  residenceYear: { type: String }, // 거주 년도
  residenceFloor: { type: String }, // 거주 층수
  overallRating: { type: Number }, // 총 평점
  advantageKeywords: { type: [String] }, // 장점 키워드
  disadvantageKeywords: { type: [String] } // 단점 키워드
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
