import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";

import HomePage            from "./homePage/HomePage";
import RegistroUsuarioPage from "./registroUsuario/RegistroUsuarioPage";
import EdicionPerfilPage   from "./edicionPerfil/EdicionPerfilPage";
import VistaEdicionPage    from "./vistaEdicion/VistaEdicionPage";
import EdicionHabilidadPage from "./edicionHabilidad/EdicionHabilidadPage";
import EdicionProyectoPage from "./edicionProyecto/EdicionProyectoPage";
import VistaProyectoPage   from "./vistaProyecto/VistaProyectoPage";

const pageVariants = {
  initial: { opacity: 0, backgroundColor: "#000" },
  animate: { opacity: 1, backgroundColor: "transparent",
    transition: { duration: 0.35, ease: "easeOut" } },
  exit:    { opacity: 0, backgroundColor: "#000",
    transition: { duration: 0.2, ease: "easeIn" } },
};

function AnimatedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, setUserData } = useApp();
  const [editProyectoIdx, setEditProyectoIdx] = useState(null);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ minHeight: "100vh" }}
      >
        <Routes location={location}>
          <Route path="/" element={
            <HomePage
              onRegister={() => navigate("/registro")}
              onLogin={() => navigate("/registro")}
            />
          }/>
          <Route path="/registro" element={
            <RegistroUsuarioPage
              onNext={(data) => {
                setUserData(d => ({ ...d, ...data }));
                navigate("/edicion");
              }}
            />
          }/>
          <Route path="/edicion" element={
            <EdicionPerfilPage
              userData={userData}
              onNext={(data) => {
                setUserData(d => ({ ...d, ...data }));
                navigate("/vista");
              }}
            />
          }/>
          <Route path="/vista" element={
            <VistaEdicionPage
              userData={userData}
              onGoToHabilidad={() => navigate("/habilidad")}
              onGoToProyecto={() => { setEditProyectoIdx(null); navigate("/proyecto"); }}
              onEditProyecto={(idx) => { setEditProyectoIdx(idx); navigate("/proyecto"); }}
              onVerProyecto={(idx) => navigate(`/proyecto/${idx}`)}
              onBack={() => navigate("/edicion")}
            />
          }/>
          <Route path="/habilidad" element={
            <EdicionHabilidadPage
              userData={userData}
              onBack={() => navigate("/vista")}
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
                navigate("/vista");
              }}
            />
          }/>
          <Route path="/proyecto" element={
            <EdicionProyectoPage
              initialData={editProyectoIdx !== null
                ? userData.proyectos?.[editProyectoIdx]
                : null}
              onBack={() => navigate("/vista")}
              onSave={(proyecto) => {
                setUserData(d => {
                  const proyectos = [...(d.proyectos || [])];
                  if (editProyectoIdx !== null) {
                    proyectos[editProyectoIdx] = {
                      ...proyecto,
                      fecha: proyectos[editProyectoIdx]?.fecha,
                    };
                  } else {
                    proyectos.push({
                      ...proyecto,
                      fecha: new Date().toLocaleDateString("es-BO"),
                    });
                  }
                  return { ...d, proyectos };
                });
                setEditProyectoIdx(null);
                navigate("/vista");
              }}
            />
          }/>
          <Route path="/proyecto/:idx" element={
            <VistaProyectoPage
              userData={userData}
              onBack={() => navigate("/vista")}
            />
          }/>
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Navbar />
        <AnimatedRoutes />
      </AppProvider>
    </ThemeProvider>
  );
}