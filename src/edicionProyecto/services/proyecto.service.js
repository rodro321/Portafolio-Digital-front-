export const validateProyecto = ({ titulo, descripcion, imagenes }) => {
  const errors = {};
  if (!titulo.trim()) errors.titulo = "El título es requerido";
  if (!descripcion.trim()) errors.descripcion = "La descripción es requerida";
  if (imagenes.length < 3) errors.imagenes = "Mínimo 3 imágenes requeridas";
  return errors;
};