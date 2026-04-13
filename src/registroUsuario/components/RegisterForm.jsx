import { useState } from "react";
import { defaultRegisterForm } from "../interfaces/register.interface";
import { validateRegisterForm } from "../services/register.service";
import { motion } from "framer-motion";

export default function RegisterForm({ onNext, isDark }) {
  const [form, setForm] = useState(defaultRegisterForm);
  const [errors, setErrors] = useState({});
  const [githubStatus, setGithubStatus] = useState(null); // null | "loading" | "cancelled"

  const border = isDark ? "#1D283A" : "#E2E8F0";
  const text   = isDark ? "#fff"    : "#111";
  const sub    = isDark ? "#94a3b8" : "#807F81";

  const inp = {
    background: isDark ? "#1D283A" : "#F8FAFC",
    border: `1px solid ${border}`,
    color: text, borderRadius: 8,
    padding: "12px 14px", fontSize: 15,
    outline: "none", width: "100%",
    boxSizing: "border-box",
  };

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors(er => ({ ...er, [e.target.name]: undefined }));
  };

  const submit = () => {
    const errs = validateRegisterForm(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onNext({ nombre: form.nombre, correo: form.correo });
  };

  // Simulación flujo GitHub (sin backend real aún)
  const handleGitHub = () => {
    setGithubStatus("loading");
    // Simula ventana que el usuario puede cerrar
    const win = window.open("about:blank", "_blank", "width=500,height=600");
    if (!win) { setGithubStatus("cancelled"); return; }

    // Simula que el usuario cierra la ventana (cancelled)
    const check = setInterval(() => {
      if (win.closed) {
        clearInterval(check);
        setGithubStatus("cancelled");
        setTimeout(() => setGithubStatus(null), 3000);
      }
    }, 500);

    // En producción aquí iría: window.location.href = `${API}/auth/github`
  };
   
  /*Contenedor principal*/
  return (
    <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease: "easeOut" }}
    style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {[
        { name: "nombre",              placeholder: "Nombre",              type: "text"     },
        { name: "correo",              placeholder: "Correo electrónico",  type: "email"    },
        { name: "contrasena",          placeholder: "Contraseña",          type: "password" },
        { name: "confirmarContrasena", placeholder: "Confirmar Contraseña",type: "password" },
      ].map(({ name, placeholder, type }) => (
        <div key={name}>
          <input
            style={{
              ...inp,
              borderColor: errors[name] ? "#ef4444" : border,
            }}
            name={name} type={type} placeholder={placeholder}
            value={form[name]} onChange={handle}
          />
          {errors[name] && (
            <span style={{ color: "#ef4444", fontSize: 12, marginTop: 3, display: "block" }}>
              {errors[name]}
            </span>
          )}
        </div>
      ))}

      <button onClick={submit} style={{
        background: "#3B82F6", color: "#fff", border: "none",
        borderRadius: 8, padding: "13px", fontWeight: 700,
        fontSize: 16, cursor: "pointer", marginTop: 4,
        width: "100%",
      }}>
        Registrarse
      </button>

      {/* Divisor */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0" }}>
        <hr style={{ flex: 1, borderColor: border }} />
        <span style={{ color: sub, fontSize: 13 }}>O continúa con</span>
        <hr style={{ flex: 1, borderColor: border }} />
      </div>

      {/* GitHub */}
      <button onClick={handleGitHub} disabled={githubStatus === "loading"} style={{
        width: "100%", padding: "11px",
        border: `1px solid ${border}`,
        borderRadius: 8,
        background: isDark ? "#1D283A" : "#F8FAFC",
        color: text, cursor: "pointer",
        fontWeight: 700, fontSize: 14,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        opacity: githubStatus === "loading" ? 0.7 : 1,
      }}>
        {/* Ícono GitHub SVG */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill={isDark ? "#fff" : "#111"}>
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
            0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755
            -1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236
            1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466
            -1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176
            0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405
            2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23
            1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22
            0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295
            24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        {githubStatus === "loading" ? "Abriendo GitHub..." : "Continuar con GitHub"}
      </button>

      {/* Feedback cancelación */}
      {githubStatus === "cancelled" && (
        <p style={{
          color: sub, fontSize: 12, textAlign: "center",
          background: isDark ? "#1D283A" : "#F1F5F9",
          borderRadius: 6, padding: "8px",
        }}>
          Autorización cancelada. Puedes intentarlo de nuevo.
        </p>
      )}
    </motion.div>
  );
}