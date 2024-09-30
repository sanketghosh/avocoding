import { Button } from "@/components/ui/button";
import { PlayIcon, SaveIcon, Trash2Icon, XIcon } from "lucide-react";

export default function ActionButtonsBar() {
  return (
    <div className="h-14">
      <div className="flex h-full items-center justify-between space-x-3 px-3">
        <div className="flex items-center gap-3">
          <Button
            size={"sm"}
            className="flex items-center gap-1 bg-purple-800/20 text-purple-500 hover:bg-purple-800/30"
            variant={"secondary"}
          >
            <PlayIcon size={20} />
            <p>Run Code</p>
          </Button>
          <Button
            size={"sm"}
            className="flex items-center gap-1 bg-green-800/20 text-green-500 hover:bg-green-800/30"
            variant={"secondary"}
          >
            <PlayIcon size={20} />
            <p>Run Code</p>
          </Button>
          <Button
            size={"sm"}
            variant={"secondary"}
            className="flex items-center gap-1"
          >
            <SaveIcon size={20} />
            <p>Save</p>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size={"sm"}
            className="flex items-center gap-1"
            variant={"secondary"}
          >
            <PlayIcon size={20} />
            <p>Run Code</p>
          </Button>
          <Button
            size={"sm"}
            variant={"secondary"}
            className="flex items-center gap-1"
          >
            <XIcon size={20} />
            <p>Clear</p>
          </Button>
          <Button
            size={"sm"}
            variant={"destructive"}
            className="flex items-center gap-1"
          >
            <Trash2Icon size={20} />
            <p>Delete</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
