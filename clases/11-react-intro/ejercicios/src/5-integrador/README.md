# Integrador: Mis propiedades

Pantalla del Vendedor en el TPO: el listado de las propiedades de su
inmobiliaria, con las acciones para moverlas por su ciclo de vida. Se arma
desde cero a partir de `MisPropiedades.tsx`, con los datos de
`src/datos/mis-propiedades.ts`. Se ve en `http://localhost:5173/?ej=5`.

Ciclo de vida de una propiedad (del enunciado del TPO), y la acción que mueve
cada transición:

| Estado actual | Acciones disponibles |
|---|---|
| `Borrador` | Publicar → `Publicada` |
| `Publicada` | Pausar → `Pausada` · Marcar reservada → `Reservada` · Cancelar |
| `Pausada` | Republicar → `Publicada` · Cancelar |
| `Reservada` | Marcar vendida → `Vendida` (si es venta) o Marcar alquilada → `Alquilada` (si es alquiler) · Cancelar |
| `Vendida`, `Alquilada`, `Cancelada` | Ninguna |

Cancelar lleva a `Cancelada`.

**Objetivo**: combinar componentes con props, listas, renderizado
condicional, eventos y estado en una pantalla completa.

**Requisitos**:

- [ ] Al menos dos componentes además de `MisPropiedades` (p. ej. `ResumenEstados` y `FilaPropiedad`), cada uno en su archivo y con props tipadas.
- [ ] Cada propiedad es un `article.fila` con foto, título (`h2`), operación, precio formateado y su estado como badge con las clases `estado estado-<estado en minúscula>` (p. ej. `estado estado-publicada`).
- [ ] Si tiene consultas sin responder, se ve `💬 3 consultas sin responder` con la clase `alerta`; con 1, en singular (`💬 1 consulta sin responder`); si tiene 0, no se ve nada (ni un `0` suelto).
- [ ] Cada fila tiene un `div.acciones` con **solo** los botones que corresponden a su estado según la tabla (una propiedad `Vendida` no tiene ninguno). "Marcar vendida" y "Marcar alquilada" dependen de la operación.
- [ ] Al usar una acción, la propiedad cambia de estado: cambian su badge y sus botones, sin recargar.
- [ ] Cancelar pide confirmación antes (`window.confirm`); si se responde que no, no cambia nada.
- [ ] Arriba del listado, un `div.resumen-estados` con un badge por cada estado que tenga al menos una propiedad: `Publicada 2`, `Reservada 1`… Se actualiza solo al cambiar estados.
- [ ] Un `select` filtra por estado (`Todos` + cada estado; la lista de estados está en `ESTADOS`, en `src/types.ts`). Si ninguna propiedad cumple el filtro, se ve un `p.mensaje` que lo indica.
- [ ] En estado vive solo lo que el usuario cambia (la lista de propiedades y el filtro); el resumen y la lista filtrada se calculan.
- [ ] Extra: ordenar con un segundo `select` por precio o por título.

Pista para cambiar el estado de una propiedad: el estado es un array de
objetos, y React necesita recibir **un array nuevo** con **un objeto
nuevo** para la propiedad que cambió:

```ts
setPropiedades(propiedades.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p)));
```

Actualizar arrays y objetos en el estado se ve en detalle más adelante.
