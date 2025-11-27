import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/Badge';

describe('Badge', () => {
  it('기본 뱃지가 렌더링된다', () => {
    render(<Badge>테스트</Badge>);
    expect(screen.getByText('테스트')).toBeInTheDocument();
  });

  it('variant에 따라 올바른 클래스가 적용된다', () => {
    const { rerender } = render(<Badge variant="default">뱃지</Badge>);
    expect(screen.getByText('뱃지')).toHaveClass('bg-primary', 'text-primary-foreground');

    rerender(<Badge variant="secondary">뱃지</Badge>);
    expect(screen.getByText('뱃지')).toHaveClass('bg-secondary', 'text-secondary-foreground');

    rerender(<Badge variant="success">뱃지</Badge>);
    expect(screen.getByText('뱃지')).toHaveClass('bg-success', 'text-success-foreground');

    rerender(<Badge variant="destructive">뱃지</Badge>);
    expect(screen.getByText('뱃지')).toHaveClass('bg-destructive', 'text-destructive-foreground');

    rerender(<Badge variant="warning">뱃지</Badge>);
    expect(screen.getByText('뱃지')).toHaveClass('bg-warning', 'text-warning-foreground');

    rerender(<Badge variant="info">뱃지</Badge>);
    expect(screen.getByText('뱃지')).toHaveClass('bg-info', 'text-info-foreground');

    rerender(<Badge variant="outline">뱃지</Badge>);
    expect(screen.getByText('뱃지')).toHaveClass('text-foreground');
  });

  it('추가 className이 적용된다', () => {
    render(<Badge className="custom-class">뱃지</Badge>);
    expect(screen.getByText('뱃지')).toHaveClass('custom-class');
  });

  it('children이 올바르게 렌더링된다', () => {
    render(
      <Badge>
        <span>아이콘</span>
        텍스트
      </Badge>
    );
    expect(screen.getByText('아이콘')).toBeInTheDocument();
    expect(screen.getByText('텍스트')).toBeInTheDocument();
  });

  it('기본 variant는 default이다', () => {
    render(<Badge>뱃지</Badge>);
    const badge = screen.getByText('뱃지');
    expect(badge).toHaveClass('bg-primary', 'text-primary-foreground');
  });

  it('HTML 속성들이 전달된다', () => {
    render(<Badge data-testid="test-badge">뱃지</Badge>);
    const badge = screen.getByTestId('test-badge');
    expect(badge).toBeInTheDocument();
  });
});
