import { DataTable, UserFormModal, type ColumnDef } from '@/components/composed';
import { Badge, Button, StatCard } from '@/components/ui';
import { USER_ROLE_BADGE, USER_STATUS_BADGE } from '@/constants';
import { useAlert, useModal, useUsers } from '@/hooks';
import type { User, UserFormData } from '@/types';
import { useCallback, useMemo, useState } from 'react';

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

  const handleEdit = useCallback(
    (user: User) => {
      setSelectedUser(user);
      modal.open();
    },
    [modal]
  );

  const handleOpenCreate = () => {
    setSelectedUser(null);
    modal.open();
  };

  const handleDelete = useCallback(
    async (id: number) => {
      if (!confirm('정말 삭제하시겠습니까?')) return;

      try {
        usersHook.delete(id);
        alert.success('삭제되었습니다');
      } catch (error) {
        const message = error instanceof Error ? error.message : '삭제에 실패했습니다';
        alert.error(message);
      }
    },
    [usersHook, alert]
  );

  const resetUserForm = () => {
    setSelectedUser(null);
  };

  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        key: 'id',
        header: 'ID',
        width: '60px',
        align: 'center',
      },
      {
        key: 'username',
        header: '사용자명',
        width: '150px',
      },
      {
        key: 'email',
        header: '이메일',
      },
      {
        key: 'role',
        header: '역할',
        width: '120px',
        render: (user) => (
          <Badge variant={USER_ROLE_BADGE[user.role].variant}>
            {USER_ROLE_BADGE[user.role].label}
          </Badge>
        ),
      },
      {
        key: 'status',
        header: '상태',
        width: '120px',
        render: (user) => (
          <Badge variant={USER_STATUS_BADGE[user.status].variant}>
            {USER_STATUS_BADGE[user.status].label}
          </Badge>
        ),
      },
      {
        key: 'createdAt',
        header: '생성일',
        width: '120px',
      },
      {
        key: 'lastLogin',
        header: '마지막 로그인',
        width: '140px',
        render: (user) => user.lastLogin || '-',
      },
      {
        key: 'actions',
        header: '관리',
        width: '200px',
        render: (user) => (
          <div className="flex gap-2">
            <Button size="sm" variant="primary" onClick={() => handleEdit(user)}>
              수정
            </Button>
            <Button size="sm" variant="danger" onClick={() => handleDelete(user.id)}>
              삭제
            </Button>
          </div>
        ),
      },
    ],
    [handleEdit, handleDelete]
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

      <DataTable
        data={usersHook.users}
        columns={columns}
        pageSize={10}
        showPagination={true}
        emptyMessage="등록된 사용자가 없습니다."
      />

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
