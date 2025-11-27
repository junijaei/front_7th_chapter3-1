import type { ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Pagination } from '@/components/ui/Pagination';
import { usePagination } from '@/hooks/usePagination';

export interface ColumnDef<T> {
  /** 컬럼의 고유 키 */
  key: string;
  /** 테이블 헤더에 표시될 텍스트 */
  header: string;
  /** 컬럼의 너비 (CSS 값) */
  width?: string;
  /** 셀 렌더링 함수 (제공하지 않으면 기본 텍스트 렌더링) */
  render?: (item: T) => ReactNode;
  /** 셀 정렬 (left, center, right) */
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> {
  /** 테이블에 표시할 데이터 배열 */
  data: T[];
  /** 컬럼 정의 배열 */
  columns: ColumnDef<T>[];
  /** 페이지당 항목 수 */
  pageSize?: number;
  /** 페이지네이션 표시 여부 */
  showPagination?: boolean;
  /** 첫/마지막 페이지 버튼 표시 여부 */
  showFirstLast?: boolean;
  /** 페이지네이션에 표시할 최대 페이지 수 */
  maxVisiblePages?: number;
  /** 데이터가 없을 때 표시할 메시지 */
  emptyMessage?: string;
  /** 행 클릭 핸들러 */
  onRowClick?: (item: T) => void;
  /** 고유 키를 가져오는 함수 (기본: item.id) */
  getRowKey?: (item: T) => string | number;
}

export const DataTable = <T extends Record<string, unknown>>({
  data,
  columns,
  pageSize = 10,
  showPagination = true,
  showFirstLast = false,
  maxVisiblePages = 5,
  emptyMessage = '데이터가 없습니다.',
  onRowClick,
  getRowKey = (item) => (item.id as string | number) ?? Math.random(),
}: DataTableProps<T>) => {
  const pagination = usePagination(data, { pageSize });

  const displayData = showPagination ? pagination.paginatedData : data;

  const getAlignClass = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-auto border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={column.width ? '' : undefined}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              displayData.map((item) => (
                <TableRow
                  key={getRowKey(item)}
                  onClick={() => onRowClick?.(item)}
                  className={onRowClick ? 'cursor-pointer' : undefined}
                >
                  {columns.map((column) => (
                    <TableCell key={column.key} className={getAlignClass(column.align)}>
                      {column.render
                        ? column.render(item)
                        : ((item[column.key] as ReactNode) ?? '-')}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {showPagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.goToPage}
          showFirstLast={showFirstLast}
          maxVisiblePages={maxVisiblePages}
        />
      )}
    </div>
  );
};
