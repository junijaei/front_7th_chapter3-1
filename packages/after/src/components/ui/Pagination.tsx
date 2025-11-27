import { Button } from '@/components/ui/Button';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = false,
  maxVisiblePages = 5,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      // 전체 페이지가 maxVisiblePages보다 작으면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 첫 페이지는 항상 표시
      pages.push(1);

      // 현재 페이지 기준 범위 계산
      const startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3);

      // 시작 생략 부호
      if (startPage > 2) {
        pages.push('...');
      }

      // 중간 페이지들
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // 끝 생략 부호
      if (endPage < totalPages - 1) {
        pages.push('...');
      }

      // 마지막 페이지는 항상 표시
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-1">
      {showFirstLast && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          처음
        </Button>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </Button>

      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-muted-foreground">
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <Button
            key={pageNumber}
            variant={isActive ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        );
      })}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </Button>

      {showFirstLast && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          마지막
        </Button>
      )}
    </div>
  );
};
