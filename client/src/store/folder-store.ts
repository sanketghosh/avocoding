import { CreatedFolderType } from "@/types";
import { create } from "zustand";

type FolderStoreType = {
  folders: CreatedFolderType[] | null;
  setFolders: (folders: CreatedFolderType[]) => void;
  updateFolder: (
    folderId: string,
    updatedData: Partial<CreatedFolderType>,
  ) => void;
  deleteFolder: (folderId: string) => void;
};

export const useFolderStore = create<FolderStoreType>((set) => ({
  folders: null,

  setFolders: (folders) => set({ folders }),

  updateFolder: (folderId, updatedData) =>
    set((state) => ({
      folders:
        state.folders?.map((folder) =>
          folder.id === folderId ? { ...folder, ...updatedData } : folder,
        ) || null,
    })),

  deleteFolder: (folderId) =>
    set((state) => ({
      folders:
        state.folders?.filter((folder) => folder.id !== folderId) || null,
    })),
}));
