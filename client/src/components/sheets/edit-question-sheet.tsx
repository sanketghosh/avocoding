// PACKAGES
import { PencilIcon } from "lucide-react";

// COMPONENTS
import EditQuestionForm from "@/components/forms/question-form/edit-question-form";
import SheetContentWrapper from "@/components/sheets/sheet-content-wrapper";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

export default function EditQuestionSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="flex items-center gap-1"
          variant={"secondary"}
          size={"sm"}
        >
          <PencilIcon size={17} />
          <p>Edit</p>
        </Button>
      </SheetTrigger>
      <SheetContentWrapper
        title="Edit your question"
        description="Edit your question and problem statement here."
        className="min-w-[700px] overflow-y-scroll"
      >
        <EditQuestionForm />
      </SheetContentWrapper>
    </Sheet>
  );
}
