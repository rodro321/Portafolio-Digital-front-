import React from 'react';
import { useProfile } from '../features/profile/hooks/useProfile';
import { useHabilidades } from '../features/habilidades/hooks/useHabilidades';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { profile, loading: profileLoading, error: profileError } = useProfile();
  const { habilidades, loading: habLoading, error: habError } = useHabilidades();

  if (profileLoading || habLoading) return <div>Cargando portafolio...</div>;
  if (profileError) return <div>Error al cargar perfil: {profileError}</div>;
  if (habError) return <div>Error al cargar habilidades: {habError}</div>;

  const nombreCompleto = `${profile?.nombre || ''} ${profile?.apellido || ''}`.trim() || 'Usuario';
  const profesion = profile?.profesion || 'Profesional';
  const biografia = profile?.biografia || 'Sin biografía.';
  const telefono = profile?.telefono || 'No especificado';
  const email = profile?.email || '';
  const imagenPerfil = profile?.imagen?.ruta || '/default-avatar.png';
  

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img src={getImageUrl(imagenPerfil)} alt="Perfil" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }} />
        <h1>Hola, soy {nombreCompleto}</h1>
        <h3>Soy {profesion}</h3>
        <p style={{ fontStyle: 'italic' }}>{biografia}</p>
      </div>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Habilidades</h2>
        {habilidades.length === 0 ? (
          <p>No hay habilidades registradas.</p>
        ) : (
          <ul>
            {habilidades.map(h => (
              <li key={h.id_habilidad}>
                {h.nombre} {h.tipo === 'tecnica' && `- Nivel: ${h.nivel}%`}
              </li>
            ))}
          </ul>
        )}
        <Link to="/habilidades">Administrar habilidades</Link>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Proyectos</h2>
        <p>Próximamente...</p>
        <Link to="/proyectos">Administrar proyectos</Link>
      </section>

      <section>
        <h2>Contáctame</h2>
        <p><strong>Teléfono:</strong> {telefono}</p>
        <p><strong>Correo:</strong> {email}</p>
      </section>
    </div>
  );
};

export default HomePage;