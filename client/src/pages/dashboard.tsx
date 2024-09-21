import FolderCard from "@/components/cards/folder-card";
import AddFolderModal from "@/components/modals/add-folder-modal";
import { data } from "@/data";
import { useAuthContext } from "@/providers/auth-provider";

export default function Dashboard() {
  const { user } = useAuthContext();

  return (
    <div>
      <Header username={user?.userUsername} />
      <div className="w-full py-4">
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AddFolderModal />
          {data.map((folder) => (
            <FolderCard
              description={folder.desc}
              title={folder.title}
              key={folder.id}
            />
          ))}
        </div>
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
