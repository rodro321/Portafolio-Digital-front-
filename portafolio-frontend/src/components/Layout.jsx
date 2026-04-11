import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';

const Layout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm('¿Estás seguro de cerrar sesión?')) {
      await logout();
      navigate('/login');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{
        background: '#1e293b',
        color: 'white',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Mi Portafolio</Link>
        </div>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/perfil" style={{ color: 'white', textDecoration: 'none' }}>Perfil</Link>
          <Link to="/habilidades" style={{ color: 'white', textDecoration: 'none' }}>Habilidades</Link>
          <Link to="/proyectos" style={{ color: 'white', textDecoration: 'none' }}>Proyectos</Link>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            Cerrar sesión
          </button>
        </nav>
      </header>
      <main style={{ flex: 1, padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;