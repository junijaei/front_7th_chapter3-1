import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormTextarea } from '@/components/ui/Textarea';

describe('FormTextarea', () => {
  it('기본 텍스트에어리어가 렌더링된다', () => {
    render(<FormTextarea name="test" value="" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('라벨이 표시된다', () => {
    render(<FormTextarea name="test" value="" onChange={() => {}} label="테스트 라벨" />);
    expect(screen.getByText('테스트 라벨')).toBeInTheDocument();
  });

  it('required일 때 별표가 표시된다', () => {
    render(<FormTextarea name="test" value="" onChange={() => {}} label="필수 필드" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('값 변경 시 onChange가 호출된다', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<FormTextarea name="test" value="" onChange={handleChange} />);

    await user.type(screen.getByRole('textbox'), 'a');
    expect(handleChange).toHaveBeenCalledWith('a');
  });

  it('placeholder가 표시된다', () => {
    render(
      <FormTextarea name="test" value="" onChange={() => {}} placeholder="내용을 입력해주세요" />
    );
    expect(screen.getByPlaceholderText('내용을 입력해주세요')).toBeInTheDocument();
  });

  it('disabled 상태가 적용된다', () => {
    render(<FormTextarea name="test" value="" onChange={() => {}} disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('error 메시지가 표시된다', () => {
    render(<FormTextarea name="test" value="" onChange={() => {}} error="에러가 발생했습니다" />);
    expect(screen.getByText('에러가 발생했습니다')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('border-destructive');
  });

  it('helpText가 표시된다', () => {
    render(<FormTextarea name="test" value="" onChange={() => {}} helpText="도움말 텍스트" />);
    expect(screen.getByText('도움말 텍스트')).toBeInTheDocument();
  });

  it('error가 있을 때 helpText는 표시되지 않는다', () => {
    render(
      <FormTextarea name="test" value="" onChange={() => {}} error="에러" helpText="도움말" />
    );
    expect(screen.getByText('에러')).toBeInTheDocument();
    expect(screen.queryByText('도움말')).not.toBeInTheDocument();
  });

  it('rows 속성이 올바르게 설정된다', () => {
    render(<FormTextarea name="test" value="" onChange={() => {}} rows={6} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '6');
  });

  it('기본 rows는 4이다', () => {
    render(<FormTextarea name="test" value="" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '4');
  });

  it('name 속성이 올바르게 설정된다', () => {
    render(<FormTextarea name="test-textarea" value="" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'test-textarea');
  });

  it('required 속성이 올바르게 설정된다', () => {
    render(<FormTextarea name="test" value="" onChange={() => {}} required />);
    expect(screen.getByRole('textbox')).toBeRequired();
  });

  it('value가 올바르게 표시된다', () => {
    render(<FormTextarea name="test" value="테스트 내용" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveValue('테스트 내용');
  });
});
