import { useState, useCallback } from 'react';
import { postService } from '@/services/postService';
import type { Post, CreatePostData, UpdatePostData } from '@/types';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>(() => postService.getAll());

  const refreshPosts = useCallback(() => {
    setPosts(postService.getAll());
  }, []);

  const create = useCallback(
    (postData: CreatePostData) => {
      const newPost = postService.create(postData);
      refreshPosts();
      return newPost;
    },
    [refreshPosts]
  );

  const update = useCallback(
    (id: number, postData: UpdatePostData) => {
      const updatedPost = postService.update(id, postData);
      refreshPosts();
      return updatedPost;
    },
    [refreshPosts]
  );

  const deletePost = useCallback(
    (id: number) => {
      postService.delete(id);
      refreshPosts();
    },
    [refreshPosts]
  );

  const publish = useCallback(
    (id: number) => {
      const publishedPost = postService.publish(id);
      refreshPosts();
      return publishedPost;
    },
    [refreshPosts]
  );

  const archive = useCallback(
    (id: number) => {
      const archivedPost = postService.archive(id);
      refreshPosts();
      return archivedPost;
    },
    [refreshPosts]
  );

  const restore = useCallback(
    (id: number) => {
      const restoredPost = postService.restore(id);
      refreshPosts();
      return restoredPost;
    },
    [refreshPosts]
  );

  return {
    posts,
    refreshPosts,
    create,
    update,
    delete: deletePost,
    publish,
    archive,
    restore,
  };
};
