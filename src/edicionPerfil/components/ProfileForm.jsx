import { useState } from "react";
import { defaultProfileData } from "../interfaces/profile.interface";
import { validateProfileData, validateProfileImage, getInitials } from "../services/profile.service";

export default function ProfileForm({ onNext, isDark }) {
  const [step, setStep]       = useState("datos");
  const [data, setData]       = useState(defaultProfileData);
  const [errors, setErrors]   = useState({});
  const [imgError, setImgError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [toast, setToast]     = useState(null);

  const border = isDark ? "#1D283A" : "#E2E8F0";
  const text   = isDark ? "#fff"    : "#111";
  const sub    = isDark ? "#94a3b8" : "#807F81";
  const inp    = {
    background: isDark ? "#1D283A" : "#F8FAFC",
    border: `1px solid ${border}`, color: text,
    borderRadius: 8, padding: "11px 14px",
    fontSize: 15, outline: "none", width: "100%",
    boxSizing: "border-box",
  };
  const lbl = { color: sub, fontSize: 13, marginBottom: 4, display: "block" };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors(er => ({ ...er, [e.target.name]: undefined }));
  };

  const handleNext = () => {
    const errs = validateProfileData(data);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    showToast("Perfil actualizado correctamente");
    setTimeout(() => setStep("foto"), 1200);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const err = validateProfileImage(file);
    if (err) { setImgError(err); return; }
    setImgError(null);
    setPreview(URL.createObjectURL(file));
    setData({ ...data, foto: file });
  };

  const handleFinish = () => onNext({ ...data, preview });

  const initials = getInitials(data.nombreCompleto, data.apellidoCompleto);

  return (
    <div style={{ position: "relative" }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
          background: toast.type === "success" ? "#16a34a" : "#ef4444",
          color: "#fff", borderRadius: 8, padding: "10px 24px",
          fontWeight: 600, fontSize: 14, zIndex: 999,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}>
          {toast.msg}
        </div>
      )}

      {step === "datos" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { name: "nombreCompleto",   label: "Nombre Completo" },
            { name: "apellidoCompleto", label: "Apellido Completo" },
            { name: "titulo",           label: "Titulo / Rol" },
          ].map(({ name, label }) => (
            <div key={name}>
              <label style={lbl}>{label}</label>
              <input
                style={{ ...inp, borderColor: errors[name] ? "#ef4444" : border }}
                name={name} type="text"
                value={data[name]} onChange={handleChange}
              />
              {errors[name] && (
                <span style={{ color: "#ef4444", fontSize: 12, marginTop: 3, display: "block" }}>
                  {errors[name]}
                </span>
              )}
            </div>
          ))}
          <div>
            <label style={lbl}>Breve Biografía</label>
            <textarea
              name="biografia" value={data.biografia} onChange={handleChange} rows={3}
              style={{ ...inp, resize: "vertical", minHeight: 80, maxHeight: 160 }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={handleNext} style={{
              background: "#3B82F6", color: "#fff", border: "none",
              borderRadius: 8, padding: "11px 32px",
              cursor: "pointer", fontWeight: 700, fontSize: 15,
            }}>Siguiente</button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ color: sub, fontSize: 13 }}>Máximo tamaño del archivo 2 MB · Solo JPG/PNG</p>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            {preview ? (
              <img src={preview} alt="perfil"
                style={{ width: 130, height: 130, borderRadius: 12, objectFit: "cover" }} />
            ) : (
              <div style={{
                width: 130, height: 130, background: "#3B82F6", borderRadius: 12,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 40, fontWeight: 700, color: "#fff",
              }}>{initials}</div>
            )}
            <p style={{ color: text, fontWeight: 600 }}>Foto de Perfil</p>
            <p style={{ color: sub, fontSize: 12 }}>Nota: Puedes saltar este paso y agregarlo después</p>

            {imgError && (
              <p style={{
                color: "#ef4444", fontSize: 12, textAlign: "center",
                background: isDark ? "#1D283A" : "#FEE2E2",
                borderRadius: 6, padding: "8px 12px",
              }}>{imgError}</p>
            )}

            <label style={{
              background: "#3B82F6", color: "#fff", borderRadius: 8,
              padding: "10px 28px", cursor: "pointer", fontWeight: 600,
            }}>
              Subir Foto
              <input type="file" accept="image/jpeg,image/png,image/jpg" hidden onChange={handleFile} />
            </label>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <button onClick={() => setStep("datos")} style={{
              background: "#3B82F6", color: "#fff", border: "none",
              borderRadius: 8, padding: "10px 28px", cursor: "pointer", fontWeight: 600,
            }}>Atrás</button>
            <button onClick={handleFinish} style={{
              background: "#3B82F6", color: "#fff", border: "none",
              borderRadius: 8, padding: "10px 28px", cursor: "pointer", fontWeight: 600,
            }}>{preview ? "Finalizar" : "Saltar"}</button>
          </div>
        </div>
      )}
    </div>
  );
}