const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  advantages: { type: String, required: true }, // 장점
  disadvantages: { type: String, required: true }, // 단점
  createdAt: { type: Date, default: Date.now }, // 만들어진 시간
  address: { type: String, required: true }, // 주소
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // 작성한 유저 아이디
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
