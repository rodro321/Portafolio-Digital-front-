import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useApp } from "../context/AppContext";
import iconoSol  from "../assets/iconoSol.png";
import iconoLuna from "../assets/iconoLuna.png";

const HIDDEN_ON = ["/", "/registro"];

const LABELS = {
  "/vista":     "Mi Portafolio",
  "/habilidad": "Habilidades",
  "/proyecto":  "Proyectos",
  "/edicion":   "Editar Perfil",
};

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { userData } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  if (HIDDEN_ON.includes(location.pathname)) return null;

  const bg     = isDark ? "#0F172A" : "#fff";
  const border = isDark ? "#1D283A" : "#E2E8F0";
  const text   = isDark ? "#fff"    : "#111";
  const sub    = isDark ? "#94a3b8" : "#807F81";

  const initials =
    `${(userData?.nombreCompleto||"")[0]||""}${(userData?.apellidoCompleto||"")[0]||""}`.toUpperCase() || "PG";

  const label = LABELS[location.pathname] || "";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "sticky", top: 0, zIndex: 200,
        background: bg, borderBottom: `1px solid ${border}`,
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 24px",
        boxShadow: isDark ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <button onClick={() => navigate("/")} style={{
        background: "none", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 30, height: 30, background: "#3B82F6", borderRadius: 6,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: 800, fontSize: 13,
        }}>P</div>
        <span style={{ color: text, fontWeight: 700, fontSize: 15 }}>PortaGen</span>
      </button>

      <span style={{ color: sub, fontSize: 13 }}>{label}</span>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {userData?.preview ? (
          <img src={userData.preview} style={{ width: 32, height: 32, borderRadius: 8, objectFit: "cover" }} alt="" />
        ) : (
          <div style={{
            width: 32, height: 32, background: "#3B82F6", borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontSize: 12,
          }}>{initials}</div>
        )}
        <button onClick={toggleTheme} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <img src={isDark ? iconoSol : iconoLuna} alt="tema" style={{ width: 26, height: 26 }} />
        </button>
      </div>
    </motion.nav>
  );
}