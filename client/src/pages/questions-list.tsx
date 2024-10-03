// packages
import { useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

// local modules
import * as getAllQuestionsAction from "@/actions/question-actions/get-questions-action";
import { decodeId } from "@/lib/url-encode-decode";
import { cn } from "@/lib/utils";
import { useFolderStore } from "@/store/folder-store";
import { CreatedFolderType, CreatedQuestionType, SortOrderType } from "@/types";

// components
import SortButton from "@/components/buttons/sort-button";
import QuestionCard from "@/components/cards/question-card";
import AddQuestionModal from "@/components/modals/add-question-modal";
import DeleteFolderModal from "@/components/modals/delete-folder-modal";
import UpdateFolderModal from "@/components/modals/update-folder-modal";
import { buttonVariants } from "@/components/ui/button";

export default function QuestionsList() {
  const [sortOrder, setSortOrder] = useState<SortOrderType>("latest");

  const { id } = useParams<{ id: string }>();
  const decodedFolderId = decodeId(id!);
  const { folders } = useFolderStore();
  // console.log(decodedFolderId);

  const folderData = folders?.find((folder) => folder.id === decodedFolderId);

  const { data, isLoading, error } = useQuery({
    queryKey: ["questions", "get-all-questions", decodedFolderId, sortOrder],
    queryFn: () =>
      getAllQuestionsAction.getAllQuestionsAction({
        folderId: decodedFolderId,
        sortOrder: sortOrder,
      }),
    staleTime: 5000,
  });

  console.log(data);

  if (!folderData) return <p>Folder not found.</p>;

  const handleSortChange = (order: SortOrderType) => {
    setSortOrder(order);
  };

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
      <SortButton handleSortChange={handleSortChange} sortOrder={sortOrder} />
      <div className="w-full">
        {error ? (
          <p>{error.message}</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <AddQuestionModal />
            {data?.data?.map((question: CreatedQuestionType, idx: number) => (
              <QuestionCard
                slNo={idx + 1}
                key={question.id}
                questionId={question.id}
                title={question.title}
                isLoading={isLoading}
              />
            ))}
          </div>
        )}
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
