import React, { useState } from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    profesion: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await register(formData);
    if (!result.ok) {
      setError(result.mensaje || 'Error en el registro');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" onChange={handleChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input name="apellido" placeholder="Apellido" onChange={handleChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input name="email" type="email" placeholder="Correo electrónico" onChange={handleChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input name="profesion" placeholder="Profesión (opcional)" onChange={handleChange} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ padding: '10px 20px', width: '100%' }}>Registrarse</button>
      </form>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
};

export default RegisterPage;