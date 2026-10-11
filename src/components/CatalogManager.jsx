import { useState } from 'react';
import { gameCategories, gameImages, validateGame } from '../utils/validation.js';

const initial = { nombre: '', categoria: 'aventura', precio: '', descripcion: '', imagen: 'assets/img/arcade.jpg' };
export default function CatalogManager({ products, onAdd, onRemove, disabled }) {
  const [game, setGame] = useState(initial);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  function change(event) { setGame({ ...game, [event.target.name]: event.target.value }); setError(''); setMessage(''); }
  function submit(event) {
    event.preventDefault();
    const problem = validateGame(game);
    if (problem) { setError(problem); return; }
    onAdd({ ...game, nombre: game.nombre.trim(), descripcion: game.descripcion.trim(), precio: Number(game.precio) });
    setGame(initial);
    setMessage('Videojuego agregado. Puedes verlo en el catálogo con su género correspondiente.');
  }
  return (
    <details className="catalog-manager mt-4">
      <summary>Administrar catálogo</summary>
      <div className="pt-4"><h2 className="h4">Gestión del catálogo</h2><p className="text-muted small">Demostración local, sin acceso de administrador ni base de datos. Los cambios se mantienen hasta recargar la página.</p>
        <form onSubmit={submit} noValidate><fieldset disabled={disabled}><legend className="h6">Agregar videojuego</legend><div className="row g-3">
          <div className="col-md-6"><label htmlFor="game-nombre" className="form-label">Nombre del videojuego</label><input id="game-nombre" name="nombre" maxLength={80} className="form-control" value={game.nombre} onChange={change} required /></div>
          <div className="col-md-3"><label htmlFor="game-categoria" className="form-label">Género del videojuego</label><select id="game-categoria" name="categoria" className="form-select" value={game.categoria} onChange={change}>{gameCategories.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div>
          <div className="col-md-3"><label htmlFor="game-precio" className="form-label">Precio CLP</label><input id="game-precio" name="precio" type="number" min="0" step="1" className="form-control" value={game.precio} onChange={change} required /></div>
          <div className="col-md-8"><label htmlFor="game-descripcion" className="form-label">Descripción</label><input id="game-descripcion" name="descripcion" maxLength={300} className="form-control" value={game.descripcion} onChange={change} required /></div>
          <div className="col-md-4"><label htmlFor="game-imagen" className="form-label">Imagen</label><select id="game-imagen" name="imagen" className="form-select" value={game.imagen} onChange={change}>{gameImages.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div>
        </div><button className="btn btn-pcgames mt-3" type="submit">Agregar videojuego</button></fieldset>{error && <p className="alert alert-danger mt-3" role="alert">{error}</p>}{message && <p className="alert alert-success mt-3" role="status">{message}</p>}</form>
        <ul className="list-group mt-4">{products.map((product) => <li className="list-group-item d-flex justify-content-between align-items-center gap-3" key={product.id}><span>{product.nombre}</span><button className="btn btn-outline-danger btn-sm" type="button" aria-label={`Eliminar del catálogo: ${product.nombre}`} onClick={() => onRemove(product.id)} disabled={disabled}>Eliminar</button></li>)}</ul>{products.length === 0 && <p className="text-muted mt-3">El catálogo está vacío. Agrega un videojuego para comenzar.</p>}
      </div>
    </details>
  );
}
