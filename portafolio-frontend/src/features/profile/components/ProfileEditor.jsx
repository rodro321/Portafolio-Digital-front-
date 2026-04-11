import React, { useState, useEffect } from 'react';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../../auth/hooks/useAuth';
import { AvatarUpload } from './AvatarUpload';

export const ProfileEditor = () => {
  const { profile, loading, error, updateProfile, uploadAvatar } = useProfile();
  const { logout } = useAuth();

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
  const [avatarFile, setAvatarFile] = useState(null);
  const [saving, setSaving] = useState(false);

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

  const handleFileSelect = (file) => {
    setAvatarFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setUpdateError('');
    setSaving(true);

    try {
      // 1. Si hay nuevo avatar, subirlo primero
      if (avatarFile) {
        const avatarResult = await uploadAvatar(avatarFile);
        if (!avatarResult.ok) {
          setUpdateError(avatarResult.mensaje || 'Error al subir la foto');
          setSaving(false);
          return;
        }
      }

      // 2. Actualizar el resto del perfil
      const result = await updateProfile(formData);
      if (result.ok) {
        setSuccess('Perfil actualizado correctamente');
        setAvatarFile(null); // Limpiar selección de archivo
      } else {
        setUpdateError(result.mensaje || 'Error al actualizar');
      }
    } catch (err) {
      setUpdateError('Error inesperado');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Cargando perfil...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Perfil</h2>
      </div>

      <AvatarUpload
        currentAvatar={profile?.imagen?.ruta ? 
          `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${profile.imagen.ruta}` 
          : null}
        nombre={profile?.nombre}
        onFileSelect={handleFileSelect}
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

        <button type="submit" disabled={saving} style={{ padding: '10px 20px' }}>
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>
    </div>
  );
};