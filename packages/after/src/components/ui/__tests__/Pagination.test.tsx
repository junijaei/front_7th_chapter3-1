import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from '@/components/ui/Pagination';

describe('Pagination', () => {
  it('totalPages가 1 이하이면 아무것도 렌더링하지 않는다', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('페이지 번호가 올바르게 표시된다', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('현재 페이지가 primary 스타일로 표시된다', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={vi.fn()} />);
    const currentPageButton = screen.getByRole('button', { name: '3' });
    expect(currentPageButton).toHaveClass('bg-primary');
  });

  it('이전 버튼 클릭 시 onPageChange가 호출된다', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);

    const prevButton = screen.getByRole('button', { name: '이전' });
    await user.click(prevButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('다음 버튼 클릭 시 onPageChange가 호출된다', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);

    const nextButton = screen.getByRole('button', { name: '다음' });
    await user.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('첫 페이지에서 이전 버튼이 비활성화된다', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />);
    const prevButton = screen.getByRole('button', { name: '이전' });
    expect(prevButton).toBeDisabled();
  });

  it('마지막 페이지에서 다음 버튼이 비활성화된다', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={vi.fn()} />);
    const nextButton = screen.getByRole('button', { name: '다음' });
    expect(nextButton).toBeDisabled();
  });

  it('페이지 번호 클릭 시 해당 페이지로 이동한다', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);

    const page3Button = screen.getByRole('button', { name: '3' });
    await user.click(page3Button);

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('showFirstLast가 true이면 처음/마지막 버튼이 표시된다', () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={vi.fn()} showFirstLast={true} />
    );
    expect(screen.getByRole('button', { name: '처음' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '마지막' })).toBeInTheDocument();
  });

  it('처음 버튼 클릭 시 첫 페이지로 이동한다', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} showFirstLast={true} />
    );

    const firstButton = screen.getByRole('button', { name: '처음' });
    await user.click(firstButton);

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('마지막 버튼 클릭 시 마지막 페이지로 이동한다', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} showFirstLast={true} />
    );

    const lastButton = screen.getByRole('button', { name: '마지막' });
    await user.click(lastButton);

    expect(onPageChange).toHaveBeenCalledWith(5);
  });

  it('페이지가 많을 때 생략 부호(...)가 표시된다', () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={vi.fn()} />);
    const ellipsis = screen.getAllByText('...');
    expect(ellipsis.length).toBeGreaterThan(0);
  });

  it('첫 페이지에서 처음 버튼이 비활성화된다', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} showFirstLast={true} />
    );
    const firstButton = screen.getByRole('button', { name: '처음' });
    expect(firstButton).toBeDisabled();
  });

  it('마지막 페이지에서 마지막 버튼이 비활성화된다', () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={vi.fn()} showFirstLast={true} />
    );
    const lastButton = screen.getByRole('button', { name: '마지막' });
    expect(lastButton).toBeDisabled();
  });
});
