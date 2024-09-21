import { PlusCircleIcon } from "lucide-react";
import AddFolderForm from "../forms/add-folder-form";
import { Dialog, DialogTrigger } from "../ui/dialog";
import ModalContentWrapper from "./modal-content-wrapper";

export default function AddFolderModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex h-32 flex-col items-center justify-center space-y-2 rounded-md border p-3 text-muted-foreground transition-all hover:bg-secondary/30 hover:text-foreground">
          <PlusCircleIcon size={40} />
          <p className="font-medium">Add New Folder</p>
        </div>
      </DialogTrigger>
      <ModalContentWrapper
        modalTitle="Create folder"
        modalDescription="You need a folder title and description it will help in organization."
      >
        <AddFolderForm />
      </ModalContentWrapper>
    </Dialog>
  );
}
