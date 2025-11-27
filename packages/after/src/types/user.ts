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

export type CreateUserData = Omit<User, 'id' | 'createdAt'>;
export type UpdateUserData = Partial<Omit<User, 'id' | 'createdAt'>>;

// Form data type for modals
export interface UserFormData {
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}
