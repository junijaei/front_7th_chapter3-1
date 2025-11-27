import React, { useState } from 'react';
import {
  Button,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  StatCard,
} from '@/components/ui';
import { UserFormModal } from '@/components/composed';
import { useUsers, useAlert, useModal, type User, type UserFormData } from '@/hooks';

export const UserManagement: React.FC = () => {
  const usersHook = useUsers();
  const alert = useAlert();
  const createModal = useModal();
  const editModal = useModal();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<UserFormData>>({});

  const handleCreate = async () => {
    try {
      if (!formData.username || !formData.email) {
        alert.error('필수 항목을 입력해주세요');
        return;
      }

      usersHook.create({
        username: formData.username,
        email: formData.email,
        role: formData.role || 'user',
        status: formData.status || 'active',
      });

      createModal.close();
      setFormData({});
      alert.success('사용자가 생성되었습니다');
    } catch (error) {
      const message = error instanceof Error ? error.message : '생성에 실패했습니다';
      alert.error(message);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    editModal.open();
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;

    try {
      usersHook.update(selectedUser.id, formData);
      editModal.close();
      setFormData({});
      setSelectedUser(null);
      alert.success('사용자가 수정되었습니다');
    } catch (error) {
      const message = error instanceof Error ? error.message : '수정에 실패했습니다';
      alert.error(message);
    }
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

  const renderRoleBadge = (role: string) => {
    let roleVariant: 'destructive' | 'warning' | 'default' | 'secondary';
    let roleLabel: string;

    switch (role) {
      case 'admin':
        roleVariant = 'destructive';
        roleLabel = '관리자';
        break;
      case 'moderator':
        roleVariant = 'warning';
        roleLabel = '운영자';
        break;
      case 'user':
        roleVariant = 'default';
        roleLabel = '사용자';
        break;
      default:
        roleVariant = 'secondary';
        roleLabel = '게스트';
    }

    return <Badge variant={roleVariant}>{roleLabel}</Badge>;
  };

  const renderStatusBadge = (status: string) => {
    let statusVariant: 'success' | 'warning' | 'destructive';
    let statusLabel: string;

    switch (status) {
      case 'active':
        statusVariant = 'success';
        statusLabel = '활성';
        break;
      case 'inactive':
        statusVariant = 'warning';
        statusLabel = '비활성';
        break;
      default:
        statusVariant = 'destructive';
        statusLabel = '정지';
    }

    return <Badge variant={statusVariant}>{statusLabel}</Badge>;
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

  const getStats = () => {
    const users = usersHook.users;
    return {
      total: users.length,
      active: users.filter((u) => u.status === 'active').length,
      inactive: users.filter((u) => u.status === 'inactive').length,
      suspended: users.filter((u) => u.status === 'suspended').length,
      admin: users.filter((u) => u.role === 'admin').length,
    };
  };

  const stats = getStats();

  return (
    <>
      <div className="mb-4 text-right">
        <Button variant="primary" size="md" onClick={createModal.open}>
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

      <div className="overflow-auto border border-gray-300 bg-white dark:border-neutral-700 dark:bg-neutral-800">
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
                <TableCell>{renderRoleBadge(user.role)}</TableCell>
                <TableCell>{renderStatusBadge(user.status)}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>{user.lastLogin || '-'}</TableCell>
                <TableCell>{renderActions(user)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UserFormModal
        isOpen={createModal.isOpen}
        onClose={() => {
          createModal.close();
          setFormData({});
        }}
        title="새 사용자 만들기"
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleCreate}
      />

      <UserFormModal
        isOpen={editModal.isOpen}
        onClose={() => {
          editModal.close();
          setFormData({});
          setSelectedUser(null);
        }}
        title="사용자 수정"
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleUpdate}
        selectedUser={selectedUser}
      />
    </>
  );
};
