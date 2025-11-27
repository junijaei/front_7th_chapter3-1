import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/layout/header';

describe('Header', () => {
  it('기본 헤더가 렌더링된다', () => {
    const { container } = render(
      <Header>
        <Header.Logo logo={{ text: 'L' }} />
        <Header.User
          userInfo={{ name: 'Test User', email: 'test@example.com' }}
          avatar={{ children: 'TU' }}
        />
      </Header>
    );
    expect(container.querySelector('header')).toBeInTheDocument();
  });

  it('Logo 컴포넌트가 렌더링된다', () => {
    render(
      <Header>
        <Header.Logo
          logo={{
            text: 'L',
            companyName: 'Test Company',
            projectName: 'Test Project',
          }}
        />
      </Header>
    );
    expect(screen.getByText('L')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('User 컴포넌트가 렌더링된다', () => {
    render(
      <Header>
        <Header.User
          userInfo={{ name: 'John Doe', email: 'john@example.com' }}
          avatar={{ children: 'JD' }}
        />
      </Header>
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('size prop이 하위 컴포넌트에 전달된다', () => {
    const { container } = render(
      <Header size="sm">
        <Header.Logo logo={{ text: 'L' }} />
        <Header.User
          userInfo={{ name: 'Test User', email: 'test@example.com' }}
          avatar={{ children: 'TU' }}
        />
      </Header>
    );
    const header = container.querySelector('header');
    expect(header).toHaveClass('h-12');
  });

  it('maxWidth prop이 올바르게 적용된다', () => {
    const { container } = render(
      <Header maxWidth="lg">
        <Header.Logo logo={{ text: 'L' }} />
      </Header>
    );
    expect(container.querySelector('.max-w-5xl')).toBeInTheDocument();
  });

  it('커스텀 className이 적용된다', () => {
    const { container } = render(
      <Header className="custom-header">
        <Header.Logo logo={{ text: 'L' }} />
      </Header>
    );
    const header = container.querySelector('header');
    expect(header).toHaveClass('custom-header');
  });

  it('Logo와 User를 모두 포함할 수 있다', () => {
    render(
      <Header>
        <Header.Logo
          logo={{
            text: 'L',
            companyName: 'Test Company',
          }}
        />
        <Header.User
          userInfo={{ name: 'Test User', email: 'test@example.com' }}
          avatar={{ children: 'TU' }}
        />
      </Header>
    );
    expect(screen.getByText('L')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('TU')).toBeInTheDocument();
  });

  it('개별 컴포넌트의 size를 오버라이드할 수 있다', () => {
    render(
      <Header size="md">
        <Header.Logo logo={{ text: 'L', size: 'lg' }} />
        <Header.User
          userInfo={{ name: 'Test User', email: 'test@example.com', size: 'sm' }}
          avatar={{ children: 'TU', size: 'lg' }}
        />
      </Header>
    );
    expect(screen.getByText('L')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('Avatar에 src prop을 전달할 수 있다', () => {
    render(
      <Header>
        <Header.User
          userInfo={{ name: 'Test User', email: 'test@example.com' }}
          avatar={{ src: 'https://example.com/avatar.jpg', alt: 'User Avatar' }}
        />
      </Header>
    );
    const img = screen.getByRole('img', { name: 'User Avatar' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('모든 size variant가 올바르게 렌더링된다', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { container } = render(
        <Header size={size}>
          <Header.Logo logo={{ text: 'L' }} />
        </Header>
      );
      expect(container.querySelector('header')).toBeInTheDocument();
    });
  });

  it('Header compound 컴포넌트가 Header 외부에서 사용될 때 에러를 던진다', () => {
    // 콘솔 에러를 숨기기 위한 설정
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<Header.Logo logo={{ text: 'L' }} />);
    }).toThrow('Header compound components must be used within Header');

    expect(() => {
      render(
        <Header.User
          userInfo={{ name: 'Test', email: 'test@example.com' }}
          avatar={{ children: 'T' }}
        />
      );
    }).toThrow('Header compound components must be used within Header');

    consoleSpy.mockRestore();
  });

  it('기본값으로 헤더가 렌더링된다 (하위 호환성)', () => {
    render(
      <Header>
        <Header.Logo
          logo={{
            text: 'L',
            companyName: 'Hanghae Company',
            projectName: 'Design System Migration Project',
          }}
        />
        <Header.User
          userInfo={{ name: 'Demo User', email: 'demo@example.com' }}
          avatar={{ children: 'DU' }}
        />
      </Header>
    );

    expect(screen.getByText('Hanghae Company')).toBeInTheDocument();
    expect(screen.getByText('Design System Migration Project')).toBeInTheDocument();
    expect(screen.getByText('L')).toBeInTheDocument();
    expect(screen.getByText('Demo User')).toBeInTheDocument();
    expect(screen.getByText('demo@example.com')).toBeInTheDocument();
    expect(screen.getByText('DU')).toBeInTheDocument();
  });
});
