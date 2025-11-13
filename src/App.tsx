
import { HashRouter, BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./components/AppRoutes";

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );

};

export default App;