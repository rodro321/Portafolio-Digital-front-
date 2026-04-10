import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const GitHubLoginButton = () => {
  const { loginWithGitHub } = useAuth();

  return (
    <button
      onClick={loginWithGitHub}
      style={{
        background: '#333',
        color: 'white',
        padding: '10px 20px',
        width: '100%',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Iniciar sesión con GitHub
    </button>
  );
};