// PACKAGES
import { useParams } from "react-router-dom";

// COMPONENTS
import { EditorPanel } from "@/components/code-editor/editor-panel";
import ProblemDetails from "@/components/code-editor/problem-details";

// LOCAL MODULES
import { decodeId } from "@/lib/url-encode-decode";

export default function CodeEditor() {
  const { id } = useParams<{ id: string }>();

  const decodedQuestionId = decodeId(id!);

  return (
    <main className="">
      <section className="flex min-h-screen">
        <ProblemDetails />
        <EditorPanel />
      </section>
    </main>
  );
}
