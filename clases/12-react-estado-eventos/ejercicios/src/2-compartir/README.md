# Ejercicio 2: Bandeja de consultas

Pantalla del Vendedor en el TPO: las consultas que recibieron sus
propiedades, para responderlas. Se trabaja en `BandejaConsultas.tsx`,
`ListaConsultas.tsx` y `PanelConsulta.tsx`, con los datos de
`src/datos/consultas.ts`. Se ve en `http://localhost:5173/?ej=2`.

Punto de partida: la lista marca la consulta en la que se hace click, pero
el panel siempre muestra la primera, porque la selección vive en
`ListaConsultas` y el panel no tiene forma de enterarse.

**Objetivo**: subir el estado al ancestro común para compartirlo entre
hermanos (una sola fuente de verdad), y usar `key` para reiniciar el
estado de un componente.

**Requisitos**:

- [ ] La selección vive en `BandejaConsultas`. `ListaConsultas` no tiene estado: recibe la seleccionada por props y avisa los clicks con un callback.
- [ ] El panel muestra la consulta seleccionada. Mientras no haya ninguna, en su lugar se ve un `p.mensaje` que dice `Elegir una consulta.`
- [ ] Desde el panel se escribe la respuesta y se envía con `Responder`. La consulta queda respondida y la página no se recarga.
- [ ] Una consulta respondida muestra en el panel su respuesta (en un `p.respuesta`) en lugar del formulario. En la lista, el item tiene además la clase `respondida` y suma un `✓ respondida`.
- [ ] No se puede responder con una respuesta vacía o con solo espacios: el botón `Responder` queda deshabilitado.
- [ ] Arriba de la lista, `3 sin responder` (clase `pendientes`). Al responder, el número baja solo. No es un estado aparte.
- [ ] Si se escribe un borrador y se cambia de consulta, el borrador se vacía.
- [ ] La lista de consultas se actualiza sin mutar: un array nuevo, con un objeto nuevo para la consulta respondida.

Pista: el borrador es estado del panel (nadie más lo lee). La lista de
consultas y la selección, en cambio, las necesitan los dos hermanos.
