import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, FormSelect, FormTextarea } from '@/components/ui';
import { Modal } from '@/components/composed';
import { postFormSchema, type PostFormSchema } from '@/schemas';
import type { Post, PostFormData } from '@/types';

interface PostFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PostFormData) => void;
  selectedPost?: Post | null;
}

export const PostFormModal = ({ isOpen, onClose, onSubmit, selectedPost }: PostFormModalProps) => {
  const isEditMode = selectedPost !== null;
  const title = isEditMode ? '게시글 수정' : '새 게시글 만들기';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormSchema>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: '',
      content: '',
      author: '',
      category: 'development',
      status: 'draft',
    },
  });

  useEffect(() => {
    if (selectedPost) {
      reset({
        title: selectedPost.title,
        content: selectedPost.content,
        author: selectedPost.author,
        category: selectedPost.category,
        status: selectedPost.status,
      });
    } else {
      reset({
        title: '',
        content: '',
        author: '',
        category: 'development',
        status: 'draft',
      });
    }
  }, [selectedPost, reset]);

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
        {selectedPost && (
          <div className="mb-4 rounded border border-blue-300 bg-blue-50 p-3 text-sm text-blue-700">
            ID: {selectedPost.id} | 생성일: {selectedPost.createdAt} | 조회수: {selectedPost.views}
          </div>
        )}

        <Input
          label="제목"
          placeholder="게시글 제목을 입력하세요"
          error={errors.title?.message}
          required
          {...register('title')}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="작성자명"
            placeholder="작성자명"
            error={errors.author?.message}
            required
            {...register('author')}
          />
          <FormSelect
            options={[
              { value: 'development', label: 'Development' },
              { value: 'design', label: 'Design' },
              { value: 'accessibility', label: 'Accessibility' },
            ]}
            label="카테고리"
            placeholder="카테고리 선택"
            error={errors.category?.message}
            required
            {...register('category')}
          />
        </div>
        <FormTextarea
          label="내용"
          placeholder="게시글 내용을 입력하세요"
          rows={6}
          error={errors.content?.message}
          {...register('content')}
        />
      </div>
    </Modal>
  );
};
