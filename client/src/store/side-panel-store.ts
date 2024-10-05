import { create } from "zustand";

type SidePanelState = {
  isOpen: boolean;
  togglePanel: () => void;
};

export const useSidePanelStore = create<SidePanelState>((set) => ({
  isOpen: true,
  togglePanel: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),
}));
