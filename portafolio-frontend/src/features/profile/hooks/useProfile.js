import { useState, useEffect } from 'react';
import { profileService } from '../services/profileService';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      const result = await profileService.getProfile();
      if (result.ok) {
        setProfile(result.perfil);
      } else {
        setError(result.mensaje);
      }
    } catch (err) {
      setError('Error al cargar perfil');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (data) => {
    const result = await profileService.updateProfile(data);
    if (result.ok) {
      setProfile(result.perfil);
      alert('Cambios guardados correctamente');
    }
    return result;
  };

  const changePassword = async (current, newPass) => {
    return await profileService.changePassword(current, newPass);
  };

  const uploadAvatar = async (file) => {
    const result = await profileService.uploadAvatar(file);
    if (result.ok) {
      fetchProfile(); // recargar para obtener nueva imagen
    }
    return result;
  };

  const deactivate = async () => {
    const result = await profileService.deactivateAccount();
    if (result.ok) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return result;
  };

  return { profile, loading, error, updateProfile, changePassword, uploadAvatar, deactivate };
};