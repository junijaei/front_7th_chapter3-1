import React from 'react';
import { Button, Input, FormSelect } from '@/components/ui';
import { Modal } from '@/components/composed';
import type { User, UserFormData } from '@/hooks';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  formData: Partial<UserFormData>;
  setFormData: (data: Partial<UserFormData>) => void;
  onSubmit: () => void;
  selectedUser?: User | null;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  onClose,
  title,
  formData,
  setFormData,
  onSubmit,
  selectedUser,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="large"
      showFooter
      footerContent={
        <>
          <Button variant="secondary" size="md" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" size="md" onClick={onSubmit}>
            {selectedUser ? '수정 완료' : '생성'}
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
            onChange={(value) => setFormData({ ...formData, role: value as UserFormData['role'] })}
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
            onChange={(value) =>
              setFormData({ ...formData, status: value as UserFormData['status'] })
            }
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
  );
};
