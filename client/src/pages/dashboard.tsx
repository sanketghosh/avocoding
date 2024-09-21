import FolderCard from "@/components/cards/folder-card";
import AddFolderModal from "@/components/modals/add-folder-modal";
import SheetContentWrapper from "@/components/sheets/sheet-content-wrapper";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
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
            <Sheet>
              <SheetTrigger>
                <FolderCard
                  description={folder.desc}
                  title={folder.title}
                  key={folder.id}
                />
              </SheetTrigger>
              <SheetContentWrapper
                title={folder.title}
                description={folder.desc}
                className="min-w-full overflow-y-scroll md:min-w-[500px]"
              >
                <ul className="space-y-4 py-5">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 9].map((item) => (
                    <li
                      key={item}
                      className="flex gap-1 rounded-md bg-secondary/30 px-4 py-2 text-lg"
                    >
                      <h2>😃</h2>
                      <h2>This is a sdkasndk</h2>
                    </li>
                  ))}
                </ul>
              </SheetContentWrapper>
            </Sheet>
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
