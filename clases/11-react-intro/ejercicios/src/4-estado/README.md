# Ejercicios 4.1 y 4.2: Eventos y estado

Se trabaja en `Galeria.tsx` (4.1), `MeInteresa.tsx` y `Consultas.tsx`
(4.2). Se ve en `http://localhost:5173/?ej=4`. Punto de partida: el 3.1 y
el 3.2 resueltos.

## Ejercicio 4.1: Galería interactiva

**Objetivo**: guardar en estado lo mínimo (qué foto se está viendo) y
cambiarlo desde eventos.

**Requisitos**:

- [ ] Hacer click en una miniatura la pone como foto principal y la marca con la clase `activa` (y le saca la clase a la anterior).
- [ ] Entre la foto principal y las miniaturas, un `div.galeria-controles` con un botón `‹`, el texto `2 / 4` (foto actual / total) y un botón `›`.
- [ ] `‹` y `›` van a la foto anterior y a la siguiente; en la primera foto `‹` está deshabilitado (`disabled`), y en la última, `›`. Pista: los atributos booleanos reciben una expresión, `disabled={…}`.
- [ ] El estado de la galería es **un solo número**: la foto principal, el texto `2 / 4` y la miniatura activa se calculan a partir de él.
- [ ] La galería no conoce a `Detalle`: todo el estado vive adentro de `Galeria`.

## Ejercicio 4.2: Me interesa y respuestas desplegables

**Objetivo**: distinguir el estado de lo derivado, y ver que cada
instancia de un componente tiene su propio estado.

**Requisitos**:

- [ ] `MeInteresa` muestra un `div.me-interesa` con un botón `🙋 Me interesa` y al lado `12 personas interesadas`.
- [ ] Al hacer click, el botón pasa a `✓ Interesado` con la clase `activo` y el texto a `13 personas interesadas`; otro click lo vuelve atrás.
- [ ] El estado de `MeInteresa` es un booleano: el número que se muestra se **calcula** a partir de la prop `interesados` y ese booleano (no hay un segundo estado con el número).
- [ ] En `Consultas`, las respuestas arrancan ocultas: cada consulta respondida muestra un botón `Ver respuesta` (clase `link-boton`) que la despliega y pasa a decir `Ocultar respuesta`.
- [ ] Desplegar una respuesta no despliega las otras. Pista: extraer cada consulta a un componente `ConsultaItem` con su propio estado.
- [ ] Las consultas sin responder siguen mostrando `Sin responder`, sin botón.
