import React, { useState } from 'react';
import {
  Button,
  Badge,
  Input,
  FormSelect,
  FormTextarea,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  StatCard,
} from '@/components/ui';
import { Modal } from '@/components/composed';
import { usePosts, useAlert, useModal, type Post } from '@/hooks';

export const PostManagement: React.FC = () => {
  const postsHook = usePosts();
  const alert = useAlert();
  const createModal = useModal();
  const editModal = useModal();

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleCreate = async () => {
    try {
      postsHook.create({
        title: formData.title,
        content: formData.content || '',
        author: formData.author,
        category: formData.category,
        status: formData.status || 'draft',
      });

      createModal.close();
      setFormData({});
      alert.success('게시글이 생성되었습니다');
    } catch (error: any) {
      alert.error(error.message || '생성에 실패했습니다');
    }
  };

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      author: post.author,
      category: post.category,
      status: post.status,
    });
    editModal.open();
  };

  const handleUpdate = async () => {
    if (!selectedPost) return;

    try {
      postsHook.update(selectedPost.id, formData);
      editModal.close();
      setFormData({});
      setSelectedPost(null);
      alert.success('게시글이 수정되었습니다');
    } catch (error: any) {
      alert.error(error.message || '수정에 실패했습니다');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      postsHook.delete(id);
      alert.success('삭제되었습니다');
    } catch (error: any) {
      alert.error(error.message || '삭제에 실패했습니다');
    }
  };

  const handlePublish = async (id: number) => {
    try {
      postsHook.publish(id);
      alert.success('게시되었습니다');
    } catch (error: any) {
      alert.error(error.message || '작업에 실패했습니다');
    }
  };

  const handleArchive = async (id: number) => {
    try {
      postsHook.archive(id);
      alert.success('보관되었습니다');
    } catch (error: any) {
      alert.error(error.message || '작업에 실패했습니다');
    }
  };

  const handleRestore = async (id: number) => {
    try {
      postsHook.restore(id);
      alert.success('복원되었습니다');
    } catch (error: any) {
      alert.error(error.message || '작업에 실패했습니다');
    }
  };

  const renderCategoryBadge = (category: string) => {
    const variant =
      category === 'development'
        ? 'default'
        : category === 'design'
          ? 'info'
          : category === 'accessibility'
            ? 'destructive'
            : 'secondary';
    return <Badge variant={variant}>{category}</Badge>;
  };

  const renderStatusBadge = (status: string) => {
    const statusVariant =
      status === 'published'
        ? 'success'
        : status === 'draft'
          ? 'warning'
          : status === 'archived'
            ? 'secondary'
            : status === 'pending'
              ? 'info'
              : 'destructive';
    const statusLabel =
      status === 'published'
        ? '게시됨'
        : status === 'draft'
          ? '임시저장'
          : status === 'archived'
            ? '보관됨'
            : status === 'pending'
              ? '대기중'
              : '거부됨';
    return <Badge variant={statusVariant}>{statusLabel}</Badge>;
  };

  const renderActions = (post: Post) => (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" variant="primary" onClick={() => handleEdit(post)}>
        수정
      </Button>
      {post.status === 'draft' && (
        <Button size="sm" variant="success" onClick={() => handlePublish(post.id)}>
          게시
        </Button>
      )}
      {post.status === 'published' && (
        <Button size="sm" variant="secondary" onClick={() => handleArchive(post.id)}>
          보관
        </Button>
      )}
      {post.status === 'archived' && (
        <Button size="sm" variant="primary" onClick={() => handleRestore(post.id)}>
          복원
        </Button>
      )}
      <Button size="sm" variant="danger" onClick={() => handleDelete(post.id)}>
        삭제
      </Button>
    </div>
  );

  const getStats = () => {
    const posts = postsHook.posts;
    return {
      total: posts.length,
      published: posts.filter((p) => p.status === 'published').length,
      draft: posts.filter((p) => p.status === 'draft').length,
      archived: posts.filter((p) => p.status === 'archived').length,
      totalViews: posts.reduce((sum, p) => sum + p.views, 0),
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
        <StatCard variant="success" label="게시됨" value={stats.published} />
        <StatCard variant="warning" label="임시저장" value={stats.draft} />
        <StatCard variant="danger" label="보관됨" value={stats.archived} />
        <StatCard variant="gray" label="총 조회수" value={stats.totalViews} />
      </div>

      <div className="overflow-auto border border-gray-300 bg-white dark:border-neutral-700 dark:bg-neutral-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">ID</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="w-[120px]">작성자</TableHead>
              <TableHead className="w-[140px]">카테고리</TableHead>
              <TableHead className="w-[120px]">상태</TableHead>
              <TableHead className="w-[100px]">조회수</TableHead>
              <TableHead className="w-[120px]">작성일</TableHead>
              <TableHead className="w-[250px]">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {postsHook.posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{renderCategoryBadge(post.category)}</TableCell>
                <TableCell>{renderStatusBadge(post.status)}</TableCell>
                <TableCell>{post.views.toLocaleString()}</TableCell>
                <TableCell>{post.createdAt}</TableCell>
                <TableCell>{renderActions(post)}</TableCell>
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
        title="새 게시글 만들기"
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
            name="title"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="게시글 제목을 입력하세요"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="author"
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

      <Modal
        isOpen={editModal.isOpen}
        onClose={() => {
          editModal.close();
          setFormData({});
          setSelectedPost(null);
        }}
        title="게시글 수정"
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
                setSelectedPost(null);
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
          {selectedPost && (
            <div className="mb-4 rounded border border-blue-300 bg-blue-50 p-3 text-sm text-blue-700">
              ID: {selectedPost.id} | 생성일: {selectedPost.createdAt} | 조회수:{' '}
              {selectedPost.views}
            </div>
          )}

          <Input
            name="title"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="게시글 제목을 입력하세요"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="author"
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
    </>
  );
};
