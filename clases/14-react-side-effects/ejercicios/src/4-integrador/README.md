# Integrador: Panel conectado

Arranca con los Ejercicios 1 a 3 resueltos. Suma lo que falta para que el
panel se parezca al del TPO. Se trabaja en `EditarPropiedad.tsx`,
`DetallePropiedad.tsx`, `SolicitudesVisita.tsx` y `LayoutPanel.tsx`. Se ve en
`http://localhost:5174/4/`. Autoestudio.

| Acción | Request |
|---|---|
| Editar | `PUT /properties/:id`: `200`, o `400` con `{ errores }` |
| Confirmar o rechazar | `PATCH /visit-requests/:id` con `{ estado }`: `200`, `404` o `409` con `{ error }` |
| Contador | `GET /agencies/:id/comments?sinResponder=true` |

La API agrega una consulta nueva cada 20 segundos (hasta 5), para probar el
contador.

**Objetivo**: combinar carga con dependencias, cleanup, handlers que escriben,
Form Actions y polling en un flujo completo.

**Requisitos**:

- [ ] El detalle tiene un link "✏️ Editar" a `propiedades/:id/editar`, salvo si la propiedad está Vendida, Alquilada o Cancelada.
- [ ] `EditarPropiedad` trae la propiedad del `:id`, con carga, error y mensaje si no existe.
- [ ] El formulario aparece precargado, con los `<select>` en el valor correcto.
- [ ] Al guardar, vuelve al detalle con los datos nuevos, y Atrás no vuelve al formulario. "Cancelar" vuelve atrás.
- [ ] Un 400 muestra los errores de la API debajo de cada campo, sin perder lo cargado.
- [ ] Entrar a mano a `/4/propiedades/5/editar` (vendida) muestra un mensaje en vez del formulario.
- [ ] En Visitas, cada solicitud Pendiente tiene "Confirmar" y "Rechazar". Al responder, su estado cambia sin recargar la lista completa.
- [ ] Mientras se responde una solicitud, sus botones quedan deshabilitados. Si falla, se ve un mensaje y la solicitud queda como estaba.
- [ ] En la nav, "Consultas" muestra la cantidad sin responder, y sube sola sin recargar la página.
- [ ] El título de la pestaña muestra esa cantidad: `(3) Mi inmobiliaria`.
- [ ] En Network, el contador pide una vez cada 5 segundos, aunque se navegue entre secciones: no se acumulan intervalos.

Pistas:

- `useActionState` usa el estado inicial solo al montar: el formulario precargado conviene que sea un componente aparte, que se muestra recién cuando llegaron los datos.
- Actualizar una solicitud en la lista es lo de la Clase 12: un `map` que reemplaza solo esa.
- Confirmar es consecuencia de un click: va en un handler, no en un effect.
- En el polling, un error puntual no tiene que romper el panel: alcanza con dejar el último valor conocido.
