import React, { useRef } from 'react';

export const AvatarUpload = ({ onUpload, currentAvatar }) => {
  const fileInputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await onUpload(file);
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      {currentAvatar && (
        <img
          src={currentAvatar}
          alt="Avatar"
          style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
        />
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button type="button" onClick={() => fileInputRef.current.click()}>
        Cambiar foto
      </button>
    </div>
  );
};