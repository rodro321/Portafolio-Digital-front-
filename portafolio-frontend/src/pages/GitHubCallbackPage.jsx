import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const GitHubCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      navigate('/perfil');
    } else {
      navigate('/login?error=github_failed');
    }
  }, [searchParams, navigate]);

  return <div>Procesando autenticación con GitHub...</div>;
};

export default GitHubCallbackPage;