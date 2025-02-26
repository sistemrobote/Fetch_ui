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
    const storedAuth = localStorage.getItem("isAuthorized"); // SessinStorage is not working on some mobile browsers and incognito mode
    const expiration = localStorage.getItem("authExpiration");

    if (storedAuth === "true" && expiration) {
      const now = new Date().getTime();
      if (now < parseInt(expiration, 10)) {
        return true;
      } else {
        localStorage.removeItem("isAuthorized");
        localStorage.removeItem("authExpiration");
      }
    }
    return false;
  });

  useEffect(() => {
    if (isAuthorized) {
      const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour from now
      localStorage.setItem("isAuthorized", "true");
      localStorage.setItem("authExpiration", expirationTime.toString());
    } else {
      localStorage.removeItem("isAuthorized");
      localStorage.removeItem("authExpiration");
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
