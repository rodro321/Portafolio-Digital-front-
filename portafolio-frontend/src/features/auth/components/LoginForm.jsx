import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login({ email, password });
    if (!result.ok) {
      setError(result.mensaje || 'Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '15px' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" style={{ padding: '10px 20px', width: '100%' }}>
        Ingresar
      </button>
    </form>
  );
};