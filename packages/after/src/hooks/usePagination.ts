import { useState, useMemo } from 'react';

export interface UsePaginationOptions {
  initialPage?: number;
  pageSize?: number;
}

export interface UsePaginationResult<T> {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  paginatedData: T[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (size: number) => void;
}

export const usePagination = <T>(
  data: T[],
  options: UsePaginationOptions = {}
): UsePaginationResult<T> => {
  const { initialPage = 1, pageSize: initialPageSize = 10 } = options;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = useMemo(() => {
    return Math.ceil(data.length / pageSize);
  }, [data.length, pageSize]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, pageSize]);

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    goToPage(currentPage + 1);
  };

  const previousPage = () => {
    goToPage(currentPage - 1);
  };

  const handleSetPageSize = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // 페이지 크기 변경 시 첫 페이지로 이동
  };

  // 데이터가 변경되면 현재 페이지가 범위를 벗어날 수 있으므로 조정
  useMemo(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return {
    currentPage,
    pageSize,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    previousPage,
    setPageSize: handleSetPageSize,
  };
};
