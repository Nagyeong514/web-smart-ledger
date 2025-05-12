// smart-ledger-project/server/routes/receipts.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const verifyToken = require('../middlewares/authMiddleware');
const db = require('../config/db');

// 사용자별 업로드 디렉토리 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.user.userId;
        const userDir = path.join('uploads', String(userId));
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, { recursive: true });
        }
        cb(null, userDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}${ext}`;
        cb(null, filename);
    },
});

const upload = multer({ storage });

// POST /api/receipts/upload
router.post('/upload', verifyToken, upload.single('receipt'), async (req, res) => {
    try {
        const userId = req.user.userId;
        const relativePath = path.join('uploads', String(userId), req.file.filename);
        const sql = 'INSERT INTO receipts (user_id, image_path) VALUES (?, ?)';
        await db.execute(sql, [userId, relativePath]);

        res.status(201).json({
            message: '이미지 업로드 완료',
            imagePath: relativePath,
        });
    } catch (error) {
        console.error('이미지 업로드 실패:', error);
        res.status(500).json({ message: '서버 오류' });
    }
});

module.exports = router;
