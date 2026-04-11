import React, { useState } from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    password_confirmation: '',
    telefono: '',
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validación local de coincidencia de contraseñas
    if (formData.password !== formData.password_confirmation) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const result = await register(formData);

    if (!result.ok) {
      // Si el email ya existe, redirigir a login con mensaje
      if (result.codigo === 'EMAIL_DUPLICADO') {
        navigate('/login', { state: { message: 'Este correo ya está registrado. Inicia sesión.' } });
      } else {
        setError(result.mensaje || 'Error en el registro');
      }
    }
    // Si es exitoso, el hook useAuth ya redirige a /perfil
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" onChange={handleChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input name="apellido" placeholder="Apellido" onChange={handleChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input name="email" type="email" placeholder="Correo electrónico" onChange={handleChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input name="telefono" placeholder="Teléfono (opcional)" onChange={handleChange} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input name="password_confirmation" type="password" placeholder="Confirmar contraseña" onChange={handleChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
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