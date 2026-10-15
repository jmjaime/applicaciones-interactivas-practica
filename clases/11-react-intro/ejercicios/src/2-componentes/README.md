# Ejercicio 2.1: Componentes y props

Se trabaja en los archivos de esta carpeta. Se ve en
`http://localhost:5173/?ej=2`. Punto de partida: el 1.1 resuelto, todo en
un solo componente (`Detalle.tsx`). `Encabezado.tsx` ya está resuelto,
como modelo para los demás.

**Objetivo**: partir una pantalla en componentes que reciben sus datos
por props tipadas, y usar `children` para un contenedor reutilizable.

**Requisitos**:

- [ ] La pantalla se ve **igual** que al empezar (es un refactor: cambia el código, no el resultado).
- [ ] `Detalle` usa `Encabezado` en lugar de su JSX del encabezado.
- [ ] `Atributos` y `DatosInmobiliaria` reciben por props solo los datos que muestran, con un `type` para sus props. Ninguno importa `../datos/propiedad`: el único que lo importa es `Detalle`.
- [ ] `DatosInmobiliaria` recibe el objeto completo en una sola prop, tipada con el tipo `Inmobiliaria` de `../types`.
- [ ] `Panel` recibe un `titulo` y `children`, y se usa para los paneles "Características" e "Inmobiliaria".
- [ ] `Detalle` solo compone: su JSX tiene la foto, los componentes y los `Panel`, sin `p`, `span` ni `a` sueltos.
- [ ] Quitar una prop obligatoria en el uso de cualquier componente da un error de TypeScript en el editor (y en `npm run build`).
- [ ] En React DevTools → Components se ven `Detalle`, `Encabezado`, `Panel`, `Atributos` y `DatosInmobiliaria`, cada uno con sus props.
