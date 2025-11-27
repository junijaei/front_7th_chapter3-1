export type PostStatus = 'published' | 'draft' | 'archived' | 'pending' | 'rejected';
export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  status: PostStatus;
  views: number;
  createdAt: string;
  updatedAt?: string;
}

export type UserRole = 'admin' | 'moderator' | 'user' | 'guest';
export type UserStatus = 'active' | 'inactive' | 'suspended';
export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  lastLogin?: string;
}

export type CreatePostData = Omit<Post, 'id' | 'createdAt' | 'views'>;
export type UpdatePostData = Partial<Omit<Post, 'id' | 'createdAt' | 'views'>>;

export type CreateUserData = Omit<User, 'id' | 'createdAt'>;
export type UpdateUserData = Partial<Omit<User, 'id' | 'createdAt'>>;

// Form data types for modals
export interface PostFormData {
  title: string;
  content: string;
  author: string;
  category: string;
  status?: PostStatus;
}

export interface UserFormData {
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}
