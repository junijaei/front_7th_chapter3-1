import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Logo } from '@/components/ui/Logo';

describe('Logo', () => {
  it('로고 텍스트를 렌더링한다', () => {
    render(<Logo text="L" />);
    expect(screen.getByText('L')).toBeInTheDocument();
  });

  it('회사명을 렌더링한다', () => {
    render(<Logo text="L" companyName="Test Company" />);
    expect(screen.getByText('Test Company')).toBeInTheDocument();
  });

  it('프로젝트명을 렌더링한다', () => {
    render(<Logo text="L" projectName="Test Project" />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('회사명과 프로젝트명을 모두 렌더링한다', () => {
    render(<Logo text="L" companyName="Test Company" projectName="Test Project" />);
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('텍스트만 있을 때 회사명과 프로젝트명이 없다', () => {
    render(<Logo text="L" />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('기본 size와 variant가 적용된다', () => {
    render(<Logo text="L" />);
    const logoIcon = screen.getByText('L');
    expect(logoIcon).toHaveClass('h-10', 'w-10', 'bg-primary');
  });

  it('size prop이 올바르게 적용된다 - sm', () => {
    render(<Logo text="L" size="sm" />);
    const logoIcon = screen.getByText('L');
    expect(logoIcon).toHaveClass('h-8', 'w-8', 'text-base');
  });

  it('size prop이 올바르게 적용된다 - lg', () => {
    render(<Logo text="L" size="lg" />);
    const logoIcon = screen.getByText('L');
    expect(logoIcon).toHaveClass('h-12', 'w-12', 'text-2xl');
  });

  it('variant prop이 올바르게 적용된다', () => {
    render(<Logo text="L" variant="secondary" />);
    const logoIcon = screen.getByText('L');
    expect(logoIcon).toHaveClass('bg-secondary');
  });

  it('커스텀 className이 적용된다', () => {
    const { container } = render(<Logo text="L" className="custom-class" />);
    const logo = container.firstChild as HTMLElement;
    expect(logo).toHaveClass('custom-class');
  });

  it('회사명이 heading 요소로 렌더링된다', () => {
    render(<Logo text="L" companyName="Test Company" />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Test Company');
  });

  it('모든 size variant가 올바르게 렌더링된다', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { container } = render(<Logo text="L" size={size} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('모든 variant가 올바르게 렌더링된다', () => {
    const variants = ['primary', 'secondary', 'accent'] as const;
    variants.forEach((variant) => {
      const { container } = render(<Logo text="L" variant={variant} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('size에 따라 회사명과 프로젝트명의 크기가 변경된다', () => {
    render(<Logo text="L" companyName="Test Company" projectName="Test Project" size="lg" />);
    const companyName = screen.getByText('Test Company');
    const projectName = screen.getByText('Test Project');
    expect(companyName).toHaveClass('text-xl');
    expect(projectName).toHaveClass('text-xs');
  });
});
