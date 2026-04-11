import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GitHubCallbackPage from './pages/GitHubCallbackPage';
import ProfilePage from './pages/ProfilePage';
import HabilidadesPage from './pages/HabilidadesPage';
import CatalogoPage from './pages/CatalogoPage';
import HomePage from './pages/HomePage';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas sin layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/github/callback" element={<GitHubCallbackPage />} />

        {/* Rutas privadas con layout */}
        <Route path="/" element={
          <PrivateRoute>
            <Layout><HomePage /></Layout>
          </PrivateRoute>
        } />
        <Route path="/perfil" element={
          <PrivateRoute>
            <Layout><ProfilePage /></Layout>
          </PrivateRoute>
        } />
        <Route path="/habilidades" element={
          <PrivateRoute>
            <Layout><HabilidadesPage /></Layout>
          </PrivateRoute>
        } />
        <Route path="/catalogo" element={
          <PrivateRoute>
            <Layout><CatalogoPage /></Layout>
          </PrivateRoute>
        } />
        <Route path="/proyectos" element={
          <PrivateRoute>
            <Layout><div>Proyectos (próximamente)</div></Layout>
          </PrivateRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;