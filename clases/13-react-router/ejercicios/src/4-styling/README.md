# Ejercicio 4: Styling del panel

Arranca con el Ejercicio 3 resuelto. La nav y los badges de estado usan
clases globales de `estilos.css`; este ejercicio los pasa a CSS Modules.
Se trabaja en `LayoutPanel.tsx` (+ `.module.css`), `BadgeEstado.tsx`
(+ `.module.css`) y `Reportes.tsx`. Se ve en `http://localhost:5173/4/`.

**Objetivo**: usar CSS Modules, clases que dependen de datos o de la ruta
activa, y `style` inline para un valor calculado.

**Requisitos**:

- [ ] La nav de `LayoutPanel` no usa ninguna clase de `estilos.css`: todo sale de `LayoutPanel.module.css` (`.nav`, `.marca`, `.seccion`, `.actual`). Se ve igual que antes: fondo `#282a36`, la marca a la izquierda y las secciones a la derecha.
- [ ] Cada sección de la nav es una **pestaña**: sin fondo, con un borde inferior de 3px transparente que se ve `#6272a4` al pasar el mouse. La activa tiene el borde y el texto en verde `#50fa7b`, y negrita.
- [ ] El resaltado de la activa sale de `className` de `NavLink` como **función** de `isActive`, no de la clase `active` automática.
- [ ] `BadgeEstado` usa solo `BadgeEstado.module.css`: una clase base `.badge` y una por estado, con los colores de la tabla de abajo. La clase del estado se elige con el estado mismo (`estilos[estado]`), sin `if` ni `switch`.
- [ ] En Reportes, cada estado tiene una barra (`div.barra`) cuyo ancho es proporcional a la cantidad: el estado con más propiedades ocupa el 100% y uno con 0 no se ve.
- [ ] DevTools → Elements: las clases de la nav y de los badges son nombres generados (`_actual_xxxx_1`), no `active` ni `estado-…`.

| Estado | Fondo | Texto |
|---|---|---|
| Borrador | `#ddd` | `#555` |
| Publicada | `#50fa7b` | — |
| Pausada | `#f1fa8c` | — |
| Reservada | `#ffb86c` | — |
| Vendida, Alquilada | `#8be9fd` | — |
| Cancelada | `#ff5555` | `white` |

Pistas:

- Para combinar clases de un module: `` `${estilos.seccion} ${estilos.actual}` ``.
- En un `.module.css` el nombre de la clase puede ser `.Publicada` (con
  mayúscula): así `estilos[estado]` funciona directo.
- Para que el borde de la pestaña no "salte" al activarse, el borde transparente
  va siempre en `.seccion`; `.actual` solo le cambia el color.
- La barra solo necesita el ancho inline (`style={{ width: … }}`); el alto y
  el color ya están en `.barra`.
