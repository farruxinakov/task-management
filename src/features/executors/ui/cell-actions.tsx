import { useRouter } from "next/navigation";

import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";

import { useDeleteExecutor } from "@/features/executor/model/mutations";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Button } from "@/shared/ui/button";

interface ExecutorCellActionsProps {
  id: string;
}

export function ExecutorCellActions({ id }: ExecutorCellActionsProps) {
  const router = useRouter();

  const { isPending, mutate: deleteExecutor } = useDeleteExecutor(id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontalIcon />
          <span className="sr-only">Open actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          disabled={isPending}
          onClick={() => router.push(`/executors/${id}`)}
        >
          <PencilIcon />
          Внести изменения
        </DropdownMenuItem>
        <DropdownMenuItem disabled={isPending} onClick={() => deleteExecutor()}>
          <TrashIcon />
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
