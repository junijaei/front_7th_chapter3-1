import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useUsers } from '@/hooks/useUsers';
import { userService } from '@/services/userService';

describe('useUsers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('초기 사용자 데이터를 로드한다', () => {
    const { result } = renderHook(() => useUsers());

    expect(result.current.users).toHaveLength(4);
    expect(result.current.users[0].username).toBe('admin');
  });

  it('refreshUsers를 호출하면 최신 데이터를 가져온다', () => {
    const { result } = renderHook(() => useUsers());

    const initialLength = result.current.users.length;

    // 외부에서 데이터 변경
    userService.create({
      username: 'newuser',
      email: 'new@example.com',
      role: 'user',
      status: 'active',
    });

    // refresh 호출
    act(() => {
      result.current.refreshUsers();
    });

    // 업데이트됨
    expect(result.current.users).toHaveLength(initialLength + 1);
  });

  it('localStorage의 변경사항을 반영한다', () => {
    const { result } = renderHook(() => useUsers());

    const mockUsers = [
      {
        id: 99,
        username: 'external',
        email: 'external@example.com',
        role: 'user' as const,
        status: 'active' as const,
        createdAt: '2024-01-01',
      },
    ];
    localStorage.setItem('users_data', JSON.stringify(mockUsers));

    act(() => {
      result.current.refreshUsers();
    });

    expect(result.current.users).toEqual(mockUsers);
  });
});
