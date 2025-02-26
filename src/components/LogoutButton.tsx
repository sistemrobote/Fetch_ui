import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../state/AuthContext";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const { setIsAuthorized } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthorized(false); // Clear authentication state
    localStorage.removeItem("token"); // Remove stored token if applicable
    navigate("/login"); // Redirect to login page
  };

  return (
    <header
      style={{ display: "flex", justifyContent: "flex-end", padding: 10 }}
    >
      <Button
        variant="outlined"
        color="primary"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
        sx={{ mt: 2 }}
      >
        Logout
      </Button>
    </header>
  );
};
