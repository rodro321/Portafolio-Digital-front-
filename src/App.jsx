import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import RegistroUsuarioPage from "./registroUsuario/RegistroUsuarioPage";
import EdicionPerfilPage from "./edicionPerfil/EdicionPerfilPage";
import VistaEdicionPage from "./vistaEdicion/VistaEdicionPage";

export default function App() {
  const [page, setPage] = useState("registro"); // "registro" | "edicion" | "vista"
  const [userData, setUserData] = useState({});

  return (
    <ThemeProvider>
      {page === "registro" && (
        <RegistroUsuarioPage
          onNext={(data) => { setUserData(d => ({ ...d, ...data })); setPage("edicion"); }}
        />
      )}
      {page === "edicion" && (
        <EdicionPerfilPage
          userData={userData}
          onUpdate={(data) => setUserData(d => ({ ...d, ...data }))}
          onNext={(data) => { setUserData(d => ({ ...d, ...data })); setPage("vista"); }}
        />
      )}
      {page === "vista" && (
        <VistaEdicionPage
          userData={userData}
          onUpdate={(data) => setUserData(d => ({ ...d, ...data }))}
        />
      )}
    </ThemeProvider>
  );
}