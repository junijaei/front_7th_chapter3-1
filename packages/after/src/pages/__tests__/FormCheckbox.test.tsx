import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormCheckbox } from '@/components/molecules/FormCheckbox';

describe('FormCheckbox', () => {
  it('기본 체크박스가 렌더링된다', () => {
    render(
      <FormCheckbox
        name="test"
        checked={false}
        onChange={() => {}}
        label="테스트 체크박스"
      />
    );
    expect(screen.getByText('테스트 체크박스')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('checked 상태가 올바르게 표시된다', () => {
    const { rerender } = render(
      <FormCheckbox
        name="test"
        checked={false}
        onChange={() => {}}
        label="체크박스"
      />
    );
    expect(screen.getByRole('checkbox')).not.toBeChecked();

    rerender(
      <FormCheckbox
        name="test"
        checked={true}
        onChange={() => {}}
        label="체크박스"
      />
    );
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('클릭 시 onChange가 호출된다', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <FormCheckbox
        name="test"
        checked={false}
        onChange={handleChange}
        label="체크박스"
      />
    );

    await user.click(screen.getByText('체크박스'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('체크된 상태에서 클릭하면 false로 호출된다', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <FormCheckbox
        name="test"
        checked={true}
        onChange={handleChange}
        label="체크박스"
      />
    );

    await user.click(screen.getByText('체크박스'));
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it('disabled 상태에서는 클릭이 동작하지 않는다', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <FormCheckbox
        name="test"
        checked={false}
        onChange={handleChange}
        label="체크박스"
        disabled
      />
    );

    await user.click(screen.getByText('체크박스'));
    expect(handleChange).not.toHaveBeenCalled();
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('error 메시지가 표시된다', () => {
    render(
      <FormCheckbox
        name="test"
        checked={false}
        onChange={() => {}}
        label="체크박스"
        error="에러가 발생했습니다"
      />
    );
    expect(screen.getByText('에러가 발생했습니다')).toBeInTheDocument();
  });

  it('hint가 표시된다', () => {
    render(
      <FormCheckbox
        name="test"
        checked={false}
        onChange={() => {}}
        label="체크박스"
        hint="힌트 텍스트"
      />
    );
    expect(screen.getByText('힌트 텍스트')).toBeInTheDocument();
  });

  it('error가 있을 때 hint는 표시되지 않는다', () => {
    render(
      <FormCheckbox
        name="test"
        checked={false}
        onChange={() => {}}
        label="체크박스"
        error="에러"
        hint="힌트"
      />
    );
    expect(screen.getByText('에러')).toBeInTheDocument();
    expect(screen.queryByText('힌트')).not.toBeInTheDocument();
  });

  it('checked일 때 체크마크가 visible 클래스를 가진다', () => {
    const { container, rerender } = render(
      <FormCheckbox
        name="test"
        checked={false}
        onChange={() => {}}
        label="체크박스"
      />
    );

    const checkmark = container.querySelector('.checkbox-checkmark');
    expect(checkmark).not.toHaveClass('visible');

    rerender(
      <FormCheckbox
        name="test"
        checked={true}
        onChange={() => {}}
        label="체크박스"
      />
    );

    const checkedCheckmark = container.querySelector('.checkbox-checkmark');
    expect(checkedCheckmark).toHaveClass('visible');
  });

  it('disabled일 때 적절한 클래스가 적용된다', () => {
    const { container } = render(
      <FormCheckbox
        name="test"
        checked={false}
        onChange={() => {}}
        label="체크박스"
        disabled
      />
    );

    expect(container.querySelector('.checkbox-wrapper')).toHaveClass('disabled');
    expect(container.querySelector('.checkbox-label')).toHaveClass('disabled');
  });

  it('name 속성이 올바르게 설정된다', () => {
    render(
      <FormCheckbox
        name="test-checkbox"
        checked={false}
        onChange={() => {}}
        label="체크박스"
      />
    );
    expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'test-checkbox');
  });
});
