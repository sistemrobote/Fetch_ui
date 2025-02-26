import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useAuth } from "../state/AuthContext";
import { Login } from "../components/Login";
import { Dashboard } from "../components/Dashboard";
import { Logout } from "../components/LogOut";

function ProtectedRoute() {
  const { isAuthorized } = useAuth();
  console.log(" ProtectedRoute isAuthorized::>>>", isAuthorized);
  return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;
}

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
