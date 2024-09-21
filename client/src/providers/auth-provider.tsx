import { AuthenticatedUserType } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// define context type
type AuthContextType = {
  user: AuthenticatedUserType | null;
  updateUser: (data: AuthenticatedUserType | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  let initialUser = null;
  try {
    const storedUserData = localStorage.getItem("userData");
    initialUser = storedUserData ? JSON.parse(storedUserData) : null;
  } catch (error) {
    console.error(
      "ERROR! Failed to parse user data from local storage.",
      error,
    );
  }

  const [currentUser, setCurrentUser] = useState<AuthenticatedUserType | null>(
    initialUser,
  );

  const updateUserHandler = (data: AuthenticatedUserType | null) => {
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem("userData", jsonData);
      setCurrentUser(data);
    } catch (error) {
      console.error(
        "ERROR! Failed to update user data in local storage",
        error,
      );
    }
  };

  useEffect(() => {
    if (currentUser !== null) {
      localStorage.setItem("userData", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("userData");
    }
  }, [currentUser]);

  const contextValue: AuthContextType = {
    user: currentUser,
    updateUser: updateUserHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// using useAppContext app context hook
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "ERROR! useAuthContext must be used within an AuthContextProvider",
    );
  }
  return context;
};
