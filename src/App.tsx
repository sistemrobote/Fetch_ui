import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { AuthProvider } from "./context/IsAuthContext";

function App() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
}

export default App;
