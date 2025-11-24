# 학습 진행 순서

## Phase 1: 문제 파악

### 1.1 레거시 코드 분석
`packages/before/src/components`의 컴포넌트들을 살펴보며 문제점을 파악합니다.

**확인할 것들:**
- 각 컴포넌트의 prop 네이밍 패턴
- 스타일링 방식 (인라인, CSS 클래스, 하드코딩)
- 타입 정의의 엄격성
- 접근성 속성 (aria-*, role 등)

### 1.2 테스트 실행
```bash
pnpm test:run:before
```
기존 테스트가 어떤 동작을 검증하는지 확인합니다.

---

## Phase 2: 기반 구축

### 2.1 TailwindCSS 설정
디자인 토큰(색상, 간격, 폰트)을 정의합니다.

### 2.2 기본 유틸리티 준비
- `cn()` 함수 (클래스 병합)
- CVA 기본 패턴 이해

---

## Phase 3: 구조 설계 및 컴포넌트 구현

### 3.1 디렉토리 구조 결정
`01-overview.md`의 구조 옵션을 참고하여 프로젝트에 맞는 구조를 선택합니다.

**고려사항:**
- 프로젝트 규모
- 팀 협업 방식
- 컴포넌트 재사용 범위

### 3.2 기본 컴포넌트부터 시작
Button, Badge, Input 등 의존성이 없는 컴포넌트부터 구현합니다.

**순서:**
1. CVA로 variants 정의
2. TypeScript 타입 추출
3. 테스트 통과 확인

### 3.3 조합 컴포넌트로 확장
FormInput, FormSelect 등 기본 컴포넌트를 조합한 컴포넌트를 만듭니다.

### 3.4 복합 컴포넌트 완성
Header, Card, Modal, Table, Alert를 구현합니다.

---

## Phase 4: 검증

### 4.1 테스트 실행
```bash
pnpm test:run:after
```

### 4.2 Storybook으로 시각적 확인
```bash
pnpm storybook
```

---

## 권장 학습 흐름

```
before 분석 → 구조 설계 → TailwindCSS 학습 → CVA 학습 → 기본 컴포넌트 → 조합 컴포넌트 → 복합 컴포넌트
```

각 단계에서 테스트를 먼저 확인하고, 테스트를 통과하는 방향으로 구현하세요.
