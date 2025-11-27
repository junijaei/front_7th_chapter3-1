import React, { useState } from 'react';
import {
  Button,
  Badge,
  Input,
  FormSelect,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  StatCard,
} from '@/components/ui';
import { Modal } from '@/components/composed';
import { useUsers, useAlert, useModal, type User } from '@/hooks';

export const UserManagement: React.FC = () => {
  const usersHook = useUsers();
  const alert = useAlert();
  const createModal = useModal();
  const editModal = useModal();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleCreate = async () => {
    try {
      usersHook.create({
        username: formData.username,
        email: formData.email,
        role: formData.role || 'user',
        status: formData.status || 'active',
      });

      createModal.close();
      setFormData({});
      alert.success('사용자가 생성되었습니다');
    } catch (error: any) {
      alert.error(error.message || '생성에 실패했습니다');
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
    } catch (error: any) {
      alert.error(error.message || '수정에 실패했습니다');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      usersHook.delete(id);
      alert.success('삭제되었습니다');
    } catch (error: any) {
      alert.error(error.message || '삭제에 실패했습니다');
    }
  };

  const renderRoleBadge = (role: string) => {
    const roleVariant =
      role === 'admin'
        ? 'destructive'
        : role === 'moderator'
          ? 'warning'
          : role === 'user'
            ? 'default'
            : 'secondary';
    const roleLabel =
      role === 'admin'
        ? '관리자'
        : role === 'moderator'
          ? '운영자'
          : role === 'user'
            ? '사용자'
            : '게스트';
    return <Badge variant={roleVariant}>{roleLabel}</Badge>;
  };

  const renderStatusBadge = (status: string) => {
    const statusVariant =
      status === 'active' ? 'success' : status === 'inactive' ? 'warning' : 'destructive';
    const statusLabel = status === 'active' ? '활성' : status === 'inactive' ? '비활성' : '정지';
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

      <Modal
        isOpen={createModal.isOpen}
        onClose={() => {
          createModal.close();
          setFormData({});
        }}
        title="새 사용자 만들기"
        size="large"
        showFooter
        footerContent={
          <>
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                createModal.close();
                setFormData({});
              }}
            >
              취소
            </Button>
            <Button variant="primary" size="md" onClick={handleCreate}>
              생성
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            name="username"
            label="사용자명"
            value={formData.username || ''}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            placeholder="사용자명을 입력하세요"
            required
          />
          <Input
            name="email"
            label="이메일"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="이메일을 입력하세요"
            type="email"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              name="role"
              value={formData.role || 'user'}
              onChange={(value) => setFormData({ ...formData, role: value })}
              options={[
                { value: 'user', label: '사용자' },
                { value: 'moderator', label: '운영자' },
                { value: 'admin', label: '관리자' },
              ]}
              label="역할"
              size="md"
            />
            <FormSelect
              name="status"
              value={formData.status || 'active'}
              onChange={(value) => setFormData({ ...formData, status: value })}
              options={[
                { value: 'active', label: '활성' },
                { value: 'inactive', label: '비활성' },
                { value: 'suspended', label: '정지' },
              ]}
              label="상태"
              size="md"
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={editModal.isOpen}
        onClose={() => {
          editModal.close();
          setFormData({});
          setSelectedUser(null);
        }}
        title="사용자 수정"
        size="large"
        showFooter
        footerContent={
          <>
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                editModal.close();
                setFormData({});
                setSelectedUser(null);
              }}
            >
              취소
            </Button>
            <Button variant="primary" size="md" onClick={handleUpdate}>
              수정 완료
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          {selectedUser && (
            <div className="mb-4 rounded border border-blue-300 bg-blue-50 p-3 text-sm text-blue-700">
              ID: {selectedUser.id} | 생성일: {selectedUser.createdAt}
            </div>
          )}

          <Input
            name="username"
            label="사용자명"
            value={formData.username || ''}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            placeholder="사용자명을 입력하세요"
            required
          />
          <Input
            name="email"
            label="이메일"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="이메일을 입력하세요"
            type="email"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              name="role"
              value={formData.role || 'user'}
              onChange={(value) => setFormData({ ...formData, role: value })}
              options={[
                { value: 'user', label: '사용자' },
                { value: 'moderator', label: '운영자' },
                { value: 'admin', label: '관리자' },
              ]}
              label="역할"
              size="md"
            />
            <FormSelect
              name="status"
              value={formData.status || 'active'}
              onChange={(value) => setFormData({ ...formData, status: value })}
              options={[
                { value: 'active', label: '활성' },
                { value: 'inactive', label: '비활성' },
                { value: 'suspended', label: '정지' },
              ]}
              label="상태"
              size="md"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
