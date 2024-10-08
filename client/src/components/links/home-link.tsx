// packages
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type HomeLinkProps = {
  iconStyle?: string;
  textStyle?: string;
  linkHref: string;
} & React.ComponentPropsWithRef<"a">;

export default function HomeLink({
  iconStyle,
  textStyle,
  className,
  linkHref = "/",
}: HomeLinkProps) {
  return (
    <Link to={linkHref} className={cn("flex items-center gap-0.5", className)}>
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 256 256"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("size-5", iconStyle)}
      >
        <path d="M128,108a52,52,0,1,0,52,52A52.06,52.06,0,0,0,128,108Zm0,80a28,28,0,1,1,28-28A28,28,0,0,1,128,188Zm86.76-58.68L185,45.17A60,60,0,0,0,71.42,44h0l-29.5,83.46a92,92,0,1,0,172.84,1.86ZM128,228a68.05,68.05,0,0,1-63.59-92.15c0-.09.07-.18.1-.26L94.05,52h0a36,36,0,0,1,68.17.78l.09.27,29.82,84.28A68,68,0,0,1,128,228Z"></path>
      </svg>
      <h2 className={cn("text-lg font-medium", textStyle)}>Avocoding</h2>
    </Link>
  );
}
