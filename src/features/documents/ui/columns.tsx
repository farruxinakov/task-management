import type { ColumnDef } from "@tanstack/react-table";

import { DocumentCellActions } from "@/features/documents/ui/cell-actions";

import { DataTableColumnHeader } from "@/shared/ui/data-table-column-header";

export type DocumentColumn = {
  id: string;
  category: string;
  inspiringPerson: string;
  executor: string;
  indicatorName: string;
  quantity: string;
  createdAt: string;
  updatedAt: string;
};

export const documentsColumns: ColumnDef<DocumentColumn>[] = [
  {
    accessorKey: "id",
    accessorFn: (_, index) => index + 1,
    header: "№",
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Категория" />
    ),
  },
  {
    accessorKey: "inspiringPerson",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Вдохновляющая личность" />
    ),
  },
  {
    accessorKey: "executor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Исполнитель" />
    ),
  },
  {
    accessorKey: "indicatorName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Название индикаторов" />
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Количество" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата создания" />
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата обновления" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DocumentCellActions id={row.original.id} />,
  },
];
