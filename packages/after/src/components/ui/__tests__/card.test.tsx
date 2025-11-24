import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '@/components/ui/card';

describe('Card', () => {
  it('기본 카드가 렌더링된다', () => {
    render(<Card>카드 내용</Card>);
    expect(screen.getByText('카드 내용')).toBeInTheDocument();
  });

  it('title이 표시된다', () => {
    render(<Card title="카드 제목">내용</Card>);
    expect(screen.getByText('카드 제목')).toBeInTheDocument();
  });

  it('subtitle이 표시된다', () => {
    render(<Card title="제목" subtitle="부제목">내용</Card>);
    expect(screen.getByText('부제목')).toBeInTheDocument();
  });

  it('headerActions가 표시된다', () => {
    render(
      <Card
        title="제목"
        headerActions={<button>액션 버튼</button>}
      >
        내용
      </Card>
    );
    expect(screen.getByRole('button', { name: '액션 버튼' })).toBeInTheDocument();
  });

  it('variant에 따라 올바른 클래스가 적용된다', () => {
    const { container, rerender } = render(<Card variant="default">내용</Card>);
    expect(container.querySelector('.card')).toHaveClass('card-default');

    rerender(<Card variant="bordered">내용</Card>);
    expect(container.querySelector('.card')).toHaveClass('card-bordered');

    rerender(<Card variant="elevated">내용</Card>);
    expect(container.querySelector('.card')).toHaveClass('card-elevated');

    rerender(<Card variant="flat">내용</Card>);
    expect(container.querySelector('.card')).toHaveClass('card-flat');
  });

  it('title이 없으면 card-header가 렌더링되지 않는다', () => {
    const { container } = render(<Card>내용만 있는 카드</Card>);
    expect(container.querySelector('.card-header')).not.toBeInTheDocument();
  });

  it('title, subtitle, headerActions 중 하나라도 있으면 card-header가 렌더링된다', () => {
    const { container, rerender } = render(<Card title="제목">내용</Card>);
    expect(container.querySelector('.card-header')).toBeInTheDocument();

    rerender(<Card subtitle="부제목">내용</Card>);
    expect(container.querySelector('.card-header')).toBeInTheDocument();

    rerender(<Card headerActions={<button>액션</button>}>내용</Card>);
    expect(container.querySelector('.card-header')).toBeInTheDocument();
  });

  it('card-body에 children이 렌더링된다', () => {
    const { container } = render(
      <Card>
        <div data-testid="child-content">자식 컨텐츠</div>
      </Card>
    );
    const cardBody = container.querySelector('.card-body');
    expect(cardBody).toContainElement(screen.getByTestId('child-content'));
  });

  it('여러 children이 올바르게 렌더링된다', () => {
    render(
      <Card title="제목">
        <p>첫 번째 내용</p>
        <p>두 번째 내용</p>
      </Card>
    );
    expect(screen.getByText('첫 번째 내용')).toBeInTheDocument();
    expect(screen.getByText('두 번째 내용')).toBeInTheDocument();
  });
});
