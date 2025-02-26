import "./App.css";
import { AuthProvider } from "./state/AuthContext";
import { AppRouter } from "./routing/AppRouter";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
