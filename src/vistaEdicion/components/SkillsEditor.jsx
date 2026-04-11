export default function SkillsEditor({ userData, isDark, onGoToHabilidad, onGoToProyecto, onBack }) {
  const text   = isDark ? "#fff" : "#111";
  const sub    = isDark ? "#94a3b8" : "#807F81";
  const border = isDark ? "#1D283A" : "#E2E8F0";
  const box    = isDark ? "#0F172A" : "#F8FAFC";

  const techSkills = userData?.techSkills || [];
  const softSkills = userData?.softSkills || [];
  const proyectos  = userData?.proyectos  || [];

  const initials = userData?.preview ? null
    : `${(userData?.nombreCompleto || "")[0] || ""}${(userData?.apellidoCompleto || "")[0] || ""}`.toUpperCase() || "??";

  const btnAdd = {
    background: "none", border: "none", cursor: "pointer",
    color: "#3B82F6", fontWeight: 700, fontSize: 17,
    display: "flex", alignItems: "center", gap: 8, marginBottom: 12, padding: 0,
  };

  const section = {
    border: `1px solid ${border}`, borderRadius: 10,
    padding: "16px 20px", background: box,
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 16px 60px" }}>

      {/* HEADER */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "14px 0", borderBottom: `1px solid ${border}`, marginBottom: 32,
      }}>
        {/* Flecha atrás */}
        <button onClick={onBack} style={{
          background: "none", border: "none", cursor: "pointer",
          color: "#3B82F6", fontSize: 22, fontWeight: 700, padding: "0 8px 0 0",
        }}>←</button>

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

      {/* TÍTULO Y BIO */}
      <h1 style={{ color: text, fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 16 }}>
        {userData?.titulo || "Tu Título"}
      </h1>
      <p style={{ color: sub, textAlign: "center", marginBottom: 36, lineHeight: 1.6 }}>
        {userData?.biografia || "Tu biografía aparecerá aquí."}
      </p>

      {/* HABILIDADES TÉCNICAS */}
      <div style={{ marginBottom: 28 }}>
        <button style={btnAdd} onClick={onGoToHabilidad}>
          <span style={{ fontSize: 22 }}>+</span> Añadir Habilidad Tecnica
        </button>
        <div style={section}>
          {techSkills.length === 0 ? (
            <p style={{ color: sub, fontSize: 13 }}>Aún no hay habilidades técnicas.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 24px" }}>
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
          )}
        </div>
      </div>

      {/* HABILIDADES BLANDAS */}
      <div style={{ marginBottom: 28 }}>
        <button style={btnAdd} onClick={onGoToHabilidad}>
          <span style={{ fontSize: 22 }}>+</span> Añadir Habilidad Blanda
        </button>
        <div style={section}>
          {softSkills.length === 0 ? (
            <p style={{ color: sub, fontSize: 13 }}>Aún no hay habilidades blandas.</p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {softSkills.map((s, i) => (
                <span key={i} style={{
                  border: `1px solid ${border}`, borderRadius: 6,
                  padding: "6px 16px", color: text, fontSize: 14,
                }}>{s}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* PROYECTOS */}
      <div style={{ marginBottom: 28 }}>
        <button style={btnAdd} onClick={onGoToProyecto}>
          <span style={{ fontSize: 22 }}>+</span> Añadir Proyecto
        </button>
        <div style={section}>
          {proyectos.length === 0 ? (
            <p style={{ color: sub, fontSize: 13 }}>Aún no hay proyectos añadidos.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {proyectos.map((p, i) => (
                <div key={i} style={{
                  border: `1px solid ${border}`, borderRadius: 8,
                  padding: "14px 16px", background: isDark ? "#020617" : "#fff",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ color: text, fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{p.titulo}</p>
                      <p style={{ color: sub, fontSize: 13, marginBottom: 6 }}>{p.descripcion}</p>
                      {p.link && (
                        <a href={p.link} target="_blank" rel="noreferrer"
                          style={{ color: "#3B82F6", fontSize: 12 }}>
                          {p.link}
                        </a>
                      )}
                    </div>
                    {p.imagenes?.[0] && (
                      <img src={p.imagenes[0]} alt="preview"
                        style={{ width: 64, height: 64, borderRadius: 8, objectFit: "cover", marginLeft: 12 }} />
                    )}
                  </div>
                  {p.habilidades?.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                      {p.habilidades.map((h, j) => (
                        <span key={j} style={{
                          background: "#3B82F6", color: "#fff",
                          borderRadius: 4, padding: "3px 10px", fontSize: 12,
                        }}>{h}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}