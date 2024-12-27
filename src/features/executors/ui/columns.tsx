import type { ColumnDef } from "@tanstack/react-table";

import { ExecutorCellActions } from "@/features/executors/ui/cell-actions";

import { DataTableColumnHeader } from "@/shared/ui/data-table-column-header";

export type ExecutorColumn = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export const executorsColumns: ColumnDef<ExecutorColumn>[] = [
  {
    accessorKey: "id",
    accessorFn: (_, index) => index + 1,
    header: "№",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Название" />
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
    cell: ({ row }) => <ExecutorCellActions id={row.original.id} />,
  },
];
