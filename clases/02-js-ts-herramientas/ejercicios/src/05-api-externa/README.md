#### Ejercicio 5.1: Resumen del clima

**Objetivo**: practicar destructuring y template literals sobre datos que
vienen de una API externa (visto en el Bloque 5 —
`openMeteoClient.ts` ya está armado, no hay que tocarlo, el ejemplo en
`ejemplos/src/05-api-externa/` devuelve la respuesta cruda de Open-Meteo,
acá se arma un resumen propio).

**Requisitos**:

- [ ] `GET /clima/:ciudad/resumen` devuelve `{ ciudad, resumen }`.
- [ ] `resumen` es un string armado con template literals, por ejemplo
      `"18°C en Córdoba, viento 12 km/h"` (temperatura y viento
      redondeados con `Math.round`, sin decimales).
- [ ] Si la ciudad no existe, sigue respondiendo `404` (ya lo maneja
      `obtenerClima`, no hay que agregar nada para eso).

En clase, 15-20 min.
