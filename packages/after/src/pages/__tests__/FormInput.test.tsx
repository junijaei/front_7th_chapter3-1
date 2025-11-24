import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormInput } from '@/components/molecules/FormInput';

describe('FormInput', () => {
  it('기본 입력 필드가 렌더링된다', () => {
    render(
      <FormInput
        name="test"
        value=""
        onChange={() => {}}
      />
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('라벨이 표시된다', () => {
    render(
      <FormInput
        name="test"
        value=""
        onChange={() => {}}
        label="테스트 라벨"
      />
    );
    expect(screen.getByText('테스트 라벨')).toBeInTheDocument();
  });

  it('required일 때 별표가 표시된다', () => {
    render(
      <FormInput
        name="test"
        value=""
        onChange={() => {}}
        label="필수 필드"
        required
      />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('값 변경 시 onChange가 호출된다', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <FormInput
        name="test"
        value=""
        onChange={handleChange}
      />
    );

    await user.type(screen.getByRole('textbox'), 'a');
    expect(handleChange).toHaveBeenCalledWith('a');
  });

  it('placeholder가 표시된다', () => {
    render(
      <FormInput
        name="test"
        value=""
        onChange={() => {}}
        placeholder="입력해주세요"
      />
    );
    expect(screen.getByPlaceholderText('입력해주세요')).toBeInTheDocument();
  });

  it('disabled 상태가 적용된다', () => {
    render(
      <FormInput
        name="test"
        value=""
        onChange={() => {}}
        disabled
      />
    );
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('error 메시지가 표시된다', () => {
    render(
      <FormInput
        name="test"
        value=""
        onChange={() => {}}
        error="에러가 발생했습니다"
      />
    );
    expect(screen.getByText('에러가 발생했습니다')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('error');
  });

  it('helpText가 표시된다', () => {
    render(
      <FormInput
        name="test"
        value=""
        onChange={() => {}}
        helpText="도움말 텍스트"
      />
    );
    expect(screen.getByText('도움말 텍스트')).toBeInTheDocument();
  });

  it('error가 있을 때 helpText는 표시되지 않는다', () => {
    render(
      <FormInput
        name="test"
        value=""
        onChange={() => {}}
        error="에러"
        helpText="도움말"
      />
    );
    expect(screen.getByText('에러')).toBeInTheDocument();
    expect(screen.queryByText('도움말')).not.toBeInTheDocument();
  });

  it('width에 따라 올바른 클래스가 적용된다', () => {
    const { rerender } = render(
      <FormInput
        name="test"
        value=""
        onChange={() => {}}
        width="small"
      />
    );
    expect(screen.getByRole('textbox')).toHaveClass('input-width-small');

    rerender(
      <FormInput
        name="test"
        value=""
        onChange={() => {}}
        width="medium"
      />
    );
    expect(screen.getByRole('textbox')).toHaveClass('input-width-medium');

    rerender(
      <FormInput
        name="test"
        value=""
        onChange={() => {}}
        width="large"
      />
    );
    expect(screen.getByRole('textbox')).toHaveClass('input-width-large');

    rerender(
      <FormInput
        name="test"
        value=""
        onChange={() => {}}
        width="full"
      />
    );
    expect(screen.getByRole('textbox')).toHaveClass('input-width-full');
  });

  it('type 속성이 올바르게 설정된다', () => {
    const { rerender } = render(
      <FormInput
        name="test"
        value=""
        onChange={() => {}}
        type="email"
      />
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

    rerender(
      <FormInput
        name="password"
        value=""
        onChange={() => {}}
        type="password"
      />
    );
    expect(document.querySelector('input[type="password"]')).toBeInTheDocument();
  });

  describe('fieldType 유효성 검사', () => {
    it('username이 3자 미만이면 에러를 표시한다', async () => {
      const user = userEvent.setup();

      render(
        <FormInput
          name="username"
          value=""
          onChange={() => {}}
          fieldType="username"
        />
      );

      await user.type(screen.getByRole('textbox'), 'ab');
      expect(screen.getByText('사용자명은 3자 이상이어야 합니다')).toBeInTheDocument();
    });

  });
});
