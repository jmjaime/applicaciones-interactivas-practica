# Ejercicio 2: Layout y detalle

Arranca con el Ejercicio 1 resuelto: cada página dibuja su propia
`NavPanel`. Se trabaja en `rutas.tsx`, `LayoutPanel.tsx`,
`DetallePropiedad.tsx` y `MisPropiedades.tsx`, y se quita la `NavPanel`
de las páginas. Se ve en `http://localhost:5173/2/`.

**Objetivo**: escribir la navegación una sola vez con un layout y rutas
hijas, y armar una página de detalle con un parámetro en la URL.

**Requisitos**:

- [ ] `LayoutPanel` dibuja la `nav.nav-panel` (la marca y un `NavLink` por sección) y, debajo, un `<main className="contenido">` con el `<Outlet />`.
- [ ] En `rutas.tsx`, `LayoutPanel` es la ruta `/` y las secciones son sus hijas: Mis propiedades como `index`, y `visitas`, `consultas`, `reportes` y `*`.
- [ ] Ninguna página dibuja su propia nav (se borra `NavPanel.tsx`).
- [ ] La sección actual se ve resaltada en la nav. En `/2/visitas`, "Mis propiedades" **no** está resaltado.
- [ ] Nueva ruta `propiedades/:id` con `DetallePropiedad`: foto, título, estado, tipo, operación, precio y superficies (con `div.detalle`), más la lista de sus visitas y sus consultas.
- [ ] `/2/propiedades/99` y `/2/propiedades/abc` muestran "No existe la propiedad …" con un link a Mis propiedades, sin errores en la consola.
- [ ] En Mis propiedades, el título de cada propiedad es un link a su detalle.

Pistas:

- `NavLink` agrega la clase `active` cuando su ruta coincide con la URL, y
  `estilos.css` ya la resalta. Para que `/` no quede activo en todas las
  páginas existe la prop `end`.
- `useParams()` devuelve el `id` como string: convertirlo con `Number(…)`
  antes de buscar.
- Si se llega: en Visitas y Consultas, el título de la propiedad también
  lleva a su detalle.
