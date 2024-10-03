// PACKAGES
import { PlusIcon } from "lucide-react";

// COMPONENTS
import AddProblemStatementForm from "@/components/forms/question-form/add-problem-statement-form";
import SheetContentWrapper from "@/components/sheets/sheet-content-wrapper";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

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
