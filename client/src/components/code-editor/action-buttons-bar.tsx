// PACKAGES
import {
  PanelLeftOpenIcon,
  PlayIcon,
  SaveIcon,
  Trash2Icon,
} from "lucide-react";

// LOCAL PACKAGES
import { useSidePanelStore } from "@/store/side-panel-store";
import { cn } from "@/lib/utils";

// COMPONENTS
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/selects/language-selector";
import EditorThemeSelector from "@/components/selects/editor-theme-selector";
import DeleteQuestionModal from "../modals/delete-question-modal";

export default function ActionButtonsBar() {
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
          <Button
            size={"sm"}
            className="flex items-center gap-1 bg-green-800/20 text-green-500 hover:bg-green-800/30"
            variant={"secondary"}
          >
            <PlayIcon size={20} />
            <p>Run Code</p>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {/* <ProgrammingLanguageSelector /> */}
          <LanguageSelector />
          <EditorThemeSelector />
          <Button
            size={"sm"}
            variant={"secondary"}
            className="flex items-center gap-1"
          >
            <SaveIcon size={20} />
            <p>Save</p>
          </Button>
          <DeleteQuestionModal />
        </div>
      </div>
    </div>
  );
}
