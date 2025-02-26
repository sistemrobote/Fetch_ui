import { useContext, createContext } from "react";

export const AuthContext = createContext<{
  isAuthorized: boolean;
  setIsAuthorized: (value: boolean) => void;
} | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}
