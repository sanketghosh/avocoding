// COMPONENTS
import SheetContentWrapper from "@/components/sheets/sheet-content-wrapper";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

export default function AddProblemStatementSheet() {
  return (
    <Sheet>
      <SheetTrigger></SheetTrigger>
      <SheetContentWrapper
        title="Add Problem Statement"
        description="You can write your problem statement in details here in markdown format."
      >
        sdsdak
      </SheetContentWrapper>
    </Sheet>
  );
}
