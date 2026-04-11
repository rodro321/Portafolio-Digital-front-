export const getInitials = (nombre = "", apellido = "") => {
  return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase() || "??";
};

export const validateProfileData = ({ nombreCompleto, apellidoCompleto, titulo }) => {
  const errors = {};
  if (!nombreCompleto.trim()) errors.nombreCompleto = "Requerido";
  if (!apellidoCompleto.trim()) errors.apellidoCompleto = "Requerido";
  if (!titulo.trim()) errors.titulo = "Requerido";
  return errors;
};