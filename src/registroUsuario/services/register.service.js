export const validateRegisterForm = ({ nombre, correo, contrasena, confirmarContrasena }) => {
  const errors = {};
  if (!nombre.trim()) errors.nombre = "El nombre es requerido";
  if (!correo.trim() || !correo.includes("@")) errors.correo = "Correo inválido";
  if (contrasena.length < 6) errors.contrasena = "Mínimo 6 caracteres";
  if (contrasena !== confirmarContrasena) errors.confirmarContrasena = "Las contraseñas no coinciden";
  return errors;
};