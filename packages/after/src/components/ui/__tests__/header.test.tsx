import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/ui/header';

describe('Header', () => {
  it('헤더가 렌더링된다', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('회사 이름이 표시된다', () => {
    render(<Header />);
    expect(screen.getByText('Hanghae Company')).toBeInTheDocument();
  });

  it('프로젝트 설명이 표시된다', () => {
    render(<Header />);
    expect(screen.getByText('Design System Migration Project')).toBeInTheDocument();
  });

  it('로고 이니셜이 표시된다', () => {
    render(<Header />);
    expect(screen.getByText('L')).toBeInTheDocument();
  });

  it('사용자 이름이 표시된다', () => {
    render(<Header />);
    expect(screen.getByText('Demo User')).toBeInTheDocument();
  });

  it('사용자 이메일이 표시된다', () => {
    render(<Header />);
    expect(screen.getByText('demo@example.com')).toBeInTheDocument();
  });

  it('사용자 아바타 이니셜이 표시된다', () => {
    render(<Header />);
    expect(screen.getByText('DU')).toBeInTheDocument();
  });
});
