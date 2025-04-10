import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientesPage from "./pages/ClientesPage";
import ClienteDetalhesPage from "./pages/ClienteDetalhePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientesPage />} />
        <Route path="/clientes/:id" element={<ClienteDetalhesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
