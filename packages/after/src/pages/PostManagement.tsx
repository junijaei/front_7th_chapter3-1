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
import { PostFormModal } from '@/components/composed';
import { usePosts, useAlert, useModal, type Post, type PostFormData } from '@/hooks';

export const PostManagement: React.FC = () => {
  const postsHook = usePosts();
  const alert = useAlert();
  const createModal = useModal();
  const editModal = useModal();

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState<Partial<PostFormData>>({});

  const handleCreate = async () => {
    try {
      if (!formData.title || !formData.author || !formData.category) {
        alert.error('필수 항목을 입력해주세요');
        return;
      }

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
    } catch (error) {
      const message = error instanceof Error ? error.message : '생성에 실패했습니다';
      alert.error(message);
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
    } catch (error) {
      const message = error instanceof Error ? error.message : '수정에 실패했습니다';
      alert.error(message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      postsHook.delete(id);
      alert.success('삭제되었습니다');
    } catch (error) {
      const message = error instanceof Error ? error.message : '삭제에 실패했습니다';
      alert.error(message);
    }
  };

  const handlePublish = async (id: number) => {
    try {
      postsHook.publish(id);
      alert.success('게시되었습니다');
    } catch (error) {
      const message = error instanceof Error ? error.message : '작업에 실패했습니다';
      alert.error(message);
    }
  };

  const handleArchive = async (id: number) => {
    try {
      postsHook.archive(id);
      alert.success('보관되었습니다');
    } catch (error) {
      const message = error instanceof Error ? error.message : '작업에 실패했습니다';
      alert.error(message);
    }
  };

  const handleRestore = async (id: number) => {
    try {
      postsHook.restore(id);
      alert.success('복원되었습니다');
    } catch (error) {
      const message = error instanceof Error ? error.message : '작업에 실패했습니다';
      alert.error(message);
    }
  };

  const renderCategoryBadge = (category: string) => {
    let variant: 'default' | 'info' | 'destructive' | 'secondary';

    switch (category) {
      case 'development':
        variant = 'default';
        break;
      case 'design':
        variant = 'info';
        break;
      case 'accessibility':
        variant = 'destructive';
        break;
      default:
        variant = 'secondary';
    }

    return <Badge variant={variant}>{category}</Badge>;
  };

  const renderStatusBadge = (status: string) => {
    let statusVariant: 'success' | 'warning' | 'secondary' | 'info' | 'destructive';
    let statusLabel: string;

    switch (status) {
      case 'published':
        statusVariant = 'success';
        statusLabel = '게시됨';
        break;
      case 'draft':
        statusVariant = 'warning';
        statusLabel = '임시저장';
        break;
      case 'archived':
        statusVariant = 'secondary';
        statusLabel = '보관됨';
        break;
      case 'pending':
        statusVariant = 'info';
        statusLabel = '대기중';
        break;
      default:
        statusVariant = 'destructive';
        statusLabel = '거부됨';
    }

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

      <PostFormModal
        isOpen={createModal.isOpen}
        onClose={() => {
          createModal.close();
          setFormData({});
        }}
        title="새 게시글 만들기"
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleCreate}
      />

      <PostFormModal
        isOpen={editModal.isOpen}
        onClose={() => {
          editModal.close();
          setFormData({});
          setSelectedPost(null);
        }}
        title="게시글 수정"
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleUpdate}
        selectedPost={selectedPost}
      />
    </>
  );
};
