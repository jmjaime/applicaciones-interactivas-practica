# Ejercicios 3.1 y 3.2: Listas y renderizado condicional

Se trabaja en `Galeria.tsx`, `Tags.tsx` y `Consultas.tsx`. Se ve en
`http://localhost:5173/?ej=3`. Punto de partida: el 2.1 resuelto;
`Detalle` ya usa los tres componentes, lo que falta está adentro de cada
uno.

Para probar los casos borde se editan los datos en
`src/datos/propiedad.ts` (vaciar `tags` o dejar dos, vaciar `consultas`, poner una
`respuesta` en `null`).

## Ejercicio 3.1: Galería y tags

**Objetivo**: transformar un array de datos en un array de elementos con
`map` y `key`, y no dibujar nada cuando no hay datos.

**Requisitos**:

- [ ] Debajo de la foto principal, una lista `ul.miniaturas` con una `img.miniatura` por cada foto de `fotos` (4 con los datos de ejemplo).
- [ ] El `alt` de cada miniatura dice qué foto es: `Foto 2 de 4`.
- [ ] La miniatura de la foto que está como principal (la primera) tiene además la clase `activa`.
- [ ] Los tags se ven como una lista `ul.tags` con un `li` por cada uno de los **dos primeros** tags; si hay más, un último `li.mas` con la cantidad restante (`+1` con los datos de ejemplo).
- [ ] Con dos tags o menos no aparece el `li.mas`.
- [ ] Con `tags: []` no se dibuja la `ul` (verificar en DevTools → Elements que no queda una lista vacía), y no aparece ningún `0` suelto.
- [ ] La Console no muestra el warning de `key`.

## Ejercicio 3.2: Consultas

**Objetivo**: combinar listas con renderizado condicional por elemento y
para la lista entera.

**Requisitos**:

- [ ] Cada consulta es un `article.consulta` con el autor (`@ana`, clase `consulta-autor`), la fecha en formato local (`2/10/2026`, clase `consulta-fecha`) y el texto.
- [ ] Si la consulta tiene respuesta, debajo se ve un `div.respuesta` con `↳ Inmobiliaria del Sol: <respuesta>`. El nombre sale de los datos: `Consultas` lo recibe en una prop nueva (hay que sumarla también en el uso, en `Detalle`).
- [ ] Si no tiene respuesta, se ve `Sin responder` con la clase `sin-responder`.
- [ ] Con `consultas: []` se ve `Todavía no hay consultas.` (clase `mensaje`) y el título del panel dice `Consultas (0)`.
- [ ] Las consultas se muestran de la más reciente a la más vieja, sin modificar el array original de los datos.

Pista para la fecha: `new Date(fecha).toLocaleDateString("es-AR")` (ojo
con la zona horaria: `"2026-10-02"` se interpreta como medianoche UTC; una
forma de evitarlo es `new Date(fecha + "T00:00")`).
