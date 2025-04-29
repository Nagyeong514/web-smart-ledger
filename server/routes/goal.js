// server/routes/goal.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const Goal = require('../models/Goal');

/** 월별 목표금액 생성 */
router.post('/', verifyToken, async (req, res) => {
    try {
        const { targetAmount, goalYear, goalMonth } = req.body;
        if (!targetAmount || !goalYear || !goalMonth) {
            return res.status(400).json({ message: '목표금액, 연도, 월이 필요합니다.' });
        }
        const userId = req.user.userId;
        await Goal.create(userId, targetAmount, goalYear, goalMonth);
        res.status(201).json({ message: '월별 목표금액 설정 완료' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
    }
});

/** 월별 목표금액 전체 조회 */
router.get('/', verifyToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const goals = await Goal.getAllByUserId(userId);
        res.status(200).json(goals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
    }
});

/** 특정 월별 목표금액 조회 */
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const goal = await Goal.getById(req.params.id, userId);
        if (!goal) {
            return res.status(404).json({ message: '해당 목표금액을 찾을 수 없습니다.' });
        }
        res.status(200).json(goal);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
    }
});

/** 월별 목표금액 수정 */
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const { targetAmount, goalYear, goalMonth } = req.body;
        if (!targetAmount || !goalYear || !goalMonth) {
            return res.status(400).json({ message: '목표금액, 연도, 월이 필요합니다.' });
        }
        const userId = req.user.userId;
        const result = await Goal.update(req.params.id, userId, targetAmount, goalYear, goalMonth);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '수정할 목표금액을 찾을 수 없습니다.' });
        }
        res.status(200).json({ message: '월별 목표금액 수정 완료' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
    }
});

/** 월별 목표금액 삭제 */
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const result = await Goal.delete(req.params.id, userId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '삭제할 목표금액을 찾을 수 없습니다.' });
        }
        res.status(200).json({ message: '월별 목표금액 삭제 완료' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
    }
});

module.exports = router;
