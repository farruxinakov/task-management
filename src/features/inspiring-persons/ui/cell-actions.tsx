import { useRouter } from "next/navigation";

import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";

import { useDeleteInspiringPerson } from "@/features/inspiring-person/model/mutations";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Button } from "@/shared/ui/button";

interface InspiringPersonCellActionsProps {
  id: string;
}

export function InspiringPersonCellActions({
  id,
}: InspiringPersonCellActionsProps) {
  const router = useRouter();

  const { isPending, mutate: deleteInspiringPerson } =
    useDeleteInspiringPerson(id);

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
          onClick={() => router.push(`/inspiring-persons/${id}`)}
        >
          <PencilIcon />
          Внести изменения
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isPending}
          onClick={() => deleteInspiringPerson()}
        >
          <TrashIcon />
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
