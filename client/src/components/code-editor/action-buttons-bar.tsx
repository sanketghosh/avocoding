// PACKAGES
import { PanelLeftOpenIcon } from "lucide-react";

// LOCAL PACKAGES
import { cn } from "@/lib/utils";
import { useSidePanelStore } from "@/store/side-panel-store";

// COMPONENTS
import SaveCode from "@/components/code-editor/action-buttons/save-code";
import DeleteQuestionModal from "@/components/modals/delete-question-modal";
import EditorThemeSelector from "@/components/selects/editor-theme-selector";
import LanguageSelector from "@/components/selects/language-selector";
import { Button } from "@/components/ui/button";
import RunCode from "./action-buttons/run-code";

type DataTypeProps = {
  editorValue?: string;
  previousCode?: string;
};

export default function ActionButtonsBar({
  editorValue,
  previousCode,
}: DataTypeProps) {
  const { isOpen, togglePanel } = useSidePanelStore();

  return (
    <div className="h-14">
      <div className="flex h-full items-center justify-between space-x-3 px-3">
        <div className="flex items-center gap-3">
          <Button
            size={"sm"}
            variant={"secondary"}
            className={cn(isOpen ? "hidden" : "block")}
            onClick={togglePanel}
          >
            <PanelLeftOpenIcon size={20} />
          </Button>
          <RunCode />
        </div>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <EditorThemeSelector />
          <SaveCode editorValue={editorValue} previousCode={previousCode} />
          <DeleteQuestionModal />
        </div>
      </div>
    </div>
  );
}
