import { createContext } from "react";
import { AuthUser } from "@features/auth";

interface AuthContext {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  setUser: () => {},
});