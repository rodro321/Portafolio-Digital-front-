import { getHeroText } from "../services/home.service";
import iconoSol from "../../assets/iconoSol.png";
import iconoLuna from "../../assets/iconoLuna.png";

export default function HeroSection({ isDark, toggleTheme, onRegister, onLogin }) {
  const hero = getHeroText();
  const text  = isDark ? "#fff" : "#111";
  const sub   = isDark ? "#94a3b8" : "#807F81";
  const nav   = isDark ? "#0F172A" : "#fff";
  const border= isDark ? "#1D283A" : "#E2E8F0";

  return (
    <div style={{ minHeight: "100vh", background: isDark ? "#020617" : "#f1f5f9" }}>

      {/* NAVBAR */}
      <nav style={{
        background: nav,
        borderBottom: `1px solid ${border}`,
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 32px",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, background: "#3B82F6",
            borderRadius: 6, display: "flex", alignItems: "center",
            justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14,
          }}>P</div>
          <span style={{ color: text, fontWeight: 700, fontSize: 17 }}>PortaGen</span>
        </div>

        {/* Nav derecha */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <button onClick={onLogin} style={{
            background: "none", border: "none", cursor: "pointer",
            color: text, fontWeight: 600, fontSize: 14,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            → Iniciar Sesión
          </button>
          <button onClick={toggleTheme} style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
          }}>
            <img
              src={isDark ? iconoSol : iconoLuna}
              alt="tema"
              style={{ width: 28, height: 28 }}
            />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "60px 48px",
        maxWidth: 1200, margin: "0 auto",
        gap: 40, flexWrap: "wrap",
      }}>
        {/* Texto izquierda */}
        <div style={{ flex: "1 1 420px" }}>
          <h1 style={{
            color: text, fontWeight: 900,
            fontSize: "clamp(36px, 6vw, 64px)",
            lineHeight: 1.05, marginBottom: 8,
            fontFamily: "'Segoe UI', sans-serif",
          }}>
            {hero.title1}<br />
            {hero.title2}<br />
            <span style={{ color: "#3B82F6" }}>{hero.highlight}<br />{hero.title3}</span>
          </h1>

          <p style={{
            color: sub, fontSize: 15, lineHeight: 1.7,
            maxWidth: 440, margin: "20px 0 36px",
          }}>
            {hero.description}
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button onClick={onRegister} style={{
              background: "#3B82F6", color: "#fff",
              border: "none", borderRadius: 8,
              padding: "13px 28px", cursor: "pointer",
              fontWeight: 700, fontSize: 15,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              Registrar Cuenta
            </button>
            <button onClick={onLogin} style={{
              background: isDark ? "#1D283A" : "#E2E8F0",
              color: text,
              border: "none", borderRadius: 8,
              padding: "13px 28px", cursor: "pointer",
              fontWeight: 700, fontSize: 15,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              → Iniciar Sesión
            </button>
          </div>
        </div>

        {/* Imagen derecha */}
        <div style={{ flex: "1 1 380px", position: "relative" }}>
          <div style={{
            borderRadius: 14, overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          }}>
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&q=80"
              alt="coding"
              style={{ width: "100%", display: "block", objectFit: "cover", height: 280 }}
            />
          </div>

          {/* Badge */}
          <div style={{
            position: "absolute", bottom: -16, right: 16,
            background: isDark ? "#0F172A" : "#fff",
            border: `1px solid ${border}`,
            borderRadius: 10, padding: "12px 18px",
            display: "flex", alignItems: "center", gap: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          }}>
            <div style={{
              width: 36, height: 36, background: "#16a34a",
              borderRadius: 8, display: "flex",
              alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 800, fontSize: 14,
            }}>{`</>`}</div>
            <div>
              <div style={{ color: text, fontWeight: 700, fontSize: 14 }}>Portafolio Compilado</div>
              <div style={{ color: sub, fontSize: 12 }}>Listo para compartir con reclutadores</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}