import { describe, it, expect, beforeEach } from 'vitest';
import { userService } from '../userService';
import type { CreateUserData, UpdateUserData } from '@/hooks/types';

describe('userService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('기본 사용자 데이터를 반환한다', () => {
    const users = userService.getAll();
    expect(users).toHaveLength(4);
  });

  it('ID로 사용자를 찾는다', () => {
    const user = userService.getById(1);
    expect(user).toBeDefined();
    expect(user?.id).toBe(1);
    expect(user?.username).toBe('admin');
  });

  it('존재하지 않는 ID는 null을 반환한다', () => {
    const user = userService.getById(999);
    expect(user).toBeNull();
  });

  it('새 사용자를 생성한다', () => {
    const newUserData: CreateUserData = {
      username: 'newuser',
      email: 'new@example.com',
      role: 'user',
      status: 'active',
    };

    const createdUser = userService.create(newUserData);
    expect(createdUser.id).toBeGreaterThan(4);
    expect(createdUser.username).toBe('newuser');

    const users = userService.getAll();
    expect(users).toHaveLength(5);
  });

  it('중복된 사용자명은 에러를 발생시킨다', () => {
    const duplicateUserData: CreateUserData = {
      username: 'admin',
      email: 'new@example.com',
      role: 'user',
      status: 'active',
    };

    expect(() => userService.create(duplicateUserData)).toThrow('Username already exists');
  });

  it('중복된 이메일은 에러를 발생시킨다', () => {
    const duplicateEmailData: CreateUserData = {
      username: 'uniqueuser',
      email: 'admin@example.com',
      role: 'user',
      status: 'active',
    };

    expect(() => userService.create(duplicateEmailData)).toThrow('Email already exists');
  });

  it('사용자를 업데이트한다', () => {
    const updateData: UpdateUserData = {
      username: 'updateduser',
    };

    const updatedUser = userService.update(1, updateData);
    expect(updatedUser.username).toBe('updateduser');
  });

  it('존재하지 않는 사용자 업데이트 시 에러를 발생시킨다', () => {
    expect(() => userService.update(999, { username: 'newname' })).toThrow('User not found');
  });

  it('중복된 사용자명으로 업데이트 시 에러를 발생시킨다', () => {
    const users = userService.getAll();
    if (users.length >= 2) {
      const firstUsername = users[0].username;
      const secondUserId = users[1].id;
      expect(() => userService.update(secondUserId, { username: firstUsername })).toThrow('Username already exists');
    }
  });

  it('자신의 사용자명으로 업데이트할 수 있다', () => {
    const users = userService.getAll();
    const firstUser = users[0];
    const updatedUser = userService.update(firstUser.id, { username: firstUser.username, role: 'moderator' });
    expect(updatedUser.username).toBe(firstUser.username);
    expect(updatedUser.role).toBe('moderator');
  });

  it('사용자를 삭제한다', () => {
    const initialUsers = userService.getAll();
    const firstUserId = initialUsers[0].id;
    userService.delete(firstUserId);
    const users = userService.getAll();
    expect(users).toHaveLength(initialUsers.length - 1);
    expect(users.find(u => u.id === firstUserId)).toBeUndefined();
  });

  it('존재하지 않는 사용자 삭제 시 에러를 발생시킨다', () => {
    expect(() => userService.delete(999)).toThrow('User not found');
  });

  it('사용자명 사용 가능 여부를 확인한다', () => {
    const users = userService.getAll();
    expect(userService.checkUsernameAvailable('newusername')).toBe(true);
    if (users.length > 0) {
      const existingUsername = users[0].username;
      expect(userService.checkUsernameAvailable(existingUsername)).toBe(false);
      expect(userService.checkUsernameAvailable(existingUsername.toUpperCase())).toBe(false); // 대소문자 구분 없음
    }
  });

  it('이메일 사용 가능 여부를 확인한다', () => {
    const users = userService.getAll();
    expect(userService.checkEmailAvailable('fresh@example.com')).toBe(true);
    if (users.length > 0) {
      const existingEmail = users[0].email;
      expect(userService.checkEmailAvailable(existingEmail)).toBe(false);
      expect(userService.checkEmailAvailable(existingEmail.toUpperCase())).toBe(false); // 대소문자 구분 없음
    }
  });
});
