export type AuthenticatedUserType = {
  userId: string;
  userUsername: string;
  userEmail: string;
  userAvatar: string | null;
  userCreatedAt: Date | string;
};

export type CreatedFolderType = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  createdAt: Date;
  updatedAt: Date;
  questions: CreatedQuestionType[];
};

export type CreatedQuestionType = {
  id: string;
  folderId: string;
  title: string;
  problemStatement: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SortOrderType = "latest" | "oldest";

export type CodeEditorTheme = "vs-dark" | "light";

export type ProgrammingLanguageType =
  | "C"
  | "Cpp"
  | "Java"
  | "Python"
  | "JavaScript"
  | "TypeScript"
  | "Go"
  | "CSharp";
