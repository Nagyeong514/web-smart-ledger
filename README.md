# 💰 Smart Ledger Project (Backend)

스마트 가계부 프로젝트의 Node.js 기반 백엔드 서버입니다.  
회원가입, 로그인, 소비내역 관리, 월별 목표 금액 설정 및 OCR 기반 영수증 등록 기능을 제공합니다.

---

## 🚀 주요 기능

### ✅ 사용자 인증
- 회원가입 (`POST /api/auth/register`)
- 로그인 및 JWT 발급 (`POST /api/auth/login`)
- 인증된 사용자만 접근 가능한 보호 라우터 구성

### ✅ 월별 목표 금액 설정
- 목표 금액 등록 (`POST /api/goal`)
- 전체 조회 (`GET /api/goal`)
- 목표 수정 (`PUT /api/goal/:id`)
- 목표 삭제 (`DELETE /api/goal/:id`)

### ✅ 소비내역 및 OCR (구현 예정 또는 확장 가능)
- 영수증 이미지 업로드 및 OCR 텍스트 추출 (`POST /api/ocr`)  
  → OCR 결과를 바탕으로 소비내역 자동 분류 가능성 확보

---

## ⚙ 기술 스택

- **Node.js / Express.js**
- **MariaDB** (MySQL 호환)
- **bcrypt** (비밀번호 해시)
- **jsonwebtoken (JWT)** (로그인 인증)
- **multer** (파일 업로드)
- **dotenv / cors / mysql2**

---

## 📂 프로젝트 구조




smart-ledger-project/ ├── server.js # 서버 실행 파일 ├── config/ │ └── db.js # DB 연결 설정 ├── models/ │ └── User.js # 사용자 모델 │ └── Goal.js # 월별 목표 모델 ├── routes/ │ └── auth.js # 회원가입/로그인 라우터 │ └── goal.js # 목표 금액 라우터 │ └── ocr.js # OCR 라우터 ├── middlewares/ │ └── authMiddleware.js # JWT 인증 미들웨어




---

## 🔐 인증 방식

- JWT 발급 후 모든 보호 라우터 요청 시 헤더에 포함




---

## 🗂 DB 테이블 요약 (smart_ledger)

| 테이블명 | 설명 |
|----------|------|
| `users` | 사용자 정보 |
| `expenses` | 소비 내역 |
| `monthly_goal_amount` | 월별 목표 금액 |
| `receipts` |  영수증 사진(갤러리..?) |

---

## 🧪 Postman 테스트 흐름

1. `/api/auth/register` → 회원가입  
2. `/api/auth/login` → 토큰 발급  
3. `/api/goal` → 토큰 포함하여 CRUD 테스트

---

## 📌 향후 확장 예정

- 소비 카테고리 자동 분류 (GPT 활용)
- 월별/연도별 달성률 분석 (미정)
- OCR 기반 소비내역 자동 등록 (미정)
- 예산 초과 알림 기능 (미정)








