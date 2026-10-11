import { useState } from 'react';

export default function Header({ quantity, onCategoryChange }) {
  const [open, setOpen] = useState(false);
  function navigate() { setOpen(false); }
  return (
    <nav className="navbar navbar-expand-lg sticky-top" aria-label="Navegación principal">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href="#inicio" onClick={navigate}>
          <span className="brand-mark" aria-hidden="true">PC</span><span>Tienda <strong>PCGames</strong></span>
        </a>
        <button className="navbar-toggler" type="button" aria-label="Abrir menú" aria-controls="menu" aria-expanded={open} onClick={() => setOpen(!open)}><span className="navbar-toggler-icon" /></button>
        <div id="menu" className={`collapse navbar-collapse ${open ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
            <li className="nav-item"><a className="nav-link" href="#inicio" onClick={navigate}>Inicio</a></li>
            <li className="nav-item"><a className="nav-link" href="#productos-destacados" onClick={() => { onCategoryChange('todos'); navigate(); }}>Tienda</a></li>
            <li className="nav-item"><a className="nav-link" href="#productos-destacados" onClick={() => { onCategoryChange('videojuegos'); navigate(); }}>Videojuegos</a></li>
            <li className="nav-item"><a className="nav-link" href="#contacto" onClick={navigate}>Contacto</a></li>
            <li className="nav-item"><a className="btn btn-outline-pcgames" href="#resumen-carrito" onClick={navigate}>Carrito <span className="badge bg-acento ms-1" aria-label={`${quantity} unidades en el carrito`}>{quantity}</span></a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
