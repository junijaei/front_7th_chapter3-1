export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  views: number;
  createdAt: string;
  updatedAt?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastLogin?: string;
}

export type CreatePostData = Omit<Post, 'id' | 'createdAt' | 'views'>;
export type UpdatePostData = Partial<Omit<Post, 'id' | 'createdAt' | 'views'>>;

export type CreateUserData = Omit<User, 'id' | 'createdAt'>;
export type UpdateUserData = Partial<Omit<User, 'id' | 'createdAt'>>;
