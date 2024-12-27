import { useRouter } from "next/navigation";

import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";

import { useDeleteDocument } from "@/features/document/model/mutations";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Button } from "@/shared/ui/button";

interface DocumentCellActionsProps {
  id: string;
}

export function DocumentCellActions({ id }: DocumentCellActionsProps) {
  const router = useRouter();

  const { isPending, mutate: deleteDocument } = useDeleteDocument(id);

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
          onClick={() => router.push(`/documents/${id}`)}
        >
          <PencilIcon />
          Внести изменения
        </DropdownMenuItem>
        <DropdownMenuItem disabled={isPending} onClick={() => deleteDocument()}>
          <TrashIcon />
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
