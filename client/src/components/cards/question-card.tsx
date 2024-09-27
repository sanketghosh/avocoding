// packages
import { Link } from "react-router-dom";

// components
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type QuestionCardProps = {
  title: string;
  slNo: number;
};

export default function QuestionCard({ slNo, title }: QuestionCardProps) {
  return (
    <Link to={"/question/sadnkasn"}>
      <Card className="flex h-36 w-full cursor-pointer select-none flex-col items-center justify-center transition-all hover:bg-secondary/30">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {slNo < 10 ? "0" + slNo : slNo}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-foreground">
            {title}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
