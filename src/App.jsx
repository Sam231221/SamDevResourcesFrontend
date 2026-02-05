import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardScreen from "./screens/DashboardScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
