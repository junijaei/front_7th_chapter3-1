import React, { useState, useEffect } from 'react';
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
import { usePosts, useUsers, useAlert, useModal, type User, type Post } from '@/hooks';
import '@/styles/components.css';

type EntityType = 'user' | 'post';
type Entity = User | Post;

export const ManagementPage: React.FC = () => {
  const postsHook = usePosts();
  const usersHook = useUsers();
  const alert = useAlert();
  const createModal = useModal();
  const editModal = useModal();

  const [entityType, setEntityType] = useState<EntityType>('post');
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);

  const [formData, setFormData] = useState<any>({});

  const data = entityType === 'user' ? usersHook.users : postsHook.posts;

  useEffect(() => {
    setFormData({});
    createModal.close();
    editModal.close();
    setSelectedItem(null);
  }, [entityType]);

  const handleCreate = async () => {
    try {
      if (entityType === 'user') {
        usersHook.create({
          username: formData.username,
          email: formData.email,
          role: formData.role || 'user',
          status: formData.status || 'active',
        });
      } else {
        postsHook.create({
          title: formData.title,
          content: formData.content || '',
          author: formData.author,
          category: formData.category,
          status: formData.status || 'draft',
        });
      }

      createModal.close();
      setFormData({});
      alert.success(`${entityType === 'user' ? '사용자' : '게시글'}가 생성되었습니다`);
    } catch (error: any) {
      alert.error(error.message || '생성에 실패했습니다');
    }
  };

  const handleEdit = (item: Entity) => {
    setSelectedItem(item);

    if (entityType === 'user') {
      const user = item as User;
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      const post = item as Post;
      setFormData({
        title: post.title,
        content: post.content,
        author: post.author,
        category: post.category,
        status: post.status,
      });
    }

    editModal.open();
  };

  const handleUpdate = async () => {
    if (!selectedItem) return;

    try {
      if (entityType === 'user') {
        usersHook.update(selectedItem.id, formData);
      } else {
        postsHook.update(selectedItem.id, formData);
      }

      editModal.close();
      setFormData({});
      setSelectedItem(null);
      alert.success(`${entityType === 'user' ? '사용자' : '게시글'}가 수정되었습니다`);
    } catch (error: any) {
      alert.error(error.message || '수정에 실패했습니다');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      if (entityType === 'user') {
        usersHook.delete(id);
      } else {
        postsHook.delete(id);
      }

      alert.success('삭제되었습니다');
    } catch (error: any) {
      alert.error(error.message || '삭제에 실패했습니다');
    }
  };

  const handleStatusAction = async (id: number, action: 'publish' | 'archive' | 'restore') => {
    if (entityType !== 'post') return;

    try {
      if (action === 'publish') {
        postsHook.publish(id);
      } else if (action === 'archive') {
        postsHook.archive(id);
      } else if (action === 'restore') {
        postsHook.restore(id);
      }

      const message = action === 'publish' ? '게시' : action === 'archive' ? '보관' : '복원';
      alert.success(`${message}되었습니다`);
    } catch (error: any) {
      alert.error(error.message || '작업에 실패했습니다');
    }
  };

  const getStats = () => {
    if (entityType === 'user') {
      const users = data as User[];
      return {
        total: users.length,
        stat1: {
          label: '활성',
          value: users.filter((u) => u.status === 'active').length,
          color: '#2e7d32',
        },
        stat2: {
          label: '비활성',
          value: users.filter((u) => u.status === 'inactive').length,
          color: '#ed6c02',
        },
        stat3: {
          label: '정지',
          value: users.filter((u) => u.status === 'suspended').length,
          color: '#d32f2f',
        },
        stat4: {
          label: '관리자',
          value: users.filter((u) => u.role === 'admin').length,
          color: '#1976d2',
        },
      };
    } else {
      const posts = data as Post[];
      return {
        total: posts.length,
        stat1: {
          label: '게시됨',
          value: posts.filter((p) => p.status === 'published').length,
          color: '#2e7d32',
        },
        stat2: {
          label: '임시저장',
          value: posts.filter((p) => p.status === 'draft').length,
          color: '#ed6c02',
        },
        stat3: {
          label: '보관됨',
          value: posts.filter((p) => p.status === 'archived').length,
          color: 'rgba(0, 0, 0, 0.6)',
        },
        stat4: {
          label: '총 조회수',
          value: posts.reduce((sum, p) => sum + p.views, 0),
          color: '#1976d2',
        },
      };
    }
  };

  // 비즈니스 로직: User 역할 뱃지 렌더링
  const renderUserRoleBadge = (role: string) => {
    const roleVariant =
      role === 'admin' ? 'destructive' :
      role === 'moderator' ? 'warning' :
      role === 'user' ? 'default' : 'secondary';
    const roleLabel =
      role === 'admin' ? '관리자' :
      role === 'moderator' ? '운영자' :
      role === 'user' ? '사용자' : '게스트';
    return <Badge variant={roleVariant}>{roleLabel}</Badge>;
  };

  // 비즈니스 로직: User 상태 뱃지 렌더링
  const renderUserStatusBadge = (status: string) => {
    const statusVariant =
      status === 'active' ? 'success' :
      status === 'inactive' ? 'warning' : 'destructive';
    const statusLabel =
      status === 'active' ? '활성' :
      status === 'inactive' ? '비활성' : '정지';
    return <Badge variant={statusVariant}>{statusLabel}</Badge>;
  };

  // 비즈니스 로직: Post 카테고리 뱃지 렌더링
  const renderPostCategoryBadge = (category: string) => {
    const variant =
      category === 'development' ? 'default' :
      category === 'design' ? 'info' :
      category === 'accessibility' ? 'destructive' :
      'secondary';
    return <Badge variant={variant}>{category}</Badge>;
  };

  // 비즈니스 로직: Post 상태 뱃지 렌더링
  const renderPostStatusBadge = (status: string) => {
    const statusVariant =
      status === 'published' ? 'success' :
      status === 'draft' ? 'warning' :
      status === 'archived' ? 'secondary' :
      status === 'pending' ? 'info' : 'destructive';
    const statusLabel =
      status === 'published' ? '게시됨' :
      status === 'draft' ? '임시저장' :
      status === 'archived' ? '보관됨' :
      status === 'pending' ? '대기중' : '거부됨';
    return <Badge variant={statusVariant}>{statusLabel}</Badge>;
  };

  // 비즈니스 로직: User 액션 버튼 렌더링
  const renderUserActions = (user: User) => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button size="sm" variant="primary" onClick={() => handleEdit(user)}>
        수정
      </Button>
      <Button size="sm" variant="danger" onClick={() => handleDelete(user.id)}>
        삭제
      </Button>
    </div>
  );

  // 비즈니스 로직: Post 액션 버튼 렌더링
  const renderPostActions = (post: Post) => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button size="sm" variant="primary" onClick={() => handleEdit(post)}>
        수정
      </Button>
      {post.status === 'draft' && (
        <Button
          size="sm"
          variant="success"
          onClick={() => handleStatusAction(post.id, 'publish')}
        >
          게시
        </Button>
      )}
      {post.status === 'published' && (
        <Button
          size="sm"
          variant="secondary"
          onClick={() => handleStatusAction(post.id, 'archive')}
        >
          보관
        </Button>
      )}
      {post.status === 'archived' && (
        <Button
          size="sm"
          variant="primary"
          onClick={() => handleStatusAction(post.id, 'restore')}
        >
          복원
        </Button>
      )}
      <Button size="sm" variant="danger" onClick={() => handleDelete(post.id)}>
        삭제
      </Button>
    </div>
  );

  const stats = getStats();

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '5px',
              color: '#333',
            }}
          >
            관리 시스템
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>사용자와 게시글을 관리하세요</p>
        </div>

        <div
          style={{
            background: 'white',
            border: '1px solid #ddd',
            padding: '10px',
          }}
        >
          <div
            style={{
              marginBottom: '15px',
              borderBottom: '2px solid #ccc',
              paddingBottom: '5px',
            }}
          >
            <button
              onClick={() => setEntityType('post')}
              style={{
                padding: '8px 16px',
                marginRight: '5px',
                fontSize: '14px',
                fontWeight: entityType === 'post' ? 'bold' : 'normal',
                border: '1px solid #999',
                background: entityType === 'post' ? '#1976d2' : '#f5f5f5',
                color: entityType === 'post' ? 'white' : '#333',
                cursor: 'pointer',
                borderRadius: '3px',
              }}
            >
              게시글
            </button>
            <button
              onClick={() => setEntityType('user')}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: entityType === 'user' ? 'bold' : 'normal',
                border: '1px solid #999',
                background: entityType === 'user' ? '#1976d2' : '#f5f5f5',
                color: entityType === 'user' ? 'white' : '#333',
                cursor: 'pointer',
                borderRadius: '3px',
              }}
            >
              사용자
            </button>
          </div>

          <div>
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
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                  {stats.stat1.label}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#388e3c' }}>
                  {stats.stat1.value}
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
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                  {stats.stat2.label}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f57c00' }}>
                  {stats.stat2.value}
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
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                  {stats.stat3.label}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#d32f2f' }}>
                  {stats.stat3.value}
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
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                  {stats.stat4.label}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#424242' }}>
                  {stats.stat4.value}
                </div>
              </div>
            </div>

            <div style={{ border: '1px solid #ddd', background: 'white', overflow: 'auto' }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    {entityType === 'user' ? (
                      <>
                        <TableHead style={{ width: '60px' }}>ID</TableHead>
                        <TableHead style={{ width: '150px' }}>사용자명</TableHead>
                        <TableHead>이메일</TableHead>
                        <TableHead style={{ width: '120px' }}>역할</TableHead>
                        <TableHead style={{ width: '120px' }}>상태</TableHead>
                        <TableHead style={{ width: '120px' }}>생성일</TableHead>
                        <TableHead style={{ width: '140px' }}>마지막 로그인</TableHead>
                        <TableHead style={{ width: '200px' }}>관리</TableHead>
                      </>
                    ) : (
                      <>
                        <TableHead style={{ width: '60px' }}>ID</TableHead>
                        <TableHead>제목</TableHead>
                        <TableHead style={{ width: '120px' }}>작성자</TableHead>
                        <TableHead style={{ width: '140px' }}>카테고리</TableHead>
                        <TableHead style={{ width: '120px' }}>상태</TableHead>
                        <TableHead style={{ width: '100px' }}>조회수</TableHead>
                        <TableHead style={{ width: '120px' }}>작성일</TableHead>
                        <TableHead style={{ width: '250px' }}>관리</TableHead>
                      </>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entityType === 'user'
                    ? (data as User[]).map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{user.username}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{renderUserRoleBadge(user.role)}</TableCell>
                          <TableCell>{renderUserStatusBadge(user.status)}</TableCell>
                          <TableCell>{user.createdAt}</TableCell>
                          <TableCell>{user.lastLogin || '-'}</TableCell>
                          <TableCell>{renderUserActions(user)}</TableCell>
                        </TableRow>
                      ))
                    : (data as Post[]).map((post) => (
                        <TableRow key={post.id}>
                          <TableCell>{post.id}</TableCell>
                          <TableCell>{post.title}</TableCell>
                          <TableCell>{post.author}</TableCell>
                          <TableCell>{renderPostCategoryBadge(post.category)}</TableCell>
                          <TableCell>{renderPostStatusBadge(post.status)}</TableCell>
                          <TableCell>{post.views.toLocaleString()}</TableCell>
                          <TableCell>{post.createdAt}</TableCell>
                          <TableCell>{renderPostActions(post)}</TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={createModal.isOpen}
        onClose={() => {
          createModal.close();
          setFormData({});
        }}
        title={`새 ${entityType === 'user' ? '사용자' : '게시글'} 만들기`}
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
          {entityType === 'user' ? (
            <>
              <Input
                name="username"
                value={formData.username || ''}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="사용자명을 입력하세요"
                required
              />
              <Input
                name="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="이메일을 입력하세요"
                type="email"
                required
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={editModal.isOpen}
        onClose={() => {
          editModal.close();
          setFormData({});
          setSelectedItem(null);
        }}
        title={`${entityType === 'user' ? '사용자' : '게시글'} 수정`}
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
                setSelectedItem(null);
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
          {selectedItem && (
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
              ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
              {entityType === 'post' && ` | 조회수: ${(selectedItem as Post).views}`}
            </div>
          )}

          {entityType === 'user' ? (
            <>
              <Input
                name="username"
                value={formData.username || ''}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="사용자명을 입력하세요"
                required
              />
              <Input
                name="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="이메일을 입력하세요"
                type="email"
                required
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};
