// /server/services/gptService.js

const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function askGptToClassify(text) {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content:
                        '다음 텍스트에서 카테고리, 가게명, 총액, 결제날짜를 추출해서 JSON 형식으로 정리해주세요. 예시: {"store": "...", "amount": "...", "date": "...", "category": "..."}',
                },
                {
                    role: 'user',
                    content: text,
                },
            ],
        });

        const result = response.choices[0].message.content;
        return result;
    } catch (error) {
        console.error('❌ GPT 요청 실패:', error.message);
        throw error;
    }
}

module.exports = { askGptToClassify };
