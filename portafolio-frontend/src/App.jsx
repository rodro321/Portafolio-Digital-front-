import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GitHubCallbackPage from './pages/GitHubCallbackPage';
import ProfilePage from './pages/ProfilePage';
import HabilidadesPage from './pages/HabilidadesPage';
import CatalogoPage from './pages/CatalogoPage';

// Componente para rutas privadas
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

// Componente para rutas públicas (si ya está autenticado, redirige al perfil)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/perfil" replace /> : children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirige la raíz a /perfil si hay token, si no a /login */}
        <Route path="/" element={
          localStorage.getItem('token') 
            ? <Navigate to="/perfil" replace /> 
            : <Navigate to="/login" replace />
        } />

        {/* Rutas públicas */}
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        } />
        <Route path="/auth/github/callback" element={<GitHubCallbackPage />} />

        {/* Rutas privadas */}
        <Route path="/perfil" element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        } />
        <Route path="/habilidades" element={
          <PrivateRoute>
            <HabilidadesPage />
          </PrivateRoute>
        } />
        <Route path="/catalogo" element={
          <PrivateRoute>
            <CatalogoPage />
          </PrivateRoute>
        } />

        {/* Cualquier otra ruta redirige a / */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;