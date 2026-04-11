import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import HomePage from "./homePage/HomePage";
import RegistroUsuarioPage from "./registroUsuario/RegistroUsuarioPage";
import EdicionPerfilPage from "./edicionPerfil/EdicionPerfilPage";
import VistaEdicionPage from "./vistaEdicion/VistaEdicionPage";
import EdicionHabilidadPage from "./edicionHabilidad/EdicionHabilidadPage";
import EdicionProyectoPage from "./edicionProyecto/EdicionProyectoPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [userData, setUserData] = useState({
    techSkills: [],
    softSkills: [],
    proyectos: [],
  });

  return (
    <ThemeProvider>
      {page === "home" && (
        <HomePage
          onRegister={() => setPage("registro")}
          onLogin={() => setPage("registro")}
        />
      )}
      {page === "registro" && (
        <RegistroUsuarioPage
          onNext={(data) => {
            setUserData(d => ({ ...d, ...data }));
            setPage("edicion");
          }}
        />
      )}
      {page === "edicion" && (
        <EdicionPerfilPage
          userData={userData}
          onNext={(data) => {
            setUserData(d => ({ ...d, ...data }));
            setPage("vista");
          }}
        />
      )}
      {page === "vista" && (
        <VistaEdicionPage
          userData={userData}
          onGoToHabilidad={() => setPage("habilidad")}
          onGoToProyecto={() => setPage("proyecto")}
          onBack={() => setPage("edicion")}
        />
      )}
      {page === "habilidad" && (
        <EdicionHabilidadPage
          onBack={() => setPage("vista")}
          onSave={(skills) => {
            setUserData(d => ({
              ...d,
              techSkills: skills.tech
                ? [...(d.techSkills || []), skills.tech]
                : (d.techSkills || []),
              softSkills: skills.soft
                ? [...(d.softSkills || []), skills.soft]
                : (d.softSkills || []),
            }));
            setPage("vista");
          }}
        />
      )}
      {page === "proyecto" && (
        <EdicionProyectoPage
          onBack={() => setPage("vista")}
          onSave={(proyecto) => {
            setUserData(d => ({
              ...d,
              proyectos: [...(d.proyectos || []), proyecto],
            }));
            setPage("vista");
          }}
        />
      )}
    </ThemeProvider>
  );
}