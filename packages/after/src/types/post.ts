export type PostStatus = 'published' | 'draft' | 'archived' | 'pending' | 'rejected';
export type PostCategory = 'development' | 'design' | 'accessibility';
export interface Post {
  [key: string]: unknown;
  id: number;
  title: string;
  content?: string;
  author: string;
  category: PostCategory;
  status: PostStatus;
  views: number;
  createdAt: string;
  updatedAt?: string;
}

export type CreatePostData = Omit<Post, 'id' | 'createdAt' | 'views'>;
export type UpdatePostData = Partial<Omit<Post, 'id' | 'createdAt' | 'views'>>;

// Form data type for modals
export interface PostFormData {
  [key: string]: unknown;
  title: string;
  content?: string;
  author: string;
  category: PostCategory;
  status: PostStatus;
}
