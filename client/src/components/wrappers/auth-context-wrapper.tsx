import { AuthContextProvider } from "@/providers/auth-provider";

export default function AuthContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
