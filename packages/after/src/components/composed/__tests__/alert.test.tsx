import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from '../alert';

describe('Alert', () => {
  it('기본 알림이 렌더링된다', () => {
    render(<Alert>알림 내용</Alert>);
    expect(screen.getByText('알림 내용')).toBeInTheDocument();
  });

  it('title이 표시된다', () => {
    render(<Alert title="알림 제목">내용</Alert>);
    expect(screen.getByText('알림 제목')).toBeInTheDocument();
  });

  it('variant에 따라 올바른 클래스가 적용된다', () => {
    const { rerender } = render(<Alert variant="default">내용</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('alert-default');

    rerender(<Alert variant="info">내용</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('alert-info');

    rerender(<Alert variant="success">내용</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('alert-success');

    rerender(<Alert variant="warning">내용</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('alert-warning');

    rerender(<Alert variant="error">내용</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('alert-error');
  });

  it('variant에 따라 올바른 아이콘이 표시된다', () => {
    const { rerender } = render(<Alert variant="info">내용</Alert>);
    expect(screen.getByText('ℹ️')).toBeInTheDocument();

    rerender(<Alert variant="success">내용</Alert>);
    expect(screen.getByText('✓')).toBeInTheDocument();

    rerender(<Alert variant="warning">내용</Alert>);
    expect(screen.getByText('⚠️')).toBeInTheDocument();

    rerender(<Alert variant="error">내용</Alert>);
    expect(screen.getByText('✕')).toBeInTheDocument();

    rerender(<Alert variant="default">내용</Alert>);
    expect(screen.getByText('•')).toBeInTheDocument();
  });

  it('showIcon이 false일 때 아이콘이 표시되지 않는다', () => {
    render(<Alert variant="info" showIcon={false}>내용</Alert>);
    expect(screen.queryByText('ℹ️')).not.toBeInTheDocument();
  });

  it('onClose가 있을 때 닫기 버튼이 표시된다', () => {
    render(<Alert onClose={() => {}}>내용</Alert>);
    expect(screen.getByRole('button', { name: /닫기/i })).toBeInTheDocument();
  });

  it('onClose가 없을 때 닫기 버튼이 표시되지 않는다', () => {
    render(<Alert>내용</Alert>);
    expect(screen.queryByRole('button', { name: /닫기/i })).not.toBeInTheDocument();
  });

  it('닫기 버튼 클릭 시 onClose가 호출된다', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(<Alert onClose={handleClose}>내용</Alert>);

    await user.click(screen.getByRole('button', { name: /닫기/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('복잡한 children이 올바르게 렌더링된다', () => {
    render(
      <Alert>
        <p>첫 번째 문단</p>
        <p>두 번째 문단</p>
      </Alert>
    );
    expect(screen.getByText('첫 번째 문단')).toBeInTheDocument();
    expect(screen.getByText('두 번째 문단')).toBeInTheDocument();
  });

  it('title과 children이 함께 표시된다', () => {
    render(
      <Alert title="제목">
        본문 내용
      </Alert>
    );
    expect(screen.getByText('제목')).toBeInTheDocument();
    expect(screen.getByText('본문 내용')).toBeInTheDocument();
  });
});
