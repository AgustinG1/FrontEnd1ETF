# Tienda PCGames

Proyecto académico ETF S9 de Desarrollo Frontend I (PFY2201): tienda de videojuegos, consolas y accesorios.

## Tecnologías y funciones

React, JavaScript, Vite y Bootstrap 5. Componentes conectados mediante props; `useState` gestiona catálogo, filtros, carrito y formulario, y `useEffect` carga el JSON mediante `fetch`.

- Búsqueda por nombre y filtros por categoría o género.
- Carrusel con controles y pausa.
- Carrito con cantidades, eliminación y total en pesos chilenos.
- Contacto con validación de nombre, email y mensaje.
- Agregar videojuegos y eliminar productos desde «Administrar catálogo», debajo de Contacto.
- Diseño responsivo con las columnas de Bootstrap.

## Instalación y uso

Requiere Node.js 24 y npm. En la carpeta del proyecto:

```sh
npm install
npm run dev
```

Abre la URL indicada por Vite con `/FrontEnd1ETF/`, normalmente `http://localhost:5173/FrontEnd1ETF/`. No abras el HTML directamente.

```sh
npm test          # Pruebas del carrito, catálogo y validación
npm run build    # Compilación
npm run preview  # Vista previa de la compilación
```

Busca productos, cambia filtros, agrega al carrito y prueba el formulario. «Administrar catálogo» permite agregar y eliminar. Recargar restaura los datos iniciales: no hay backend, pagos ni envío de correos. Precios de demostración.

## Estructura

`src/components/`: interfaz. `src/utils/`: funciones y validaciones. `public/productos.json`: catálogo. `public/assets/img/`: imágenes. `tests/`: pruebas.

## Imágenes

Fotos ilustrativas de Unsplash: Sam Pak, Compagnons, Melt3D Works, Evija Martina, Zoshua Colah, Rebekah Yip, Kari Shea, Stefen Tan, Mike Meyers, Denise Jans, Devan Morgan y Billy Freeman. No son carátulas oficiales.
