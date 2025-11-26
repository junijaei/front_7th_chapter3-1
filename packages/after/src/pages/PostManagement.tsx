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
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
      <div style={{ marginBottom: '15px', textAlign: 'right' }}>
        <Button variant="primary" size="md" onClick={createModal.open}>
          새로 만들기
        </Button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '10px',
          marginBottom: '15px',
        }}
      >
        <div
          style={{
            padding: '12px 15px',
            background: '#e3f2fd',
            border: '1px solid #90caf9',
            borderRadius: '3px',
          }}
        >
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>전체</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>
            {stats.total}
          </div>
        </div>

        <div
          style={{
            padding: '12px 15px',
            background: '#e8f5e9',
            border: '1px solid #81c784',
            borderRadius: '3px',
          }}
        >
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>게시됨</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#388e3c' }}>
            {stats.published}
          </div>
        </div>

        <div
          style={{
            padding: '12px 15px',
            background: '#fff3e0',
            border: '1px solid #ffb74d',
            borderRadius: '3px',
          }}
        >
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>임시저장</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f57c00' }}>
            {stats.draft}
          </div>
        </div>

        <div
          style={{
            padding: '12px 15px',
            background: '#ffebee',
            border: '1px solid #e57373',
            borderRadius: '3px',
          }}
        >
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>보관됨</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#d32f2f' }}>
            {stats.archived}
          </div>
        </div>

        <div
          style={{
            padding: '12px 15px',
            background: '#f5f5f5',
            border: '1px solid #bdbdbd',
            borderRadius: '3px',
          }}
        >
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>총 조회수</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#424242' }}>
            {stats.totalViews}
          </div>
        </div>
      </div>

      <div style={{ border: '1px solid #ddd', background: 'white', overflow: 'auto' }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: '60px' }}>ID</TableHead>
              <TableHead>제목</TableHead>
              <TableHead style={{ width: '120px' }}>작성자</TableHead>
              <TableHead style={{ width: '140px' }}>카테고리</TableHead>
              <TableHead style={{ width: '120px' }}>상태</TableHead>
              <TableHead style={{ width: '100px' }}>조회수</TableHead>
              <TableHead style={{ width: '120px' }}>작성일</TableHead>
              <TableHead style={{ width: '250px' }}>관리</TableHead>
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
        <div>
          <Input
            name="title"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="게시글 제목을 입력하세요"
            required
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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
        <div>
          {selectedPost && (
            <div
              style={{
                padding: '12px',
                marginBottom: '16px',
                background: '#e3f2fd',
                border: '1px solid #90caf9',
                borderRadius: '4px',
                fontSize: '14px',
                color: '#1976d2',
              }}
            >
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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
