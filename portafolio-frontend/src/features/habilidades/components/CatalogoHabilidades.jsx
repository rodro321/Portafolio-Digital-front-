import React, { useState, useEffect } from 'react';
import { habilidadService } from '../services/habilidadService';
import { useHabilidades } from '../hooks/useHabilidades';
import { Link } from 'react-router-dom';

export const CatalogoHabilidades = () => {
  const [tecnicas, setTecnicas] = useState({});
  const [blandas, setBlandas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { agregar } = useHabilidades();

  useEffect(() => {
    const cargarCatalogo = async () => {
      try {
        const response = await habilidadService.getCatalogo();
        if (response.ok) {
          setTecnicas(response.tecnicas || {});
          setBlandas(response.blandas || []);
        } else {
          setError(response.mensaje);
        }
      } catch (err) {
        setError('Error de conexión');
      } finally {
        setLoading(false);
      }
    };
    cargarCatalogo();
  }, []);

  const handleAgregar = async (idHabilidad, nivel = null) => {
    const result = await agregar(idHabilidad, nivel);
    if (!result.ok) {
      setError(result.mensaje);
    } else {
      // opcional: mostrar mensaje de éxito
    }
  };

  if (loading) return <div>Cargando catálogo...</div>;

  return (
    <div>
      <h2>Catálogo de Habilidades</h2>
      <Link to="/habilidades">← Volver a mis habilidades</Link>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <h3>Técnicas</h3>
      {Object.entries(tecnicas).map(([categoria, habilidades]) => (
        <div key={categoria}>
          <h4>{categoria}</h4>
          <ul>
            {habilidades.map(h => (
              <li key={h.id_habilidad}>
                {h.nombre}
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Nivel"
                  id={`nivel-${h.id_habilidad}`}
                />
                <button onClick={() => {
                  const input = document.getElementById(`nivel-${h.id_habilidad}`);
                  handleAgregar(h.id_habilidad, input.value ? parseInt(input.value) : null);
                  input.value = '';
                }}>
                  Agregar
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <h3>Blandas</h3>
      <ul>
        {blandas.map(h => (
          <li key={h.id_habilidad}>
            {h.nombre}
            <button onClick={() => handleAgregar(h.id_habilidad)}>Agregar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};