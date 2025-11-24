# 핵심 도구 가이드

## 1. TailwindCSS 4

유틸리티 우선 CSS 프레임워크입니다.

### 핵심 개념

**유틸리티 클래스**: 각 클래스가 하나의 스타일 속성을 담당
```tsx
<button className="bg-blue-500 text-white px-4 py-2 rounded">
  버튼
</button>
```

**디자인 토큰**: 일관된 값 시스템
- 색상: `bg-primary`, `text-secondary`
- 간격: `p-4`, `m-2`, `gap-3`
- 크기: `w-full`, `h-10`

**반응형**: 브레이크포인트 접두사
```tsx
className="w-full md:w-1/2 lg:w-1/3"
```

**상태**: hover, focus 등
```tsx
className="bg-blue-500 hover:bg-blue-600 focus:ring-2"
```

---

## 2. CVA (Class Variance Authority)

타입 안전한 컴포넌트 variants를 만드는 라이브러리입니다.

### 핵심 개념

**기본 구조**:
```tsx
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  // 기본 클래스
  'inline-flex items-center justify-center rounded',
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-white',
        secondary: 'bg-gray-200 text-gray-900',
        danger: 'bg-red-500 text-white',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

// 타입 자동 추출
type ButtonProps = VariantProps<typeof buttonVariants>
```

**장점**:
- TypeScript 자동완성
- 잘못된 variant 값 컴파일 에러
- 기본값 설정 가능

---

## 3. shadcn/ui 패턴

Radix UI 기반의 접근성 있는 컴포넌트 패턴입니다.

### 핵심 개념

**복사-붙여넣기 방식**: 패키지 설치가 아닌 코드 소유
- 컴포넌트를 직접 프로젝트에 복사
- 필요에 따라 자유롭게 수정

**Radix UI Primitives**: 접근성 내장
- 키보드 네비게이션
- ARIA 속성
- 포커스 관리

**cn() 유틸리티**: 조건부 클래스 병합
```tsx
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// 사용
className={cn(
  'base-class',
  isActive && 'active-class',
  className // 외부에서 전달된 클래스
)}
```

---

## 도구 조합 예시

```tsx
// Button.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva('...기본 클래스...', {
  variants: { /* ... */ }
})

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}
```

이 패턴으로 타입 안전하고 확장 가능한 컴포넌트를 만들 수 있습니다.
