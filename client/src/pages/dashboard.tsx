// PACKAGES
import { useQuery } from "@tanstack/react-query";
import { LoaderIcon } from "react-hot-toast";

// LOCAL MODULES
import * as getFoldersHandler from "@/actions/folder-actions/get-folders-action";
import { useAuthContext } from "@/providers/auth-provider";
import { CreatedFolderType } from "@/types";

// COMPONENTS
import FolderCard from "@/components/cards/folder-card";
import AddFolderModal from "@/components/modals/add-folder-modal";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { user } = useAuthContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-all-folder"],
    queryFn: getFoldersHandler.getFoldersHandler,
    staleTime: 5000,
    // refetchOnWindowFocus: true,
  });

  // console.log(data);

  return (
    <div>
      <Header username={user?.userUsername} />
      <div className="w-full py-4">
        {error ? (
          <p>{error.message}</p>
        ) : (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AddFolderModal />
            {isLoading ? (
              [1, 2, 3, 4, 5].map((item: number) => (
                <Skeleton
                  key={item}
                  className="flex h-44 items-center justify-center"
                >
                  <LoaderIcon className="size-5 animate-spin" />
                </Skeleton>
              ))
            ) : (
              <>
                {data?.data?.map((folder: CreatedFolderType) => (
                  <FolderCard folderData={folder} key={folder.id} />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Header({ username }: { username?: string }) {
  return (
    <div className="space-y-3 border-b pb-4">
      <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
        Welcome {username || "user"} !
      </h1>
      <p className="max-w-3xl font-medium text-muted-foreground">
        Here you can create your folder inside which you can keep all the
        program sandboxes you want, it will help you with better organization.
      </p>
    </div>
  );
}
