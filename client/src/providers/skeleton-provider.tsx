import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "react-hot-toast";

type SkeletonProviderProps = {
  children: React.ReactNode;
  isLoading: boolean;
  fullWidth?: boolean;
};

export default function SkeletonProvider({
  children,
  isLoading,
  fullWidth,
}: SkeletonProviderProps) {
  if (!isLoading) return children;

  return (
    <Skeleton className={cn(fullWidth && "w-full")}>
      <div className="flex h-full w-full items-center justify-center">
        <LoaderIcon className="absolute size-5 animate-spin opacity-30" />
      </div>
      <div className="opacity-0">{children}</div>
    </Skeleton>
  );
}
