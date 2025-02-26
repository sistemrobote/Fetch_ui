import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  isAuthorized: boolean;
  setIsAuthorized: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(() => {
    const storedAuth = sessionStorage.getItem("isAuthorized");
    const expiration = sessionStorage.getItem("authExpiration");

    if (storedAuth === "true" && expiration) {
      const now = new Date().getTime();
      if (now < parseInt(expiration, 10)) {
        return true;
      } else {
        sessionStorage.removeItem("isAuthorized");
        sessionStorage.removeItem("authExpiration");
      }
    }
    return false;
  });

  useEffect(() => {
    if (isAuthorized) {
      const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour from now
      sessionStorage.setItem("isAuthorized", "true");
      sessionStorage.setItem("authExpiration", expirationTime.toString());
    } else {
      sessionStorage.removeItem("isAuthorized");
      sessionStorage.removeItem("authExpiration");
    }
  }, [isAuthorized]);

  return (
    <AuthContext.Provider value={{ isAuthorized, setIsAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
