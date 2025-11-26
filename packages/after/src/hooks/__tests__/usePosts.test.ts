import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { usePosts } from '@/hooks/usePosts';
import { postService } from '@/services/postService';

describe('usePosts', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('초기 포스트 데이터를 로드한다', () => {
    const { result } = renderHook(() => usePosts());

    expect(result.current.posts).toHaveLength(5);
    expect(result.current.posts[0].title).toBe('디자인 시스템 구축 가이드');
  });

  it('refreshPosts를 호출하면 최신 데이터를 가져온다', () => {
    const { result, rerender } = renderHook(() => usePosts());

    const initialLength = result.current.posts.length;

    // 외부에서 데이터 변경
    postService.create({
      title: 'New Post',
      content: 'Content',
      author: 'Author',
      category: 'test',
      status: 'draft',
    });

    // refresh 호출
    act(() => {
      result.current.refreshPosts();
    });

    // 업데이트됨
    expect(result.current.posts).toHaveLength(initialLength + 1);
  });

  it('localStorage의 변경사항을 반영한다', () => {
    const { result } = renderHook(() => usePosts());

    const mockPosts = [
      {
        id: 99,
        title: 'External Post',
        content: 'Content',
        author: 'External',
        category: 'test',
        status: 'published' as const,
        views: 0,
        createdAt: '2024-01-01',
      },
    ];
    localStorage.setItem('posts_data', JSON.stringify(mockPosts));

    act(() => {
      result.current.refreshPosts();
    });

    expect(result.current.posts).toEqual(mockPosts);
  });
});
