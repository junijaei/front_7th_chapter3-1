import React from 'react';
import { Button, Input, FormSelect, FormTextarea } from '@/components/ui';
import { Modal } from '@/components/composed';
import type { Post, PostFormData } from '@/hooks';

interface PostFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  formData: Partial<PostFormData>;
  setFormData: (data: Partial<PostFormData>) => void;
  onSubmit: () => void;
  selectedPost?: Post | null;
}

export const PostFormModal: React.FC<PostFormModalProps> = ({
  isOpen,
  onClose,
  title,
  formData,
  setFormData,
  onSubmit,
  selectedPost,
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
            {selectedPost ? '수정 완료' : '생성'}
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
          name="title"
          label="제목"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="게시글 제목을 입력하세요"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            name="author"
            label="작성자명"
            value={formData.author || ''}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="작성자명"
            required
          />
          <FormSelect
            name="category"
            value={formData.category || ''}
            onChange={(value) => setFormData({ ...formData, category: value })}
            options={[
              { value: 'development', label: 'Development' },
              { value: 'design', label: 'Design' },
              { value: 'accessibility', label: 'Accessibility' },
            ]}
            label="카테고리"
            placeholder="카테고리 선택"
            size="md"
          />
        </div>
        <FormTextarea
          name="content"
          value={formData.content || ''}
          onChange={(value) => setFormData({ ...formData, content: value })}
          label="내용"
          placeholder="게시글 내용을 입력하세요"
          rows={6}
        />
      </div>
    </Modal>
  );
};
