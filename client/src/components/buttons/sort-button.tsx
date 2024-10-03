// PACKAGES
import { ArrowDownUpIcon } from "lucide-react";

// LOCAL MODULES
import { SortOrderType } from "@/types";

// COMPONENTS
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SortButtonProps = {
  sortOrder: SortOrderType;
  handleSortChange: (sort: SortOrderType) => void;
};

export default function SortButton({
  handleSortChange,
  sortOrder,
}: SortButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"sm"}
          variant={"secondary"}
          className="flex items-center gap-1 font-medium capitalize"
        >
          <ArrowDownUpIcon size={16} />
          <p>Sorted By {sortOrder}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-medium">
        <DropdownMenuItem
          onClick={() => handleSortChange("latest")}
          disabled={sortOrder === "latest"}
          className="cursor-pointer"
        >
          Sort By Latest First
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleSortChange("oldest")}
          disabled={sortOrder === "oldest"}
          className="cursor-pointer"
        >
          Sort By Oldest First
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
