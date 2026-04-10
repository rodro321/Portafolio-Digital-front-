import React from 'react';
import { LoginForm } from '../features/auth/components/LoginForm';
import { GitHubLoginButton } from '../features/auth/components/GitHubLoginButton';

const LoginPage = () => {
  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <LoginForm />
      <hr />
      <GitHubLoginButton />
    </div>
  );
};

export default LoginPage;