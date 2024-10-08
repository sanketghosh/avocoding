// PACKAGES
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// LOCAL MODULES
import * as getSingleQuestionAction from "@/actions/question-actions/get-single-question-action";
import { decodeId } from "@/lib/url-encode-decode";
import { useQuestionStore } from "@/store/question-store";

// COMPONENTS
import { EditorPanel } from "@/components/code-editor/editor-panel";
import ProblemDetails from "@/components/code-editor/problem-details";

export default function CodeEditor() {
  const { id } = useParams<{ id: string }>();

  const decodedQuestionId = decodeId(id!);

  const { setQuestion, question } = useQuestionStore();

  const { data, isSuccess, isLoading, error } = useQuery({
    queryKey: ["questions", "get-single-question-data"],
    queryFn: () =>
      getSingleQuestionAction.getSingleQuestionAction({
        questionId: decodedQuestionId,
      }),
    staleTime: 10, // stale-time is very less as i want to fetch data as soon as i am redirected to this page.
  });

  // pushing data in question global state
  useEffect(() => {
    if (isSuccess && data?.data) {
      setQuestion(data?.data);
    }
  }, [isSuccess, setQuestion, data]);

  return (
    <main className="">
      <section className="flex min-h-screen">
        <ProblemDetails
          isLoading={isLoading}
          error={error}
          question={question}
        />
        <EditorPanel />
      </section>
    </main>
  );
}
