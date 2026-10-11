# CatHero.GG MVP
Cat Hero 전용 Wiki + 유저 Guides + Q&A + Guild 연결용 MVP.

## Run
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Supabase
1. Supabase 프로젝트 생성
2. `supabase/schema.sql` 실행
3. `.env.example`을 `.env.local`로 복사 후 키 입력
4. Storage bucket `community-images` 생성

## Product rules
- Wiki: 관리자 관리
- Guides / Q&A: 초기 데이터 0개. 샘플/가짜 글을 넣지 않음
- 글 작성: 제목 + 본문 + Wiki 연결 + 이미지 첨부
- Q&A: 답변 및 채택 구조
- Community Meta: 추후 실제 검색/추천/질문 데이터만 집계
- Guild: 기존 길드 분배 시스템 연결을 위한 확장 지점

현재 UI는 프론트 MVP이며 DB 쓰기/Auth wiring은 schema 기준으로 연결하면 됩니다.
