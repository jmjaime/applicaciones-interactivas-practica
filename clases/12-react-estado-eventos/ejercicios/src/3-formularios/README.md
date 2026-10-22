# Ejercicio 3: Publicar propiedad

El formulario del Vendedor en el TPO para cargar una propiedad nueva. Se
trabaja en `PublicarPropiedad.tsx`, que ya tiene el markup de todos los
campos. `Publicar.tsx` (ya resuelto) recibe lo que se publica y lo lista
abajo. Se ve en `http://localhost:5173/?ej=3`.

**Objetivo**: armar un formulario controlado con un objeto y un solo
handler, con campos que dependen de otros y validaciones calculadas.

**Requisitos**:

- [ ] Todos los campos son controlados: el formulario es **un** objeto en el estado, y un solo `handleChange` sirve para todos los inputs y selects (la clave sale del `name`).
- [ ] Valores iniciales: tipo `Departamento`, operación `Venta`, moneda `USD`, y el resto vacío.
- [ ] Si el tipo es `Terreno`, no se ven los campos `Ambientes` ni `Superficie cubierta` (no aplican). Al volver a otro tipo, reaparecen.
- [ ] Validaciones (reglas del TPO):
  - Título obligatorio (no vale solo con espacios).
  - Precio mayor a 0.
  - Superficie total mayor a 0.
  - Superficie cubierta mayor a 0 y menor o igual a la total (cuando aplica).
  - Ambientes, si se completa, un entero mayor o igual a 1.
- [ ] Cada error se muestra en un `p.error` debajo de su campo (o de la fila de campos), recién después del primer intento de publicar. Después se actualizan en vivo mientras se corrige.
- [ ] Los errores no están en el estado: se calculan a partir del formulario.
- [ ] Al publicar sin errores, se llama a `onPublicar` con una `NuevaPropiedad` (ver `src/types.ts`): números como `number`, y `null` en lo que no aplica o quedó vacío. La propiedad aparece abajo, el formulario vuelve a los valores iniciales y no se ven errores.
- [ ] La página no se recarga al publicar, ni con el botón ni con Enter.

Pistas:

- Un `<input type="number">` devuelve un **string** en `e.target.value`.
  Conviene guardar strings en el formulario y convertir con `Number(…)`
  al validar y al publicar. Así un campo vacío puede quedar vacío.
- El `handleChange` tiene que aceptar inputs y selects:
  `React.ChangeEvent<HTMLInputElement | HTMLSelectElement>`.
- Un terreno con `superficieCubierta` cargada antes de cambiar el tipo no
  tiene que fallar la validación ni publicarse con ese valor.
