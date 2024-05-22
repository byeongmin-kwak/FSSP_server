const express = require('express');
const mongoose = require('mongoose');
const reviewRoutes = require('./routes/reviewRoutes');
require('dotenv').config();

const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// 라우트 설정
app.use('/api', reviewRoutes);

module.exports = app;