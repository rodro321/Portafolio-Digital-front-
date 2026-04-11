import { useState } from "react";
import { TECH_SUGGESTIONS, SOFT_SUGGESTIONS } from "../interfaces/habilidad.interface";
import { buildTechSkill, buildSoftSkill, isCustom } from "../services/habilidad.service";

export default function SkillSelector({ isDark, onBack, onSave }) {
  const [selectedTech, setSelectedTech]   = useState(null);
  const [techLevel, setTechLevel]         = useState(50);
  const [customTech, setCustomTech]       = useState("");
  const [selectedSoft, setSelectedSoft]   = useState(null);
  const [customSoft, setCustomSoft]       = useState("");

  const text   = isDark ? "#fff" : "#111";
  const sub    = isDark ? "#94a3b8" : "#807F81";
  const border = isDark ? "#1D283A" : "#E2E8F0";
  const bg     = isDark ? "#0F172A" : "#F8FAFC";
  const chip   = isDark ? "#1D283A" : "#fff";

  const chipStyle = (active) => ({
    padding: "7px 16px",
    border: `1px solid ${active ? "#3B82F6" : border}`,
    borderRadius: 6,
    background: active ? "#3B82F6" : chip,
    color: active ? "#fff" : text,
    cursor: "pointer", fontSize: 13, fontWeight: active ? 700 : 400,
    transition: "all 0.15s",
  });

  const handleSave = () => {
    const techName = isCustom(selectedTech) ? customTech : selectedTech;
    const softName = isCustom(selectedSoft) ? customSoft : selectedSoft;
    onSave({
      tech: techName ? buildTechSkill(techName, techLevel) : null,
      soft: softName ? buildSoftSkill(softName) : null,
    });
  };

  return (
    <div style={{
      maxWidth: 560, margin: "0 auto",
      padding: "24px 16px 40px",
      display: "flex", flexDirection: "column", gap: 32,
    }}>

      {/* TÉCNICAS */}
      <div>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          marginBottom: 14,
        }}>
          <span style={{ color: "#3B82F6", fontSize: 22, fontWeight: 700 }}>+</span>
          <span style={{ color: text, fontWeight: 700, fontSize: 18 }}>Añadir Habilidad Tecnica</span>
        </div>

        <div style={{
          border: `1px solid ${border}`, borderRadius: 10,
          padding: "16px", background: bg,
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
            {TECH_SUGGESTIONS.map((s) => (
              <button key={s} style={chipStyle(selectedTech === s)}
                onClick={() => setSelectedTech(s)}>
                {s}
              </button>
            ))}
          </div>

          {/* Slider si hay selección */}
          {selectedTech && (
            <div style={{
              background: isDark ? "#020617" : "#E2E8F0",
              border: `1px solid ${border}`,
              borderRadius: 8, padding: "12px 16px", marginTop: 8,
            }}>
              <p style={{ color: sub, fontSize: 12, marginBottom: 8 }}>
                Añadir Nivel de la habilidad
              </p>
              <input
                type="range" min={0} max={100}
                value={techLevel}
                onChange={(e) => setTechLevel(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#3B82F6" }}
              />
              <span style={{ color: text, fontWeight: 700, fontSize: 15 }}>{techLevel}%</span>

              {isCustom(selectedTech) && (
                <input
                  placeholder="Nombre de la habilidad"
                  value={customTech}
                  onChange={(e) => setCustomTech(e.target.value)}
                  style={{
                    marginTop: 10, width: "100%",
                    background: isDark ? "#1D283A" : "#fff",
                    border: `1px solid ${border}`,
                    borderRadius: 6, padding: "8px 12px",
                    color: text, fontSize: 14, outline: "none",
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* BLANDAS */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span style={{ color: "#3B82F6", fontSize: 22, fontWeight: 700 }}>+</span>
          <span style={{ color: text, fontWeight: 700, fontSize: 18 }}>Añadir Habilidad Blanda</span>
        </div>

        <div style={{
          border: `1px solid ${border}`, borderRadius: 10,
          padding: "16px", background: bg,
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {SOFT_SUGGESTIONS.map((s) => (
              <button key={s} style={chipStyle(selectedSoft === s)}
                onClick={() => setSelectedSoft(s)}>
                {s}
              </button>
            ))}
          </div>

          {isCustom(selectedSoft) && (
            <input
              placeholder="Nombre de la habilidad blanda"
              value={customSoft}
              onChange={(e) => setCustomSoft(e.target.value)}
              style={{
                marginTop: 12, width: "100%",
                background: isDark ? "#1D283A" : "#fff",
                border: `1px solid ${border}`,
                borderRadius: 6, padding: "8px 12px",
                color: text, fontSize: 14, outline: "none",
              }}
            />
          )}
        </div>
      </div>

      {/* ACCIONES */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={onBack} style={{
          background: "#3B82F6", color: "#fff", border: "none",
          borderRadius: 8, padding: "10px 28px",
          cursor: "pointer", fontWeight: 700, fontSize: 15,
        }}>Atras</button>

        {(selectedTech || selectedSoft) && (
          <button onClick={handleSave} style={{
            background: "#16a34a", color: "#fff", border: "none",
            borderRadius: 8, padding: "10px 28px",
            cursor: "pointer", fontWeight: 700, fontSize: 15,
          }}>Guardar</button>
        )}
      </div>
    </div>
  );
}