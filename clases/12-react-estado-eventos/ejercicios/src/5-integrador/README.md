# Integrador: Mis propiedades (alta y edición)

La pantalla del Vendedor que quedó armada en el integrador de la Clase 11
(listado, acciones por estado, resumen y filtro), ahora con alta y edición
de propiedades. Se ve en `http://localhost:5173/?ej=5`.

Punto de partida, en esta carpeta:

- `MisPropiedades.tsx`, `FilaPropiedad.tsx` y `ResumenEstados.tsx`: el
  integrador de la 11 resuelto, con `TODO (5)` donde se engancha lo nuevo.
- `PublicarPropiedad.tsx`: el formulario del Ejercicio 3 resuelto, que
  todavía no se usa. Hay que adaptarlo para que sirva tanto para dar de
  alta como para editar.

**Objetivo**: combinar los temas de la clase en una pantalla completa:
un array de objetos en el estado (agregar y reemplazar sin mutar), estado
compartido entre el listado y el formulario, un formulario controlado
precargado para editar, y `key` para reiniciarlo.

**Requisitos**:

- [ ] Al lado del título, un botón `+ Nueva propiedad` abre el formulario vacío arriba del listado.
- [ ] Al guardar, la propiedad se agrega **al principio** del listado, en estado `Borrador`, con un `id` que no repite ninguno existente, `0` consultas sin responder y la foto `https://picsum.photos/seed/nueva<id>/200/130`. El formulario se cierra.
- [ ] Las propiedades en `Borrador`, `Publicada`, `Pausada` y `Reservada` tienen un botón `Editar` en su `div.acciones`. Las `Vendida`, `Alquilada` y `Cancelada` no tienen (en el TPO ya no se editan sus datos principales).
- [ ] `Editar` abre el mismo formulario, precargado con los datos de esa propiedad y con el título `✏️ Editar propiedad`. Al guardar, la propiedad se reemplaza en su lugar y conserva su `id`, `estado`, consultas y foto.
- [ ] El botón del formulario dice `Publicar` en el alta y `Guardar cambios` en la edición. Hay además un botón `Cancelar` (`type="button"`) que lo cierra sin cambiar nada.
- [ ] Hay un solo formulario abierto a la vez. Si se está editando una propiedad y se hace click en `Editar` de otra, el formulario muestra los datos de la segunda (no quedan los de la primera).
- [ ] El resumen y el filtro siguen funcionando con las propiedades nuevas y editadas, sin cambios en `ResumenEstados`.
- [ ] Ninguna operación muta el array ni los objetos del estado.
- [ ] Extra: el foco va al título del formulario al tocar `Editar` o `+ Nueva propiedad`. Pista: ¿se puede hacer desde el handler del click, si el formulario todavía no se dibujó?

Pistas:

- Para precargar, el formulario puede recibir los valores iniciales por
  props y usarlos en `useState(…)`. Los números de una `MiPropiedad` se
  pasan a string con `String(…)`, y los `null` como `""`.
- `useState(inicial)` usa `inicial` **solo** en el primer render. Si
  después cambian las props, el estado no se entera. ¿Cómo se fuerza que
  el formulario arranque de nuevo?
- Para el estado de "qué formulario está abierto" alcanza con un solo
  valor: `null` (ninguno), `"nueva"` o el `id` de la propiedad que se edita.
