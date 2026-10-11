import { useEffect, useRef, useState } from 'react';
import Carousel from 'bootstrap/js/dist/carousel';
import { assetUrl } from '../utils/format.js';

const slides = [
  { image: 'portada.jpg', title: 'Tu espacio para jugar', description: 'Videojuegos, consolas y accesorios en un solo lugar.', alt: 'Escritorio con monitor de PC y jugador sosteniendo un control' },
  { image: 'carreras.jpg', title: 'Need for Speed', description: 'Encuentra tu próxima carrera en el catálogo.', alt: 'Autos deportivos bajo luces de neón, imagen ilustrativa de carreras' },
  { image: 'mouse.jpg', title: 'Completa tu equipo', description: 'Explora los accesorios para tu escritorio.', alt: 'Mouse gamer con cable e iluminación multicolor' },
];

export default function FeaturedCarousel() {
  const carouselRef = useRef(null);
  const controllerRef = useRef(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const element = carouselRef.current;
    const controller = new Carousel(element, { interval: 5000, ride: false, pause: false, keyboard: true, touch: true });
    controllerRef.current = controller;
    const update = (event) => setActive(event.to);
    element.addEventListener('slid.bs.carousel', update);
    return () => { element.removeEventListener('slid.bs.carousel', update); controller.dispose(); controllerRef.current = null; };
  }, []);

  useEffect(() => {
    if (playing && !hovered && !focused) controllerRef.current?.cycle();
    else controllerRef.current?.pause();
  }, [playing, hovered, focused]);

  return (
    <section className="featured-section mb-5" aria-label="Carrusel de destacados" aria-roledescription="carrusel"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
        <h2 className="h4 mb-0">Destacados de PCGames</h2>
        <button className="btn btn-outline-pcgames btn-sm" type="button" onClick={() => setPlaying((value) => !value)}>{playing ? 'Pausar carrusel' : 'Reproducir carrusel'}</button>
      </div>
      <div className="carousel slide featured-carousel" ref={carouselRef} aria-label="Imágenes destacadas">
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={slide.image} role="group" aria-roledescription="diapositiva" aria-label={`${index + 1} de ${slides.length}`}>
              <img src={assetUrl(`assets/img/${slide.image}`)} className="d-block w-100 carousel-img" alt={slide.alt} loading="lazy" />
              <div className="carousel-caption"><h3 className="h4">{slide.title}</h3><p>{slide.description}</p><a className="btn btn-pcgames btn-sm mt-2" href="#productos-destacados">Ver productos</a></div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" aria-label="Imagen anterior" onClick={() => controllerRef.current?.prev()}><span className="carousel-control-prev-icon" aria-hidden="true" /></button>
        <button className="carousel-control-next" type="button" aria-label="Imagen siguiente" onClick={() => controllerRef.current?.next()}><span className="carousel-control-next-icon" aria-hidden="true" /></button>
      </div>
      <div className="d-flex justify-content-center gap-2 mt-3" aria-label="Seleccionar imagen">{slides.map((slide, index) => <button key={slide.image} type="button" className={`carousel-dot ${index === active ? 'selected' : ''}`} aria-label={`Mostrar imagen ${index + 1}: ${slide.title}`} aria-pressed={index === active} onClick={() => controllerRef.current?.to(index)}><span aria-hidden="true">{index + 1}</span></button>)}</div>
    </section>
  );
}
