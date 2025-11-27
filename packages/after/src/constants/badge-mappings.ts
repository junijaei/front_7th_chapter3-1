import type { PostCategory, PostStatus, UserRole, UserStatus } from '@/types';

// Badge variant 타입 정의 (Badge 컴포넌트의 실제 variant에 맞춤)
export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'success'
  | 'destructive'
  | 'warning'
  | 'info'
  | 'outline';

// Post Category Badge 매핑
export const POST_CATEGORY_BADGE: Record<PostCategory, BadgeVariant> = {
  development: 'default',
  design: 'info',
  accessibility: 'destructive',
};

// Post Status Badge 매핑
export const POST_STATUS_BADGE: Record<PostStatus, { variant: BadgeVariant; label: string }> = {
  published: { variant: 'success', label: '게시됨' },
  draft: { variant: 'warning', label: '임시저장' },
  archived: { variant: 'secondary', label: '보관됨' },
  pending: { variant: 'info', label: '대기중' },
  rejected: { variant: 'destructive', label: '거부됨' },
};

// User Role Badge 매핑
export const USER_ROLE_BADGE: Record<UserRole, { variant: BadgeVariant; label: string }> = {
  admin: { variant: 'destructive', label: '관리자' },
  moderator: { variant: 'warning', label: '운영자' },
  user: { variant: 'default', label: '사용자' },
  guest: { variant: 'secondary', label: '게스트' },
};

// User Status Badge 매핑
export const USER_STATUS_BADGE: Record<UserStatus, { variant: BadgeVariant; label: string }> = {
  active: { variant: 'success', label: '활성' },
  inactive: { variant: 'warning', label: '비활성' },
  suspended: { variant: 'destructive', label: '정지' },
};
