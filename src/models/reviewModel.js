const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  advantage: { type: String}, // 장점
  disadvantage: { type: String}, // 단점
  createdAt: { type: Date, default: Date.now }, // 만들어진 시간
  address: { type: String, required: true }, // 주소
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // 작성한 유저 아이디
  userName: {type: String}, // 유저 이름
  latitude: { type: String}, // 위도
  longitude: { type: String}, // 경도
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
