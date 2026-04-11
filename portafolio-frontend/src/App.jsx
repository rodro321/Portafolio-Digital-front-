import { useState } from "react";
import EditarPerfil from "./pages/EditarPerfil";
import VistaPerfil from "./pages/VistaPerfil";

function App() {
  const [vista, setVista] = useState("publica");

  return (
    <div>
      <nav style={{ padding: "12px 24px", background: "#1a1a2e", display: "flex", gap: 16 }}>
        <button onClick={() => setVista("publica")} style={{ padding: "8px 16px", cursor: "pointer" }}>
          Ver Perfil
        </button>
        <button onClick={() => setVista("editar")} style={{ padding: "8px 16px", cursor: "pointer" }}>
          Editar Perfil
        </button>
      </nav>
      {vista === "publica" ? <VistaPerfil /> : <EditarPerfil />}
    </div>
  );
}

export default App;