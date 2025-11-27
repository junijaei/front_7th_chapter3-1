import { UserFormModal } from '@/components/composed';
import {
  Badge,
  Button,
  StatCard,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { USER_ROLE_BADGE, USER_STATUS_BADGE } from '@/constants';
import { useAlert, useModal, useUsers } from '@/hooks';
import type { User, UserFormData } from '@/types';
import { useMemo, useState } from 'react';

export const UserManagement = () => {
  const usersHook = useUsers();
  const alert = useAlert();
  const modal = useModal();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleFormSubmit = async (data: UserFormData) => {
    try {
      if (selectedUser) {
        usersHook.update(selectedUser.id, data);
        alert.success('사용자가 수정되었습니다');
      } else {
        usersHook.create(data);
        alert.success('사용자가 생성되었습니다');
      }
      modal.close();
      setSelectedUser(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : '작업에 실패했습니다';
      alert.error(message);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    modal.open();
  };

  const handleOpenCreate = () => {
    setSelectedUser(null);
    modal.open();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      usersHook.delete(id);
      alert.success('삭제되었습니다');
    } catch (error) {
      const message = error instanceof Error ? error.message : '삭제에 실패했습니다';
      alert.error(message);
    }
  };

  const resetUserForm = () => {
    setSelectedUser(null);
  };

  const renderActions = (user: User) => (
    <div className="flex gap-2">
      <Button size="sm" variant="primary" onClick={() => handleEdit(user)}>
        수정
      </Button>
      <Button size="sm" variant="danger" onClick={() => handleDelete(user.id)}>
        삭제
      </Button>
    </div>
  );

  const stats = useMemo(() => {
    const users = usersHook.users;
    return {
      total: users.length,
      active: users.filter((u) => u.status === 'active').length,
      inactive: users.filter((u) => u.status === 'inactive').length,
      suspended: users.filter((u) => u.status === 'suspended').length,
      admin: users.filter((u) => u.role === 'admin').length,
    };
  }, [usersHook.users]);

  return (
    <>
      <div className="mb-4 text-right">
        <Button variant="primary" size="md" onClick={handleOpenCreate}>
          새로 만들기
        </Button>
      </div>

      <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5">
        <StatCard variant="default" label="전체" value={stats.total} />
        <StatCard variant="success" label="활성" value={stats.active} />
        <StatCard variant="warning" label="비활성" value={stats.inactive} />
        <StatCard variant="danger" label="정지" value={stats.suspended} />
        <StatCard variant="gray" label="관리자" value={stats.admin} />
      </div>

      <div className="overflow-auto border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">ID</TableHead>
              <TableHead className="w-[150px]">사용자명</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead className="w-[120px]">역할</TableHead>
              <TableHead className="w-[120px]">상태</TableHead>
              <TableHead className="w-[120px]">생성일</TableHead>
              <TableHead className="w-[140px]">마지막 로그인</TableHead>
              <TableHead className="w-[200px]">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersHook.users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={USER_ROLE_BADGE[user.role].variant}>
                    {USER_ROLE_BADGE[user.role].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={USER_STATUS_BADGE[user.status].variant}>
                    {USER_STATUS_BADGE[user.status].label}
                  </Badge>
                </TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>{user.lastLogin || '-'}</TableCell>
                <TableCell>{renderActions(user)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UserFormModal
        isOpen={modal.isOpen}
        onClose={() => {
          modal.close();
          resetUserForm();
        }}
        onSubmit={handleFormSubmit}
        selectedUser={selectedUser}
      />
    </>
  );
};
