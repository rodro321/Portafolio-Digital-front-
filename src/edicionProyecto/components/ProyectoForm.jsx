import { useState, useRef } from "react";
import { defaultProyecto, TECH_OPTIONS } from "../interfaces/proyecto.interface";
import { validateProyecto } from "../services/proyecto.service";

export default function ProyectoForm({ isDark, onBack, onSave }) {
  const [form, setForm]           = useState(defaultProyecto);
  const [errors, setErrors]       = useState({});
  const [showSkills, setShowSkills] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const fileRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const text   = isDark ? "#fff"     : "#111";
  const sub    = isDark ? "#94a3b8"  : "#807F81";
  const border = isDark ? "#1D283A"  : "#E2E8F0";
  const bg     = isDark ? "#0F172A"  : "#F8FAFC";
  const inp    = {
    background: isDark ? "#1D283A" : "#fff",
    border: `1px solid ${border}`,
    color: text, borderRadius: 6,
    padding: "10px 14px", fontSize: 14,
    outline: "none", width: "100%",
  };
  const lbl = { color: isDark ? "#94a3b8" : "#374151", fontWeight: 700, fontSize: 15, marginBottom: 6, display: "block" };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (idx, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const imgs = [...form.imagenes];
    imgs[idx] = url;
    setForm({ ...form, imagenes: imgs });
  };

  const toggleHabilidad = (h) => {
    const has = form.habilidades.includes(h);
    setForm({
      ...form,
      habilidades: has
        ? form.habilidades.filter(x => x !== h)
        : [...form.habilidades, h],
    });
  };

  const removeHabilidad = (h) => {
    setForm({ ...form, habilidades: form.habilidades.filter(x => x !== h) });
  };

  const handleSave = () => {
    const errs = validateProyecto(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave(form);
  };

  // Carrusel — mostramos 3 slots a la vez de 6 posibles
  const totalSlots = 6;
  const visibleSlots = [carouselIdx, carouselIdx + 1, carouselIdx + 2].filter(i => i < totalSlots);

  return (
    <div style={{ maxWidth: 580, margin: "0 auto", padding: "24px 20px 60px", display: "flex", flexDirection: "column", gap: 22 }}>

      {/* Título sección */}
      <h2 style={{ color: "#3B82F6", fontWeight: 800, fontSize: 20, letterSpacing: 1 }}>
        NUEVO PROYECTO
      </h2>

      {/* Título */}
      <div>
        <label style={lbl}>Titulo</label>
        <input name="titulo" value={form.titulo} onChange={handleChange} style={inp} />
        {errors.titulo && <span style={{ color: "#ef4444", fontSize: 12 }}>{errors.titulo}</span>}
      </div>

      {/* Descripción */}
      <div>
        <label style={lbl}>Descripcion</label>
        <input name="descripcion" value={form.descripcion} onChange={handleChange} style={inp} />
        {errors.descripcion && <span style={{ color: "#ef4444", fontSize: 12 }}>{errors.descripcion}</span>}
      </div>

      {/* Link */}
      <div>
        <label style={lbl}>Link/Enlace del proyecto</label>
        <input name="link" value={form.link} onChange={handleChange} style={inp} placeholder="https://..." />
      </div>

      {/* HABILIDADES */}
      <div>
        <label style={lbl} onClick={() => setShowSkills(s => !s)}>
          {"</>"} Habilidades
        </label>

        <div style={{
          border: `1px solid ${border}`, borderRadius: 8, overflow: "hidden",
        }}>
          {/* Header toggle */}
          <button
            onClick={() => setShowSkills(s => !s)}
            style={{
              width: "100%", background: "#3B82F6", border: "none",
              padding: "10px 16px", cursor: "pointer",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}
          >
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>
              + AÑADIR HABILIDAD
            </span>
            <span style={{ color: "#fff", fontSize: 16 }}>{showSkills ? "^" : "V"}</span>
          </button>

          {/* Grid de opciones */}
          {showSkills && (
            <div style={{ padding: "12px", background: bg }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                {TECH_OPTIONS.map(h => {
                  const selected = form.habilidades.includes(h);
                  return (
                    <button key={h} onClick={() => toggleHabilidad(h)} style={{
                      padding: "5px 14px",
                      border: `1px solid ${selected ? "#3B82F6" : border}`,
                      borderRadius: 4,
                      background: selected ? "#3B82F6" : "transparent",
                      color: selected ? "#fff" : text,
                      cursor: "pointer", fontSize: 13, fontWeight: selected ? 700 : 400,
                    }}>{h}</button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Seleccionadas */}
          {form.habilidades.length > 0 && (
            <div style={{ padding: "10px 12px", background: bg, display: "flex", flexDirection: "column", gap: 6 }}>
              {form.habilidades.map(h => (
                <div key={h} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  border: `1px solid ${border}`, borderRadius: 4,
                  padding: "6px 12px", background: isDark ? "#020617" : "#fff",
                }}>
                  <span style={{ color: text, fontSize: 13 }}>{h}</span>
                  <button onClick={() => removeHabilidad(h)} style={{
                    background: "#ef4444", border: "none", color: "#fff",
                    borderRadius: 4, padding: "2px 8px", cursor: "pointer", fontSize: 13,
                  }}>—</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* EVIDENCIA — carrusel */}
      <div>
        <p style={{ color: "#3B82F6", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Evidencia</p>
        <p style={{ color: sub, fontSize: 12, marginBottom: 12 }}>Minimo 3 imagenes Maximo 6</p>
        {errors.imagenes && <span style={{ color: "#ef4444", fontSize: 12 }}>{errors.imagenes}</span>}

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Flecha izq */}
          <button
            onClick={() => setCarouselIdx(i => Math.max(0, i - 1))}
            disabled={carouselIdx === 0}
            style={{
              background: "none", border: "none", cursor: carouselIdx === 0 ? "default" : "pointer",
              color: carouselIdx === 0 ? "#555" : "#3B82F6", fontSize: 24,
            }}
          >←</button>

          {/* Slots */}
          <div style={{ display: "flex", gap: 10, flex: 1, justifyContent: "center" }}>
            {visibleSlots.map(idx => (
              <div
                key={idx}
                onClick={() => fileRefs[idx].current?.click()}
                style={{
                  width: 130, height: 110,
                  border: `1px solid ${border}`,
                  borderRadius: 8, cursor: "pointer",
                  background: bg,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  overflow: "hidden", flexShrink: 0,
                }}
              >
                {form.imagenes[idx] ? (
                  <img src={form.imagenes[idx]} alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <>
                    <span style={{ color: sub, fontSize: 28 }}>↑</span>
                    <span style={{ color: sub, fontSize: 11 }}>Subir Foto</span>
                  </>
                )}
                <input
                  ref={fileRefs[idx]}
                  type="file" accept="image/*" hidden
                  onChange={(e) => handleImage(idx, e)}
                />
              </div>
            ))}
          </div>

          {/* Flecha der */}
          <button
            onClick={() => setCarouselIdx(i => Math.min(totalSlots - 3, i + 1))}
            disabled={carouselIdx >= totalSlots - 3}
            style={{
              background: "none", border: "none",
              cursor: carouselIdx >= totalSlots - 3 ? "default" : "pointer",
              color: carouselIdx >= totalSlots - 3 ? "#555" : "#3B82F6", fontSize: 24,
            }}
          >→</button>
        </div>
      </div>

      {/* BOTONES */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
        <button onClick={handleSave} style={{
          background: "#3B82F6", color: "#fff", border: "none",
          borderRadius: 8, padding: "12px 40px",
          fontWeight: 700, fontSize: 15, cursor: "pointer",
          letterSpacing: 1,
        }}>
          AGREGAR PROYECTO
        </button>
      </div>

      {/* Atrás */}
      <div>
        <button onClick={onBack} style={{
          background: "#3B82F6", color: "#fff", border: "none",
          borderRadius: 8, padding: "10px 28px",
          fontWeight: 700, fontSize: 14, cursor: "pointer",
        }}>Atras</button>
      </div>
    </div>
  );
}