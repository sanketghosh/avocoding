// PACKAGES
import { Link } from "react-router-dom";

// COMPONENTS
import HomeLink from "@/components/links/home-link";

export default function LandingNavbar() {
  return (
    <nav className="h-14 w-full border-b border-border/75">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <HomeLink linkHref="/" />
        <Link
          to={"/auth"}
          className="rounded-full bg-gradient-to-br from-purple-600 via-indigo-600 to-indigo-700 px-4 py-2 text-sm font-medium text-white transition-all hover:from-indigo-700 hover:via-indigo-600 hover:to-purple-600"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
