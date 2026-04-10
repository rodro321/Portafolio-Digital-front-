import api from '../../../lib/api';

export const habilidadService = {
  async getCatalogo() {
    const response = await api.get('/habilidades/catalogo');
    return response.data;
  },

  async getMisHabilidades() {
    const response = await api.get('/habilidades/mis');
    return response.data;
  },

  async agregarHabilidad(idHabilidad, nivel = null) {
    const payload = { id_habilidad: idHabilidad };
    if (nivel !== null) payload.nivel = nivel;
    const response = await api.post('/habilidades/agregar', payload);
    return response.data;
  },

  async actualizarNivel(idHabilidad, nivel) {
    const response = await api.put('/habilidades/actualizar-nivel', { id_habilidad: idHabilidad, nivel });
    return response.data;
  },

  async eliminarHabilidad(idHabilidad) {
    const response = await api.delete('/habilidades/eliminar', { data: { id_habilidad: idHabilidad } });
    return response.data;
  }
};