import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

export const withAuth = (Component: React.FC) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (props: any) => {
    const navigate = useNavigate();
    const isAuth = useAuth();

    useEffect(() => {
      if (!isAuth) {
        navigate("/login");
      }
    }, [isAuth, navigate]);

    return isAuth ? <Component {...props} /> : null;
  };
};
