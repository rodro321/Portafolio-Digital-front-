import { useState } from "react";
import { defaultRegisterForm } from "../interfaces/register.interface";
import { validateRegisterForm } from "../services/register.service";

export default function RegisterForm({ onNext, isDark }) {
  const [form, setForm] = useState(defaultRegisterForm);
  const [errors, setErrors] = useState({});

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = () => {
    const errs = validateRegisterForm(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onNext({ nombre: form.nombre, correo: form.correo });
  };

  const inp = {
    background: isDark ? "#1D283A" : "#F8FAFC",
    border: `1px solid ${isDark ? "#1D283A" : "#E2E8F0"}`,
    color: isDark ? "#fff" : "#111",
    borderRadius: 8,
    padding: "12px 14px",
    fontSize: 15,
    outline: "none",
    width: "100%",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {[
        { name: "nombre", placeholder: "Nombre", type: "text" },
        { name: "correo", placeholder: "Correo electrónico", type: "email" },
        { name: "contrasena", placeholder: "Contraseña", type: "password" },
        { name: "confirmarContrasena", placeholder: "Confirmar Contraseña", type: "password" },
      ].map(({ name, placeholder, type }) => (
        <div key={name}>
          <input
            style={inp}
            name={name}
            type={type}
            placeholder={placeholder}
            value={form[name]}
            onChange={handle}
          />
          {errors[name] && <span style={{ color: "#ef4444", fontSize: 12 }}>{errors[name]}</span>}
        </div>
      ))}

      <button
        onClick={submit}
        style={{
          background: "#3B82F6", color: "#fff", border: "none",
          borderRadius: 8, padding: "13px", fontWeight: 700,
          fontSize: 16, cursor: "pointer", marginTop: 4,
        }}
      >
        Registrarse
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "8px 0" }}>
        <hr style={{ flex: 1, borderColor: isDark ? "#1D283A" : "#E2E8F0" }} />
        <span style={{ color: "#807F81" }}>O</span>
        <hr style={{ flex: 1, borderColor: isDark ? "#1D283A" : "#E2E8F0" }} />
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        {["Google", "GitHub"].map((p) => (
          <button key={p} style={{
            flex: 1, padding: "10px", border: `1px solid ${isDark ? "#1D283A" : "#E2E8F0"}`,
            borderRadius: 8, background: isDark ? "#1D283A" : "#F8FAFC",
            color: isDark ? "#fff" : "#111", cursor: "pointer", fontWeight: 600, fontSize: 14,
          }}>
            {p === "Google" ? (
              <span><span style={{ color: "#4285F4" }}>G</span><span style={{ color: "#EA4335" }}>o</span><span style={{ color: "#FBBC05" }}>o</span><span style={{ color: "#4285F4" }}>g</span><span style={{ color: "#34A853" }}>l</span><span style={{ color: "#EA4335" }}>e</span></span>
            ) : "⬤ GitHub"}
          </button>
        ))}
      </div>
    </div>
  );
}