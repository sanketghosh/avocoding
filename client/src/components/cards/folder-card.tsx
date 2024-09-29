// packages
import { Link } from "react-router-dom";

// local modules
import { encodeId } from "@/lib/url-encode-decode";
import { CreatedFolderType } from "@/types";

// components
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SkeletonProvider from "@/providers/skeleton-provider";

type FolderCardProps = {
  folderData: CreatedFolderType;
  isLoading: boolean;
};

export default function FolderCard({ folderData, isLoading }: FolderCardProps) {
  // const navigate = useNavigate();
  // const handleNavigate = () => {
  //   navigate(`/folder/${encodeId(folderData.id)}`, {
  //     state: {
  //       data: {
  //         folderData,
  //       },
  //     },
  //   });
  // };

  return (
    <SkeletonProvider isLoading={isLoading}>
      <Link to={`/folder/${encodeId(folderData.id)}`} role="button">
        <Card className="flex h-44 w-full cursor-pointer select-none flex-col items-start justify-center transition-all hover:bg-secondary/30">
          <CardHeader className="">
            <CardTitle className="text-3xl">{folderData.emoji}</CardTitle>
            <CardTitle>{folderData.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {folderData.description}
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </SkeletonProvider>
  );
}
