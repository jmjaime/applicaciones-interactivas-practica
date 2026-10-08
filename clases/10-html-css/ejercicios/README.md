# Clase 10 — Ejercicios

Temática conductora: el **perfil público de una inmobiliaria** (el "Sitio
del vendedor" del TPO): datos de contacto, propiedades publicadas y
reseñas. Al final, un integrador con otra pantalla del TPO: el panel de
**solicitudes de visita** del Vendedor.

Todo es HTML/CSS/JS estático, sin npm. Los bloques 1 y 2 se abren con
doble click; el 3 y el integrador usan `fetch`, así que hay que servir la
carpeta por HTTP:

```bash
cd ejercicios
npx serve          # o Live Server en VS Code
```

## Cómo están organizados

Cada carpeta es un **punto de partida**: la del bloque 2 trae resuelto el
HTML del bloque 1, y la del bloque 3 trae resueltos HTML y CSS. Si un
bloque no se terminó en clase, el siguiente se puede empezar igual desde
su carpeta.

| Carpeta | Ejercicios | Se toca | En clase / en casa |
|---|---|---|---|
| `1-html/` | 1.1, 1.2 | `perfil.html` | 1.1 en clase · 1.2 en casa |
| `2-css/` | 2.1, 2.2 | `estilos.css` (el HTML no se toca) | 2.1 en clase · 2.2 en casa |
| `3-js/` | 3.1, 3.2, 3.3 | `app.js` (HTML y CSS no se tocan) | 3.1 y 3.2 en clase · 3.3 en casa |
| `4-integrador/` | Integrador | los tres archivos | en casa |

Los datos están en `datos/`. La verificación es visual y con DevTools: cada
requisito es algo que se puede comprobar mirando la página o el árbol del DOM.

---

## 1 · HTML

#### Ejercicio 1.1: Estructura semántica del perfil
**Objetivo**: estructurar una página real con los elementos semánticos
adecuados, sin pensar en cómo se ve.
**Requisitos**:
- [ ] Encabezado del sitio con la marca y una navegación principal (3 links).
- [ ] Un único contenido principal y un pie de página.
- [ ] Datos de la inmobiliaria: logo con texto alternativo descriptivo, nombre como **único** `h1` de la página, descripción y contacto.
- [ ] El teléfono y el email son clickeables (abren el discador / el cliente de correo).
- [ ] Sección "Propiedades publicadas" con una tarjeta por propiedad (las 4 de `inmobiliaria.json`), cada una como unidad independiente con foto, precio, operación, título y barrio.
- [ ] Jerarquía de títulos sin saltos (`h1` → `h2` → `h3`), comprobable en DevTools → Accessibility.
- [ ] Sin un solo `div` donde existe un elemento con significado.

#### Ejercicio 1.2: Reseñas y formulario
**Objetivo**: representar contenido repetido (una lista) y armar un
formulario accesible con validación nativa.
**Requisitos**:
- [ ] Sección "Reseñas" con el promedio y la cantidad, y una lista de al menos 2 reseñas de `resenas.json`.
- [ ] Cada reseña muestra nombre, calificación en estrellas, fecha y texto; la fecha usa un elemento que la deja legible por máquina (`2026-09-12`) y por humanos (`12/09/2026`).
- [ ] Formulario "Dejar una reseña" con nombre, calificación (solo valores de 1 a 5) y texto.
- [ ] Cada campo tiene un `label` asociado: hacer click en el texto enfoca el campo.
- [ ] Los tres campos son obligatorios: el navegador no deja enviar el formulario con alguno vacío.

---

## 2 · CSS

Se completa `2-css/estilos.css` siguiendo los `TODO`. `perfil.html` ya tiene
las clases puestas y no se modifica.

#### Ejercicio 2.1: Header, perfil y cards
**Objetivo**: aplicar box model y Flexbox a componentes concretos.
**Requisitos**:
- [ ] Header del sitio en una sola fila: marca a la izquierda, navegación a la derecha, centradas verticalmente.
- [ ] Links de la navegación en fila y sin viñetas.
- [ ] Bloque del perfil con logo circular (120×120) al lado de los datos; el logo no se deforma al achicar la ventana.
- [ ] Cards con fondo, esquinas redondeadas y sombra; la imagen ocupa todo el ancho de la card.
- [ ] Precio y badge de operación en la misma línea, uno en cada extremo.

#### Ejercicio 2.2: Layout responsive
**Objetivo**: armar el layout de página con Grid y adaptarlo al tamaño de pantalla.
**Requisitos**:
- [ ] La grilla de propiedades muestra tantas columnas como entren (de al menos 220px), sin media queries.
- [ ] Reseñas y formulario uno debajo del otro en mobile; lado a lado desde 768px, con las reseñas más anchas.
- [ ] En menos de 600px, el bloque del perfil apila logo y datos, centrados.
- [ ] Cada reseña es una tarjeta; en su encabezado, la fecha queda pegada a la derecha.
- [ ] Probado en DevTools → Toggle device toolbar con un ancho de mobile (p. ej. 375px) y uno de desktop: nada se desborda horizontalmente.

---

## 3 · JavaScript

Se completa `3-js/app.js` siguiendo los `TODO`. Las reseñas ya no están en
el HTML: las tiene que dibujar el script a partir de `datos/resenas.json`.
La regla del bloque: **los eventos cambian `estado` y llaman a `render()`;
nadie modifica el DOM por fuera de `render()`**.

#### Ejercicio 3.1: Reseñas desde el JSON
**Objetivo**: hacer `fetch` de datos y generar el DOM a partir de ellos.
**Requisitos**:
- [ ] Al cargar la página se ven las 5 reseñas del JSON, con el mismo aspecto que en el bloque 2.
- [ ] El resumen dice `★ 3.8 promedio · 5 reseñas`.
- [ ] Si la URL del JSON está mal, la página muestra un mensaje de error (no queda en "Cargando…").
- [ ] El texto de una reseña se muestra tal cual aunque contenga HTML: una reseña con contenido `<b>hola</b>` muestra los signos `<` y `>`, no texto en negrita.

#### Ejercicio 3.2: Publicar una reseña
**Objetivo**: manejar el `submit` de un formulario actualizando el estado.
**Requisitos**:
- [ ] Al publicar, la página no se recarga.
- [ ] La reseña nueva aparece en la lista con la fecha de hoy.
- [ ] El promedio y la cantidad se actualizan solos (publicar una de 1 ★ → `★ 3.3 promedio · 6 reseñas`).
- [ ] El formulario queda vacío después de publicar.
- [ ] La validación nativa del bloque 1 sigue funcionando (no se puede publicar con campos vacíos).

#### Ejercicio 3.3: Filtro y orden
**Objetivo**: derivar lo que se muestra a partir de más de un dato del estado.
**Requisitos**:
- [ ] "Calificación mínima" muestra solo las reseñas con esa calificación o más.
- [ ] "Ordenar por" alterna entre más recientes primero y mejor calificación primero.
- [ ] Filtro y orden se combinan, y se mantienen al publicar una reseña nueva.
- [ ] Si ninguna reseña cumple el filtro, se ve un mensaje que lo indica.
- [ ] El resumen (promedio y cantidad) siempre refleja **todas** las reseñas, no solo las filtradas.

---

## 4 · Integrador: solicitudes de visita

Pantalla del Vendedor en el TPO: el listado de las solicitudes de visita
recibidas. Se arma desde cero en `4-integrador/` con los datos de
`datos/visitas.json`.

#### Integrador: Panel de solicitudes de visita
**Objetivo**: combinar HTML semántico, layout responsive y estado + render
en una pantalla completa.
**Requisitos**:
- [ ] HTML semántico: header con el título del panel y un contador de solicitudes **pendientes**; contenido principal con el listado.
- [ ] Cada solicitud muestra nombre, teléfono (clickeable), propiedad, fecha y hora legibles, y su estado con un color distinto por estado.
- [ ] Listado ordenado por fecha, la más próxima primero.
- [ ] Las solicitudes `Pendiente` tienen botones "Confirmar" y "Rechazar"; al usarlos cambia el estado de esa solicitud, desaparecen sus botones y se actualiza el contador.
- [ ] Filtro por estado (Todas / Pendiente / Confirmada / Rechazada).
- [ ] Layout: lista de una columna en mobile; en desktop, grilla de varias columnas.
- [ ] Mismo criterio que el bloque 3: todo cambio pasa por el estado y un `render()`.
- [ ] Extra: los cambios sobreviven a una recarga de la página (pista: `localStorage`).
