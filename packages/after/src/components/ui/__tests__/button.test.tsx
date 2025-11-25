import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('기본 버튼이 렌더링된다', () => {
    render(<Button>클릭</Button>);
    expect(screen.getByRole('button', { name: '클릭' })).toBeInTheDocument();
  });

  it('variant에 따라 올바른 클래스가 적용된다', () => {
    const { rerender } = render(<Button variant="primary">버튼</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary');

    rerender(<Button variant="secondary">버튼</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-secondary');

    rerender(<Button variant="danger">버튼</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-destructive');

    rerender(<Button variant="success">버튼</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-success');

    rerender(<Button variant="outline">버튼</Button>);
    expect(screen.getByRole('button')).toHaveClass('border');

    rerender(<Button variant="ghost">버튼</Button>);
    expect(screen.getByRole('button')).toHaveClass('hover:bg-accent');
  });

  it('size에 따라 올바른 클래스가 적용된다', () => {
    const { rerender } = render(<Button size="sm">버튼</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-8');

    rerender(<Button size="md">버튼</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-10');

    rerender(<Button size="lg">버튼</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-11');
  });

  it('추가 className이 적용된다', () => {
    render(<Button className="custom-class">버튼</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('disabled 상태가 적용된다', () => {
    render(<Button disabled>버튼</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveClass('disabled:pointer-events-none');
  });

  it('children이 올바르게 렌더링된다', () => {
    render(
      <Button>
        <span>아이콘</span>
        텍스트
      </Button>
    );
    expect(screen.getByText('아이콘')).toBeInTheDocument();
    expect(screen.getByText('텍스트')).toBeInTheDocument();
  });

  it('기본 variant는 primary, size는 md이다', () => {
    render(<Button>버튼</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveClass('h-10');
  });

  it('HTML button 속성들이 전달된다', () => {
    render(<Button type="submit" aria-label="제출">버튼</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('aria-label', '제출');
  });
});
