# Ejercicio 2: Filtros y detalle

Arranca con el Ejercicio 1 resuelto. Se trabaja en `DetallePropiedad.tsx` y
`MisPropiedades.tsx`. Se ve en `http://localhost:5174/2/`.

| Pantalla | Request |
|---|---|
| Detalle | `GET /properties/:id` |
| Visitas del detalle | `GET /properties/:id/visit-requests` |
| Mis propiedades | `GET /agencies/:id/properties?estado=Publicada&q=texto` |

**Objetivo**: usar dependencias reales (`:id`, la query de la URL), separar lo
que se sincroniza en más de un effect y limpiar lo que cada uno deja en curso.

**Requisitos**:

- [ ] El detalle trae la propiedad del `:id`, con "Cargando…" y mensaje de error. Un id inexistente (`/2/propiedades/99`) muestra "No existe la propiedad 99".
- [ ] Las visitas se traen en otro effect, con su propia carga: la ficha aparece primero y debajo se ve "Cargando visitas…" hasta que llegan. Sin visitas (`/2/propiedades/5`) se ve "Todavía no hay visitas.".
- [ ] Un error en las visitas no tapa la ficha: en `/2/propiedades/4` la API falla a propósito y se ven la propiedad y el mensaje de error.
- [ ] "← Anterior" y "Siguiente →" ya están en la pantalla y cambian el `:id` sin desmontar el detalle: la propiedad y sus visitas se actualizan sin recargar.
- [ ] La propiedad 1 tarda 3 segundos a propósito, también en sus visitas. Abrir `/2/propiedades/1` y tocar enseguida "Siguiente →": a los 3 segundos siguen en pantalla la 2 y las visitas de la 2 (Pedro Ruiz). En Network, los dos requests de la 1 quedan `(canceled)`.
- [ ] En Mis propiedades, los chips y la búsqueda filtran en la API: el `.filter` del componente desaparece. Los chips quedan sin cantidades, porque la lista ya viene filtrada.
- [ ] Escribir una palabra en el buscador dispara **un solo** request, 400 ms después de la última tecla.
- [ ] Cambiar de filtro no borra la pantalla: el buscador conserva el foco y la lista anterior sigue visible hasta que llega la nueva.
- [ ] Recargar con `?estado=Publicada&q=dep` mantiene el filtro.

Pistas:

- `new AbortController()`, su `signal` en el `fetch` y `abort()` en el cleanup. Un request cancelado también cae en el `catch`.
- Un mismo cleanup puede cancelar un timer y un request.
- El `if (cargando) return …` reemplaza toda la pantalla, incluido el input. Para la lista, conviene mostrar la carga adentro.
