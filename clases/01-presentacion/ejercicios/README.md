# Ejercicios — repaso de sintaxis JS/TS (Clase 1, Parte 2)

Proyecto ya armado (`package.json`, `tsconfig.json`, `jest.config.ts`) — para arrancar
alcanza con:

```bash
cd clases/01-presentacion/ejercicios
npm install
```

Son 10 ejercicios cortos, cada uno en su propia carpeta `src/NN-tema/`, con:

- `<archivo>.ts` — el código a completar (buscar los `// TODO`)
- `<archivo>.spec.ts` — el test que valida la solución (no hay que tocarlo)
- `README.md` — la consigna puntual del ejercicio, con links a la documentación oficial

Pensados para completarse en un par de horas como mucho — no hace falta hacerlos en
orden ni todos de una sentada. Los primeros 7 repasan JS básico (ya visto en
`ejemplos/02-sintaxis-js-ts/`); los últimos 3 son de TypeScript: definir un tipo propio,
una unión de tipos y un enum — lo mínimo para poder tipar código propio de acá en más.

| Carpeta | Tema |
|---|---|
| [`01-saludar/`](src/01-saludar/README.md) | funciones, parámetro con valor por defecto |
| [`02-apodo/`](src/02-apodo/README.md) | objetos, operador nullish (`??`) |
| [`03-clasificar/`](src/03-clasificar/README.md) | condicionales (`if`/`else if`/`else`) |
| [`04-combinar/`](src/04-combinar/README.md) | spread, no mutar el objeto original |
| [`05-pares-duplicados/`](src/05-pares-duplicados/README.md) | métodos de array (`filter` + `map`) |
| [`06-esperar-dato/`](src/06-esperar-dato/README.md) | `async`/`await` sobre una Promise |
| [`07-dividir/`](src/07-dividir/README.md) | TS: unión simple (`number \| undefined`) |
| [`08-coordenada/`](src/08-coordenada/README.md) | TS: definir un tipo propio (`type`) |
| [`09-resultado-division/`](src/09-resultado-division/README.md) | TS: unión discriminada + narrowing |
| [`10-estado-pedido/`](src/10-estado-pedido/README.md) | TS: `enum` |

## Cómo validar el propio trabajo

```bash
npm test            # corre todos los tests una vez
npm run test:watch  # los vuelve a correr solos cada vez que guardás un archivo
npm run typecheck   # chequea los tipos de TS sin generar JS (útil si no usás un editor con TS)
```

Un ejercicio está resuelto cuando su `.spec.ts` correspondiente pasa en verde. Se puede
correr un solo ejercicio con, por ejemplo:

```bash
npm test -- 01-saludar
```
