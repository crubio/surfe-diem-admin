import { createContext } from "react";
import { AuthUser } from "@features/auth";

interface AuthContext {
  user: AuthUser | null
}

export const AuthContext = createContext<AuthContext>({
  user: null
});