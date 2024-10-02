// PACKAGES
import { FilePlusIcon } from "lucide-react";

// COMPONENTS
import AddQuestionTitleForm from "@/components/forms/question-form/add-question-title-form";
import ModalContentWrapper from "@/components/modals/modal-content-wrapper";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export default function AddQuestionModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex h-36 w-full cursor-pointer select-none flex-col items-center justify-center space-y-2 rounded-md border p-3 text-muted-foreground transition-all hover:bg-secondary/30 hover:text-foreground">
          <FilePlusIcon size={40} />
          <p>Add new question</p>
        </div>
      </DialogTrigger>
      <ModalContentWrapper
        modalTitle="Create a new question"
        modalDescription="Enter a question title to create a new question and then click on the created card to get redirected to the code editor."
      >
        <AddQuestionTitleForm />
      </ModalContentWrapper>
    </Dialog>
  );
}
