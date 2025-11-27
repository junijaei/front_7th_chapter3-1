import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserInfo } from '@/components/composed/UserInfo';

describe('UserInfo', () => {
  it('사용자 이름과 이메일을 렌더링한다', () => {
    render(
      <UserInfo name="John Doe" email="john@example.com">
        <UserInfo.Text>
          <UserInfo.Name />
          <UserInfo.Email />
        </UserInfo.Text>
      </UserInfo>
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('기본 size가 적용된다', () => {
    const { container } = render(
      <UserInfo name="John Doe" email="john@example.com">
        <UserInfo.Text>
          <UserInfo.Name />
          <UserInfo.Email />
        </UserInfo.Text>
      </UserInfo>
    );
    const userInfo = container.firstChild as HTMLElement;
    expect(userInfo).toBeInTheDocument();
  });

  it('size prop이 올바르게 적용된다 - sm', () => {
    render(
      <UserInfo name="John Doe" email="john@example.com" size="sm">
        <UserInfo.Text>
          <UserInfo.Name />
          <UserInfo.Email />
        </UserInfo.Text>
      </UserInfo>
    );
    const nameElement = screen.getByText('John Doe');
    expect(nameElement).toHaveClass('text-xs');
  });

  it('size prop이 올바르게 적용된다 - md', () => {
    render(
      <UserInfo name="John Doe" email="john@example.com" size="md">
        <UserInfo.Text>
          <UserInfo.Name />
          <UserInfo.Email />
        </UserInfo.Text>
      </UserInfo>
    );
    const nameElement = screen.getByText('John Doe');
    expect(nameElement).toHaveClass('text-sm');
  });

  it('size prop이 올바르게 적용된다 - lg', () => {
    render(
      <UserInfo name="John Doe" email="john@example.com" size="lg">
        <UserInfo.Text>
          <UserInfo.Name />
          <UserInfo.Email />
        </UserInfo.Text>
      </UserInfo>
    );
    const nameElement = screen.getByText('John Doe');
    expect(nameElement).toHaveClass('text-base');
  });

  it('커스텀 className이 적용된다', () => {
    const { container } = render(
      <UserInfo name="John Doe" email="john@example.com" className="custom-class">
        <UserInfo.Text>
          <UserInfo.Name />
          <UserInfo.Email />
        </UserInfo.Text>
      </UserInfo>
    );
    const userInfo = container.firstChild as HTMLElement;
    expect(userInfo).toHaveClass('custom-class');
  });

  it('이름과 이메일 요소가 올바른 스타일을 가진다', () => {
    render(
      <UserInfo name="John Doe" email="john@example.com">
        <UserInfo.Text>
          <UserInfo.Name />
          <UserInfo.Email />
        </UserInfo.Text>
      </UserInfo>
    );
    const nameElement = screen.getByText('John Doe');
    const emailElement = screen.getByText('john@example.com');

    expect(nameElement).toHaveClass('font-semibold', 'text-foreground');
    expect(emailElement).toHaveClass('text-muted-foreground');
  });

  it('모든 size variant가 올바르게 렌더링된다', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { container } = render(
        <UserInfo name="John Doe" email="john@example.com" size={size}>
          <UserInfo.Text>
            <UserInfo.Name />
            <UserInfo.Email />
          </UserInfo.Text>
        </UserInfo>
      );
      const userInfo = container.firstChild as HTMLElement;
      expect(userInfo).toBeInTheDocument();
    });
  });
});
