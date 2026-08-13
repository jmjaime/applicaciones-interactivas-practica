# Ejercicios — Clase 2: JS/TS y herramientas de desarrollo

Mismo naming y mismo `package.json`/estilo que `../ejemplos/` (ver su
README), pero cada ejercicio usa su propio caso — ninguno se resuelve
copiando y pegando el ejemplo correspondiente.

El test de cada tema vive **en la misma carpeta** que su `exercise.ts`
(`exercise.spec.ts` al lado, no en un `__tests__/` centralizado aparte).

## Instalación

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # corre todo con los TODO sin resolver: debe fallar
```

## Ejercicios

| Carpeta | Tema | En clase / en casa |
|---|---|---|
| `01-express-basico/` | Routing + `req.body` | En clase (15-20 min) |
| `02-eslint/` | Arreglar errores de ESLint | En clase (10 min) |
| `03-validaciones/` | Validación manual + Zod | En clase (20-25 min) |
| `04-filtrar-modificar/` | Filtrar, dar forma (destructuring), borrar | En clase (20-25 min) |
| `05-api-externa/` | `fetch` + destructuring + template literals | En clase (15-20 min) |
| `06-integrador/` | Combina 1, 3 y 4 | En casa (20-25 min) |

No hace falta resolverlos en orden estricto dentro de un mismo bloque, pero
sí requieren el tema de la clase correspondiente ya visto.

## Cómo validar el propio trabajo

```bash
npm test                    # corre todos los tests
npm test -- 03-validaciones  # corre solo los tests de esa carpeta (matchea por path)
npm run typecheck      # tsc --noEmit
npm run lint            # 02-eslint/exercise.ts tiene 3 errores a propósito —
                         # el resto del proyecto debería quedar limpio
```

## Domino de cada ejercicio vs. su ejemplo

- **1**: ejemplo saluda por `:nombre` (route params) → ejercicio hace eco
  de `req.body` (body parsing).
- **3**: ejemplo valida `titulo` de una tarea → ejercicio valida `autor` +
  `contenido` de un comentario (dos campos, uno con límite de longitud).
- **4**: ejemplo filtra por `estado`, resume con `{ id, titulo }` y
  modifica con `PATCH` → ejercicio filtra por `prioridad`, resume con
  `{ titulo, estado }` y borra con `DELETE`.
- **5**: ejemplo devuelve la respuesta cruda de Open-Meteo
  (`GET /clima/:ciudad`) → ejercicio arma un resumen propio con
  destructuring + template literals (`GET /clima/:ciudad/resumen`); el
  llamado a la API viene dado en los dos casos, lo que cambia es qué se
  hace con el dato.
