import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { usePagination } from '@/hooks/usePagination';

describe('usePagination', () => {
  const sampleData = Array.from({ length: 25 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));

  it('초기 상태가 올바르게 설정된다', () => {
    const { result } = renderHook(() => usePagination(sampleData));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.pageSize).toBe(10);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.paginatedData).toHaveLength(10);
  });

  it('초기 페이지를 설정할 수 있다', () => {
    const { result } = renderHook(() => usePagination(sampleData, { initialPage: 2 }));

    expect(result.current.currentPage).toBe(2);
  });

  it('페이지 크기를 설정할 수 있다', () => {
    const { result } = renderHook(() => usePagination(sampleData, { pageSize: 5 }));

    expect(result.current.pageSize).toBe(5);
    expect(result.current.totalPages).toBe(5);
    expect(result.current.paginatedData).toHaveLength(5);
  });

  it('첫 페이지의 데이터가 올바르게 반환된다', () => {
    const { result } = renderHook(() => usePagination(sampleData, { pageSize: 10 }));

    expect(result.current.paginatedData[0]).toEqual({ id: 1, name: 'Item 1' });
    expect(result.current.paginatedData[9]).toEqual({ id: 10, name: 'Item 10' });
  });

  it('goToPage로 특정 페이지로 이동할 수 있다', () => {
    const { result } = renderHook(() => usePagination(sampleData, { pageSize: 10 }));

    act(() => {
      result.current.goToPage(2);
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.paginatedData[0]).toEqual({ id: 11, name: 'Item 11' });
  });

  it('nextPage로 다음 페이지로 이동할 수 있다', () => {
    const { result } = renderHook(() => usePagination(sampleData, { pageSize: 10 }));

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(2);
  });

  it('previousPage로 이전 페이지로 이동할 수 있다', () => {
    const { result } = renderHook(() =>
      usePagination(sampleData, { pageSize: 10, initialPage: 2 })
    );

    act(() => {
      result.current.previousPage();
    });

    expect(result.current.currentPage).toBe(1);
  });

  it('첫 페이지에서 previousPage를 호출해도 1페이지를 유지한다', () => {
    const { result } = renderHook(() => usePagination(sampleData, { pageSize: 10 }));

    act(() => {
      result.current.previousPage();
    });

    expect(result.current.currentPage).toBe(1);
  });

  it('마지막 페이지에서 nextPage를 호출해도 마지막 페이지를 유지한다', () => {
    const { result } = renderHook(() =>
      usePagination(sampleData, { pageSize: 10, initialPage: 3 })
    );

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(3);
  });

  it('범위를 벗어난 페이지 번호는 자동으로 조정된다', () => {
    const { result } = renderHook(() => usePagination(sampleData, { pageSize: 10 }));

    act(() => {
      result.current.goToPage(10);
    });

    expect(result.current.currentPage).toBe(3); // 최대 3페이지

    act(() => {
      result.current.goToPage(0);
    });

    expect(result.current.currentPage).toBe(1); // 최소 1페이지
  });

  it('setPageSize로 페이지 크기를 변경할 수 있다', () => {
    const { result } = renderHook(() => usePagination(sampleData, { pageSize: 10 }));

    act(() => {
      result.current.setPageSize(5);
    });

    expect(result.current.pageSize).toBe(5);
    expect(result.current.totalPages).toBe(5);
    expect(result.current.currentPage).toBe(1); // 첫 페이지로 리셋
  });

  it('마지막 페이지의 데이터 개수가 올바르다', () => {
    const { result } = renderHook(() => usePagination(sampleData, { pageSize: 10 }));

    act(() => {
      result.current.goToPage(3);
    });

    expect(result.current.paginatedData).toHaveLength(5); // 25개 중 마지막 5개
  });

  it('데이터가 없을 때 올바르게 동작한다', () => {
    const { result } = renderHook(() => usePagination([]));

    expect(result.current.totalPages).toBe(0);
    expect(result.current.paginatedData).toHaveLength(0);
  });

  it('데이터가 변경되면 totalPages가 업데이트된다', () => {
    const { result, rerender } = renderHook(({ data }) => usePagination(data, { pageSize: 10 }), {
      initialProps: { data: sampleData },
    });

    expect(result.current.totalPages).toBe(3);

    const newData = Array.from({ length: 50 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));
    rerender({ data: newData });

    expect(result.current.totalPages).toBe(5);
  });
});
