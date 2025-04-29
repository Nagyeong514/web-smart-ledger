// 서버 메인 파일 (라우터 연결)

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 라우터 불러오기
const authRoutes = require('./routes/auth'); // 인증·회원가입·로그인·보호된 API 관리
const ocrRoutes = require('./routes/ocr'); // OCR 텍스트 추출 API
const goalRoutes = require('./routes/goal'); // OCR 텍스트 추출 API

dotenv.config();

const app = express();

// 미들웨어 설정
app.use(cors()); // 모든 도메인에서 CORS 허용
app.use(express.json()); // JSON 바디 파싱
app.use(express.urlencoded({ extended: true })); // URL-encoded 바디 파싱

// 라우터 연결
app.use('/api/auth', authRoutes); // /api/auth/* 로 들어오는 요청은 authRoutes로 처리
app.use('/api/ocr', ocrRoutes); // /api/ocr/* 로 들어오는 요청은 ocrRoutes로 처리
app.use('/api/goal', goalRoutes); // /api/goal/* 로 들어오는 요청은 goalRoutes로 처리

// 기본 루트
app.get('/', (req, res) => {
    res.send('Smart Ledger Server is running.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
