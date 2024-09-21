import { Link } from "react-router-dom";

type FolderCardProps = {
  title: string;
  description: string;
};

export default function FolderCard({ description, title }: FolderCardProps) {
  return (
    <Link
      to={"/folder/sdsadad"}
      className="flex h-44 w-full cursor-pointer select-none flex-col items-center justify-center gap-2 rounded-xl border bg-gradient-to-br from-secondary via-secondary/30 to-background p-4 transition-all hover:from-background hover:via-secondary/30 hover:to-secondary"
    >
      <h1 className="w-full text-left text-5xl">😃</h1>
      <h2 className="w-full text-left text-lg font-semibold">{title}</h2>
      <p className="line-clamp-2 text-left text-sm text-foreground/80">
        {description}
      </p>
    </Link>
  );
}
