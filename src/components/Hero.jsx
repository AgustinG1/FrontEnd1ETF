import { assetUrl } from '../utils/format.js';

export default function Hero() {
  return (
    <header id="inicio" className="hero">
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <p className="eyebrow">VIDEOJUEGOS · CONSOLAS · ACCESORIOS</p>
            <h1>Tu próximo juego.<br /><span>Tu próxima historia.</span></h1>
            <p className="hero-description">Aventura, velocidad y mundos por descubrir. Encuentra juegos y equipamiento para tu próxima partida en Tienda PCGames.</p>
            <a href="#productos-destacados" className="btn btn-pcgames btn-lg">Explorar tienda <span aria-hidden="true">↗</span></a>
            <p className="hero-note mt-4 mb-0">Elige tu género. Encuentra tu juego. Sigue jugando.</p>
          </div>
          <div className="col-lg-6">
            <div className="hero-photo">
              <img src={assetUrl('assets/img/portada.jpg')} alt="Jugador frente a un monitor de PC en un escritorio de videojuegos" fetchPriority="high" />
              <span className="hero-photo-label">PCGAMES / LISTO PARA JUGAR</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
