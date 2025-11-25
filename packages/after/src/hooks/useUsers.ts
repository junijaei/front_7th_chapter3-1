import { useState, useCallback } from 'react';
import { userService } from '@/services/userService';
import type { User, CreateUserData, UpdateUserData } from './types';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>(() => userService.getAll());

  const refreshUsers = useCallback(() => {
    setUsers(userService.getAll());
  }, []);

  const create = useCallback((userData: CreateUserData) => {
    const newUser = userService.create(userData);
    refreshUsers();
    return newUser;
  }, [refreshUsers]);

  const update = useCallback((id: number, userData: UpdateUserData) => {
    const updatedUser = userService.update(id, userData);
    refreshUsers();
    return updatedUser;
  }, [refreshUsers]);

  const deleteUser = useCallback((id: number) => {
    userService.delete(id);
    refreshUsers();
  }, [refreshUsers]);

  const checkUsernameAvailable = useCallback((username: string) => {
    return userService.checkUsernameAvailable(username);
  }, []);

  const checkEmailAvailable = useCallback((email: string) => {
    return userService.checkEmailAvailable(email);
  }, []);

  return {
    users,
    refreshUsers,
    create,
    update,
    delete: deleteUser,
    checkUsernameAvailable,
    checkEmailAvailable,
  };
};
