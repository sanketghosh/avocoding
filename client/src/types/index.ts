export type AuthenticatedUserType = {
  userId: string;
  userUsername: string;
  userEmail: string;
  userAvatar: string | null;
  userCreatedAt: Date | string;
};
