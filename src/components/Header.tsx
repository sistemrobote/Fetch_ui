import { Button, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../state/AuthContext";
import { useNavigate } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";
export const Header = () => {
  const { setIsAuthorized } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthorized(false);
    localStorage.removeItem("token");
    navigate("/login");
  };
  const goToFavorites = () => {
    navigate("/myfavorites"); // Redirect to favorites page
  };

  return (
    <header
      style={{ display: "flex", justifyContent: "space-between", padding: 10 }}
    >
      <IconButton onClick={goToFavorites} color="primary">
        <PetsIcon fontSize="large" />
      </IconButton>
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
