// packages
import { Link } from "react-router-dom";

// components
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type FolderCardProps = {
  title: string;
  description: string;
};

export default function FolderCard({ description, title }: FolderCardProps) {
  return (
    <Link to={"/folder/sdsadad"} className="">
      {/* <h1 className="w-full text-left text-5xl">😃</h1>
      <h2 className="w-full text-left text-lg font-semibold">{title}</h2>
      <p className="line-clamp-2 text-left text-sm text-foreground/80">
        {description}
      </p> */}

      <Card className="flex h-44 w-full cursor-pointer select-none flex-col items-center justify-center transition-all hover:bg-secondary/30">
        <CardHeader className="">
          <CardTitle className="text-3xl">😃</CardTitle>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
