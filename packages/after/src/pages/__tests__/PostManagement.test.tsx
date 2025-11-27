import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PostManagement } from '@/pages/PostManagement';
import * as hooks from '@/hooks';

vi.mock('@/hooks', () => ({
  usePosts: vi.fn(),
  useAlert: vi.fn(),
  useModal: vi.fn(),
}));

describe('PostManagement', () => {
  const mockPosts = [
    {
      id: 1,
      title: 'Test Post 1',
      content: 'Content 1',
      author: 'Author 1',
      category: 'development',
      status: 'published',
      views: 100,
      createdAt: '2024-01-01',
    },
    {
      id: 2,
      title: 'Test Post 2',
      content: 'Content 2',
      author: 'Author 2',
      category: 'design',
      status: 'draft',
      views: 50,
      createdAt: '2024-01-02',
    },
  ];

  const mockPostsHook = {
    posts: mockPosts,
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    publish: vi.fn(),
    archive: vi.fn(),
    restore: vi.fn(),
  };

  const mockAlert = {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  };

  const mockCreateModal = {
    isOpen: false,
    open: vi.fn(),
    close: vi.fn(),
  };

  const mockEditModal = {
    isOpen: false,
    open: vi.fn(),
    close: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (hooks.usePosts as any).mockReturnValue(mockPostsHook);
    (hooks.useAlert as any).mockReturnValue(mockAlert);
    // useModal is called twice: createModal and editModal
    (hooks.useModal as any).mockReturnValueOnce(mockCreateModal).mockReturnValueOnce(mockEditModal);
  });

  describe('렌더링', () => {
    it('게시글 목록을 렌더링한다', () => {
      render(<PostManagement />);

      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      expect(screen.getByText('Test Post 2')).toBeInTheDocument();
      expect(screen.getByText('Author 1')).toBeInTheDocument();
      expect(screen.getByText('Author 2')).toBeInTheDocument();
    });

    it('통계 정보를 올바르게 표시한다', () => {
      render(<PostManagement />);

      // 통계 라벨 확인 (여러 곳에 나타날 수 있음)
      const totalLabels = screen.getAllByText('전체');
      expect(totalLabels.length).toBeGreaterThan(0);

      const publishedLabels = screen.getAllByText('게시됨');
      expect(publishedLabels.length).toBeGreaterThan(0);

      const draftLabels = screen.getAllByText('임시저장');
      expect(draftLabels.length).toBeGreaterThan(0);

      const viewsLabels = screen.getAllByText('총 조회수');
      expect(viewsLabels.length).toBeGreaterThan(0);
    });

    it('새로 만들기 버튼을 렌더링한다', () => {
      render(<PostManagement />);

      expect(screen.getByRole('button', { name: '새로 만들기' })).toBeInTheDocument();
    });
  });

  describe('게시글 생성', () => {
    it('새로 만들기 버튼 클릭 시 모달을 연다', () => {
      render(<PostManagement />);

      const createButton = screen.getByRole('button', { name: '새로 만들기' });
      fireEvent.click(createButton);

      expect(mockCreateModal.open).toHaveBeenCalled();
    });
  });

  describe('게시글 수정', () => {
    it('수정 버튼이 렌더링된다', () => {
      render(<PostManagement />);

      const editButtons = screen.getAllByRole('button', { name: '수정' });
      expect(editButtons.length).toBe(2);
    });
  });

  describe('게시글 삭제', () => {
    it('삭제 버튼 클릭 시 게시글을 삭제한다', () => {
      render(<PostManagement />);

      const deleteButtons = screen.getAllByRole('button', { name: '삭제' });
      fireEvent.click(deleteButtons[0]);

      expect(mockPostsHook.delete).toHaveBeenCalledWith(1);
      expect(mockAlert.success).toHaveBeenCalledWith('삭제되었습니다');
    });
  });

  describe('게시글 상태 변경', () => {
    it('임시저장 게시글을 게시할 수 있다', () => {
      render(<PostManagement />);

      const publishButton = screen.getByRole('button', { name: '게시' });
      fireEvent.click(publishButton);

      expect(mockPostsHook.publish).toHaveBeenCalledWith(2);
      expect(mockAlert.success).toHaveBeenCalledWith('게시되었습니다');
    });

    it('게시된 게시글을 보관할 수 있다', () => {
      const archivedPost = {
        ...mockPosts[0],
        status: 'published',
      };

      (hooks.usePosts as any).mockReturnValue({
        ...mockPostsHook,
        posts: [archivedPost],
      });

      render(<PostManagement />);

      const archiveButton = screen.getByRole('button', { name: '보관' });
      fireEvent.click(archiveButton);

      expect(mockPostsHook.archive).toHaveBeenCalledWith(1);
      expect(mockAlert.success).toHaveBeenCalledWith('보관되었습니다');
    });

    it('보관된 게시글을 복원할 수 있다', () => {
      const archivedPost = {
        ...mockPosts[0],
        status: 'archived',
      };

      (hooks.usePosts as any).mockReturnValue({
        ...mockPostsHook,
        posts: [archivedPost],
      });

      render(<PostManagement />);

      const restoreButton = screen.getByRole('button', { name: '복원' });
      fireEvent.click(restoreButton);

      expect(mockPostsHook.restore).toHaveBeenCalledWith(1);
      expect(mockAlert.success).toHaveBeenCalledWith('복원되었습니다');
    });
  });

  describe('뱃지 렌더링', () => {
    it('카테고리 뱃지를 렌더링한다', () => {
      render(<PostManagement />);

      expect(screen.getByText('development')).toBeInTheDocument();
      expect(screen.getByText('design')).toBeInTheDocument();
    });

    it('상태 뱃지를 렌더링한다', () => {
      render(<PostManagement />);

      const publishedBadges = screen.getAllByText('게시됨');
      expect(publishedBadges.length).toBeGreaterThan(0);

      const draftBadges = screen.getAllByText('임시저장');
      expect(draftBadges.length).toBeGreaterThan(0);
    });
  });
});
