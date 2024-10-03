import { CreatedQuestionType } from "@/types";
import { create } from "zustand";

type QuestionStoreType = {
  question: CreatedQuestionType | null;
  setQuestion: (question: CreatedQuestionType) => void;
  updateQuestion: (updatedData: Partial<CreatedQuestionType>) => void;
  deleteQuestion: () => void;
};

export const useQuestionStore = create<QuestionStoreType>((set) => ({
  question: null,
  setQuestion: (question) => set({ question }),
  updateQuestion: (updatedData) =>
    set((state) => ({
      question: state.question ? { ...state.question, ...updatedData } : null,
    })),
  deleteQuestion: () => set({ question: null }),
}));
