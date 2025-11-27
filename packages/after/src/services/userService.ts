import type { User, CreateUserData, UpdateUserData } from '@/types';

const STORAGE_KEY = 'users_data';

const DEFAULT_USERS: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01',
    lastLogin: '2024-01-20',
  },
  {
    id: 2,
    username: 'john_doe',
    email: 'john@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-05',
    lastLogin: '2024-01-19',
  },
  {
    id: 3,
    username: 'jane_smith',
    email: 'jane@example.com',
    role: 'moderator',
    status: 'active',
    createdAt: '2024-01-10',
  },
  {
    id: 4,
    username: 'bob',
    email: 'bob@example.com',
    role: 'user',
    status: 'suspended',
    createdAt: '2024-01-15',
  },
];

const getUsers = (): User[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : DEFAULT_USERS;
};

const saveUsers = (users: User[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const userService = {
  getAll(): User[] {
    return getUsers();
  },

  getById(id: number): User | null {
    const users = getUsers();
    return users.find((u) => u.id === id) || null;
  },

  create(userData: CreateUserData): User {
    const users = getUsers();

    if (users.some((u) => u.username === userData.username)) {
      throw new Error('Username already exists');
    }

    if (users.some((u) => u.email === userData.email)) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      ...userData,
      id: Math.max(...users.map((u) => u.id), 0) + 1,
      createdAt: new Date().toISOString().split('T')[0],
    } as User;

    users.push(newUser);
    saveUsers(users);
    return newUser;
  },

  update(id: number, userData: UpdateUserData): User {
    const users = getUsers();
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      throw new Error('User not found');
    }

    if (userData.username && users.some((u) => u.username === userData.username && u.id !== id)) {
      throw new Error('Username already exists');
    }

    if (userData.email && users.some((u) => u.email === userData.email && u.id !== id)) {
      throw new Error('Email already exists');
    }

    const updatedUser = { ...users[index], ...userData };
    users[index] = updatedUser;
    saveUsers(users);
    return updatedUser;
  },

  delete(id: number): void {
    const users = getUsers();
    const filtered = users.filter((u) => u.id !== id);

    if (filtered.length === users.length) {
      throw new Error('User not found');
    }

    saveUsers(filtered);
  },

  checkUsernameAvailable(username: string): boolean {
    const users = getUsers();
    return !users.some((u) => u.username.toLowerCase() === username.toLowerCase());
  },

  checkEmailAvailable(email: string): boolean {
    const users = getUsers();
    return !users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  },
};
