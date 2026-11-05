# Ejercicio 1: El panel desde la API

Se trabaja en `MisPropiedades.tsx` y `SolicitudesVisita.tsx` (y en
`Consultas.tsx` como opcional). Se ve en `http://localhost:5174/1/`. La URL
base y el id de la inmobiliaria están en `src/comun/api.ts`.

| Pantalla | Request |
|---|---|
| Mis propiedades | `GET /agencies/:id/properties` |
| Visitas | `GET /agencies/:id/visit-requests` |
| Consultas | `GET /agencies/:id/comments` |

**Objetivo**: traer datos al montar con `useEffect` y contemplar los estados
de una carga.

**Requisitos**:

- [ ] Mis propiedades muestra las 7 propiedades de la API. Los chips y la búsqueda siguen funcionando.
- [ ] Mientras carga se ve "Cargando…" (clase `cargando`), no la pantalla vacía ni "No hay propiedades con esos filtros".
- [ ] DevTools → Network → Offline, y F5: se ve un mensaje de error (clases `mensaje error`), no una pantalla en blanco.
- [ ] Cambiar `AGENCIA_ID` a `99`: la API responde 404 y se ve el mismo mensaje de error. Después, volver a `1`.
- [ ] Al entrar, la terminal de la API muestra dos `GET` (StrictMode en desarrollo) y ahí termina: los requests no siguen llegando.
- [ ] Visitas se ve igual de completa: lista, carga y error.

Pistas:

- La función que se le pasa a `useEffect` no puede ser `async`.
- `fetch` no rechaza la promesa con un 404: la respuesta trae `res.ok`.
