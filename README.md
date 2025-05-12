# 💰 Smart Ledger Project (Backend)

스마트 가계부 프로젝트의 Node.js 기반 백엔드 서버입니다.
회원가입, 로그인, 소비내역 관리, 월별 목표 금액 설정 및
OCR 기반 영수즘 등록 기능과 GPT 기반 소비내역 자동 분류 기능을 제공합니다.

---

## 🚀 주요 기능

### ✅ 사용자 인증

* 회원가입: `POST /api/auth/register`
* 로그인 및 JWT 발급: `POST /api/auth/login`
* 보호 라우터: JWT 토큰 기반 인증 적용

### ✅ 월별 목표 금액 설정

* 목표 등록: `POST /api/goal`
* 목표 조회: `GET /api/goal`
* 목표 수정: `PUT /api/goal/:id`
* 목표 삭제: `DELETE /api/goal/:id`

### ✅ OCR 및 소비내역 자동 분류 (GPT 연동)

* 영수즘 이미지 업로드 및 OCR 텍스트 추출: `POST /api/ocr`
* GPT API로 텍스트 배열 → 소비내역 자동 분류
  예: **가망점명 / 금액 / 날짜 / 카테고리** 추출 및 저장

---

## ⚙ 기술 스택

* Node.js / Express.js
* MariaDB (MySQL 호환)
* bcrypt (비밀번호 해시)
* jsonwebtoken (JWT 인증)
* multer (파일 업로드)
* dotenv / cors / mysql2
* **OpenAI GPT API** (영수즘 내용 분류)

---

## 📂 프로젝트 구조

```
smart-ledger-project/
├── server.js                 서버 진입점
├── .env                     환경변수 (Git에 포함 ❌)
├── .env.example             환경변수 예시 (Git에 포함 ✅)
├── config/
│   └── db.js                MariaDB 연결 설정
├── controllers/             비즈니스 로직
├── middlewares/
│   └── authMiddleware.js    JWT 인증 처리
├── models/                  DB 모델 정의
│   ├── User.js
│   ├── Goal.js
│   └── ...
├── routes/                  API 라우터
│   ├── auth.js
│   ├── goal.js
│   └── ocr.js
├── services/                GPT 서비스 등 외부 API 연동
├── test/                    API 테스트용 코드
├── uploads/                 영수즘 이미지 저장
└── ...
```

---

## 🔐 인증 방식

* 로그인 성공 시 JWT 토큰 발급
* 이후 모든 보호 API 요청 시 Authorization 헤더에 토큰 포함

---

## 📂 DB 테이블 요약 (smart\_ledger)

| 테이블명                  | 설명           |
| --------------------- | ------------ |
| users                 | 사용자 기본 정보    |
| expenses              | 소비 내역        |
| monthly\_goal\_amount | 월별 목표 금액     |
| receipts              | 영수즘 이미지 경로 등 |

---

## 🧪 Postman 테스트 환승

1. `/api/auth/register` → 회원가입
2. `/api/auth/login` → 토큰 발급
3. `/api/goal` → 토큰 포함하여 CRUD 요청
4. `/api/ocr` → 이미지 업로드 및 자동 분류 테스트

---

## 📌 효피 확장 예정 기능

* [ ] GPT 기반 소비 카테고리 자동 분류 고도화
* [ ] 월별/연도별 지출 분석 및 달성률 시각화
* [ ] OCR 기반 소비내역 자동 등록
* [ ] 목표 예산 초견 시 알림 기능

---

## 📂 환경 설정

`.env` 파일은 Git에 포함되지 않습니다.
다음 `.env.example` 파일 참고해서 직접 설정해야 합니다.

```
PORT=5000
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_DATABASE=smart_ledger
DB_PORT=3307
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

---

## 🙋‍️ 작성자
@Nagyeong514

