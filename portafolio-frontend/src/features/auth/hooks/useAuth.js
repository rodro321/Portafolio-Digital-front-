import { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const result = await authService.login(credentials);
    if (result.ok) {
      localStorage.setItem('token', result.token);
      setUser(result.user);
      navigate('/perfil');
    }
    return result;
  };

  const register = async (userData) => {
    try {
      const result = await authService.register(userData);
      if (result.ok) {
        localStorage.setItem('token', result.token);
        setUser(result.user);
        navigate('/perfil');
      }
      return result; // Devuelve el objeto completo (con ok, mensaje, etc.)
    } catch (error) {
      // Si es un error de red o del servidor (4xx, 5xx)
      if (error.response) {
        return error.response.data;
      }
      return { ok: false, mensaje: 'Error de conexión' };
    }
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const loginWithGitHub = () => {
    window.location.href = 'http://localhost:8000/api/auth/github/redirect';
  };

  return { user, loading, login, register, logout, loginWithGitHub };
};