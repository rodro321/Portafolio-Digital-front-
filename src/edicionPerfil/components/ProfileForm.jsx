import { useState } from "react";
import { defaultProfileData } from "../interfaces/profile.interface";
import { validateProfileData, getInitials } from "../services/profile.service";

export default function ProfileForm({ onNext, isDark }) {
  const [step, setStep] = useState("datos"); // "datos" | "foto"
  const [data, setData] = useState(defaultProfileData);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const bg = isDark ? "#020617" : "#D9D9D9";
  const card = isDark ? "#0F172A" : "#fff";
  const text = isDark ? "#fff" : "#111";
  const sub = isDark ? "#94a3b8" : "#807F81";
  const inp = {
    background: isDark ? "#1D283A" : "#F8FAFC",
    border: `1px solid ${isDark ? "#1D283A" : "#E2E8F0"}`,
    color: text, borderRadius: 8, padding: "11px 14px",
    fontSize: 15, outline: "none", width: "100%",
  };
  const label = { color: sub, fontSize: 13, marginBottom: 4, display: "block" };

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleNext = () => {
    const errs = validateProfileData(data);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep("foto");
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setData({ ...data, foto: file });
  };

  const handleFinish = () => onNext({ ...data, preview });

  const initials = getInitials(data.nombreCompleto, data.apellidoCompleto);

  if (step === "foto") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{
          background: "#3B82F6", borderRadius: 8,
          padding: "14px 20px",
        }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Suba su Foto de Perfil en Formato JPG.</div>
        </div>
        <p style={{ color: sub, fontSize: 13 }}>Maximo tamaño del archivo 2mb</p>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          {preview ? (
            <img src={preview} alt="perfil" style={{ width: 130, height: 130, borderRadius: 12, objectFit: "cover" }} />
          ) : (
            <div style={{
              width: 130, height: 130, background: "#3B82F6", borderRadius: 12,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 40, fontWeight: 700, color: "#fff",
            }}>
              {initials}
            </div>
          )}
          <p style={{ color: text, fontWeight: 600 }}>Foto de Perfil</p>
          <p style={{ color: sub, fontSize: 12 }}>Nota: Puedes saltar este paso y agregarlo despues</p>

          <label style={{
            background: "#3B82F6", color: "#fff", borderRadius: 8,
            padding: "10px 28px", cursor: "pointer", fontWeight: 600,
          }}>
            Subir Foto
            <input type="file" accept="image/jpeg" hidden onChange={handleFile} />
          </label>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
          <button onClick={() => setStep("datos")} style={{
            background: "#3B82F6", color: "#fff", border: "none",
            borderRadius: 8, padding: "10px 28px", cursor: "pointer", fontWeight: 600,
          }}>Atras</button>
          <button onClick={handleFinish} style={{
            background: "#3B82F6", color: "#fff", border: "none",
            borderRadius: 8, padding: "10px 28px", cursor: "pointer", fontWeight: 600,
          }}>{preview ? "Finalizar" : "Saltar"}</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {[
        { name: "nombreCompleto", label: "Nombre Completo", type: "text" },
        { name: "apellidoCompleto", label: "Apellido Completo", type: "text" },
        { name: "titulo", label: "Titulo/ Rol", type: "text" },
      ].map(({ name, label: lbl, type }) => (
        <div key={name}>
          <label style={label}>{lbl}</label>
          <input style={inp} name={name} type={type}
            value={data[name]} onChange={handleChange} />
          {errors[name] && <span style={{ color: "#ef4444", fontSize: 12 }}>{errors[name]}</span>}
        </div>
      ))}
      <div>
        <label style={label}>Breve Biografía</label>
        <textarea
          name="biografia"
          value={data.biografia}
          onChange={handleChange}
          rows={3}
          style={{ ...inp, resize: "vertical" }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={handleNext} style={{
          background: "#3B82F6", color: "#fff", border: "none",
          borderRadius: 8, padding: "11px 32px", cursor: "pointer", fontWeight: 700, fontSize: 15,
        }}>Siguiente</button>
      </div>
    </div>
  );
}