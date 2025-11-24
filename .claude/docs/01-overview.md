# 디자인 시스템 개요

## 디자인 시스템이란?

일관된 사용자 경험을 위한 재사용 가능한 컴포넌트와 패턴의 집합입니다.

### 핵심 구성 요소

1. **디자인 토큰** - 색상, 간격, 타이포그래피 등의 기본 값
2. **컴포넌트 라이브러리** - 재사용 가능한 UI 컴포넌트
3. **패턴 & 가이드라인** - 컴포넌트 사용 방법과 규칙

## 디렉토리 구조 옵션

Atomic Design 대신 사용할 수 있는 현대적인 구조들입니다.

---

### 1. Feature 기반 구조

기능별로 관련 파일을 그룹화합니다.

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   ├── posts/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   └── users/
├── shared/
│   ├── components/
│   └── hooks/
└── pages/
```

**장점:**
- 기능별 응집도가 높음
- 팀 단위 작업 분리 용이
- 기능 삭제/추가가 깔끔함

**단점:**
- 공통 컴포넌트 위치 결정이 모호할 수 있음
- 작은 프로젝트에선 과도할 수 있음
- 기능 간 의존성 관리 필요

---

### 2. ui + shared 구조 (shadcn/ui 스타일)

UI 컴포넌트와 비즈니스 로직을 명확히 분리합니다.

```
src/
├── components/
│   ├── ui/           # 순수 UI 컴포넌트 (Button, Input, Modal)
│   └── composed/     # UI 조합 컴포넌트 (SearchBar, DataTable)
├── lib/              # 유틸리티 (cn, api client)
├── hooks/            # 커스텀 훅
├── services/         # API 서비스
└── pages/
```

**장점:**
- UI와 로직의 명확한 분리
- shadcn/ui 컴포넌트 추가가 자연스러움
- 재사용성 극대화

**단점:**
- 파일 찾기가 분산될 수 있음
- 기능별 맥락 파악이 어려울 수 있음

---

### 3. Colocation 구조

페이지/기능 근처에 관련 파일을 배치합니다.

```
src/
├── pages/
│   ├── Home/
│   │   ├── index.tsx
│   │   ├── components/
│   │   ├── hooks/
│   │   └── Home.test.tsx
│   └── Dashboard/
│       ├── index.tsx
│       ├── components/
│       └── hooks/
├── components/       # 전역 공유 컴포넌트만
└── hooks/            # 전역 공유 훅만
```

**장점:**
- 관련 파일이 가까이 있어 탐색 용이
- 페이지 삭제 시 관련 파일 일괄 제거
- 직관적인 구조

**단점:**
- 컴포넌트 재사용 시 위치 이동 필요
- 공유 컴포넌트 경계가 모호해질 수 있음

---

### 4. Domain 기반 구조

비즈니스 도메인별로 분리합니다.

```
src/
├── domains/
│   ├── user/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   └── post/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── types/
├── shared/
└── pages/
```

**장점:**
- DDD(Domain-Driven Design) 적용 용이
- 도메인 로직 캡슐화
- 마이크로서비스 전환 시 유리

**단점:**
- 도메인 경계 설정이 어려움
- 초기 설계 비용이 높음
- 작은 프로젝트에는 과도함

---

### 구조 선택 가이드

| 프로젝트 특성 | 추천 구조 |
|--------------|----------|
| 디자인 시스템 중심 | ui + shared |
| 기능이 명확히 구분됨 | Feature 기반 |
| 페이지 단위 작업이 많음 | Colocation |
| 복잡한 비즈니스 로직 | Domain 기반 |

## 이 프로젝트의 목표

`before` 패키지의 레거시 문제점을 분석하고, `after` 패키지에서 현대적인 방식으로 개선합니다.

### 주요 개선 포인트

| 문제점 | 해결 방향 |
|--------|----------|
| 일관성 없는 API | 통일된 prop 네이밍 |
| 하드코딩된 스타일 | TailwindCSS 디자인 토큰 |
| 타입 안전성 부족 | CVA + TypeScript |
| 접근성 미흡 | Radix UI 기반 컴포넌트 |
