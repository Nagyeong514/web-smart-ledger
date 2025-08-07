
# 🧠  AI 기반 소비 인식·분석 웹 서비스  - 영수증.ver

> 영수증 한 장이면 끝! OCR + GPT 기반 자동 소비 분석 + 챗봇 코멘트까지

**Smart Ledger**는 영수증 이미지를 업로드하면, **Google Vision OCR + OpenAI GPT**를 통해  
소비 내역을 자동 인식하고 저장하는 **AI 기반 스마트 가계부**입니다.  
또한, GPT 챗봇이 사용자의 소비 패턴을 분석하고 질문에 똑똑하게 응답합니다.

---

## 🧩 주요 기능 요약

| 기능 | 설명 |
|------|------|
| 📸 OCR + GPT 자동 등록 | 영수증 → 텍스트 추출 → GPT → 소비 내역 구조화 + DB 저장 |
| 💬 GPT 챗봇 분석 기능 | "이번 달 너무 많이 쓴 거 아냐?", "어떤 소비가 많아?" 등 질문 가능 |
| 📊 소비 리포트 | 카테고리별 파이차트, 일별 라인차트, 목표 금액 입력 가능 |
| 📅 날짜별 소비 확인 | 일별 소비 내역 리스트 확인 + 수정/삭제 |
| 🛡️ JWT 인증 시스템 | 사용자별 데이터 분리 및 민감 API 보호 |
| 🖼️ 갤러리 기능 | 업로드된 영수증 이미지 목록 + 삭제 기능 제공 |

---

## 🤖 GPT 챗봇 기능

- 사용자의 소비 내역을 기반으로 GPT가 응답
- 백엔드에서 `OpenAI GPT-3.5`를 호출하며, 분석된 소비 데이터를 함께 전달
- 예시 질문:
  - "이번 달 어떤 소비가 제일 많아?"
  - "나 저번 달보다 더 썼어?"
  - "절약할 수 있는 팁 알려줘"
- 프론트엔드에서 버튼 클릭 시 분석 코멘트 출력됨

---

## 🧠 AI 연동 구조

```text
1. 사용자가 영수증 이미지 업로드
2. Vision OCR → 영수증 텍스트 추출
3. GPT → JSON 형태로 소비내역 구조화 (store, amount, date, category)
4. 서버에서 전처리 후 DB 저장
5. 분석 요청 시: DB에서 소비 내역 통계 → GPT 전달 → 분석 코멘트 생성
```

---

## 🏗️ 프로젝트 구조

```bash
smart-ledger-project/
├── client/               
│   ├── Main/             
│   ├── ledger/           
│   ├── report/           
│   ├── upload/           
│   └── mypage/           
├── server/               
│   ├── routes/           
│   ├── controllers/      
│   ├── services/         
│   ├── models/           
│   ├── uploads/          
│   └── server.js         
```

---

## 💻 실행 방법

### 1️⃣ 프로젝트 클론

```bash
git clone https://github.com/your-id/smart-ledger-project.git
```

### 2️⃣ 서버 설정 (.env)

```ini
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=smart_ledger
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
```

### 3️⃣ 백엔드 실행

```bash
cd server
npm install
node server.js
```

### 4️⃣ 프론트엔드 실행

```bash
cd client
npm install
npm start
```

---

## 📦 데이터베이스 테이블 구조 (MariaDB)

### 🧑‍💼 `users`

| 필드명 | 타입 | 설명 |
|--------|------|------|
| id | INT (PK) | 사용자 ID |
| name | VARCHAR | 이름 |
| email | VARCHAR | 이메일 |
| password | VARCHAR | 암호화된 비밀번호 |
| created_at | DATETIME | 가입일 |

### 🧾 `receipts`

| 필드명 | 타입 | 설명 |
|--------|------|------|
| id | INT (PK) | 영수증 ID |
| user_id | INT (FK) | 사용자 ID |
| image_path | VARCHAR | 이미지 저장 경로 |
| created_at | DATETIME | 업로드 시각 |

### 💸 `expenses`

| 필드명 | 타입 | 설명 |
|--------|------|------|
| id | INT (PK) | 소비 ID |
| user_id | INT (FK) | 사용자 ID |
| receipt_id | INT (FK) | 영수증 ID |
| category | VARCHAR | 소비 카테고리 |
| amount | INT | 소비 금액 |
| store_name | VARCHAR | 상호명 |
| product_name | VARCHAR | 상품명 |
| purchase_date | DATETIME | 소비 일시 |

### 🎯 `monthly_goal_amount`

| 필드명 | 타입 | 설명 |
|--------|------|------|
| id | INT (PK) | 목표 ID |
| user_id | INT (FK) | 사용자 ID |
| year | INT | 연도 |
| month | INT | 월 |
| amount | INT | 목표 금액 |

---

## 🚀 향후 개선 아이디어

- GPT 챗봇 응답 정밀도 향상 및 문체 선택 기능
- 반복 소비 자동 감지 기능
- 소비 카테고리 사용자 맞춤화
- B2B 버전 확장 (사업장/부서별 소비 분석)

---

## 🏆 프로젝트 정보

- **프로젝트명:**  AI 기반 소비 인식·분석 웹 서비스  - 영수증.ver
- **개발 기간:** 2025.01 – 2025.04
- **개발 인원:** 5인 팀
- **기술 스택:** React, Node.js, Express, MariaDB, Chart.js, GPT API, Vision API
- **성과:** 웹 개발 교육 과정 우수상 수상

