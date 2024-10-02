// COMPONENTS
import SheetContentWrapper from "@/components/sheets/sheet-content-wrapper";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { PlusIcon } from "lucide-react";
import AddProblemStatementForm from "../forms/question-form/add-problem-statement-form";
import { Button } from "../ui/button";

export default function AddProblemStatementSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex items-center gap-1" size={"sm"}>
          <PlusIcon size={20} />
          <p>Add Problem Statement</p>
        </Button>
      </SheetTrigger>
      <SheetContentWrapper
        title="Add Problem Statement"
        description="You can write your problem statement in details here in markdown format."
        className="min-w-[650px]"
      >
        <AddProblemStatementForm />
      </SheetContentWrapper>
    </Sheet>
  );
}
