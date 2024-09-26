// COMPONENTS
import ThemeToggle from "@/components/buttons/theme-toggle";
import HomeLink from "@/components/links/home-link";

// LOCAL MODULES
import { useAuthContext } from "@/providers/auth-provider";

// PACKAGES
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user } = useAuthContext();

  return (
    <nav className="h-14 w-full border-b">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <HomeLink
          linkHref="/dashboard"
          iconStyle="size-7 md:size-5"
          textStyle="hidden md:block md:font-semibold"
        />
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          <Link to={"/profile"}>
            {user?.userAvatar ? (
              <img src={user?.userAvatar} alt={user?.userUsername} />
            ) : (
              <div className="flex size-10 items-center justify-center rounded-full border bg-muted text-xl font-semibold text-muted-foreground">
                {user?.userUsername.charAt(0)}
              </div>
            )}
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
