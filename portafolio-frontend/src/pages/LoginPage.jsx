import React from 'react';
import { useLocation } from 'react-router-dom';
import { LoginForm } from '../features/auth/components/LoginForm';
import { GitHubLoginButton } from '../features/auth/components/GitHubLoginButton';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const location = useLocation();
  const message = location.state?.message;

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h1>Iniciar Sesión</h1>
      {message && <div style={{ color: 'green', marginBottom: '15px' }}>{message}</div>}
      <LoginForm />
      <hr style={{ margin: '20px 0' }} />
      <GitHubLoginButton />
      <p style={{ marginTop: '20px' }}>
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
};

export default LoginPage;