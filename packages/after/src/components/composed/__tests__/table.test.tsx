import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Table } from '../table';

const mockColumns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: '이름' },
  { key: 'email', header: '이메일' },
];

const mockData = [
  { id: 1, name: '홍길동', email: 'hong@example.com' },
  { id: 2, name: '김철수', email: 'kim@example.com' },
  { id: 3, name: '이영희', email: 'lee@example.com' },
];

describe('Table', () => {
  it('기본 테이블이 렌더링된다', () => {
    render(<Table columns={mockColumns} data={mockData} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('컬럼 헤더가 표시된다', () => {
    render(<Table columns={mockColumns} data={mockData} />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('이름')).toBeInTheDocument();
    expect(screen.getByText('이메일')).toBeInTheDocument();
  });

  it('데이터가 표시된다', () => {
    render(<Table columns={mockColumns} data={mockData} />);
    expect(screen.getByText('홍길동')).toBeInTheDocument();
    expect(screen.getByText('김철수')).toBeInTheDocument();
    expect(screen.getByText('lee@example.com')).toBeInTheDocument();
  });

  it('striped 클래스가 적용된다', () => {
    render(<Table columns={mockColumns} data={mockData} striped />);
    expect(screen.getByRole('table')).toHaveClass('table-striped');
  });

  it('bordered 클래스가 적용된다', () => {
    render(<Table columns={mockColumns} data={mockData} bordered />);
    expect(screen.getByRole('table')).toHaveClass('table-bordered');
  });

  it('hover 클래스가 적용된다', () => {
    render(<Table columns={mockColumns} data={mockData} hover />);
    expect(screen.getByRole('table')).toHaveClass('table-hover');
  });

  it('행 클릭 시 onRowClick이 호출된다', async () => {
    const handleRowClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Table
        columns={mockColumns}
        data={mockData}
        onRowClick={handleRowClick}
      />
    );

    await user.click(screen.getByText('홍길동'));
    expect(handleRowClick).toHaveBeenCalledWith(mockData[0]);
  });

  describe('검색 기능', () => {
    it('searchable이 true일 때 검색 입력창이 표시된다', () => {
      render(<Table columns={mockColumns} data={mockData} searchable />);
      expect(screen.getByPlaceholderText('검색...')).toBeInTheDocument();
    });

    it('검색어에 따라 데이터가 필터링된다', async () => {
      const user = userEvent.setup();

      render(<Table columns={mockColumns} data={mockData} searchable />);

      await user.type(screen.getByPlaceholderText('검색...'), '홍길동');

      expect(screen.getByText('홍길동')).toBeInTheDocument();
      expect(screen.queryByText('김철수')).not.toBeInTheDocument();
      expect(screen.queryByText('이영희')).not.toBeInTheDocument();
    });
  });

  describe('정렬 기능', () => {
    it('sortable이 true일 때 헤더 클릭으로 정렬할 수 있다', async () => {
      const user = userEvent.setup();

      render(<Table columns={mockColumns} data={mockData} sortable />);

      const nameHeader = screen.getByText('이름');
      await user.click(nameHeader);

      // 첫 번째 클릭은 오름차순
      expect(screen.getByText('↑')).toBeInTheDocument();
    });

    it('같은 컬럼을 다시 클릭하면 내림차순으로 정렬된다', async () => {
      const user = userEvent.setup();

      render(<Table columns={mockColumns} data={mockData} sortable />);

      const nameHeader = screen.getByText('이름');
      await user.click(nameHeader); // 오름차순
      await user.click(nameHeader); // 내림차순

      expect(screen.getByText('↓')).toBeInTheDocument();
    });
  });

  describe('페이지네이션', () => {
    const manyData = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `사용자 ${i + 1}`,
      email: `user${i + 1}@example.com`,
    }));

    it('데이터가 pageSize보다 많으면 페이지네이션이 표시된다', () => {
      render(<Table columns={mockColumns} data={manyData} pageSize={10} />);

      expect(screen.getByText('1 / 3')).toBeInTheDocument();
      expect(screen.getByText('이전')).toBeInTheDocument();
      expect(screen.getByText('다음')).toBeInTheDocument();
    });

    it('다음 버튼 클릭으로 다음 페이지로 이동한다', async () => {
      const user = userEvent.setup();

      render(<Table columns={mockColumns} data={manyData} pageSize={10} />);

      await user.click(screen.getByText('다음'));
      expect(screen.getByText('2 / 3')).toBeInTheDocument();
    });

    it('이전 버튼 클릭으로 이전 페이지로 이동한다', async () => {
      const user = userEvent.setup();

      render(<Table columns={mockColumns} data={manyData} pageSize={10} />);

      await user.click(screen.getByText('다음'));
      await user.click(screen.getByText('이전'));
      expect(screen.getByText('1 / 3')).toBeInTheDocument();
    });

    it('첫 페이지에서 이전 버튼이 비활성화된다', () => {
      render(<Table columns={mockColumns} data={manyData} pageSize={10} />);
      expect(screen.getByText('이전')).toBeDisabled();
    });

    it('마지막 페이지에서 다음 버튼이 비활성화된다', async () => {
      const user = userEvent.setup();

      render(<Table columns={mockColumns} data={manyData} pageSize={10} />);

      await user.click(screen.getByText('다음'));
      await user.click(screen.getByText('다음'));

      expect(screen.getByText('다음')).toBeDisabled();
    });
  });

  describe('엔티티 타입별 렌더링', () => {
    it('user 엔티티 타입일 때 수정/삭제 버튼이 표시된다', () => {
      const userData = [
        { id: 1, username: '홍길동', email: 'hong@example.com', role: 'user', actions: '' },
      ];
      const columns = [
        { key: 'username', header: '사용자명' },
        { key: 'email', header: '이메일' },
        { key: 'role', header: '역할' },
        { key: 'actions', header: '액션' },
      ];

      render(
        <Table
          columns={columns}
          data={userData}
          entityType="user"
          onEdit={() => {}}
          onDelete={() => {}}
        />
      );

      expect(screen.getByRole('button', { name: '수정' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '삭제' })).toBeInTheDocument();
    });

    it('post 엔티티 타입일 때 상태에 따른 버튼이 표시된다', () => {
      const postData = [
        { id: 1, title: '게시글 1', status: 'draft', actions: '' },
      ];
      const columns = [
        { key: 'title', header: '제목' },
        { key: 'status', header: '상태' },
        { key: 'actions', header: '액션' },
      ];

      render(
        <Table
          columns={columns}
          data={postData}
          entityType="post"
          onEdit={() => {}}
          onDelete={() => {}}
          onPublish={() => {}}
        />
      );

      expect(screen.getByRole('button', { name: '수정' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '게시' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '삭제' })).toBeInTheDocument();
    });

    describe('user role 뱃지 렌더링', () => {
      it('admin 역할은 "관리자" 텍스트와 destructive variant로 표시된다', () => {
        const userData = [{ id: 1, role: 'admin' }];
        const columns = [{ key: 'role', header: '역할' }];

        render(<Table columns={columns} data={userData} entityType="user" />);

        const badge = screen.getByText('관리자');
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass('bg-destructive');
      });

      it('moderator 역할은 "운영자" 텍스트와 warning variant로 표시된다', () => {
        const userData = [{ id: 1, role: 'moderator' }];
        const columns = [{ key: 'role', header: '역할' }];

        render(<Table columns={columns} data={userData} entityType="user" />);

        const badge = screen.getByText('운영자');
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass('bg-yellow-500');
      });

      it('user 역할은 "사용자" 텍스트와 default variant로 표시된다', () => {
        const userData = [{ id: 1, role: 'user' }];
        const columns = [{ key: 'role', header: '역할' }];

        render(<Table columns={columns} data={userData} entityType="user" />);

        const badge = screen.getByText('사용자');
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass('bg-primary');
      });

      it('guest 역할은 "게스트" 텍스트와 secondary variant로 표시된다', () => {
        const userData = [{ id: 1, role: 'guest' }];
        const columns = [{ key: 'role', header: '역할' }];

        render(<Table columns={columns} data={userData} entityType="user" />);

        const badge = screen.getByText('게스트');
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass('bg-secondary');
      });
    });

    describe('user status 뱃지 렌더링', () => {
      it('active 상태는 "활성" 텍스트와 success variant로 표시된다', () => {
        const userData = [{ id: 1, status: 'active' }];
        const columns = [{ key: 'status', header: '상태' }];

        render(<Table columns={columns} data={userData} entityType="user" />);

        const badge = screen.getByText('활성');
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass('bg-green-500');
      });

      it('inactive 상태는 "비활성" 텍스트와 warning variant로 표시된다', () => {
        const userData = [{ id: 1, status: 'inactive' }];
        const columns = [{ key: 'status', header: '상태' }];

        render(<Table columns={columns} data={userData} entityType="user" />);

        const badge = screen.getByText('비활성');
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass('bg-yellow-500');
      });
    });

    describe('post status 뱃지 렌더링', () => {
      it('published 상태는 "게시됨" 텍스트와 success variant로 표시된다', () => {
        const postData = [{ id: 1, status: 'published' }];
        const columns = [{ key: 'status', header: '상태' }];

        render(<Table columns={columns} data={postData} entityType="post" />);

        const badge = screen.getByText('게시됨');
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass('bg-green-500');
      });

      it('draft 상태는 "임시저장" 텍스트와 warning variant로 표시된다', () => {
        const postData = [{ id: 1, status: 'draft' }];
        const columns = [{ key: 'status', header: '상태' }];

        render(<Table columns={columns} data={postData} entityType="post" />);

        const badge = screen.getByText('임시저장');
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass('bg-yellow-500');
      });

      it('archived 상태는 "보관됨" 텍스트와 secondary variant로 표시된다', () => {
        const postData = [{ id: 1, status: 'archived' }];
        const columns = [{ key: 'status', header: '상태' }];

        render(<Table columns={columns} data={postData} entityType="post" />);

        const badge = screen.getByText('보관됨');
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass('bg-secondary');
      });

      it('pending 상태는 "대기중" 텍스트와 info variant로 표시된다', () => {
        const postData = [{ id: 1, status: 'pending' }];
        const columns = [{ key: 'status', header: '상태' }];

        render(<Table columns={columns} data={postData} entityType="post" />);

        const badge = screen.getByText('대기중');
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass('bg-blue-500');
      });
    });

    describe('post category 뱃지 렌더링', () => {
      it('development 카테고리는 default variant로 표시된다', () => {
        const postData = [{ id: 1, category: 'development' }];
        const columns = [{ key: 'category', header: '카테고리' }];

        render(<Table columns={columns} data={postData} entityType="post" />);

        const badge = screen.getByText('development');
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass('bg-primary');
      });

      it('design 카테고리는 info variant로 표시된다', () => {
        const postData = [{ id: 1, category: 'design' }];
        const columns = [{ key: 'category', header: '카테고리' }];

        render(<Table columns={columns} data={postData} entityType="post" />);

        const badge = screen.getByText('design');
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass('bg-blue-500');
      });

      it('accessibility 카테고리는 destructive variant로 표시된다', () => {
        const postData = [{ id: 1, category: 'accessibility' }];
        const columns = [{ key: 'category', header: '카테고리' }];

        render(<Table columns={columns} data={postData} entityType="post" />);

        const badge = screen.getByText('accessibility');
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass('bg-destructive');
      });
    });

    it('onEdit 콜백이 올바르게 호출된다', async () => {
      const handleEdit = vi.fn();
      const user = userEvent.setup();

      const userData = [
        { id: 1, username: '홍길동', actions: '' },
      ];
      const columns = [
        { key: 'username', header: '사용자명' },
        { key: 'actions', header: '액션' },
      ];

      render(
        <Table
          columns={columns}
          data={userData}
          entityType="user"
          onEdit={handleEdit}
          onDelete={() => {}}
        />
      );

      await user.click(screen.getByRole('button', { name: '수정' }));
      expect(handleEdit).toHaveBeenCalledWith(userData[0]);
    });

    it('onDelete 콜백이 올바르게 호출된다', async () => {
      const handleDelete = vi.fn();
      const user = userEvent.setup();

      const userData = [
        { id: 1, username: '홍길동', actions: '' },
      ];
      const columns = [
        { key: 'username', header: '사용자명' },
        { key: 'actions', header: '액션' },
      ];

      render(
        <Table
          columns={columns}
          data={userData}
          entityType="user"
          onEdit={() => {}}
          onDelete={handleDelete}
        />
      );

      await user.click(screen.getByRole('button', { name: '삭제' }));
      expect(handleDelete).toHaveBeenCalledWith(1);
    });
  });

  it('columns가 없으면 데이터 키를 기반으로 컬럼을 생성한다', () => {
    render(<Table data={mockData} />);

    expect(screen.getByText('id')).toBeInTheDocument();
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('email')).toBeInTheDocument();
  });

  it('데이터가 비어있으면 빈 테이블이 렌더링된다', () => {
    render(<Table columns={mockColumns} data={[]} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
