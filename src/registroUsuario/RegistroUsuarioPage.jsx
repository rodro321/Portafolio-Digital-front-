import "./index.css";
import { useTheme } from "../context/ThemeContext";
import RegisterModule from "./modules/RegisterModule";
import iconoSol from "../assets/iconoSol.png";
import iconoLuna from "../assets/iconoLuna.png";

export default function RegistroUsuarioPage({ onNext }) {
  const { isDark, toggleTheme } = useTheme();

  const bg = isDark ? "#020617" : "#D9D9D9";
  const card = isDark ? "#0F172A" : "#fff";
  const text = isDark ? "#fff" : "#111";
  const sub = isDark ? "#94a3b8" : "#807F81";

  return (
    <div style={{
      minHeight: "100vh", background: bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, position: "relative",
    }}>
      <button
        onClick={toggleTheme}
        style={{
          position: "fixed", top: 16, right: 16,
          background: isDark ? "#1D283A" : "#D9D9D9",
          border: "none", borderRadius: 8,
          padding: "10px 12px", cursor: "pointer", fontSize: 18,
        }}
      >
        <img
          src={isDark ? iconoSol : iconoLuna}
          alt="Toggle Theme"
          style={{ width: 40, height: 40, display: "block" }}
        />
      </button>

      <div className="reg-card" style={{ background: card }}>
        <div style={{
          background: "#3B82F6", borderRadius: 10,
          padding: "14px 20px", marginBottom: 12, textAlign: "center",
        }}>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 700 }}>Crear Cuenta</h1>
        </div>
        <p style={{ color: sub, textAlign: "center", marginBottom: 20 }}>
          Regístrate para continuar
        </p>
        <RegisterModule onNext={onNext} isDark={isDark} />
      </div>
    </div>
  );
}