// server/models/Goal.js
const db = require('../config/db');

const Goal = {
    /**
     * 월별 목표 금액 생성
     * @param {number} userId - 사용자 ID
     * @param {number} targetAmount - 설정할 목표 금액
     * @param {number} goalYear - 목표 연도 (예: 2025)
     * @param {number} goalMonth - 목표 월 (예: 4)
     */
    create: async (userId, targetAmount, goalYear, goalMonth) => {
        const sql = `
            INSERT INTO monthly_goal_amount
                (user_id, target_amount, goal_year, goal_month)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.execute(sql, [userId, targetAmount, goalYear, goalMonth]);
        return result;
    },

    /**
     * 특정 사용자의 모든 월별 목표 금액 조회
     * @param {number} userId - 사용자 ID
     * @returns {Array} - 월별 목표 금액 목록
     */
    getAllByUserId: async (userId) => {
        const sql = `
            SELECT id, target_amount, goal_year, goal_month, created_at
            FROM monthly_goal_amount
            WHERE user_id = ?
            ORDER BY goal_year DESC, goal_month DESC
        `;
        const [rows] = await db.execute(sql, [userId]);
        return rows;
    },

    /**
     * 특정 월별 목표 금액 조회
     * 최신 연도/월 순으로 정렬
     * @param {number} id - 목표 금액 ID
     * @param {number} userId - 사용자 ID
     * @returns {Object} - 월별 목표 금액 정보
     */
    getById: async (id, userId) => {
        const sql = `
            SELECT id, target_amount, goal_year, goal_month, created_at
            FROM monthly_goal_amount
            WHERE id = ? AND user_id = ?
        `;
        const [rows] = await db.execute(sql, [id, userId]);
        return rows[0];
    },

    /**
     * 월별 목표 금액 수정
     * @param {number} id - 목표 금액 ID
     * @param {number} userId - 사용자 ID
     * @param {number} targetAmount - 수정할 목표 금액
     * @param {number} goalYear - 수정할 목표 연도
     * @param {number} goalMonth - 수정할 목표 월
     * @returns {Object} - 수정 결과
     */
    update: async (id, userId, targetAmount, goalYear, goalMonth) => {
        const sql = `
            UPDATE monthly_goal_amount
            SET target_amount = ?, goal_year = ?, goal_month = ?
            WHERE id = ? AND user_id = ?
        `;
        const [result] = await db.execute(sql, [targetAmount, goalYear, goalMonth, id, userId]);
        return result;
    },

    /**
     * 월별 목표 금액 삭제
     * @param {number} id - 목표 금액 ID
     * @param {number} userId - 사용자 ID
     * @returns {Object} - 삭제 결과
     */
    delete: async (id, userId) => {
        const sql = `
            DELETE FROM monthly_goal_amount
            WHERE id = ? AND user_id = ?
        `;
        const [result] = await db.execute(sql, [id, userId]);
        return result;
    },
};

module.exports = Goal;
