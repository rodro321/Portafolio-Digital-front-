import { useState, useEffect } from "react";
import axios from "axios";

const USUARIO_ID = 1; // Hardcodeado hasta que HU-01 esté lista

export default function VistaPerfil() {
  const [perfil, setPerfil] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/perfil/${USUARIO_ID}`)
      .then(res => setPerfil(res.data))
      .catch(() => setError("Error al cargar el perfil"));
  }, []);

  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  if (!perfil) return <p style={{ textAlign: "center" }}>Cargando...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 24, textAlign: "center" }}>
      {perfil.foto_perfil ? (
        <img
          src={`http://127.0.0.1:8000/storage/${perfil.foto_perfil}`}
          alt="Foto de perfil"
          style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", marginBottom: 16 }}
        />
      ) : (
        <div style={{ width: 120, height: 120, borderRadius: "50%", background: "#ccc", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>
          👤
        </div>
      )}
      <h1 style={{ marginBottom: 4 }}>{perfil.nombre} {perfil.apellido}</h1>
      <h3 style={{ color: "#666", fontWeight: "normal", marginBottom: 16 }}>{perfil.profesion}</h3>
      <p style={{ marginBottom: 16 }}>{perfil.biografia}</p>
      <p>📍 {perfil.ciudad}, {perfil.pais}</p>
      <p>📞 {perfil.telefono}</p>
    </div>
  );
}