import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from '@/components/ui/Avatar';

describe('Avatar', () => {
  it('텍스트를 children으로 렌더링한다', () => {
    render(<Avatar>AB</Avatar>);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('기본 variant와 size가 적용된다', () => {
    const { container } = render(<Avatar>AB</Avatar>);
    const avatar = container.firstChild as HTMLElement;
    expect(avatar).toHaveClass('bg-primary/10', 'text-primary', 'h-10', 'w-10');
  });

  it('size prop이 올바르게 적용된다', () => {
    const { container } = render(<Avatar size="sm">AB</Avatar>);
    const avatar = container.firstChild as HTMLElement;
    expect(avatar).toHaveClass('h-8', 'w-8', 'text-sm');
  });

  it('variant prop이 올바르게 적용된다', () => {
    const { container } = render(<Avatar variant="success">AB</Avatar>);
    const avatar = container.firstChild as HTMLElement;
    expect(avatar).toHaveClass('bg-success/10', 'text-success');
  });

  it('이미지를 src prop으로 렌더링한다', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="Test Avatar" />);
    const img = screen.getByRole('img', { name: 'Test Avatar' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('src가 있을 때 alt가 없으면 기본값을 사용한다', () => {
    render(<Avatar src="https://example.com/avatar.jpg" />);
    const img = screen.getByRole('img', { name: 'Avatar' });
    expect(img).toBeInTheDocument();
  });

  it('커스텀 className이 적용된다', () => {
    const { container } = render(<Avatar className="custom-class">AB</Avatar>);
    const avatar = container.firstChild as HTMLElement;
    expect(avatar).toHaveClass('custom-class');
  });

  it('모든 size variant가 올바르게 렌더링된다', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;
    sizes.forEach((size) => {
      const { container } = render(<Avatar size={size}>A</Avatar>);
      const avatar = container.firstChild as HTMLElement;
      expect(avatar).toBeInTheDocument();
    });
  });

  it('모든 variant가 올바르게 렌더링된다', () => {
    const variants = ['default', 'primary', 'secondary', 'success', 'warning', 'error'] as const;
    variants.forEach((variant) => {
      const { container } = render(<Avatar variant={variant}>A</Avatar>);
      const avatar = container.firstChild as HTMLElement;
      expect(avatar).toBeInTheDocument();
    });
  });
});
