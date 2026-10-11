import test from 'node:test';
import assert from 'node:assert/strict';
import { gameImages, validateContact, validateGame } from '../src/utils/validation.js';

test('El formulario rechaza campos vacíos y correos incorrectos', () => {
  assert.equal(Object.keys(validateContact({ nombre: '', email: '', mensaje: '' })).length, 3);
  assert.ok(validateContact({ nombre: 'Agustín', email: 'correo-mal', mensaje: 'Consulta sobre un videojuego' }).email);
});
test('El formulario acepta información válida', () => {
  assert.deepEqual(validateContact({ nombre: 'Agustín', email: 'alumno@example.com', mensaje: 'Quiero consultar por este videojuego.' }), {});
});
test('El formulario rechaza espacios y mensajes demasiado cortos', () => {
  assert.ok(validateContact({ nombre: '  ', email: 'alumno@example.com', mensaje: 'Hola' }).nombre);
  assert.ok(validateContact({ nombre: 'Agustín', email: 'alumno@example.com', mensaje: 'Hola' }).mensaje);
});
test('Los videojuegos requieren precio y género válidos', () => {
  const game = { nombre: 'Juego de prueba', categoria: 'aventura', precio: '15000', descripcion: 'Una aventura para PC', imagen: 'assets/img/arcade.jpg' };
  assert.equal(validateGame(game), '');
  assert.notEqual(validateGame({ ...game, precio: '' }), '');
  assert.notEqual(validateGame({ ...game, precio: '-1' }), '');
  assert.notEqual(validateGame({ ...game, categoria: 'inexistente' }), '');
  assert.notEqual(validateGame({ ...game, categoria: 'consolas' }), '');
  for (const image of gameImages) assert.equal(validateGame({ ...game, imagen: image.value }), '');
  assert.notEqual(validateGame({ ...game, imagen: 'assets/img/aventura.png' }), '');
});
