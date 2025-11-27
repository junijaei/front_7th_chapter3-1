import { DataTable, PostFormModal, type ColumnDef } from '@/components/composed';
import { Badge, Button, StatCard } from '@/components/ui';
import { POST_CATEGORY_BADGE, POST_STATUS_BADGE } from '@/constants';
import { useAlert, useModal, usePosts } from '@/hooks';
import type { Post, PostFormData } from '@/types';
import type { ReactNode } from 'react';
import { useCallback, useMemo, useState } from 'react';

export const PostManagement = () => {
  const postsHook = usePosts();
  const alert = useAlert();
  const modal = useModal();

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleFormSubmit = async (data: PostFormData) => {
    try {
      if (selectedPost) {
        postsHook.update(selectedPost.id, data);
        alert.success('게시글이 수정되었습니다');
      } else {
        postsHook.create(data);
        alert.success('게시글이 생성되었습니다');
      }
      modal.close();
      setSelectedPost(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : '작업에 실패했습니다';
      alert.error(message);
    }
  };

  const handleEdit = useCallback(
    (post: Post) => {
      setSelectedPost(post);
      modal.open();
    },
    [modal]
  );

  const handleOpenCreate = () => {
    setSelectedPost(null);
    modal.open();
  };

  const handleDelete = useCallback(
    async (id: number) => {
      if (!confirm('정말 삭제하시겠습니까?')) return;

      try {
        postsHook.delete(id);
        alert.success('삭제되었습니다');
      } catch (error) {
        const message = error instanceof Error ? error.message : '삭제에 실패했습니다';
        alert.error(message);
      }
    },
    [postsHook, alert]
  );

  const handlePublish = useCallback(
    async (id: number) => {
      try {
        postsHook.publish(id);
        alert.success('게시되었습니다');
      } catch (error) {
        const message = error instanceof Error ? error.message : '작업에 실패했습니다';
        alert.error(message);
      }
    },
    [postsHook, alert]
  );

  const handleArchive = useCallback(
    async (id: number) => {
      try {
        postsHook.archive(id);
        alert.success('보관되었습니다');
      } catch (error) {
        const message = error instanceof Error ? error.message : '작업에 실패했습니다';
        alert.error(message);
      }
    },
    [postsHook, alert]
  );

  const handleRestore = useCallback(
    async (id: number) => {
      try {
        postsHook.restore(id);
        alert.success('복원되었습니다');
      } catch (error) {
        const message = error instanceof Error ? error.message : '작업에 실패했습니다';
        alert.error(message);
      }
    },
    [postsHook, alert]
  );

  const resetPostForm = () => {
    setSelectedPost(null);
  };

  const columns: ColumnDef<Post>[] = useMemo(
    () => [
      {
        key: 'id',
        header: 'ID',
        width: '60px',
        align: 'center',
      },
      {
        key: 'title',
        header: '제목',
      },
      {
        key: 'author',
        header: '작성자',
        width: '120px',
      },
      {
        key: 'category',
        header: '카테고리',
        width: '140px',
        render: (post) => (
          <Badge variant={POST_CATEGORY_BADGE[post.category]}>{post.category}</Badge>
        ),
      },
      {
        key: 'status',
        header: '상태',
        width: '120px',
        render: (post) => (
          <Badge variant={POST_STATUS_BADGE[post.status].variant}>
            {POST_STATUS_BADGE[post.status].label}
          </Badge>
        ),
      },
      {
        key: 'views',
        header: '조회수',
        width: '100px',
        render: (post) => post.views.toLocaleString(),
      },
      {
        key: 'createdAt',
        header: '작성일',
        width: '120px',
      },
      {
        key: 'actions',
        header: '관리',
        width: '250px',
        render: (post) => {
          const statusActions: Record<string, ReactNode> = {
            draft: (
              <Button size="sm" variant="success" onClick={() => handlePublish(post.id)}>
                게시
              </Button>
            ),
            published: (
              <Button size="sm" variant="secondary" onClick={() => handleArchive(post.id)}>
                보관
              </Button>
            ),
            archived: (
              <Button size="sm" variant="primary" onClick={() => handleRestore(post.id)}>
                복원
              </Button>
            ),
          };

          return (
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="primary" onClick={() => handleEdit(post)}>
                수정
              </Button>
              {statusActions[post.status]}
              <Button size="sm" variant="danger" onClick={() => handleDelete(post.id)}>
                삭제
              </Button>
            </div>
          );
        },
      },
    ],
    [handleEdit, handlePublish, handleArchive, handleRestore, handleDelete]
  );

  const stats = useMemo(() => {
    const posts = postsHook.posts;
    return {
      total: posts.length,
      published: posts.filter((p) => p.status === 'published').length,
      draft: posts.filter((p) => p.status === 'draft').length,
      archived: posts.filter((p) => p.status === 'archived').length,
      totalViews: posts.reduce((sum, p) => sum + p.views, 0),
    };
  }, [postsHook.posts]);

  return (
    <>
      <div className="mb-4 text-right">
        <Button variant="primary" size="md" onClick={handleOpenCreate}>
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

      <DataTable
        data={postsHook.posts}
        columns={columns}
        pageSize={10}
        showPagination={true}
        emptyMessage="등록된 게시글이 없습니다."
      />

      <PostFormModal
        isOpen={modal.isOpen}
        onClose={() => {
          modal.close();
          resetPostForm();
        }}
        onSubmit={handleFormSubmit}
        selectedPost={selectedPost}
      />
    </>
  );
};
