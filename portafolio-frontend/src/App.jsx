import { useState, useEffect } from "react";
import EditarPerfil from "./pages/EditarPerfil";
import VistaPerfil from "./pages/VistaPerfil";

function App() {
  const [vista, setVista] = useState("publica");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    // Captura el token de la URL después del redirect de GitHub
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get("token");
    if (tokenParam) {
      localStorage.setItem("token", tokenParam);
      setToken(tokenParam);
      window.history.replaceState({}, "", "/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (!token) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <h1>Portafolio Digital</h1>
        <a href="http://127.0.0.1:8000/api/auth/github/redirect">
          <button style={{ padding: "12px 24px", fontSize: 16, cursor: "pointer" }}>
            Continuar con GitHub
          </button>
        </a>
      </div>
    );
  }

  return (
    <div>
      <nav style={{ padding: "12px 24px", background: "#1a1a2e", display: "flex", gap: 16, justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 16 }}>
          <button onClick={() => setVista("publica")} style={{ padding: "8px 16px", cursor: "pointer" }}>
            Ver Perfil
          </button>
          <button onClick={() => setVista("editar")} style={{ padding: "8px 16px", cursor: "pointer" }}>
            Editar Perfil
          </button>
        </div>
        <button onClick={handleLogout} style={{ padding: "8px 16px", cursor: "pointer" }}>
          Cerrar sesión
        </button>
      </nav>
      {vista === "publica" ? <VistaPerfil token={token} /> : <EditarPerfil token={token} />}
    </div>
  );
}

export default App;