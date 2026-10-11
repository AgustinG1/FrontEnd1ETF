import { normalizeText } from './format.js';

export function filterProducts(products, category, search) {
  return products.filter((product) => {
    const matchesCategory = category === 'todos' || (category === 'videojuegos' ? product.tipo === 'videojuego' : product.categoria === category);
    return matchesCategory && normalizeText(product.nombre).includes(normalizeText(search));
  });
}
