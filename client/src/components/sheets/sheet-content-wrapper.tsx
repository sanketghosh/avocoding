import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type SheetContentWrapperProps = {
  title: string;
  description: string;
  children: React.ReactNode;
} & React.ComponentPropsWithRef<"div">;

export default function SheetContentWrapper({
  children,
  description,
  title,
  className,
}: SheetContentWrapperProps) {
  return (
    <SheetContent className={cn(className)}>
      <SheetHeader>
        <SheetTitle>{title}</SheetTitle>
        <SheetDescription>{description}</SheetDescription>
      </SheetHeader>
      <div>{children}</div>
    </SheetContent>
  );
}
