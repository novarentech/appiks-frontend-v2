"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import * as React from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronUp,
  ChevronDown,
  ArrowUpDown,
  X,
} from "lucide-react";
import { cn } from "../../utils/cn";
import { Button } from "./button";
import { NativeSelect, NativeSelectOption } from "./native-select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterColumn {
  id: string;
  title: string;
  options: FilterOption[];
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchable?: boolean;
  searchPlaceholder?: string;
  actionButton?: React.ReactNode;
  filterColumns?: FilterColumn[];
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  className?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchable = false,
  searchPlaceholder = "Cari...",
  actionButton,
  filterColumns = [],
  pageSizeOptions = [5, 10, 20, 50, 100],
  defaultPageSize = 10,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: { sorting, columnFilters, globalFilter },
    initialState: { pagination: { pageSize: defaultPageSize } },
  });

  const isFiltered =
    table.getState().columnFilters.length > 0 || globalFilter !== "";

  // Pagination page numbers list with ellipsis helper
  const currentPage = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  const getPageNumbers = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= pageCount; i++) {
      if (
        i === 1 ||
        i === pageCount ||
        (i >= currentPage + 1 - delta && i <= currentPage + 1 + delta)
      ) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <div className={cn("space-y-4 w-full", className)}>
      {/* Top Toolbar (Search, Filter, Actions) */}
      {(searchable || filterColumns.length > 0 || actionButton) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-1">
          {/* Left Side: Search + Column Dropdowns */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {searchable && (
              <div className="relative w-full sm:w-[260px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  placeholder={searchPlaceholder}
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-3 py-1 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            )}

            {/* Custom Column Filters */}
            {filterColumns.map((filter) => {
              const column = table.getColumn(filter.id);
              if (!column) return null;
              const filterValue = (column.getFilterValue() as string) ?? "";
              return (
                <NativeSelect
                  key={filter.id}
                  size="sm"
                  value={filterValue}
                  onChange={(e) => {
                    column.setFilterValue(e.target.value || undefined);
                  }}
                  className="w-full sm:w-auto min-w-[130px]"
                >
                  <NativeSelectOption value="">
                    Semua {filter.title}
                  </NativeSelectOption>
                  {filter.options.map((opt) => (
                    <NativeSelectOption key={opt.value} value={opt.value}>
                      {opt.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              );
            })}

            {/* Reset Filter Button */}
            {isFiltered && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  table.resetColumnFilters();
                  setGlobalFilter("");
                }}
                className="h-9 px-2 lg:px-3 text-muted-foreground hover:text-foreground shrink-0"
              >
                Reset
                <X className="ml-2 size-4" />
              </Button>
            )}
          </div>

          {/* Right Side: Custom Actions Button */}
          {actionButton && (
            <div className="flex items-center gap-2 w-full sm:w-auto sm:justify-end">
              {actionButton}
            </div>
          )}
        </div>
      )}

      {/* Styled Table Container */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-xs overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  const isSortable = header.column.getCanSort();
                  const sortedState = header.column.getIsSorted();

                  return (
                    <TableHead
                      key={header.id}
                      className="h-11 px-4 text-left align-middle font-medium text-muted-foreground"
                    >
                      {header.isPlaceholder ? null : isSortable ? (
                        <button
                          onClick={header.column.getToggleSortingHandler()}
                          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors group -ml-2 px-2 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {sortedState === "asc" ? (
                            <ChevronUp className="size-3.5 text-foreground font-bold" />
                          ) : sortedState === "desc" ? (
                            <ChevronDown className="size-3.5 text-foreground font-bold" />
                          ) : (
                            <ArrowUpDown className="size-3 text-muted-foreground/30 group-hover:text-muted-foreground/70 transition-colors" />
                          )}
                        </button>
                      ) : (
                        <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1.5">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </span>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b transition-colors hover:bg-muted/30"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3.5 align-middle">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-28 text-center text-muted-foreground"
                >
                  Tidak ada data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Styled Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-1">
        {/* Left Footer: Current Rows Info & Page Size */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto text-sm text-muted-foreground">
          <div>
            Menampilkan{" "}
            <span className="font-medium text-foreground">
              {table.getFilteredRowModel().rows.length > 0
                ? currentPage * table.getState().pagination.pageSize + 1
                : 0}
            </span>{" "}
            -{" "}
            <span className="font-medium text-foreground">
              {Math.min(
                (currentPage + 1) * table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length,
              )}
            </span>{" "}
            dari{" "}
            <span className="font-medium text-foreground">
              {table.getFilteredRowModel().rows.length}
            </span>{" "}
            baris
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs">Baris per halaman:</span>
            <NativeSelect
              size="sm"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="h-8"
            >
              {pageSizeOptions.map((size) => (
                <NativeSelectOption key={size} value={size}>
                  {size}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
        </div>

        {/* Right Footer: Interactive Page Buttons */}
        {pageCount > 1 && (
          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-center sm:justify-end">
            {/* First Page */}
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="size-8"
            >
              <ChevronsLeft className="size-4" />
            </Button>
            {/* Previous Page */}
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="size-8"
            >
              <ChevronLeft className="size-4" />
            </Button>

            {/* Page Numbers */}
            {getPageNumbers().map((pageNum, idx) => {
              if (pageNum === "...") {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="size-8 flex items-center justify-center text-sm text-muted-foreground select-none"
                  >
                    ...
                  </span>
                );
              }
              const isActive = currentPage === (pageNum as number) - 1;
              return (
                <Button
                  key={`page-${pageNum}`}
                  variant={isActive ? "default" : "outline"}
                  size="icon-sm"
                  onClick={() => table.setPageIndex((pageNum as number) - 1)}
                  className="size-8"
                >
                  {pageNum}
                </Button>
              );
            })}

            {/* Next Page */}
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="size-8"
            >
              <ChevronRight className="size-4" />
            </Button>
            {/* Last Page */}
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.setPageIndex(pageCount - 1)}
              disabled={!table.getCanNextPage()}
              className="size-8"
            >
              <ChevronsRight className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
