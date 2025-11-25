import { describe, it, expect, beforeEach } from 'vitest';
import { postService } from '../postService';
import type { CreatePostData, UpdatePostData } from '@/hooks/types';

describe('postService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('기본 포스트 데이터를 반환한다', () => {
    const posts = postService.getAll();
    expect(posts).toHaveLength(5);
  });

  it('ID로 포스트를 찾는다', () => {
    const post = postService.getById(1);
    expect(post).toBeDefined();
    expect(post?.id).toBe(1);
  });

  it('존재하지 않는 ID는 null을 반환한다', () => {
    const post = postService.getById(999);
    expect(post).toBeNull();
  });

  it('새 포스트를 생성한다', () => {
    const newPostData: CreatePostData = {
      title: 'New Post',
      content: 'Content',
      author: 'Author',
      category: 'test',
      status: 'draft',
    };

    const createdPost = postService.create(newPostData);
    expect(createdPost.id).toBeGreaterThan(5);
    expect(createdPost.title).toBe('New Post');
    expect(createdPost.views).toBe(0);

    const posts = postService.getAll();
    expect(posts).toHaveLength(6);
  });

  it('제목이 5자 미만이면 에러를 발생시킨다', () => {
    const invalidPostData: CreatePostData = {
      title: 'Test',
      content: 'Content',
      author: 'Author',
      category: 'test',
      status: 'draft',
    };

    expect(() => postService.create(invalidPostData)).toThrow('Title must be at least 5 characters');
  });

  it('포스트를 업데이트한다', () => {
    const updateData: UpdatePostData = {
      title: 'Updated Title',
    };

    const updatedPost = postService.update(1, updateData);
    expect(updatedPost.title).toBe('Updated Title');
    expect(updatedPost.updatedAt).toBeDefined();
  });

  it('존재하지 않는 포스트 업데이트 시 에러를 발생시킨다', () => {
    expect(() => postService.update(999, { title: 'New Title' })).toThrow('Post not found');
  });

  it('포스트를 삭제한다', () => {
    const initialPosts = postService.getAll();
    postService.delete(1);
    const posts = postService.getAll();
    expect(posts).toHaveLength(initialPosts.length - 1);
    expect(posts.find(p => p.id === 1)).toBeUndefined();
  });

  it('존재하지 않는 포스트 삭제 시 에러를 발생시킨다', () => {
    expect(() => postService.delete(999)).toThrow('Post not found');
  });

  it('draft 포스트를 publish한다', () => {
    const publishedPost = postService.publish(3);
    expect(publishedPost.status).toBe('published');
  });

  it('이미 published된 포스트는 에러를 발생시킨다', () => {
    expect(() => postService.publish(1)).toThrow('Post is already published');
  });

  it('포스트를 archive한다', () => {
    const archivedPost = postService.archive(1);
    expect(archivedPost.status).toBe('archived');
  });

  it('archived 포스트를 restore한다', () => {
    const restoredPost = postService.restore(5);
    expect(restoredPost.status).toBe('published');
  });

  it('archived 상태가 아닌 포스트 restore 시 에러를 발생시킨다', () => {
    // 확실히 published 상태인 포스트를 restore 시도
    const posts = postService.getAll();
    const publishedPost = posts.find(p => p.status === 'published');
    if (publishedPost) {
      expect(() => postService.restore(publishedPost.id)).toThrow('Only archived posts can be restored');
    }
  });
});
