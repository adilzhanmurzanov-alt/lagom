import { HashRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import AnimatedRoutes from "./components/AnimatedRoutes";

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <AnimatedRoutes />
      </HashRouter>
    </AppProvider>
  );
}
