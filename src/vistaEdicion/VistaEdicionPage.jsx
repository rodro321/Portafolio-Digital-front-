import "./index.css";
import { useTheme } from "../context/ThemeContext";
import VistaModule from "./modules/VistaModule";

export default function VistaEdicionPage({ userData, onUpdate }) {
  const { isDark, toggleTheme } = useTheme();
  const bg = isDark ? "#020617" : "#ffffff";

  const handleNavigateToAddSkill = (tipo) => {
    alert(`Aquí irías al formulario de Añadir Habilidad ${tipo === "tecnica" ? "Técnica" : "Blanda"}`);
    // Reemplaza el alert con tu navegación real cuando crees esos módulos
  };

  return (
    <div className="vista-page" style={{ background: bg }}>
      <button onClick={toggleTheme} style={{
        position: "fixed", top: 16, right: 16, zIndex: 100,
        background: isDark ? "#1D283A" : "#D9D9D9",
        border: "none", borderRadius: 8, padding: "10px 12px", cursor: "pointer", fontSize: 18,
      }}>
        {isDark ? "☀️" : "🌙"}
      </button>

      <VistaModule
        userData={userData}
        isDark={isDark}
        onNavigateToAddSkill={handleNavigateToAddSkill}
      />
    </div>
  );
}