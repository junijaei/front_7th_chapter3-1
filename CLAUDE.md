# CLAUDE.md

ALWAYS RESPOND IN KOREAN
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Educational monorepo for UI component modularization and design system modernization. Contains two packages (`before`/`after`) demonstrating migration from legacy patterns to modern standards using TailwindCSS 4, CVA, and shadcn/ui patterns.

## Commands

### Development
```bash
pnpm dev              # Run before package dev server
pnpm dev:after        # Run after package dev server
```

### Building
```bash
pnpm build            # Build all packages
pnpm build:before     # Build before package only
pnpm build:after      # Build after package only
```

### Testing
```bash
pnpm test             # Run tests in watch mode (all packages)
pnpm test:run         # Run tests once (all packages)
pnpm test:run:before  # Run tests once (before package)
pnpm test:run:after   # Run tests once (after package)
pnpm test:ui          # Run tests with visual UI
```

To run a single test file:
```bash
pnpm --filter @front_lite_chapter3-1/before test src/pages/__tests__/ManagementPage.test.tsx
```

### Linting
```bash
pnpm lint             # Lint all packages
```

### Storybook (after package)
```bash
pnpm storybook        # Run Storybook dev server
pnpm build-storybook  # Build Storybook static site
```

## Architecture

### Monorepo Structure
- **packages/before/** - Legacy implementation with problematic patterns
- **packages/after/** - Modern implementation to be developed

Both packages share identical component structure for comparison:
- `src/components/atoms/` - Button, Badge
- `src/components/molecules/` - FormInput, FormSelect, FormCheckbox, FormTextarea
- `src/components/organisms/` - Header, Card, Modal, Table, Alert
- `src/pages/` - ManagementPage with tests
- `src/services/` - postService, userService

### Tech Stack
- React 19 + TypeScript 5.9
- Vite 7 for build/dev
- Vitest + Testing Library for tests
- TailwindCSS 4 (PostCSS plugin)
- pnpm workspaces

### Path Aliases
Use `@/` for all internal imports:
```typescript
import { Button } from '@/components/atoms'
import { Card } from '@/components/organisms'
```

## Key Patterns

### Package Filtering
When working with specific packages:
```bash
pnpm --filter @front_lite_chapter3-1/before <command>
pnpm --filter @front_lite_chapter3-1/after <command>
```

### Component Variants
After package should use CVA (Class Variance Authority) for type-safe variants:
```typescript
const buttonVariants = cva('base-classes', {
  variants: {
    variant: { primary: '...', secondary: '...' },
    size: { sm: '...', md: '...', lg: '...' }
  }
})
```

### Testing Setup
- Vitest configured with jsdom environment
- `window.confirm` mocked in setup.ts
- Tests in `__tests__/` subdirectories

## Legacy Problems to Address (Before → After)

1. Inconsistent component APIs (helpText vs description vs help)
2. Mixed styling (inline styles, hardcoded colors like #007bff)
3. Business logic embedded in UI components
4. Weak type safety with loose prop types
5. Incomplete accessibility (ARIA labels, keyboard navigation)
