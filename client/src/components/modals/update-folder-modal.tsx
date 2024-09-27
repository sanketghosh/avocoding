// PACKAGES
import { PenIcon } from "lucide-react";

// LOCAL MODULES
import { CreatedFolderType } from "@/types";

// COMPONENTS
import UpdateFolderForm from "@/components/forms/folder-forms/update-folder-form";
import ModalContentWrapper from "@/components/modals/modal-content-wrapper";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

type UpdateFolderModalProps = {
  folderData: CreatedFolderType;
};

export default function UpdateFolderModal({
  folderData,
}: UpdateFolderModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"secondary"}>
          <PenIcon />
        </Button>
      </DialogTrigger>
      <ModalContentWrapper
        modalTitle="Update folder details"
        modalDescription="Here you can update the details of the folder."
      >
        <UpdateFolderForm folderData={folderData} />
      </ModalContentWrapper>
    </Dialog>
  );
}
