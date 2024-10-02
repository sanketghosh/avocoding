// PACKAGES
import { ChevronLeftIcon } from "lucide-react";

// COMPONENTS
import EditQuestionSheet from "@/components/sheets/edit-question-sheet";
import { Button } from "@/components/ui/button";
import AddProblemStatementSheet from "../sheets/add-problem-statement-sheet";

type ProblemDetailsProps = {
  title: string;
  problemStatement: string;
};

export default function ProblemDetails({
  problemStatement,
  title,
}: ProblemDetailsProps) {
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
      <h1 className="text-lg font-bold">{title}</h1>
      <div className="h-[0.5px] w-full bg-secondary" />
      <div>
        {problemStatement ? problemStatement : <AddProblemStatementSheet />}
      </div>
    </div>
  );
}
