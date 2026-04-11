import { useState } from "react";
import { addTechSkill, addSoftSkill } from "../services/vista.service";

export default function SkillsEditor({ userData, isDark, onNavigateToAddSkill }) {
  const [techSkills, setTechSkills] = useState([
    { nombre: "React", nivel: 90 },
    { nombre: "Node", nivel: 50 },
  ]);
  const [softSkills, setSoftSkills] = useState(["Lider"]);

  const text = isDark ? "#fff" : "#111";
  const sub = isDark ? "#94a3b8" : "#807F81";
  const border = isDark ? "#1D283A" : "#E2E8F0";
  const box = isDark ? "#0F172A" : "#F8FAFC";

  const initials = userData?.preview ? null
    : `${(userData?.nombreCompleto || "")[0] || ""}${(userData?.apellidoCompleto || "")[0] || ""}`.toUpperCase() || "??";

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 16px 40px" }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "14px 0", borderBottom: `1px solid ${border}`, marginBottom: 32,
      }}>
        {userData?.preview ? (
          <img src={userData.preview} style={{ width: 38, height: 38, borderRadius: 8, objectFit: "cover" }} alt="" />
        ) : (
          <div style={{
            width: 38, height: 38, background: "#3B82F6", borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontSize: 14,
          }}>{initials}</div>
        )}
        <span style={{ color: text, fontWeight: 600, fontSize: 15 }}>
          {userData?.nombreCompleto} {userData?.apellidoCompleto}
        </span>
      </div>

      {/* Título y bio */}
      <h1 style={{ color: text, fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 16 }}>
        {userData?.titulo || "Tu Título"}
      </h1>
      <p style={{ color: sub, textAlign: "center", marginBottom: 36, lineHeight: 1.6 }}>
        {userData?.biografia || "Tu biografía aparecerá aquí."}
      </p>

      {/* Habilidades Técnicas */}
      <div style={{ marginBottom: 24 }}>
        <button
          onClick={() => onNavigateToAddSkill("tecnica")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#3B82F6", fontWeight: 700, fontSize: 17,
            display: "flex", alignItems: "center", gap: 8, marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 22 }}>+</span> Añadir Habilidad Tecnica
        </button>
        <div style={{
          border: `1px solid ${border}`, borderRadius: 10,
          padding: "16px 20px", background: box,
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 24px",
        }}>
          {techSkills.map((s, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ color: sub, fontSize: 13 }}>{s.nombre}</span>
                <span style={{ color: sub, fontSize: 13 }}>{s.nivel}%</span>
              </div>
              <div style={{ height: 6, background: isDark ? "#1D283A" : "#E2E8F0", borderRadius: 99 }}>
                <div style={{
                  height: "100%", width: `${s.nivel}%`,
                  background: "#3B82F6", borderRadius: 99,
                  transition: "width 0.4s ease",
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Habilidades Blandas */}
      <div>
        <button
          onClick={() => onNavigateToAddSkill("blanda")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#3B82F6", fontWeight: 700, fontSize: 17,
            display: "flex", alignItems: "center", gap: 8, marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 22 }}>+</span> Añadir Habilidad Blanda
        </button>
        <div style={{
          border: `1px solid ${border}`, borderRadius: 10,
          padding: "16px 20px", background: box,
          display: "flex", flexWrap: "wrap", gap: 10,
        }}>
          {softSkills.map((s, i) => (
            <span key={i} style={{
              border: `1px solid ${border}`, borderRadius: 6,
              padding: "6px 16px", color: text, fontSize: 14,
            }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}