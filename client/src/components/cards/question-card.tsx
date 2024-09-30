// packages
import { Link } from "react-router-dom";

// components
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { encodeId } from "@/lib/url-encode-decode";
import SkeletonProvider from "@/providers/skeleton-provider";

type QuestionCardProps = {
  title: string;
  slNo: number;
  isLoading: boolean;
  questionId: string;
};

export default function QuestionCard({
  slNo,
  title,
  isLoading,
  questionId,
}: QuestionCardProps) {
  // console.log(questionId);
  const encodedQuestionId = encodeId(questionId);

  return (
    <SkeletonProvider isLoading={isLoading}>
      <Link to={`/question/${encodedQuestionId}`}>
        <Card className="flex h-36 w-full cursor-pointer select-none flex-col items-start justify-center transition-all hover:bg-secondary/30">
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
    </SkeletonProvider>
  );
}
