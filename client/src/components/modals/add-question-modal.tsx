import { FilePlusIcon } from "lucide-react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import ModalContentWrapper from "./modal-content-wrapper";

export default function AddQuestionModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex h-36 w-full cursor-pointer select-none flex-col items-center justify-center space-y-2 rounded-md border p-3 text-muted-foreground transition-all hover:bg-secondary/30 hover:text-foreground">
          <FilePlusIcon size={40} />
          <p>Add new question</p>
        </div>
      </DialogTrigger>
      <ModalContentWrapper modalDescription="" modalTitle="">
        form goes here
      </ModalContentWrapper>
    </Dialog>
  );
}
