import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./components/AppRoutes";

const App: React.FC = () => {
  return (
    <Router basename="/cats_collection">
      <AppRoutes />
    </Router>
  );
};

export default App;
