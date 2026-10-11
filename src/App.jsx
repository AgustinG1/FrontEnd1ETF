import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import FeaturedCarousel from './components/FeaturedCarousel.jsx';
import ContactForm from './components/ContactForm.jsx';
import CatalogManager from './components/CatalogManager.jsx';
import ProductCatalog from './components/ProductCatalog.jsx';
import ShoppingCart from './components/ShoppingCart.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';
import Notification from './components/Notification.jsx';
import Footer from './components/Footer.jsx';
import { addProduct, changeQuantity, cartTotals } from './utils/cart.js';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [category, setCategory] = useState('todos');
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState(null);
  const [checkout, setCheckout] = useState(null);

  // Cancela la carga al desmontar el componente.
  useEffect(() => {
    const controller = new AbortController();
    async function loadProducts() {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}productos.json`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
        const data = await response.json();
        const ids = new Set();
        if (!Array.isArray(data) || !data.every((product) => {
          const valid = product && Number.isInteger(product.id) && !ids.has(product.id) &&
            typeof product.nombre === 'string' && typeof product.categoria === 'string' &&
            typeof product.descripcion === 'string' && typeof product.imagen === 'string' &&
            Number.isFinite(product.precio) && product.precio >= 0 &&
            (product.precioOferta == null || (Number.isFinite(product.precioOferta) && product.precioOferta >= 0 && product.precioOferta <= product.precio));
          if (valid) ids.add(product.id);
          return valid;
        })) throw new Error('Formato de catálogo inválido');
        setProducts(data);
      } catch (failure) {
        if (failure.name !== 'AbortError') setError('No se pudo cargar el catálogo. Comprueba la conexión e inténtalo nuevamente.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadProducts();
    return () => controller.abort();
  }, [loadAttempt]);

  const closeNotification = useCallback(() => setNotification(null), []);

  function handleAdd(product) {
    setCart((previous) => addProduct(previous, product));
    setNotification({ message: `${product.nombre} agregado al carrito.` });
  }

  function handleQuantityChange(id, quantity) {
    setCart((previous) => changeQuantity(previous, id, quantity));
  }

  function confirmCheckout() {
    setCart([]);
    setCheckout((previous) => ({ ...previous, confirmed: true }));
  }

  function addGame(game) {
    setProducts((previous) => [...previous, { ...game, tipo: 'videojuego', plataforma: 'PC', id: Math.max(0, ...previous.map((item) => item.id)) + 1 }]);
    setNotification({ message: `${game.nombre} agregado al catálogo.` });
  }

  function removeGame(id) {
    setProducts((previous) => previous.filter((game) => game.id !== id));
    setCart((previous) => previous.filter((item) => item.id !== id));
    setNotification({ message: 'Producto eliminado del catálogo.' });
  }

  const totals = cartTotals(cart);
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header quantity={totals.quantity} onCategoryChange={setCategory} />
      <Hero />
      <main id="contenido" className="container my-5">
        <FeaturedCarousel />
        <div className="shop-layout">
          <ProductCatalog products={products} cart={cart} loading={loading} error={error} category={category} search={search}
            onSearch={setSearch} onCategoryChange={setCategory} onAdd={handleAdd} onRetry={() => setLoadAttempt((attempt) => attempt + 1)} />
          <ShoppingCart cart={cart} onQuantityChange={handleQuantityChange} onRemove={(id) => handleQuantityChange(id, 0)}
            onClear={() => setCart([])} onCheckout={() => setCheckout({ totals, confirmed: false })} />
        </div>
        <ContactForm />
        <CatalogManager products={products} onAdd={addGame} onRemove={removeGame} disabled={loading || Boolean(error)} />
      </main>
      <Footer />
      <Notification notification={notification} onClose={closeNotification} />
      {checkout && <CheckoutModal checkout={checkout} onConfirm={confirmCheckout} onClose={() => setCheckout(null)} />}
    </>
  );
}
