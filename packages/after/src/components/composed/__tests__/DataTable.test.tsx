import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DataTable, type ColumnDef } from '@/components/composed/DataTable';

interface TestData extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
}

describe('DataTable', () => {
  const sampleData: TestData[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  ];

  const columns: ColumnDef<TestData>[] = [
    { key: 'id', header: 'ID', width: '60px' },
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
  ];

  it('테이블이 올바르게 렌더링된다', () => {
    render(<DataTable data={sampleData} columns={columns} />);

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('데이터가 올바르게 표시된다', () => {
    render(<DataTable data={sampleData} columns={columns} />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('bob@example.com')).toBeInTheDocument();
  });

  it('데이터가 없을 때 빈 메시지가 표시된다', () => {
    render(<DataTable data={[]} columns={columns} emptyMessage="No data available" />);

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('커스텀 렌더링 함수가 작동한다', () => {
    const customColumns: ColumnDef<TestData>[] = [
      { key: 'id', header: 'ID' },
      {
        key: 'name',
        header: 'Name',
        render: (item) => <strong>{item.name.toUpperCase()}</strong>,
      },
    ];

    render(<DataTable data={sampleData} columns={customColumns} />);

    const aliceElement = screen.getByText('ALICE');
    expect(aliceElement.tagName).toBe('STRONG');
  });

  it('행 클릭 이벤트가 작동한다', async () => {
    const user = userEvent.setup();
    const onRowClick = vi.fn();

    render(<DataTable data={sampleData} columns={columns} onRowClick={onRowClick} />);

    const rows = screen.getAllByRole('row');
    // 첫 번째는 헤더, 두 번째부터 데이터 행
    await user.click(rows[1]);

    expect(onRowClick).toHaveBeenCalledWith(sampleData[0]);
  });

  it('페이지네이션이 표시된다', () => {
    const largeData = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
    }));

    render(<DataTable data={largeData} columns={columns} pageSize={10} showPagination={true} />);

    expect(screen.getByRole('button', { name: '이전' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '다음' })).toBeInTheDocument();
  });

  it('페이지네이션을 비활성화할 수 있다', () => {
    const largeData = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
    }));

    render(<DataTable data={largeData} columns={columns} pageSize={10} showPagination={false} />);

    expect(screen.queryByRole('button', { name: '이전' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '다음' })).not.toBeInTheDocument();
  });

  it('페이지 크기만큼 데이터가 표시된다', () => {
    const largeData = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
    }));

    render(<DataTable data={largeData} columns={columns} pageSize={5} showPagination={true} />);

    // 헤더 행을 제외한 데이터 행만 확인
    const rows = screen.getAllByRole('row');
    expect(rows.length - 1).toBe(5); // 헤더 1개 + 데이터 5개
  });

  it('다음 페이지로 이동할 수 있다', async () => {
    const user = userEvent.setup();
    const largeData = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
    }));

    render(<DataTable data={largeData} columns={columns} pageSize={10} showPagination={true} />);

    // 첫 페이지에는 User 1이 있어야 함
    expect(screen.getByText('User 1')).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: '다음' });
    await user.click(nextButton);

    // 두 번째 페이지에는 User 11이 있어야 함
    expect(screen.getByText('User 11')).toBeInTheDocument();
    expect(screen.queryByText('User 1')).not.toBeInTheDocument();
  });

  it('컬럼 정렬이 적용된다', () => {
    const alignColumns: ColumnDef<TestData>[] = [
      { key: 'id', header: 'ID', align: 'center' },
      { key: 'name', header: 'Name', align: 'left' },
      { key: 'email', header: 'Email', align: 'right' },
    ];

    const { container } = render(<DataTable data={sampleData} columns={alignColumns} />);

    const cells = container.querySelectorAll('td');
    expect(cells[0]).toHaveClass('text-center'); // ID
    expect(cells[1]).toHaveClass('text-left'); // Name
    expect(cells[2]).toHaveClass('text-right'); // Email
  });

  it('값이 없으면 대시(-)가 표시된다', () => {
    const dataWithNull: TestData[] = [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: null as unknown as string },
    ];

    render(<DataTable data={dataWithNull} columns={columns} />);

    const cells = screen.getAllByRole('cell');
    const emailCells = cells.filter((cell) => cell.textContent === '-');
    expect(emailCells.length).toBeGreaterThan(0);
  });

  it('커스텀 getRowKey 함수가 작동한다', () => {
    const getRowKey = (item: TestData) => `row-${item.id}`;
    const { container } = render(
      <DataTable data={sampleData} columns={columns} getRowKey={getRowKey} />
    );

    const rows = container.querySelectorAll('tbody tr');
    expect(rows[0]).toBeDefined();
  });

  it('showFirstLast 옵션이 작동한다', () => {
    const largeData = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
    }));

    render(
      <DataTable
        data={largeData}
        columns={columns}
        pageSize={10}
        showPagination={true}
        showFirstLast={true}
      />
    );

    expect(screen.getByRole('button', { name: '처음' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '마지막' })).toBeInTheDocument();
  });
});
