// packages
import { ChevronLeftIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

// local modules
import { cn } from "@/lib/utils";
import { CreatedFolderType } from "@/types";

// components
import QuestionCard from "@/components/cards/question-card";
import AddQuestionModal from "@/components/modals/add-question-modal";
import DeleteFolderModal from "@/components/modals/delete-folder-modal";
import UpdateFolderModal from "@/components/modals/update-folder-modal";
import { buttonVariants } from "@/components/ui/button";
import { decodeId } from "@/lib/url-encode-decode";
import { useFolderStore } from "@/store/folder-store";

export default function QuestionsList() {
  const { id } = useParams<{ id: string }>();
  // console.log(id);
  const decodedFolderId = decodeId(id!);
  const { folders } = useFolderStore();
  // console.log(decodedFolderId);

  const folderData = folders?.find((folder) => folder.id === decodedFolderId);

  if (!folderData) return <p>Folder not found.</p>;

  return (
    <div className="space-y-4">
      <Link
        to={"/dashboard"}
        className={cn(
          buttonVariants({
            size: "sm",
            variant: "secondary",
          }),
          "",
        )}
      >
        <ChevronLeftIcon size={18} />
        <p>Dashboard</p>
      </Link>
      <Header folderData={folderData} folderId={decodedFolderId} />
      <div className="w-full">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <AddQuestionModal />
          {[1, 2, 3, 4, 5, 6, 7, 11, 12, 14].map((item, idx) => (
            <QuestionCard
              slNo={idx + 1}
              key={idx + item}
              title="
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis explicabo suscipit, sunt nihil nulla beatae exercitationem, itaque maxime, nam placeat officia? Veritatis ipsam sunt tempora optio esse, ratione fugiat accusamus!
          "
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type HeaderProps = {
  folderData: CreatedFolderType;
  folderId: string;
};

function Header({ folderData, folderId }: HeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-3 border-b pb-4 md:flex-row md:items-center">
      <div>
        <div className="flex space-x-2 text-xl font-bold md:text-2xl lg:text-3xl">
          <span>{folderData.emoji}</span>
          <h2>{folderData.title}</h2>
        </div>
        <p className="max-w-3xl font-medium text-muted-foreground">
          {folderData.description}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <UpdateFolderModal folderData={folderData} folderId={folderId} />
        <DeleteFolderModal />
      </div>
    </div>
  );
}
