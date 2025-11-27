import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormSelect } from '@/components/ui/Select';

const mockOptions = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
];

describe('FormSelect', () => {
  it('기본 셀렉트가 렌더링된다', () => {
    render(<FormSelect name="test" value="" onChange={() => {}} options={mockOptions} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('옵션들이 렌더링된다', () => {
    render(<FormSelect name="test" value="" onChange={() => {}} options={mockOptions} />);

    expect(screen.getByText('옵션 1')).toBeInTheDocument();
    expect(screen.getByText('옵션 2')).toBeInTheDocument();
    expect(screen.getByText('옵션 3')).toBeInTheDocument();
  });

  it('라벨이 표시된다', () => {
    render(
      <FormSelect
        name="test"
        value=""
        onChange={() => {}}
        options={mockOptions}
        label="테스트 라벨"
      />
    );
    expect(screen.getByText('테스트 라벨')).toBeInTheDocument();
  });

  it('required일 때 별표가 표시된다', () => {
    render(
      <FormSelect
        name="test"
        value=""
        onChange={() => {}}
        options={mockOptions}
        label="필수 필드"
        required
      />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('placeholder가 표시된다', () => {
    render(
      <FormSelect
        name="test"
        value=""
        onChange={() => {}}
        options={mockOptions}
        placeholder="선택해주세요"
      />
    );
    expect(screen.getByText('선택해주세요')).toBeInTheDocument();
  });

  it('값 변경 시 onChange가 호출된다', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<FormSelect name="test" value="" onChange={handleChange} options={mockOptions} />);

    await user.selectOptions(screen.getByRole('combobox'), 'option1');
    expect(handleChange).toHaveBeenCalledWith('option1');
  });

  it('disabled 상태가 적용된다', () => {
    render(<FormSelect name="test" value="" onChange={() => {}} options={mockOptions} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('error 메시지가 표시된다', () => {
    render(
      <FormSelect
        name="test"
        value=""
        onChange={() => {}}
        options={mockOptions}
        error="에러가 발생했습니다"
      />
    );
    expect(screen.getByText('에러가 발생했습니다')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveClass('border-destructive');
  });

  it('helpText가 표시된다', () => {
    render(
      <FormSelect
        name="test"
        value=""
        onChange={() => {}}
        options={mockOptions}
        helpText="도움말 텍스트"
      />
    );
    expect(screen.getByText('도움말 텍스트')).toBeInTheDocument();
  });

  it('error가 있을 때 helpText는 표시되지 않는다', () => {
    render(
      <FormSelect
        name="test"
        value=""
        onChange={() => {}}
        options={mockOptions}
        error="에러"
        helpText="도움말"
      />
    );
    expect(screen.getByText('에러')).toBeInTheDocument();
    expect(screen.queryByText('도움말')).not.toBeInTheDocument();
  });

  it('선택된 값이 올바르게 표시된다', () => {
    render(<FormSelect name="test" value="option2" onChange={() => {}} options={mockOptions} />);
    expect(screen.getByRole('combobox')).toHaveValue('option2');
  });

  it('name 속성이 올바르게 설정된다', () => {
    render(<FormSelect name="test-select" value="" onChange={() => {}} options={mockOptions} />);
    expect(screen.getByRole('combobox')).toHaveAttribute('name', 'test-select');
  });

  it('required 속성이 올바르게 설정된다', () => {
    render(<FormSelect name="test" value="" onChange={() => {}} options={mockOptions} required />);
    expect(screen.getByRole('combobox')).toBeRequired();
  });
});
