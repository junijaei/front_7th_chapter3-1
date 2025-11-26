import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../modal';

describe('Modal', () => {
  it('isOpen이 false일 때 모달이 렌더링되지 않는다', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        모달 내용
      </Modal>
    );
    expect(screen.queryByText('모달 내용')).not.toBeInTheDocument();
  });

  it('isOpen이 true일 때 모달이 렌더링된다', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        모달 내용
      </Modal>
    );
    expect(screen.getByText('모달 내용')).toBeInTheDocument();
  });

  it('title이 표시된다', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="모달 제목">
        내용
      </Modal>
    );
    expect(screen.getByText('모달 제목')).toBeInTheDocument();
  });

  it('description이 표시된다', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} description="모달 설명">
        내용
      </Modal>
    );
    expect(screen.getByText('모달 설명')).toBeInTheDocument();
  });

  it('닫기 버튼이 표시된다', async () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="제목">
        내용
      </Modal>
    );
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('showCloseButton이 false이면 닫기 버튼이 표시되지 않는다', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="제목" showCloseButton={false}>
        내용
      </Modal>
    );
    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  });

  it('닫기 버튼 클릭 시 onClose가 호출된다', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal isOpen={true} onClose={handleClose} title="제목">
        내용
      </Modal>
    );

    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(handleClose).toHaveBeenCalled();
  });

  it('size에 따라 올바른 클래스가 적용된다', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}} size="small" title="제목">
        내용
      </Modal>
    );
    expect(screen.getByText('내용')).toBeInTheDocument();

    rerender(
      <Modal isOpen={true} onClose={() => {}} size="medium" title="제목">
        내용
      </Modal>
    );
    expect(screen.getByText('내용')).toBeInTheDocument();

    rerender(
      <Modal isOpen={true} onClose={() => {}} size="large" title="제목">
        내용
      </Modal>
    );
    expect(screen.getByText('내용')).toBeInTheDocument();
  });

  it('showFooter와 footerContent가 있을 때 footer가 렌더링된다', () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        showFooter
        footerContent={<button>확인</button>}
      >
        내용
      </Modal>
    );
    expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
  });

  it('showFooter가 false이면 footer가 렌더링되지 않는다', () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        showFooter={false}
        footerContent={<button>확인</button>}
      >
        내용
      </Modal>
    );
    expect(screen.queryByRole('button', { name: '확인' })).not.toBeInTheDocument();
  });

  it('footerContent가 없으면 footer가 렌더링되지 않는다', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={() => {}} showFooter>
        내용
      </Modal>
    );
    expect(container.querySelector('[data-slot="dialog-footer"]')).not.toBeInTheDocument();
  });

  it('children이 올바르게 렌더링된다', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>테스트 컨텐츠</div>
        <button>테스트 버튼</button>
      </Modal>
    );
    expect(screen.getByText('테스트 컨텐츠')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '테스트 버튼' })).toBeInTheDocument();
  });
});
