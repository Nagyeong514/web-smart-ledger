// OCR 기능 함수

// /server/controllers/ocrController.js

const vision = require('@google-cloud/vision');
const path = require('path');

// 1. 서비스 계정 키 경로 설정 // 안전하게 경로 불러오기
const keyFilename = path.join(__dirname, '..', 'config', 'service-account-key.json');

// 2. Vision API 클라이언트 생성
const client = new vision.ImageAnnotatorClient({ keyFilename });

/**
 * 이미지 파일에서 텍스트 추출하는 함수
 */
const extractTextFromImage = async (imagePath) => {
    try {
        const [result] = await client.textDetection(imagePath);
        const detections = result.textAnnotations;

        if (detections.length > 0) {
            // 첫 번째 항목이 전체 추출 텍스트입니다.
            return detections[0].description;
        } else {
            return '';
        }
    } catch (error) {
        console.error('OCR 오류:', error);
        throw new Error('OCR 실패');
    }
};

module.exports = { extractTextFromImage };
