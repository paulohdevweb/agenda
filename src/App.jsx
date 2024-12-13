import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddEditAgendamento from "./pages/AddEditAgendamento/AddEditAgendamento"; // Importação da página de criação

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-agendamento" element={<AddEditAgendamento />} />
        <Route
          path="/edit-agendamento/:id"
          element={<AddEditAgendamento />}
        />{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
