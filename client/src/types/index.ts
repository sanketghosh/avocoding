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
};
