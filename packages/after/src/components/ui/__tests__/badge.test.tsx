import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/badge';

describe('Badge', () => {
  it('기본 뱃지가 렌더링된다', () => {
    render(<Badge>테스트</Badge>);
    expect(screen.getByText('테스트')).toBeInTheDocument();
  });

  it('type에 따라 올바른 클래스가 적용된다', () => {
    const { rerender } = render(<Badge type="primary">뱃지</Badge>);
    expect(screen.getByText('뱃지')).toHaveClass('badge-primary');

    rerender(<Badge type="secondary">뱃지</Badge>);
    expect(screen.getByText('뱃지')).toHaveClass('badge-secondary');

    rerender(<Badge type="success">뱃지</Badge>);
    expect(screen.getByText('뱃지')).toHaveClass('badge-success');

    rerender(<Badge type="danger">뱃지</Badge>);
    expect(screen.getByText('뱃지')).toHaveClass('badge-danger');

    rerender(<Badge type="warning">뱃지</Badge>);
    expect(screen.getByText('뱃지')).toHaveClass('badge-warning');

    rerender(<Badge type="info">뱃지</Badge>);
    expect(screen.getByText('뱃지')).toHaveClass('badge-info');
  });

  it('size에 따라 올바른 클래스가 적용된다', () => {
    const { rerender } = render(<Badge size="small">뱃지</Badge>);
    expect(screen.getByText('뱃지')).toHaveClass('badge-small');

    rerender(<Badge size="medium">뱃지</Badge>);
    expect(screen.getByText('뱃지')).toHaveClass('badge-medium');

    rerender(<Badge size="large">뱃지</Badge>);
    expect(screen.getByText('뱃지')).toHaveClass('badge-large');
  });

  it('pill이 true일 때 badge-pill 클래스가 적용된다', () => {
    render(<Badge pill>뱃지</Badge>);
    expect(screen.getByText('뱃지')).toHaveClass('badge-pill');
  });

  describe('status 도메인 뱃지', () => {
    it('published 상태는 success 타입과 "게시됨" 텍스트를 표시한다', () => {
      render(<Badge status="published" />);
      const badge = screen.getByText('게시됨');
      expect(badge).toHaveClass('badge-success');
    });

    it('draft 상태는 warning 타입과 "임시저장" 텍스트를 표시한다', () => {
      render(<Badge status="draft" />);
      const badge = screen.getByText('임시저장');
      expect(badge).toHaveClass('badge-warning');
    });

    it('archived 상태는 secondary 타입과 "보관됨" 텍스트를 표시한다', () => {
      render(<Badge status="archived" />);
      const badge = screen.getByText('보관됨');
      expect(badge).toHaveClass('badge-secondary');
    });

    it('pending 상태는 info 타입과 "대기중" 텍스트를 표시한다', () => {
      render(<Badge status="pending" />);
      const badge = screen.getByText('대기중');
      expect(badge).toHaveClass('badge-info');
    });

    it('rejected 상태는 danger 타입과 "거부됨" 텍스트를 표시한다', () => {
      render(<Badge status="rejected" />);
      const badge = screen.getByText('거부됨');
      expect(badge).toHaveClass('badge-danger');
    });
  });

  describe('userRole 도메인 뱃지', () => {
    it('admin 역할은 danger 타입과 "관리자" 텍스트를 표시한다', () => {
      render(<Badge userRole="admin" />);
      const badge = screen.getByText('관리자');
      expect(badge).toHaveClass('badge-danger');
    });

    it('moderator 역할은 warning 타입과 "운영자" 텍스트를 표시한다', () => {
      render(<Badge userRole="moderator" />);
      const badge = screen.getByText('운영자');
      expect(badge).toHaveClass('badge-warning');
    });

    it('user 역할은 primary 타입과 "사용자" 텍스트를 표시한다', () => {
      render(<Badge userRole="user" />);
      const badge = screen.getByText('사용자');
      expect(badge).toHaveClass('badge-primary');
    });

    it('guest 역할은 secondary 타입과 "게스트" 텍스트를 표시한다', () => {
      render(<Badge userRole="guest" />);
      const badge = screen.getByText('게스트');
      expect(badge).toHaveClass('badge-secondary');
    });
  });

  describe('priority 도메인 뱃지', () => {
    it('high 우선순위는 danger 타입과 "높음" 텍스트를 표시한다', () => {
      render(<Badge priority="high" />);
      const badge = screen.getByText('높음');
      expect(badge).toHaveClass('badge-danger');
    });

    it('medium 우선순위는 warning 타입과 "보통" 텍스트를 표시한다', () => {
      render(<Badge priority="medium" />);
      const badge = screen.getByText('보통');
      expect(badge).toHaveClass('badge-warning');
    });

    it('low 우선순위는 info 타입과 "낮음" 텍스트를 표시한다', () => {
      render(<Badge priority="low" />);
      const badge = screen.getByText('낮음');
      expect(badge).toHaveClass('badge-info');
    });
  });

  describe('paymentStatus 도메인 뱃지', () => {
    it('paid 상태는 success 타입과 "결제완료" 텍스트를 표시한다', () => {
      render(<Badge paymentStatus="paid" />);
      const badge = screen.getByText('결제완료');
      expect(badge).toHaveClass('badge-success');
    });

    it('pending 상태는 warning 타입과 "결제대기" 텍스트를 표시한다', () => {
      render(<Badge paymentStatus="pending" />);
      const badge = screen.getByText('결제대기');
      expect(badge).toHaveClass('badge-warning');
    });

    it('failed 상태는 danger 타입과 "결제실패" 텍스트를 표시한다', () => {
      render(<Badge paymentStatus="failed" />);
      const badge = screen.getByText('결제실패');
      expect(badge).toHaveClass('badge-danger');
    });

    it('refunded 상태는 secondary 타입과 "환불됨" 텍스트를 표시한다', () => {
      render(<Badge paymentStatus="refunded" />);
      const badge = screen.getByText('환불됨');
      expect(badge).toHaveClass('badge-secondary');
    });
  });

  it('children이 있으면 도메인 기본 텍스트 대신 children을 표시한다', () => {
    render(<Badge status="published">커스텀 텍스트</Badge>);
    expect(screen.getByText('커스텀 텍스트')).toBeInTheDocument();
    expect(screen.queryByText('게시됨')).not.toBeInTheDocument();
  });
});
