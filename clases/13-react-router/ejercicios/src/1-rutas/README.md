# Ejercicio 1: Rutas del panel

El panel del Vendedor en el TPO tiene una página por sección: Mis
propiedades, Visitas, Consultas y Reportes. Las páginas ya están hechas;
falta que cada una tenga su URL. Se trabaja en `rutas.tsx`, `NavPanel.tsx`
y `NoEncontrada.tsx`. Se ve en `http://localhost:5173/1/`.

**Objetivo**: definir las rutas de una app con `createBrowserRouter` y
navegar entre ellas sin recargar la página.

**Requisitos**:

- [ ] En `rutas.tsx`, una ruta por sección: `/` (ya está), `/visitas`, `/consultas` y `/reportes`, cada una con su página.
- [ ] Los links de `NavPanel` usan `<Link>`. Navegar entre secciones no recarga la página: el mensaje `🔄 Panel: la app arrancó de cero` aparece una sola vez en la consola.
- [ ] Cualquier otra URL (`/1/cualquier-cosa`) muestra `NoEncontrada`: la `NavPanel`, un título "404" y un link para volver a Mis propiedades, dentro de un `div.mensaje`.
- [ ] Los botones Atrás y Adelante del navegador recorren las secciones visitadas.
- [ ] Recargar con F5 en `/1/consultas` sigue mostrando Consultas.

Pistas:

- Los `<a>` de `NavPanel` llevan el prefijo `/1` porque salen del router.
  Un `<Link>` no lo necesita: el router lo agrega solo (`basename`), así
  que `to="/visitas"` alcanza.
- La ruta del 404 es la que tiene `path: "*"`.
