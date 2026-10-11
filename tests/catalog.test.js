import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { filterProducts } from '../src/utils/catalog.js';

const products = JSON.parse(readFileSync(new URL('../public/productos.json', import.meta.url), 'utf8'));

test('El catálogo tiene diez productos con imágenes locales y precios válidos', () => {
  assert.equal(products.length, 10);
  assert.equal(new Set(products.map((product) => product.id)).size, products.length);
  for (const product of products) {
    assert.ok(existsSync(new URL(`../public/${product.imagen}`, import.meta.url)));
    assert.ok(Number.isFinite(product.precio) && product.precio >= 0);
    assert.ok(product.descripcion.length >= 10 && product.plataforma);
  }
});
test('Solo videojuegos excluye consolas, accesorios y computación', () => {
  assert.equal(filterProducts(products, 'videojuegos', '').length, 3);
  assert.equal(filterProducts(products, 'consolas', '').length, 4);
  assert.equal(filterProducts(products, 'accesorios', '').length, 2);
  assert.equal(filterProducts(products, 'computacion', '').length, 1);
});
test('Búsqueda y categoría se combinan sin distinguir mayúsculas o acentos', () => {
  assert.equal(filterProducts(products, 'carreras', 'NEED FOR SPEED')[0].nombre, 'Need for Speed');
  assert.equal(filterProducts(products, 'rpg', 'DARKSOULS')[0].nombre, 'DarkSouls');
  assert.equal(filterProducts(products, 'aventura', 'need').length, 0);
  assert.equal(filterProducts(products, 'todos', 'inexistente').length, 0);
});
