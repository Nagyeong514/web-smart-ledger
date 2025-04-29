// 로그인한 사용자가 올린 소비내역(카테고리, 금액, 가게, 상품명, 날짜)을 DB에 안전하게 저장하는 모델 파일

const db = require('../config/db'); // DB 연결 파일 불러오기

const Expense = {
    /**
     * 소비내역 저장 함수
     * @param {number} userId - 소비한 사용자 ID
     * @param {string} category - 소비 카테고리 (예: 음식, 교통)
     * @param {number} amount - 소비 금액
     * @param {string} storeName - 가게 이름 (선택)
     * @param {string} productName - 상품 이름 (선택)
     * @param {string} purchaseDate - 소비 날짜 (형식: 'YYYY-MM-DD')
     */
    create: async (userId, category, amount, storeName, productName, purchaseDate) => {
        const sql = `
            INSERT INTO expenses (user_id, category, amount, store_name, product_name, purchase_date)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(sql, [userId, category, amount, storeName, productName, purchaseDate]);
        return result;
    },

    /**
     * 특정 사용자의 소비내역 전체 조회 함수
     * @param {number} userId - 조회할 사용자 ID
     */
    getAllByUserId: async (userId) => {
        const sql = `
            SELECT id, category, amount, store_name, product_name, purchase_date, created_at
            FROM expenses
            WHERE user_id = ?
            ORDER BY purchase_date DESC, created_at DESC
        `;
        const [rows] = await db.execute(sql, [userId]);
        return rows;
    },
};

module.exports = Expense;
