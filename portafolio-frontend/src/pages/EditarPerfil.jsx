import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000/api";

export default function EditarPerfil({ token }) {
  const [perfil, setPerfil] = useState({
    nombre: "", apellido: "", profesion: "",
    biografia: "", telefono: "", ciudad: "", pais: ""
  });
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
  axios.get(`${API}/perfil`, { headers })
    .then(res => {
      const data = res.data;
      if (data.ok && data.perfil) {
        setPerfil(data.perfil);
      } else {
        setPerfil(data);
      }
    })
    .catch(() => setError("Error al cargar el perfil"));
}, []);

  const handleChange = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const handleFoto = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;
    if (!["image/jpeg", "image/png"].includes(archivo.type)) {
      setError("El archivo debe ser una imagen en formato JPG o PNG");
      return;
    }
    if (archivo.size > 2 * 1024 * 1024) {
      setError("La imagen no debe superar los 2 MB");
      return;
    }
    setError("");
    setFoto(archivo);
    setPreview(URL.createObjectURL(archivo));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!perfil.nombre.trim()) {
      setError("El nombre completo es obligatorio");
      return;
    }
    try {
      await axios.put(`${API}/perfil`, perfil, { headers });
      if (foto) {
        const formData = new FormData();
        formData.append("avatar", foto);
        await axios.post(`${API}/perfil/avatar`, formData, { headers });
      }
      setMensaje("Perfil actualizado correctamente");
      setError("");
    } catch {
      setError("Error al guardar el perfil");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 24 }}>
      <h2>Editar Perfil</h2>
      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre completo *</label>
          <input name="nombre" value={perfil.nombre || ""} onChange={handleChange} style={{ display: "block", width: "100%", marginBottom: 12 }} />
        </div>
        <div>
          <label>Apellido</label>
          <input name="apellido" value={perfil.apellido || ""} onChange={handleChange} style={{ display: "block", width: "100%", marginBottom: 12 }} />
        </div>
        <div>
          <label>Profesión</label>
          <input name="profesion" value={perfil.profesion || ""} onChange={handleChange} style={{ display: "block", width: "100%", marginBottom: 12 }} />
        </div>
        <div>
          <label>Biografía</label>
          <textarea name="biografia" value={perfil.biografia || ""} onChange={handleChange} rows={4} style={{ display: "block", width: "100%", marginBottom: 12 }} />
        </div>
        <div>
          <label>Teléfono</label>
          <input name="telefono" value={perfil.telefono || ""} onChange={handleChange} style={{ display: "block", width: "100%", marginBottom: 12 }} />
        </div>
        <div>
          <label>Ciudad</label>
          <input name="ciudad" value={perfil.ciudad || ""} onChange={handleChange} style={{ display: "block", width: "100%", marginBottom: 12 }} />
        </div>
        <div>
          <label>País</label>
          <input name="pais" value={perfil.pais || ""} onChange={handleChange} style={{ display: "block", width: "100%", marginBottom: 12 }} />
        </div>
        <div>
          <label>Foto de perfil (JPG o PNG, máx 2MB)</label>
          <input type="file" accept="image/jpeg,image/png" onChange={handleFoto} style={{ display: "block", marginBottom: 12 }} />
          {preview && <img src={preview} alt="preview" style={{ width: 100, height: 100, objectFit: "cover", borderRadius: "50%" }} />}
        </div>
        <button type="submit" style={{ padding: "10px 24px", marginTop: 12 }}>Guardar perfil</button>
      </form>
    </div>
  );
}