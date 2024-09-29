import { CreatedFolderType } from "@/types";
import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

const cutsomFolderStoreLocalStorage: PersistStorage<FolderStoreType> = {
  getItem: (name) => {
    const storedValue = localStorage.getItem(name);
    return storedValue ? JSON.parse(storedValue) : null;
  },

  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },

  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

type FolderStoreType = {
  folders: CreatedFolderType[] | null;
  setFolders: (folders: CreatedFolderType[]) => void;
  updateFolder: (
    folderId: string,
    updatedData: Partial<CreatedFolderType>,
  ) => void;
  deleteFolder: (folderId: string) => void;
};

export const useFolderStore = create<FolderStoreType>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "folder-storage",
      storage: cutsomFolderStoreLocalStorage,
    },
  ),
);
