import { assetUrl, formatPrice } from '../utils/format.js';
import { productPrice } from '../utils/cart.js';
import { categories } from '../utils/validation.js';

export default function ProductCard({ product, quantity, onAdd }) {
  const offer = product.precioOferta != null && product.precioOferta < product.precio;
  const genre = categories.find((item) => item.value === product.categoria)?.label ?? product.categoria;
  return (
    <article className="card h-100 card-producto">
      <div className="product-picture"><img className="card-img-top" src={assetUrl(product.imagen)} alt={product.nombre} loading="lazy" />{offer && <span className="badge bg-acento offer-badge">OFERTA</span>}</div>
      <div className="card-body d-flex flex-column">
        <p className="small text-acento mb-2">{genre} <span className="text-muted">/ {product.plataforma ?? 'PC'}</span></p>
        <h3 className="card-title h5">{product.nombre}</h3>
        <p className="card-text small text-muted flex-grow-1">{product.descripcion}</p>
        <div className="mb-3"><p className="price fw-bold fs-4 mb-0">{formatPrice(productPrice(product))}</p>{offer && <del className="text-muted small">{formatPrice(product.precio)}</del>}</div>
        <button className={`btn ${quantity ? 'btn-outline-pcgames' : 'btn-pcgames'}`} type="button" aria-label={`Agregar al carrito: ${product.nombre}`} onClick={() => onAdd(product)}>{quantity ? `En carrito (${quantity}) · Añadir otro` : 'Agregar al carrito'}</button>
      </div>
    </article>
  );
}
