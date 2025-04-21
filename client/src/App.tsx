import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PageTransition } from "./components/Layout/PageTransition";
import Landing from "./pages/Landing";
import Mint from "./pages/Mint";

function App() {
  return (
    <Router>
      <PageTransition>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/mint" element={<Mint />} />
        </Routes>
      </PageTransition>
    </Router>
  );
}

export default App;