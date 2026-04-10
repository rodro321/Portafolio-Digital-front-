import { useState, useEffect } from 'react';
import { habilidadService } from '../services/habilidadService';

export const useHabilidades = () => {
  const [habilidades, setHabilidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHabilidades = async () => {
    try {
      const result = await habilidadService.getMisHabilidades();
      if (result.ok) {
        setHabilidades(result.habilidades);
      } else {
        setError(result.mensaje);
      }
    } catch (err) {
      setError('Error al cargar habilidades');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabilidades();
  }, []);

  const agregar = async (idHabilidad, nivel) => {
    const result = await habilidadService.agregarHabilidad(idHabilidad, nivel);
    if (result.ok) fetchHabilidades();
    return result;
  };

  const actualizarNivel = async (idHabilidad, nivel) => {
    const result = await habilidadService.actualizarNivel(idHabilidad, nivel);
    if (result.ok) fetchHabilidades();
    return result;
  };

  const eliminar = async (idHabilidad) => {
    const result = await habilidadService.eliminarHabilidad(idHabilidad);
    if (result.ok) fetchHabilidades();
    return result;
  };

  return { habilidades, loading, error, agregar, actualizarNivel, eliminar };
};