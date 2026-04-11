import React, { useRef, useState } from 'react';

export const AvatarUpload = ({ currentAvatar, nombre, onFileSelect }) => {
  const fileInputRef = useRef();
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Crear URL de previsualización
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      // Pasar el archivo al componente padre
      onFileSelect(file);
    }
  };

  const getInitial = () => {
    return nombre ? nombre.charAt(0).toUpperCase() : '?';
  };

  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    // Asegurar que la ruta comience con /storage
    const cleanPath = path.startsWith('/') ? path : '/' + path;
    return `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${cleanPath}`;
  };

  // En el render
  const imageUrl = preview || getImageUrl(currentAvatar);

  return (
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Avatar"
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #ccc'
          }}
        />
      ) : (
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: '#3b82f6',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px',
          fontWeight: 'bold',
          margin: '0 auto',
          border: '2px solid #ccc'
        }}>
          {getInitial()}
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button type="button" onClick={() => fileInputRef.current.click()} style={{ marginTop: '10px' }}>
        Seleccionar foto
      </button>
    </div>
  );
};