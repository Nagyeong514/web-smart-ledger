// [  회원가입 /register   로그인 /login   보호된 /protected ]  API 관리

const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/authMiddleware'); // 미들웨어 가져오기
const Expense = require('../models/Expense'); // 소비내역 모델 추가
const db = require('../config/db'); // ✅ DB 연결 파일 추가

const router = express.Router();

// 회원가입 API
router.post('/register', async (req, res) => {
    try {
        const { email, phone, age, password } = req.body;

        // 필수 입력값 확인
        if (!email || !password) {
            return res.status(400).json({ message: '이메일과 비밀번호는 필수입니다.' });
        }

        // 이메일 중복 체크
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: '이미 등록된 이메일입니다.' });
        }

        // 비밀번호 해시화
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 사용자 생성
        await User.create(email, phone, age, hashedPassword);

        res.status(201).json({ message: '회원가입 성공' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
});

// 회원가입 API /register
// email, phone, age, password를 req.body에서 받는다 ✅
// 이메일, 비밀번호 필수 체크한다 ✅
// 이메일 중복 여부 체크한다 ✅
// 비밀번호 bcrypt로 암호화한다 ✅
// DB에 사용자 생성한다 (User.create) ✅
// 성공 시 201 상태코드 + 성공 메시지 반환 ✅

// 로그인 API
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 입력값 확인
        if (!email || !password) {
            return res.status(400).json({ message: '이메일과 비밀번호를 입력해주세요.' });
        }

        // 사용자 조회
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: '존재하지 않는 사용자입니다.' });
        }

        // 비밀번호 검증
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
        }

        // JWT 토큰 발급
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '2h' } // 토큰 유효시간 2시간
        );

        res.status(200).json({
            message: '로그인 성공',
            token: token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
});

// 로그인 API /login
// email, password를 req.body에서 받는다 ✅
// 입력값 유효성 체크한다 ✅
// 이메일로 사용자 조회한다 ✅
// bcrypt로 비밀번호 비교한다 ✅
// 일치하면 JWT 토큰 발급한다 ✅
// 성공 시 200 상태코드 + 토큰 반환한다 ✅

// 보호된 API (로그인한 사용자만 접근 가능), /protected API는 verifyToken 미들웨어를 통과해야만 접근할 수 있습니다.
router.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({
        message: '비밀 정보에 접근 성공!',
        userId: req.user.userId, // 토큰에서 추출한 userId 보여주기
    });
});

// 소비내역 등록 API (로그인한 사용자만 가능)
router.post('/expenses', verifyToken, async (req, res) => {
    try {
        // 1. 요청 본문(body)에서 데이터 꺼내기
        const { category, amount, storeName, productName, purchaseDate } = req.body;

        // 2. 필수 입력값 확인 (카테고리와 금액은 반드시 필요)
        if (!category || !amount) {
            return res.status(400).json({ message: '카테고리와 금액은 필수입니다.' });
        }

        // 3. 현재 로그인한 사용자 ID 가져오기
        const userId = req.user.userId;

        // 4. 소비내역 DB에 저장하기
        await Expense.create(userId, category, amount, storeName, productName, purchaseDate);

        // 5. 성공 응답 보내기
        res.status(201).json({ message: '소비내역 등록 완료' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
});

// 소비내역 등록 API /expenses
// 로그인한 사용자의 토큰을 verifyToken으로 인증한다 ✅
// 요청 body에서 category, amount, storeName, productName, purchaseDate를 받는다 ✅
// 필수 입력값(category, amount) 유효성 체크한다 ✅
// 토큰에서 userId를 꺼낸다 (로그인한 사용자 정보) ✅
// userId와 함께 소비내역 정보를 DB에 저장한다 ✅
// 저장 성공 시 201 상태코드 + "소비내역 등록 완료" 메시지를 반환한다 ✅

// 소비내역 조회 API (로그인한 사용자만 가능)
router.get('/expenses', verifyToken, async (req, res) => {
    try {
        // 1. 현재 로그인한 사용자 ID 가져오기
        const userId = req.user.userId;

        // 2. DB에서 해당 사용자의 소비내역 조회
        const expenses = await Expense.getAllByUserId(userId);

        // 3. 조회 결과를 클라이언트에 반환
        res.status(200).json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
});

// 로그인한 userId 확인  ->  JWT 토큰에서 가져옴 ✅
// 그 userId로 소비내역 조회
// 소비내역을 배열로 응답 -> JSON 형태로 반환 ✅

// 소비내역 삭제 API (로그인한 사용자만 가능)
router.delete('/expenses/:id', verifyToken, async (req, res) => {
    try {
        // 1. URL 파라미터에서 삭제할 소비내역 ID 꺼내기
        const expenseId = req.params.id;

        // 2. 현재 로그인한 사용자 ID 가져오기
        const userId = req.user.userId;

        // 3. 삭제 SQL 실행 (본인(userId)의 데이터만 삭제 가능)
        const sql = `
        DELETE FROM expenses
        WHERE id = ? AND user_id = ?
      `;
        const [result] = await db.execute(sql, [expenseId, userId]);

        // 4. 삭제된 행이 없으면 -> 존재하지 않는 데이터
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '삭제할 소비내역을 찾을 수 없습니다.' });
        }

        // 5. 성공 응답
        res.status(200).json({ message: '소비내역 삭제 완료' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
});

// ✅ 본인(userId)이 등록한 데이터만 삭제 가능하게 안전하게 설계

// 소비내역 수정 API (로그인한 사용자만 가능)
router.put('/expenses/:id', verifyToken, async (req, res) => {
    try {
        // 1. URL 파라미터에서 수정할 소비내역 ID 꺼내기
        const expenseId = req.params.id;

        // 2. 요청 body에서 수정할 필드 꺼내기
        const { category, amount, storeName, productName, purchaseDate } = req.body;

        // 3. 현재 로그인한 사용자 ID 가져오기
        const userId = req.user.userId;

        // 4. 수정 SQL 실행 (본인(userId)의 데이터만 수정 가능)
        const sql = `
        UPDATE expenses
        SET category = ?, amount = ?, store_name = ?, product_name = ?, purchase_date = ?
        WHERE id = ? AND user_id = ?
      `;
        const [result] = await db.execute(sql, [
            category,
            amount,
            storeName,
            productName,
            purchaseDate,
            expenseId,
            userId,
        ]);

        // 5. 수정된 행이 없으면 -> 존재하지 않는 데이터
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '수정할 소비내역을 찾을 수 없습니다.' });
        }

        // 6. 성공 응답
        res.status(200).json({ message: '소비내역 수정 완료' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
});

module.exports = router;
