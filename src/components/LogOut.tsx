import { useEffect } from "react";
import { useAuth } from "../state/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiLoginService } from "../api/userService";

export const Logout = () => {
  const { setIsAuthorized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    apiLoginService.logout().then(() => {
      setIsAuthorized(false);
      navigate("/login");
    });
  }, [setIsAuthorized, navigate]);

  return <p>Logging out...</p>;
};
