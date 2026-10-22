# Ejercicio 1: Solicitudes de visita

Pantalla del Vendedor en el TPO: las solicitudes de visita que recibió su
inmobiliaria, para confirmarlas o rechazarlas. Se trabaja en
`SolicitudesVisita.tsx`, que ya muestra la lista con los datos de
`src/datos/solicitudes.ts`. Se ve en `http://localhost:5173/?ej=1`.

**Objetivo**: actualizar un array de objetos en el estado sin mutarlo
(`map` + spread, `filter`, copiar antes de `sort`), y calcular lo
derivable en vez de guardarlo.

**Requisitos**:

- [ ] Cada solicitud `Pendiente` tiene un `div.acciones` con dos botones, `Confirmar` y `Rechazar`, que la pasan a `Confirmada` o `Rechazada`. Cambian su badge y sus botones, sin recargar la página.
- [ ] Las `Confirmada` no tienen botones. Las `Rechazada` tienen un solo botón, `Descartar`, que la saca de la lista.
- [ ] Arriba de la lista, un `div.resumen-estados` con un badge por estado (`estado estado-<estado en minúscula>`) y su cantidad: `Pendiente 4`, `Confirmada 1`, `Rechazada 1`. Se actualiza solo al confirmar, rechazar o descartar.
- [ ] Un `select` permite ordenar por fecha, `Más próximas primero` o `Más lejanas primero`. Al cambiarlo, la lista se reordena.
- [ ] Ninguna operación muta el array ni los objetos del estado: nada de `push`, `splice`, `sort` sobre el original ni `s.estado = …`.
- [ ] El resumen **no** está en el estado: se calcula en cada render a partir de la lista.
- [ ] Si se descartan todas, se ve un `p.mensaje` que dice `No hay solicitudes.`
- [ ] Extra: un botón `Descartar rechazadas` que saca todas las rechazadas de una vez. Se deshabilita (`disabled`) si no hay ninguna.

Pistas:

- Hay dos formas de ordenar: guardar el criterio en el estado y ordenar
  una copia en el render, o reordenar el array del estado con una copia.
  Las dos son válidas. ¿Qué pasa con cada una si después se confirma una
  solicitud?
- Las fechas tienen formato ISO (`"2026-10-31T15:00"`), así que se pueden
  comparar como strings: `a.fecha.localeCompare(b.fecha)`.
