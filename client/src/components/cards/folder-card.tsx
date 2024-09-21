type FolderCardProps = {
  title: string;
  description: string;
};

export default function FolderCard({ description, title }: FolderCardProps) {
  return (
    <div className="flex h-32 w-full cursor-pointer select-none flex-col items-center justify-center gap-2 rounded-lg border p-4 transition-all hover:bg-secondary/30">
      <div className="flex w-full gap-2 text-left text-lg font-bold">
        <h1>😃</h1>
        <h2>{title}</h2>
      </div>
      <p className="line-clamp-2 text-left text-sm text-muted-foreground md:text-base">
        {description}
      </p>
    </div>
  );
}
