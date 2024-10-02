// PACKAGES
import { useParams } from "react-router-dom";

// COMPONENTS
import { EditorPanel } from "@/components/code-editor/editor-panel";
import ProblemDetails from "@/components/code-editor/problem-details";

// LOCAL MODULES
import * as getSingleQuestionAction from "@/actions/question-actions/get-single-question-action";
import { decodeId } from "@/lib/url-encode-decode";
import { useQuery } from "@tanstack/react-query";

export default function CodeEditor() {
  const { id } = useParams<{ id: string }>();

  const decodedQuestionId = decodeId(id!);
  console.log(decodedQuestionId);

  const { data } = useQuery({
    queryKey: ["questions", "get-single-question-data"],
    queryFn: () =>
      getSingleQuestionAction.getSingleQuestionAction({
        questionId: decodedQuestionId,
      }),
    staleTime: 5000,
  });

  console.log(data);

  return (
    <main className="">
      <section className="flex min-h-screen">
        <ProblemDetails
          title={data?.data?.title}
          problemStatement={data?.data?.problemStatement}
        />
        <EditorPanel />
      </section>
    </main>
  );
}
