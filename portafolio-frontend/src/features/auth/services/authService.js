import api from '../../../lib/api';

export const authService = {
  async register(userData) {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },

  async login(credentials) {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  },

  async logout() {
    const response = await api.post('/api/auth/logout');   // 👈 Corrección aquí
    return response.data;
  }
};