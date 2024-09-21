import { useAuthContext } from "@/providers/auth-provider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth", {
        replace: true,
      });
    }
  }, [user, navigate]);

  return children;
}
