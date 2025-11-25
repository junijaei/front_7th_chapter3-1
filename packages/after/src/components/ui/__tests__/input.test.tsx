import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from '@/components/ui/input';

describe('Input', () => {
  it('기본 입력 필드가 렌더링된다', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('placeholder가 표시된다', () => {
    render(<Input placeholder="입력해주세요" />);
    expect(screen.getByPlaceholderText('입력해주세요')).toBeInTheDocument();
  });

  it('disabled 상태가 적용된다', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('type 속성이 올바르게 설정된다', () => {
    const { rerender } = render(<Input type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

    rerender(<Input type="password" />);
    expect(document.querySelector('input[type="password"]')).toBeInTheDocument();
  });

  it('추가 className이 적용된다', () => {
    render(<Input className="custom-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('HTML 속성들이 전달된다', () => {
    render(<Input data-testid="test-input" name="test-name" />);
    const input = screen.getByTestId('test-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'test-name');
  });
});
