import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '@/components/ui/Checkbox';

describe('Checkbox', () => {
  it('기본 체크박스가 렌더링된다', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('checked 상태가 올바르게 표시된다', () => {
    const { rerender } = render(<Checkbox checked={false} />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-state', 'unchecked');

    rerender(<Checkbox checked={true} />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-state', 'checked');
  });

  it('클릭 시 onCheckedChange가 호출된다', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox onCheckedChange={handleChange} />);
    await user.click(screen.getByRole('checkbox'));

    expect(handleChange).toHaveBeenCalled();
  });

  it('disabled 상태에서는 클릭이 동작하지 않는다', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox onCheckedChange={handleChange} disabled />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('data-disabled', '');

    await user.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('추가 className이 적용된다', () => {
    render(<Checkbox className="custom-class" />);
    expect(screen.getByRole('checkbox')).toHaveClass('custom-class');
  });

  it('HTML 속성들이 전달된다', () => {
    render(<Checkbox data-testid="test-checkbox" />);
    expect(screen.getByTestId('test-checkbox')).toBeInTheDocument();
  });
});
