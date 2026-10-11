import ProductCard from './ProductCard.jsx';
import { filterProducts } from '../utils/catalog.js';
import { categories } from '../utils/validation.js';

export default function ProductCatalog({ products, cart, loading, error, category, search, onSearch, onCategoryChange, onAdd, onRetry }) {
  const results = filterProducts(products, category, search);
  return (
    <section id="productos-destacados" aria-labelledby="titulo-catalogo">
      <p className="eyebrow">JUEGOS Y EQUIPAMIENTO PARA TU PRÓXIMA PARTIDA</p>
      <h2 id="titulo-catalogo" className="section-title">Explora el catálogo<span className="text-acento">.</span></h2>
      <div className="row g-3 mb-4 align-items-end">
        <div className="col-md-8"><label htmlFor="busqueda" className="form-label">Buscar producto</label><input id="busqueda" type="search" className="form-control" placeholder="Busca un juego, consola o accesorio…" value={search} onChange={(event) => onSearch(event.target.value)} disabled={loading || Boolean(error)} /></div>
        <div className="col-md-4"><label htmlFor="categoria" className="form-label">Categoría o género</label><select id="categoria" className="form-select" value={category} onChange={(event) => onCategoryChange(event.target.value)} disabled={loading || Boolean(error)}><option value="todos">Todos los productos</option><option value="videojuegos">Solo videojuegos</option>{categories.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div>
      </div>
      {loading ? <p role="status" className="py-4">Cargando productos…</p> : error ? <div className="alert alert-warning" role="alert"><p>{error}</p><button className="btn btn-pcgames" onClick={onRetry}>Reintentar</button></div> : <>
        <p className="small text-muted" role="status">{results.length} {results.length === 1 ? 'producto disponible' : 'productos disponibles'}</p>
        <p className="small text-muted">Catálogo académico: precios de demostración e imágenes ilustrativas. No se realizan ventas reales.</p>
        {results.length ? <div className="row g-4">{results.map((product) => <div className="col-12 col-md-6 col-xl-4" key={product.id}><ProductCard product={product} quantity={cart.find((item) => item.id === product.id)?.cantidad ?? 0} onAdd={onAdd} /></div>)}</div> : <div className="empty-state py-4"><h3 className="h5">No encontramos productos</h3><p>Cambia los filtros o prueba otro nombre.</p><button className="btn btn-outline-pcgames" onClick={() => { onSearch(''); onCategoryChange('todos'); }}>Restablecer filtros</button></div>}
      </>}
    </section>
  );
}
