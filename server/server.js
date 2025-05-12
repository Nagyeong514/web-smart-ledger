// 서버 메인 파일 (API 라우터 연결 및 실행)
// smart-ledger-project/server/server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 환경 변수 로드 (.env)
dotenv.config();

const app = express();

// 미들웨어 설정
app.use(cors()); // 모든 도메인에서 CORS 허용
app.use(express.json()); // JSON 형식 요청 바디 파싱
app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded 파싱

// API 라우터 불러오기
const authRoutes = require('./routes/auth'); // 회원가입, 로그인, 소비내역
const ocrRoutes = require('./routes/ocr'); // OCR 기능
const goalRoutes = require('./routes/goal'); // 목표 금액 관리
const receiptRoutes = require('./routes/receipts'); // 이미지 업로드 및 영수증 저장

// 라우터 등록
app.use('/api/auth', authRoutes); // → /api/auth/*
app.use('/api/ocr', ocrRoutes); // → /api/ocr/*
app.use('/api/goal', goalRoutes); // → /api/goal/*
app.use('/api/receipts', receiptRoutes); // → /api/receipts/*

// 기본 루트
app.get('/', (req, res) => {
    res.send('Smart Ledger Server is running.');
});

// 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
