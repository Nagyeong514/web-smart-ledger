// OCR 요청 전용 API

// /server/routes/ocr.js

const express = require('express');
const router = express.Router();

const { extractTextFromImage } = require('../controllers/ocrController');
const verifyToken = require('../middlewares/authMiddleware'); // 로그인 인증 미들웨어

// OCR 텍스트 추출 API
router.post('/ocr', verifyToken, async (req, res) => {
    try {
        const { imagePath } = req.body;

        if (!imagePath) {
            return res.status(400).json({ message: '이미지 경로가 필요합니다.' });
        }

        const text = await extractTextFromImage(imagePath);

        res.status(200).json({ extractedText: text });
    } catch (error) {
        console.error('OCR API 오류:', error);
        res.status(500).json({ message: 'OCR 실패' });
    }
});

module.exports = router;
