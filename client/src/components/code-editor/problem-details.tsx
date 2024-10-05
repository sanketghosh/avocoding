// PACKAGES
import {
  ChevronLeftIcon,
  HomeIcon,
  MoveRightIcon,
  PanelLeftCloseIcon,
} from "lucide-react";
import { LoaderIcon } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import rehypeRaw from "rehype-raw";

// LOCAL MODULES
import { encodeId } from "@/lib/url-encode-decode";
import { cn } from "@/lib/utils";
import { CreatedQuestionType } from "@/types";
import { useSidePanelStore } from "@/store/side-panel-store";

// COMPONENTS
import AddProblemStatementSheet from "@/components/sheets/add-problem-statement-sheet";
import EditQuestionSheet from "@/components/sheets/edit-question-sheet";
import { Button, buttonVariants } from "@/components/ui/button";

type ProblemDetailsProps = {
  isLoading?: boolean;
  error: Error | null;
  question: CreatedQuestionType | null;
};

export default function ProblemDetails({
  isLoading,
  question,
  error,
}: ProblemDetailsProps) {
  const encodedFolderId = encodeId(question ? question?.folderId : "");
  const { isOpen, togglePanel } = useSidePanelStore();

  return (
    <div
      className={cn(
        "min-h-full space-y-4 px-2",
        isOpen ? "block w-1/4" : "hidden",
      )}
    >
      <div className="sticky top-0 flex h-14 items-center justify-between border-b bg-background">
        <div className="flex items-center gap-2">
          <Link
            to={`/dashboard`}
            className={cn(
              buttonVariants({
                variant: "default",
                size: "icon",
              }),
            )}
          >
            <HomeIcon size={24} />
          </Link>
          <Link
            to={`/folder/${encodedFolderId}`}
            className={cn(
              buttonVariants({
                variant: "secondary",
                size: "icon",
              }),
            )}
          >
            <ChevronLeftIcon size={24} />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <EditQuestionSheet />
          <Button size={"sm"} variant={"secondary"} onClick={togglePanel}>
            <PanelLeftCloseIcon size={20} />
          </Button>
        </div>
      </div>
      <div className="h-[90vh] overflow-y-scroll rounded-md border p-3">
        {error ? (
          <p>{error.message}</p>
        ) : (
          <div>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <LoaderIcon className="size-5" />
                <p>Loading...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h1 className="font-semibold">{question?.title}</h1>
                </div>
                <div className="h-[0.5px] w-full bg-secondary" />
                <div className="">
                  <div className="flex items-center gap-2 rounded-md border bg-secondary/30 px-3 py-4 text-lg font-semibold">
                    Your problem statement
                    <MoveRightIcon />
                  </div>
                  {question?.problemStatement ? (
                    <ReactMarkdown
                      rehypePlugins={[rehypeRaw]}
                      className={"markdown__content overflow-x-scroll"}
                    >
                      {question?.problemStatement}
                    </ReactMarkdown>
                  ) : (
                    <div className="mt-3">
                      <AddProblemStatementSheet />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
