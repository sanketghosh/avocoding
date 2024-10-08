import { Button } from "@/components/ui/button";
import { useCodeStore } from "@/store/code-store";
import { PlayIcon } from "lucide-react";

export default function RunCode() {
  const { code } = useCodeStore();

  console.log("@@FROM RUN CODE", code);

  return (
    <Button
      size={"sm"}
      className="flex items-center gap-1 bg-green-800/20 text-green-500 hover:bg-green-800/30"
      variant={"secondary"}
    >
      <PlayIcon size={20} />
      <p>Run Code</p>
    </Button>
  );
}
