import "./index.css";
import { useTheme } from "../context/ThemeContext";
import HabilidadModule from "./modules/HabilidadModule";

export default function EdicionHabilidadPage({ onBack, onSave }) {
  const { isDark, toggleTheme } = useTheme();
  const bg = isDark ? "#020617" : "#D9D9D9";

  return (
    <div style={{ minHeight: "100vh", background: bg, position: "relative" }}>
      {/* Botón tema */}
      <button onClick={toggleTheme} style={{
        position: "fixed", top: 16, right: 16, zIndex: 100,
        background: "none", border: "none", cursor: "pointer", padding: 0,
      }}>
        {/* Usa tus imágenes aquí igual que en los otros módulos */}
      </button>

      <HabilidadModule
        isDark={isDark}
        onBack={onBack}
        onSave={onSave}
      />
    </div>
  );
}