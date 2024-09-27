// packages
import { Link } from "react-router-dom";

// components
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { encodeId } from "@/lib/url-encode-decode";
import { CreatedFolderType } from "@/types";

type FolderCardProps = {
  folderData: CreatedFolderType;
};

export default function FolderCard({ folderData }: FolderCardProps) {
  return (
    <Link to={`/folder/${encodeId(folderData.id)}`} className="">
      <Card className="flex h-44 w-full cursor-pointer select-none flex-col items-center justify-center transition-all hover:bg-secondary/30">
        <CardHeader className="">
          <CardTitle className="text-3xl">{folderData.emoji}</CardTitle>
          <CardTitle>{folderData.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {folderData.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
