import api from '../../../lib/api';

export const profileService = {
  async getProfile() {
    const response = await api.get('/api/perfil');   // 👈 Corregido
    return response.data;
  },

  async updateProfile(data) {
    const response = await api.put('/api/perfil', data);
    return response.data;
  },

  async changePassword(currentPassword, newPassword) {
    const response = await api.post('/api/perfil/password', {
      current_password: currentPassword,
      new_password: newPassword
    });
    return response.data;
  },

  async uploadAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await api.post('/api/perfil/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  async deactivateAccount() {
    const response = await api.delete('/api/perfil/deactivate');
    return response.data;
  }
};