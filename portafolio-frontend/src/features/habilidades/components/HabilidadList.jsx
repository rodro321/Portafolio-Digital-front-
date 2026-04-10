import React from 'react';
import { useHabilidades } from '../hooks/useHabilidades';
import { Link } from 'react-router-dom';

export const HabilidadList = () => {
  const { habilidades, loading, error, actualizarNivel, eliminar } = useHabilidades();

  if (loading) return <div>Cargando habilidades...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div>
      <h2>Mis Habilidades</h2>
      <Link to="/catalogo">
        <button>Agregar nueva habilidad</button>
      </Link>
      {habilidades.length === 0 ? (
        <p>No tienes habilidades registradas.</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Categoría</th>
              <th>Nivel</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {habilidades.map(h => (
              <tr key={h.id_habilidad}>
                <td>{h.nombre}</td>
                <td>{h.tipo}</td>
                <td>{h.categoria || '—'}</td>
                <td>
                  {h.tipo === 'tecnica' ? (
                    <input
                      type="number"
                      min="0"
                      max="100"
                      defaultValue={h.nivel}
                      onBlur={(e) => actualizarNivel(h.id_habilidad, parseInt(e.target.value))}
                    />
                  ) : (
                    '—'
                  )}
                </td>
                <td>
                  <button onClick={() => eliminar(h.id_habilidad)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};