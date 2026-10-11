export const gameCategories = [{ value: 'aventura', label: 'Aventura' }, { value: 'carreras', label: 'Carreras' }, { value: 'rpg', label: 'RPG' }, { value: 'accion', label: 'Acción' }, { value: 'estrategia', label: 'Estrategia' }];
export const categories = [...gameCategories, { value: 'accesorios', label: 'Accesorios' }, { value: 'computacion', label: 'Computación' }, { value: 'consolas', label: 'Consolas' }];
export const gameImages = [{ value: 'assets/img/arcade.jpg', label: 'Arcade' }, { value: 'assets/img/nfs.jpg', label: 'Carreras' }, { value: 'assets/img/fantasia.jpg', label: 'Fantasía' }];

export function validateContact({ nombre, email, mensaje }) {
  const errors = {};
  if (nombre.trim().length < 2 || nombre.trim().length > 80) errors.nombre = 'Ingresa tu nombre, entre 2 y 80 caracteres.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || email.length > 120) errors.email = 'Ingresa un correo electrónico válido.';
  if (mensaje.trim().length < 10 || mensaje.trim().length > 1000) errors.mensaje = 'Escribe un mensaje entre 10 y 1000 caracteres.';
  return errors;
}

export function validateGame(game) {
  if (game.nombre.trim().length < 2 || game.nombre.trim().length > 80) return 'El nombre debe tener entre 2 y 80 caracteres.';
  if (!gameCategories.some((item) => item.value === game.categoria)) return 'Selecciona un género válido.';
  if (game.precio === '' || !Number.isFinite(Number(game.precio)) || Number(game.precio) < 0 || !Number.isInteger(Number(game.precio))) return 'Ingresa un precio entero igual o mayor que cero.';
  if (game.descripcion.trim().length < 10 || game.descripcion.trim().length > 300) return 'La descripción debe tener entre 10 y 300 caracteres.';
  if (!gameImages.some((item) => item.value === game.imagen)) return 'Selecciona una imagen del catálogo.';
  return '';
}
