import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('기본 버튼이 렌더링된다', () => {
    render(<Button>클릭</Button>);
    expect(screen.getByRole('button', { name: '클릭' })).toBeInTheDocument();
  });

  it('클릭 이벤트가 동작한다', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>클릭</Button>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled 상태에서는 클릭이 동작하지 않는다', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick} disabled>클릭</Button>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('variant에 따라 올바른 클래스가 적용된다', () => {
    const { rerender } = render(<Button variant="primary">버튼</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-primary');

    rerender(<Button variant="secondary">버튼</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-secondary');

    rerender(<Button variant="danger">버튼</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-danger');

    rerender(<Button variant="success">버튼</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-success');
  });

  it('size에 따라 올바른 클래스가 적용된다', () => {
    const { rerender } = render(<Button size="sm">버튼</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-sm');

    rerender(<Button size="md">버튼</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-md');

    rerender(<Button size="lg">버튼</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-lg');
  });

  it('fullWidth가 true일 때 btn-fullwidth 클래스가 적용된다', () => {
    render(<Button fullWidth>버튼</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-fullwidth');
  });

  it('type 속성이 올바르게 설정된다', () => {
    const { rerender } = render(<Button type="submit">제출</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');

    rerender(<Button type="reset">리셋</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');

    rerender(<Button type="button">버튼</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('entityType과 action이 있을 때 자동으로 레이블이 생성된다', () => {
    const { rerender } = render(
      <Button entityType="user" action="create" entity={{}} />
    );
    expect(screen.getByRole('button')).toHaveTextContent('새 사용자 만들기');

    rerender(<Button entityType="post" action="create" entity={{}} />);
    expect(screen.getByRole('button')).toHaveTextContent('새 게시글 만들기');

    rerender(<Button entityType="user" action="edit" entity={{}} />);
    expect(screen.getByRole('button')).toHaveTextContent('수정');

    rerender(<Button entityType="user" action="delete" entity={{}} />);
    expect(screen.getByRole('button')).toHaveTextContent('삭제');
  });

  it('admin 사용자는 삭제 버튼이 비활성화된다', () => {
    render(
      <Button
        entityType="user"
        action="delete"
        entity={{ role: 'admin' }}
      >
        삭제
      </Button>
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('이미 게시된 글은 게시 버튼이 비활성화된다', () => {
    render(
      <Button
        entityType="post"
        action="publish"
        entity={{ status: 'published' }}
      >
        게시
      </Button>
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('게시되지 않은 글은 보관 버튼이 비활성화된다', () => {
    render(
      <Button
        entityType="post"
        action="archive"
        entity={{ status: 'draft' }}
      >
        보관
      </Button>
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('action에 따라 variant가 자동 결정된다', () => {
    const { rerender } = render(
      <Button entityType="user" action="delete" entity={{}}>삭제</Button>
    );
    expect(screen.getByRole('button')).toHaveClass('btn-danger');

    rerender(<Button entityType="post" action="publish" entity={{}}>게시</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-success');

    rerender(<Button entityType="post" action="archive" entity={{}}>보관</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-secondary');
  });
});
