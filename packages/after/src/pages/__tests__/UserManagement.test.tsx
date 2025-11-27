import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserManagement } from '@/pages/UserManagement';
import * as hooks from '@/hooks';

vi.mock('@/hooks', () => ({
  useUsers: vi.fn(),
  useAlert: vi.fn(),
  useModal: vi.fn(),
}));

describe('UserManagement', () => {
  const mockUsers = [
    {
      id: 1,
      username: 'user1',
      email: 'user1@test.com',
      role: 'admin',
      status: 'active',
      createdAt: '2024-01-01',
      lastLogin: '2024-01-10',
    },
    {
      id: 2,
      username: 'user2',
      email: 'user2@test.com',
      role: 'user',
      status: 'inactive',
      createdAt: '2024-01-02',
      lastLogin: null,
    },
  ];

  const mockUsersHook = {
    users: mockUsers,
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  const mockAlert = {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  };

  const mockModal = {
    isOpen: false,
    open: vi.fn(),
    close: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (hooks.useUsers as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockUsersHook);
    (hooks.useAlert as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockAlert);
    (hooks.useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockModal);
  });

  describe('렌더링', () => {
    it('사용자 목록을 렌더링한다', () => {
      render(<UserManagement />);

      expect(screen.getByText('user1')).toBeInTheDocument();
      expect(screen.getByText('user2')).toBeInTheDocument();
      expect(screen.getByText('user1@test.com')).toBeInTheDocument();
      expect(screen.getByText('user2@test.com')).toBeInTheDocument();
    });

    it('통계 정보를 올바르게 표시한다', () => {
      render(<UserManagement />);

      // 통계 라벨 확인 (여러 곳에 나타날 수 있음)
      const totalLabels = screen.getAllByText('전체');
      expect(totalLabels.length).toBeGreaterThan(0);

      const activeLabels = screen.getAllByText('활성');
      expect(activeLabels.length).toBeGreaterThan(0);

      const inactiveLabels = screen.getAllByText('비활성');
      expect(inactiveLabels.length).toBeGreaterThan(0);

      const adminLabels = screen.getAllByText('관리자');
      expect(adminLabels.length).toBeGreaterThan(0);
    });

    it('새로 만들기 버튼을 렌더링한다', () => {
      render(<UserManagement />);

      expect(screen.getByRole('button', { name: '새로 만들기' })).toBeInTheDocument();
    });
  });

  describe('사용자 생성', () => {
    it('새로 만들기 버튼 클릭 시 모달을 연다', () => {
      render(<UserManagement />);

      const createButton = screen.getByRole('button', { name: '새로 만들기' });
      fireEvent.click(createButton);

      expect(mockModal.open).toHaveBeenCalled();
    });
  });

  describe('사용자 수정', () => {
    it('수정 버튼이 렌더링된다', () => {
      render(<UserManagement />);

      const editButtons = screen.getAllByRole('button', { name: '수정' });
      expect(editButtons.length).toBe(2);
    });
  });

  describe('사용자 삭제', () => {
    it('삭제 버튼 클릭 시 사용자를 삭제한다', () => {
      render(<UserManagement />);

      const deleteButtons = screen.getAllByRole('button', { name: '삭제' });
      fireEvent.click(deleteButtons[0]);

      expect(mockUsersHook.delete).toHaveBeenCalledWith(1);
      expect(mockAlert.success).toHaveBeenCalledWith('삭제되었습니다');
    });
  });

  describe('뱃지 렌더링', () => {
    it('역할 뱃지를 렌더링한다', () => {
      render(<UserManagement />);

      const adminBadges = screen.getAllByText('관리자');
      expect(adminBadges.length).toBeGreaterThan(0);

      expect(screen.getByText('사용자')).toBeInTheDocument();
    });

    it('상태 뱃지를 렌더링한다', () => {
      render(<UserManagement />);

      const activeBadges = screen.getAllByText('활성');
      expect(activeBadges.length).toBeGreaterThan(0);

      const inactiveBadges = screen.getAllByText('비활성');
      expect(inactiveBadges.length).toBeGreaterThan(0);
    });
  });

  describe('마지막 로그인 표시', () => {
    it('마지막 로그인이 있으면 날짜를 표시한다', () => {
      render(<UserManagement />);

      expect(screen.getByText('2024-01-10')).toBeInTheDocument();
    });

    it('마지막 로그인이 없으면 "-"를 표시한다', () => {
      render(<UserManagement />);

      const cells = screen.getAllByText('-');
      expect(cells.length).toBeGreaterThan(0);
    });
  });
});
