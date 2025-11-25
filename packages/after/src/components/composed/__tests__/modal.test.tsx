import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../modal';

describe('Modal', () => {
  beforeEach(() => {
    document.body.style.overflow = 'unset';
  });

  afterEach(() => {
    document.body.style.overflow = 'unset';
  });

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

  it('닫기 버튼이 표시된다', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="제목">
        내용
      </Modal>
    );
    expect(screen.getByRole('button', { name: '×' })).toBeInTheDocument();
  });

  it('닫기 버튼 클릭 시 onClose가 호출된다', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal isOpen={true} onClose={handleClose} title="제목">
        내용
      </Modal>
    );

    await user.click(screen.getByRole('button', { name: '×' }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('오버레이 클릭 시 onClose가 호출된다', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    const { container } = render(
      <Modal isOpen={true} onClose={handleClose}>
        내용
      </Modal>
    );

    const overlay = container.querySelector('.modal-overlay');
    await user.click(overlay!);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('모달 컨텐츠 클릭 시 onClose가 호출되지 않는다', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    const { container } = render(
      <Modal isOpen={true} onClose={handleClose}>
        내용
      </Modal>
    );

    const content = container.querySelector('.modal-content');
    await user.click(content!);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('size에 따라 올바른 클래스가 적용된다', () => {
    const { container, rerender } = render(
      <Modal isOpen={true} onClose={() => {}} size="small">
        내용
      </Modal>
    );
    expect(container.querySelector('.modal-content')).toHaveClass('modal-small');

    rerender(
      <Modal isOpen={true} onClose={() => {}} size="medium">
        내용
      </Modal>
    );
    expect(container.querySelector('.modal-content')).toHaveClass('modal-medium');

    rerender(
      <Modal isOpen={true} onClose={() => {}} size="large">
        내용
      </Modal>
    );
    expect(container.querySelector('.modal-content')).toHaveClass('modal-large');
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
    const { container } = render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        showFooter={false}
        footerContent={<button>확인</button>}
      >
        내용
      </Modal>
    );
    expect(container.querySelector('.modal-footer')).not.toBeInTheDocument();
  });

  it('footerContent가 없으면 footer가 렌더링되지 않는다', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={() => {}} showFooter>
        내용
      </Modal>
    );
    expect(container.querySelector('.modal-footer')).not.toBeInTheDocument();
  });

  it('모달이 열리면 body overflow가 hidden으로 설정된다', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        내용
      </Modal>
    );
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('모달이 닫히면 body overflow가 unset으로 설정된다', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}}>
        내용
      </Modal>
    );
    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <Modal isOpen={false} onClose={() => {}}>
        내용
      </Modal>
    );
    expect(document.body.style.overflow).toBe('unset');
  });

  it('title이 없으면 modal-header가 렌더링되지 않는다', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={() => {}}>
        내용
      </Modal>
    );
    expect(container.querySelector('.modal-header')).not.toBeInTheDocument();
  });
});
