import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAlert } from '../useAlert';
import { toast } from 'sonner';

vi.mock('sonner', () => ({
  toast: vi.fn((title, options) => ({ title, options })),
}));

describe('useAlert', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('showAlert를 호출할 수 있다', () => {
    const { result } = renderHook(() => useAlert());
    expect(result.current.showAlert).toBeDefined();
  });

  it('success 메서드로 성공 토스트를 표시한다', () => {
    const { result } = renderHook(() => useAlert());
    const mockToast = toast as any;
    mockToast.success = vi.fn();

    result.current.success('작업이 완료되었습니다');

    expect(mockToast.success).toHaveBeenCalledWith('성공', {
      description: '작업이 완료되었습니다',
      duration: undefined,
      action: undefined,
    });
  });

  it('error 메서드로 에러 토스트를 표시한다', () => {
    const { result } = renderHook(() => useAlert());
    const mockToast = toast as any;
    mockToast.error = vi.fn();

    result.current.error('오류가 발생했습니다');

    expect(mockToast.error).toHaveBeenCalledWith('오류', {
      description: '오류가 발생했습니다',
      duration: undefined,
      action: undefined,
    });
  });

  it('warning 메서드로 경고 토스트를 표시한다', () => {
    const { result } = renderHook(() => useAlert());
    const mockToast = toast as any;
    mockToast.warning = vi.fn();

    result.current.warning('주의가 필요합니다');

    expect(mockToast.warning).toHaveBeenCalledWith('경고', {
      description: '주의가 필요합니다',
      duration: undefined,
      action: undefined,
    });
  });

  it('info 메서드로 정보 토스트를 표시한다', () => {
    const { result } = renderHook(() => useAlert());
    const mockToast = toast as any;
    mockToast.info = vi.fn();

    result.current.info('새로운 정보가 있습니다');

    expect(mockToast.info).toHaveBeenCalledWith('알림', {
      description: '새로운 정보가 있습니다',
      duration: undefined,
      action: undefined,
    });
  });

  it('커스텀 title을 지정할 수 있다', () => {
    const { result } = renderHook(() => useAlert());
    const mockToast = toast as any;
    mockToast.success = vi.fn();

    result.current.success('작업이 완료되었습니다', {
      title: '완료!',
    });

    expect(mockToast.success).toHaveBeenCalledWith('완료!', {
      description: '작업이 완료되었습니다',
      duration: undefined,
      action: undefined,
    });
  });

  it('duration을 지정할 수 있다', () => {
    const { result } = renderHook(() => useAlert());
    const mockToast = toast as any;
    mockToast.success = vi.fn();

    result.current.success('작업이 완료되었습니다', {
      duration: 3000,
    });

    expect(mockToast.success).toHaveBeenCalledWith('성공', {
      description: '작업이 완료되었습니다',
      duration: 3000,
      action: undefined,
    });
  });

  it('action을 지정할 수 있다', () => {
    const { result } = renderHook(() => useAlert());
    const mockToast = toast as any;
    mockToast.success = vi.fn();

    const mockAction = {
      label: '확인',
      onClick: vi.fn(),
    };

    result.current.success('작업이 완료되었습니다', {
      action: mockAction,
    });

    expect(mockToast.success).toHaveBeenCalledWith('성공', {
      description: '작업이 완료되었습니다',
      duration: undefined,
      action: mockAction,
    });
  });

  it('showAlert로 다양한 variant를 표시할 수 있다', () => {
    const { result } = renderHook(() => useAlert());
    const mockToast = toast as any;
    mockToast.success = vi.fn();
    mockToast.error = vi.fn();
    mockToast.warning = vi.fn();
    mockToast.info = vi.fn();

    result.current.showAlert('success', '성공 메시지');
    expect(mockToast.success).toHaveBeenCalled();

    result.current.showAlert('error', '에러 메시지');
    expect(mockToast.error).toHaveBeenCalled();

    result.current.showAlert('warning', '경고 메시지');
    expect(mockToast.warning).toHaveBeenCalled();

    result.current.showAlert('info', '정보 메시지');
    expect(mockToast.info).toHaveBeenCalled();
  });

  it('default variant는 기본 toast를 호출한다', () => {
    const { result } = renderHook(() => useAlert());
    const mockToast = vi.fn();
    vi.mocked(toast).mockImplementation(mockToast);

    result.current.showAlert('default', '기본 메시지');

    expect(mockToast).toHaveBeenCalledWith('알림', {
      description: '기본 메시지',
      duration: undefined,
      action: undefined,
    });
  });
});
