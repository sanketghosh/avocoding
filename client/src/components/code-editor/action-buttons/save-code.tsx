import { SaveIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

export default function SaveCode() {
  const mutation = useMutation({});

  return (
    <form onSubmit={() => {}}>
      <Button
        size={"sm"}
        variant={"secondary"}
        className="flex items-center gap-1"
      >
        <SaveIcon size={20} />
        <p>Save</p>
      </Button>
    </form>
  );
}
