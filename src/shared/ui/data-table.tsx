import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { DataTablePagination } from "@/shared/ui/data-table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterableColumns?: {
    id: string;
    title: string;
    options: { label: string; value: string }[] | undefined;
  }[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterableColumns = [],
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
      columnFilters,
      sorting,
    },
  });

  return (
    <div className="space-y-6">
      <Input
        disabled={data.length === 0}
        value={globalFilter ?? ""}
        onChange={(event) => setGlobalFilter(event.target.value)}
        placeholder="Поиск"
      />
      {filterableColumns.length > 0 && (
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filterableColumns.map(({ id, title, options }) => (
            <Select
              key={id}
              disabled={data.length === 0}
              defaultValue={
                columnFilters.find((filter) => filter.id === id)
                  ?.value as string
              }
              onValueChange={(value) => {
                if (value === "all") {
                  table.getColumn(id)?.setFilterValue(undefined);
                } else {
                  table.getColumn(id)?.setFilterValue(value);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={title} />
              </SelectTrigger>
              <SelectContent>
                {options && options.length > 0 ? (
                  options.map(({ label, value }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="no-options">
                    Создайте{" "}
                    {title === "Категории"
                      ? "категорию"
                      : title === "Вдохновляющие личности"
                        ? "вдохновляющую личность"
                        : "исполнителя"}
                    .
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          ))}
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
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
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  className="h-24 text-center"
                >
                  Никаких результатов.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
