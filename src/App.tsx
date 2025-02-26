import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { AppRouter } from "./routing/AppRouter";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
