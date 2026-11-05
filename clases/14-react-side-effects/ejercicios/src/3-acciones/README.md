# Ejercicio 3: Effects que sobran y alta

Arranca con el Ejercicio 2 resuelto. Se trabaja en `Reportes.tsx` y
`NuevaPropiedad.tsx`. Se ve en `http://localhost:5174/3/`.

En `src/comun/` ya están `CamposPropiedad` (los inputs, no controlados) y
`propiedadForm.ts` (`leerValores`, `aDatos`, `VALORES_VACIOS` y los tipos).

## Parte A · Effects que sobran (`Reportes.tsx`)

**Objetivo**: distinguir lo que necesita un effect de lo que se calcula en el
render o se resuelve en un handler.

**Requisitos**:

- [ ] La pantalla se ve y funciona igual que antes, con un solo `useEffect`.
- [ ] Desaparecen los estados `filas`, `maximo` y `exportar`.
- [ ] Tildar "Solo activas" y hacer click en "Exportar" sigue mostrando la cantidad correcta.

## Parte B · Alta contra la API (`NuevaPropiedad.tsx`)

`POST /properties` con los datos en JSON. Devuelve `201` con la propiedad
creada, o `400` con `{ errores: { titulo: "…", precio: "…" } }`. Tarda 1 segundo.

**Objetivo**: escribir datos desde un evento con Form Actions y `useActionState`.

**Requisitos**:

- [ ] Publicar crea la propiedad (arranca como Borrador) y lleva a su detalle. Atrás no vuelve al formulario.
- [ ] Mientras se envía, el botón queda deshabilitado y dice "Publicando…".
- [ ] Enviar vacío muestra los errores **que devuelve la API**, debajo de cada campo.
- [ ] Después de un error, lo cargado sigue en el formulario, incluidos los `<select>`.
- [ ] DevTools → Network → Offline y enviar: se ve un error general, sin perder lo cargado.

Pistas:

- La action recibe `(estadoAnterior, formData)`, y lo que devuelve es el nuevo estado.
- Para que `navigate` esté disponible, la action se puede definir adentro del componente.
