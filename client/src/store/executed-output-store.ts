import { create } from "zustand";

type OutputType = "stdout" | "stderr";

type ExecutedOutputStoreType = {
  executedOutput: string | undefined;
  outputType: OutputType | undefined;
  setExecutedOutput: (
    output: string,

    // type: OutputType
  ) => void;
  clearOutput: () => void;
};

export const useExecutedOutputStore = create<ExecutedOutputStoreType>(
  (set) => ({
    executedOutput: undefined,
    outputType: undefined,
    setExecutedOutput: (output: string) =>
      set({
        executedOutput: output,
        // outputType: type,
      }),
    clearOutput: () =>
      set({
        executedOutput: undefined,
        outputType: undefined,
      }),
  }),
);
