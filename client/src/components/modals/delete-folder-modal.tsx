// PACKAGES
import { Trash2Icon } from "lucide-react";

// COMPONENTS
import ModalContentWrapper from "@/components/modals/modal-content-wrapper";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export default function DeleteFolderModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"secondary"}
          className="text-red-500 hover:text-red-600"
        >
          <Trash2Icon />
        </Button>
      </DialogTrigger>
      <ModalContentWrapper
        modalTitle="Delete Folder"
        modalDescription="Deleting the folder will also delete all the files related to it."
      >
        <form>
          <Button variant={"destructive"}>Delete Folder</Button>
        </form>
      </ModalContentWrapper>
    </Dialog>
  );
}
