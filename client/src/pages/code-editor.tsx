// COMPONENTS
import { EditorPanel } from "@/components/code-editor/editor-panel";
import ProblemDetails from "@/components/code-editor/problem-details";

export default function CodeEditor() {
  return (
    <main className="">
      <section className="flex min-h-screen">
        <ProblemDetails />
        <EditorPanel />
      </section>
    </main>
  );
}
