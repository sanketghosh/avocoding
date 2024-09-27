import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ModalContentWrapperProps = {
  modalTitle: string;
  modalDescription: string;
  children: React.ReactNode;
};

export default function ModalContentWrapper({
  children,
  modalTitle,
  modalDescription,
}: ModalContentWrapperProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogDescription>{modalDescription}</DialogDescription>
      </DialogHeader>
      {children}
    </DialogContent>
  );
}
