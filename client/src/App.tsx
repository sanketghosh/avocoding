import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Auth, Home } from "./pages";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}
