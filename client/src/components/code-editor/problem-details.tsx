import { ChevronLeftIcon } from "lucide-react";
import EditQuestionSheet from "../sheets/edit-question-sheet";
import { Button } from "../ui/button";

export default function ProblemDetails() {
  return (
    <div className="min-h-full w-1/4 space-y-4 px-2">
      <div className="flex h-14 items-center justify-between border-b">
        <Button
          variant={"secondary"}
          size={"sm"}
          className="flex items-center gap-1"
        >
          <ChevronLeftIcon size={18} />
          <p>Back</p>
        </Button>
        <EditQuestionSheet />
      </div>
      <h1>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic veritatis
        quas sint quam vel deleniti ipsam ab quaerat natus quia.
      </h1>
      <div className="h-[0.5px] w-full bg-secondary" />
    </div>
  );
}
