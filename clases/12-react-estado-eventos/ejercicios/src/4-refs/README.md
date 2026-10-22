# Ejercicio 4: Foco en el error

Sobre el formulario de "Publicar propiedad". Se trabaja en
`PublicarPropiedad.tsx`, que trae el Ejercicio 3 resuelto con tres
`TODO (4)` marcados. Se ve en `http://localhost:5173/?ej=4`.

**Objetivo**: usar `useRef` para operar sobre un nodo del DOM (el foco)
desde un event handler, algo que el estado no puede expresar.

**Requisitos**:

- [ ] Al publicar con errores, el foco va al **primer** campo inválido en el orden de la pantalla: título, precio, ambientes, superficie cubierta, superficie total.
- [ ] Al corregir ese campo y volver a publicar, el foco va al siguiente inválido.
- [ ] Si el tipo es `Terreno`, el foco nunca intenta ir a un campo que no está en pantalla, y no aparece ningún error en la Console.
- [ ] Al publicar con éxito, el foco vuelve al título, listo para cargar otra propiedad.
- [ ] Las refs se usan solo en el handler, no durante el render.

Pista: `ref.current` es `null` mientras el elemento no está en pantalla,
y `?.` evita el error. Por el orden en que se validan las cosas, ¿alcanza
con el objeto `errores` para saber cuál es el primero?
