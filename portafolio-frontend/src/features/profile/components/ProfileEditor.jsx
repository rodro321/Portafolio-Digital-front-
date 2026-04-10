import React, { useState, useEffect } from 'react';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../../auth/hooks/useAuth';   // 👈 Importación correcta
import { AvatarUpload } from './AvatarUpload';

export const ProfileEditor = () => {
  const { profile, loading, error, updateProfile, uploadAvatar } = useProfile();
  const { logout } = useAuth();   // 👈 Ahora sí está definido

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    profesion: '',
    biografia: '',
    telefono: '',
    ciudad: '',
    pais: ''
  });
  const [success, setSuccess] = useState('');
  const [updateError, setUpdateError] = useState('');

  useEffect(() => {
    if (profile) {
      setFormData({
        nombre: profile.nombre || '',
        apellido: profile.apellido || '',
        profesion: profile.profesion || '',
        biografia: profile.biografia || '',
        telefono: profile.telefono || '',
        ciudad: profile.ciudad || '',
        pais: profile.pais || ''
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setUpdateError('');
    const result = await updateProfile(formData);
    if (result.ok) {
      setSuccess('Perfil actualizado correctamente');
    } else {
      setUpdateError(result.mensaje || 'Error al actualizar');
    }
  };

  if (loading) return <div>Cargando perfil...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Editar Perfil</h2>
        <button onClick={logout} style={{ padding: '8px 16px' }}>Cerrar sesión</button>
      </div>

      <AvatarUpload
        onUpload={uploadAvatar}
        currentAvatar={profile?.imagen?.ruta}
      />

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Nombre:</label>
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Apellido:</label>
          <input
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Profesión:</label>
          <input
            name="profesion"
            value={formData.profesion}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Biografía:</label>
          <textarea
            name="biografia"
            value={formData.biografia}
            onChange={handleChange}
            rows="4"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Teléfono:</label>
          <input
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Ciudad:</label>
          <input
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>País:</label>
          <input
            name="pais"
            value={formData.pais}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {success && <p style={{ color: 'green' }}>{success}</p>}
        {updateError && <p style={{ color: 'red' }}>{updateError}</p>}

        <button type="submit" style={{ padding: '10px 20px' }}>Guardar cambios</button>
      </form>
    </div>
  );
};