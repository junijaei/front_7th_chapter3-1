import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, FormSelect } from '@/components/ui';
import { Modal } from '@/components/composed';
import { userFormSchema, type UserFormSchema } from '@/schemas';
import type { User, UserFormData } from '@/types';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
  selectedUser?: User | null;
}

export const UserFormModal = ({ isOpen, onClose, onSubmit, selectedUser }: UserFormModalProps) => {
  const isEditMode = selectedUser !== null;
  const title = isEditMode ? '사용자 수정' : '새 사용자 만들기';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: '',
      email: '',
      role: 'user',
      status: 'active',
    },
  });

  useEffect(() => {
    if (selectedUser) {
      reset({
        username: selectedUser.username,
        email: selectedUser.email,
        role: selectedUser.role,
        status: selectedUser.status,
      });
    } else {
      reset({
        username: '',
        email: '',
        role: 'user',
        status: 'active',
      });
    }
  }, [selectedUser, reset]);

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data);
    reset();
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      size="large"
      showFooter
      footerContent={
        <>
          <Button variant="secondary" size="md" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" size="md" onClick={handleFormSubmit}>
            {isEditMode ? '수정 완료' : '생성'}
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
          label="사용자명"
          placeholder="사용자명을 입력하세요"
          error={errors.username?.message}
          required
          {...register('username')}
        />
        <Input
          label="이메일"
          placeholder="이메일을 입력하세요"
          type="email"
          error={errors.email?.message}
          required
          {...register('email')}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormSelect
            options={[
              { value: 'user', label: '사용자' },
              { value: 'moderator', label: '운영자' },
              { value: 'admin', label: '관리자' },
            ]}
            label="역할"
            error={errors.role?.message}
            required
            {...register('role')}
          />
          <FormSelect
            options={[
              { value: 'active', label: '활성' },
              { value: 'inactive', label: '비활성' },
              { value: 'suspended', label: '정지' },
            ]}
            label="상태"
            error={errors.status?.message}
            required
            {...register('status')}
          />
        </div>
      </div>
    </Modal>
  );
};
